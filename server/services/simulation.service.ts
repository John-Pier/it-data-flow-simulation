import {iif, merge, Observable, of, Subject} from "rxjs";
import {delay, filter, first, skipWhile, switchMap, takeWhile, tap} from "rxjs/operators";
import {DepartmentsType} from "../../client/src/app/core/models/departments.type";
import {DFSDistribution, DFSDistributionEntity} from "../../client/src/app/core/models/distributions.type";
import {DFSSettings} from "../../client/src/app/core/models/settings.type";
import {serverQuery} from "../state/server.query";
import {serverService} from "../state/server.service";
import {SimulationStatus} from "../state/server.state";
import {AbstractDistribution} from "./distributions/abstract.distribution";
import {DetermineDistribution} from "./distributions/determine.distribution";
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

    private percentDistribution: UniformDistribution = new UniformDistribution(0, 100);

    constructor() {
    }

    public startSimulation(settings: DFSSettings): void {
        this.supportRequestStream = new Subject<number>();

        this.requestDistribution = this.getDistribution(settings.requestDistribution);
        this.requestTimeDistribution = this.getDistribution(settings.requestTimeDistribution);
        this.processingTimeDistribution = this.getDistribution(settings.processingTimeDistribution);
        this.developCostsDistribution = this.getDistribution(settings.developCostsDistribution);
        this.designCostsDistribution = this.getDistribution(settings.designCostsDistribution);
        this.revisionTimeDistribution = this.getDistribution(settings.revisionTimeDistribution);
        this.responseCustomerDistribution = this.getDistribution(settings.responseCustomerDistribution);

        const isDesignAvailable = settings.departments.includes(DepartmentsType.DESIGNERS);
        const isSupportAvailable = settings.departments.includes(DepartmentsType.SUPPORT)

        // Поток заявок
        this.request$ = serverQuery.select(store => store.state.currentRequest)
            .pipe(
                filter(value => value && serverQuery.status === SimulationStatus.STARTED),
                takeWhile(() => serverQuery.status !== SimulationStatus.INITIAL),

                // Учесть, что в системе уже может быть заявка
                filter(() => !serverQuery.state.isRequestPreparing),
                tap(() => {
                    serverService.updateState(() => {
                        return {
                            isRequestPreparing: true
                        };
                    });

                    if (this.requestDistribution && serverQuery.status === SimulationStatus.STARTED) {
                        // Очистить
                        const timer = setTimeout(() => {
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
                    return this.getDelayStream(this.requestTimeDistribution.getValue(), {
                            requestCount: value,
                            isDesignNeeded: this.percentDistribution.getValue() <= settings.designNeededPercent
                        }
                    );
                })
            );

        // use iif
        if (isDesignAvailable) {
            this.branchingDesignRequestStream = new Subject<{ value: number }>();

            this.designersStream$ = this.manageStream$
                .pipe(
                    switchMap(value => {
                        return merge([
                            this.getDelayStream(this.designCostsDistribution.getValue(), value),
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
                                    // filter(() =>!value.isRevisionNeeded)
                                    first()
                                    // Memory leak check
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
                    return this.getDelayStream(this.developCostsDistribution.getValue(), {
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

        if (isSupportAvailable) {
            this.supportRequest$ = serverQuery.select(store => store.state.finalProjectCount > 0)
                .pipe(
                    skipWhile(value => !value),
                    first(),
                    switchMap(() => {
                        return this.supportRequestStream.asObservable();
                    }),
                    filter(() => serverQuery.status === SimulationStatus.STARTED),
                    takeWhile(() => serverQuery.status !== SimulationStatus.INITIAL),
                );
        }

        // Start stream
        this.upRequestCount();
    }

    public stopSimulation(): void {
        serverService.setStatus(SimulationStatus.INITIAL);
        //this.supportRequestStream.complete();
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
                return null;
            case DFSDistribution.EXPONENTIAL:
                return null;
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
}

export const simulationService = new SimulationService();
