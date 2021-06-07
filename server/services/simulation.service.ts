import {iif, merge, Observable, of, Subject} from "rxjs";
import {delay, filter, first, skipWhile, switchMap, takeWhile, tap} from "rxjs/operators";
import {DepartmentsType} from "../../client/src/app/core/models/departments.type";
import {DFSDistribution, DFSDistributionEntity} from "../../client/src/app/core/models/distributions.type";
import {serverQuery} from "../state/server.query";
import {serverService} from "../state/server.service";
import {SimulationStatus} from "../state/server.state";
import {AbstractDistribution} from "./distributions/abstract.distribution";
import {DetermineDistribution} from "./distributions/determine.distribution";
import {ExponentialDistribution} from "./distributions/exponential.distribution";
import {NormalDistribution} from "./distributions/normal.distribution";
import {UniformDistribution} from "./distributions/uniform.distribution";

export const defaultSimulationParams = {
    distribution: {
        [DFSDistribution.DETERMINISTIC]: 10
    }
};

export class SimulationService {
    public request$: Observable<any>;
    public supportRequest$: Observable<any>;
    public manageStream$: Observable<any>;
    public developersStream$: Observable<any>;
    public designersStream$: Observable<any>;
    public branchingAfterManageStream$: Observable<any>;

    private supportRequestStream: Subject<number>;
    private branchingDesignRequestStream: Subject<{ value: number }>;

    private processingTimeDistribution: AbstractDistribution;
    private requestTimeDistribution: AbstractDistribution;
    private requestDistribution: AbstractDistribution;
    private developCostsDistribution: AbstractDistribution;
    private designCostsDistribution: AbstractDistribution;
    private revisionTimeDistribution: AbstractDistribution;
    private responseCustomerDistribution: AbstractDistribution;
    private supportProcessingTimeDistribution: AbstractDistribution;

    private percentDistribution: UniformDistribution = new UniformDistribution(0, 100);

    public startSimulation(): void {
        this.setupStreams();

        // Start streams
        this.upRequestCount();

        serverQuery.select(store => store.state.finalProjectCount > 0)
            .pipe(
                takeWhile(() => serverQuery.status !== SimulationStatus.INITIAL),
                filter(() => serverQuery.status === SimulationStatus.STARTED),
                skipWhile(value => !value),
                first(),
            )
            .subscribe();

        this.developersStream$
            .subscribe();

        if(this.supportRequest$) {
            this.supportRequest$
                .subscribe(value => {
                    this.setStatistic(value);
                })
        }

        this.subscribeToGetDepartmentStatistic();
    }

    public stopSimulation(): void {
        serverService.setStatus(SimulationStatus.INITIAL);
    }

    public pauseSimulation(): void {
        serverService.setStatus(SimulationStatus.PAUSED);
    }

    public resumeSimulation(): void {
        serverService.setStatus(SimulationStatus.STARTED);
    }

    public generateRequest(): void {
        this.upRequestCount();
    }

    public generateSupportRequest(): void {
        if (serverQuery.state.finalProjectCount > 0) {
            this.supportRequestStream.next();
        }
    }

