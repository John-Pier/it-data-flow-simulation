import {iif, Observable, of, Subject} from "rxjs";
import {delay, skipWhile, switchMap, takeWhile, tap} from "rxjs/operators";
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

    private requestStream: Subject<number>;
    private supportRequestStream: Subject<number>;

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
        this.requestStream = new Subject<number>();
        this.supportRequestStream = new Subject<number>();

        this.requestDistribution = this.getDistribution(settings.requestDistribution);
        this.requestTimeDistribution = this.getDistribution(settings.requestTimeDistribution);
        this.processingTimeDistribution = this.getDistribution(settings.processingTimeDistribution);
        this.developCostsDistribution = this.getDistribution(settings.developCostsDistribution);
        this.designCostsDistribution = this.getDistribution(settings.designCostsDistribution);
        this.revisionTimeDistribution = this.getDistribution(settings.revisionTimeDistribution);
        this.responseCustomerDistribution = this.getDistribution(settings.responseCustomerDistribution);

        const isDesignAvailable = settings.departments.includes(DepartmentsType.DESIGNERS);

        // Поток заявок
        this.request$ = this.requestStream.asObservable()
            .pipe(
                // Учесть, что в системе уже может быть заявка
                skipWhile(() => serverQuery.state.isRequestPreparing),
                tap(() => {
                    serverService.updateState(() => {
                        return {
                            isRequestPreparing: true
                        };
                    });

                    if (this.requestDistribution && serverQuery.status === SimulationStatus.STARTED) {
                        // Очистить
                        const timer = setTimeout(() => {
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

        if(isDesignAvailable) {
            this.designersStream$ = this.manageStream$
                .pipe(
                    switchMap(value => {
                        return this.getDelayStream(this.designCostsDistribution.getValue(), value);
                    }),
                    switchMap(value => {
                        return this.getDelayStream(this.responseCustomerDistribution.getValue(), {
                            ...value,
                            isRevisionNeeded: this.percentDistribution.getValue() < settings.revisionProbability
                        });
                    }),
                );

            this.designersStream$
                .pipe(
                    switchMap(value => {
                        return iif(
                            () => value.isRevisionNeeded,
                            of(value)
                                .pipe(
                                    switchMap(value => {
                                        return this.getDelayStream(this.revisionTimeDistribution.getValue(), value);
                                    }),
                                ),
                            of(value),
                        )
                    })
                )
        }

        // Поток отдела разработки
        this.developersStream$ = (
            isDesignAvailable
                ? this.designersStream$
                : this.manageStream$
        )
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

        this.supportRequest$ =
            settings.departments.includes(DepartmentsType.SUPPORT) &&
            this.supportRequestStream.asObservable()
                .pipe();

        serverQuery.select(store => store.state.currentRequest)
            .pipe(
                takeWhile(() => serverQuery.status === SimulationStatus.STARTED)
            )
            .subscribe(value => this.requestStream.next(value));

        // Start stream
        this.requestStream.next(serverQuery.state.currentRequest);
    }

    public stopSimulation(): void {
        this.requestStream.complete();
        this.supportRequestStream.complete();
    }

    public pauseSimulation(): void {

    }

    public resumeSimulation(): void {

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

    // private startNumberTimer(stream: Subject<any>, value: number, distribution: AbstractDistribution): NodeJS.Timeout {
    //     return setTimeout(() => {
    //         if (serverQuery.status === SimulationStatus.STARTED) {
    //             stream.next(value);
    //             this.startNumberTimer(stream, ++value, distribution);
    //         }
    //     }, distribution.getValue());
    // }

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