    private setupStreams(): void {
        const settings = serverQuery.settings;
        this.supportRequestStream = new Subject<number>();

        this.requestDistribution = this.getDistribution(settings.requestDistribution);
        this.requestTimeDistribution = this.getDistribution(settings.requestTimeDistribution);
        this.processingTimeDistribution = this.getDistribution(settings.processingTimeDistribution);
        this.developCostsDistribution = this.getDistribution(settings.developCostsDistribution);
        this.designCostsDistribution = this.getDistribution(settings.designCostsDistribution);
        this.revisionTimeDistribution = this.getDistribution(settings.revisionTimeDistribution);
        this.responseCustomerDistribution = this.getDistribution(settings.responseCustomerDistribution);

        const isDesignAvailable = settings.departments.includes(DepartmentsType.DESIGNERS);
        const isSupportAvailable = settings.departments.includes(DepartmentsType.SUPPORT);

        // Поток заявок
        this.request$ = serverQuery.select(store => store.state.currentRequest)
            .pipe(
                takeWhile(() => serverQuery.status !== SimulationStatus.INITIAL),
                filter(value => value && serverQuery.status === SimulationStatus.STARTED),

                // Учесть, что в системе уже может быть заявка
                filter(() => !serverQuery.state.isRequestPreparing),
                tap(() => {
                    serverService.updateState(() => {
                        return {
                            isRequestPreparing: true
                        };
                    });

                    if (this.requestDistribution && serverQuery.status === SimulationStatus.STARTED) {
                        setTimeout(() => {
                            // Генерация заявок
                            this.upRequestCount();
                        }, this.requestDistribution.getValue());
                    }
                })
            );

        // Поток отдела менеджмента
        this.manageStream$ = this.request$
            .pipe(
                switchMap(value => {
                    return this.getDelayStream(this.responseCustomerDistribution.getValue(), {
                            requestCount: value,
                            isDesignNeeded: this.percentDistribution.getValue() <= settings.designNeededPercent
                        }
                    );
                })
            );

        if (isDesignAvailable) {
            this.branchingDesignRequestStream = new Subject<{ value: number }>();

            // Поток отдела дизайна
            this.designersStream$ = this.manageStream$
                .pipe(
                    switchMap(value => {
                        return merge([
                            this.getDelayStream(this.getWorkingTime(this.designCostsDistribution, settings.designerWorkersCount), value),
                            this.branchingDesignRequestStream.asObservable()
                        ]);
                    }),
                    switchMap(value => {
                        return this.getDelayStream(this.responseCustomerDistribution.getValue(), {
                            ...value,
                            isRevisionNeeded: this.percentDistribution.getValue() < settings.revisionProbability
                        });
                    })
                );

            // Поток условия разветвления
            this.branchingAfterManageStream$ = this.designersStream$
                .pipe(
                    switchMap(value => {
                        return iif(
                            () => value.isRevisionNeeded,
                            this.getDelayStream(this.revisionTimeDistribution.getValue(), value)
                                .pipe(
                                    tap(value => {
                                        this.branchingDesignRequestStream.next(value);
                                    }),
                                    first()
                                ),
                            of(value),
                        )
                    })
                )
        } else {
            this.branchingAfterManageStream$ = this.manageStream$;
        }

        // Поток отдела разработки
        this.developersStream$ = this.branchingAfterManageStream$
            .pipe(
                switchMap(value => {
                    return this.getDelayStream(this.getWorkingTime(this.developCostsDistribution, settings.developerWorkersCount), {
                            requestCount: value.currentRequest
                        }
                    );
                }),
                tap(() => {
                    serverService.updateState(state => {
                        return {
                            finalProjectCount: state.finalProjectCount + 1,
                            isRequestPreparing: false
                        };
                    });
                })
            );

        // Поток отдела поддержки
        if (isSupportAvailable) {
            this.supportRequest$ = this.supportRequestStream.asObservable()
                .pipe(
                    takeWhile(() => serverQuery.status !== SimulationStatus.INITIAL),
                    filter(() => serverQuery.status === SimulationStatus.STARTED),
                    tap(() => {
                        if (this.requestTimeDistribution && serverQuery.status === SimulationStatus.STARTED) {
                            setTimeout(() => {
                                // Генерация заявок
                                this.supportRequestStream.next();
                            }, this.requestTimeDistribution.getValue());
                        }
                    }),
                    switchMap(() => {
                        return this.getDelayStream(
                            this.getWorkingTime(this.supportProcessingTimeDistribution, settings.supportWorkersCount), {}
                        );
                    })
                );
        }
    }

    private getDelayStream<T = any>(delayValue: number, value: T): Observable<T> {
        return of(value).pipe(delay(delayValue));
    }

    private getDistribution(distributionEntity: DFSDistributionEntity): AbstractDistribution {
        switch (distributionEntity.type) {
            case DFSDistribution.UNIFORM:
                return new UniformDistribution(
                    distributionEntity.min,
                    distributionEntity.max
                );
            case DFSDistribution.NORMAL:
                return new NormalDistribution(
                    distributionEntity.value, distributionEntity.variance
                );
            case DFSDistribution.EXPONENTIAL:
                return new ExponentialDistribution(distributionEntity.value);
            case null:
                return null;
            case DFSDistribution.DETERMINISTIC:
            default:
                return new DetermineDistribution(
                    distributionEntity.value || defaultSimulationParams.distribution[DFSDistribution.DETERMINISTIC]
                );
        }
    }

    private upRequestCount(): void {
        serverService.updateState(state => {
            return {
                currentRequest: state.currentRequest + 1
            }
        });
    }

    private getWorkingTime(distribution: AbstractDistribution, countOfWorkers): number {
        return distribution.getValue() / countOfWorkers;
    }

    private setStatistic(value: any): void {
        // TODO: implement
    }

    private subscribeToGetDepartmentStatistic(): void {
        // TODO: implement
    }
}

export const simulationService = new SimulationService();
