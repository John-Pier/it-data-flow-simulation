import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {DepartmentsType} from "../../client/src/app/core/models/departments.type";
import {DFSDistribution, DFSDistributionEntity} from "../../client/src/app/core/models/distributions.type";
import {DFSSettings} from "../../client/src/app/core/models/settings.type";
import {serverQuery} from "../state/server.query";
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

    private requestStream: Subject<any> = new Subject<any>();
    private supportRequestStream = new Subject<any>();

    private processingTimeDistribution: AbstractDistribution;
    private requestTimeDistribution: AbstractDistribution;
    private requestDistribution: AbstractDistribution;

    constructor() {
    }

    public startSimulation(settings: DFSSettings): void {
        this.requestDistribution = this.getDistribution(settings.requestDistribution);
        this.requestTimeDistribution = this.getDistribution(settings.requestTimeDistribution);
        this.processingTimeDistribution = this.getDistribution(settings.processingTimeDistribution);

        this.request$ = this.requestStream.asObservable()
            .pipe(
                map(() => {
                    return this.processingTimeDistribution.getValue();
                })
            );

        this.supportRequest$ =
            settings.departments.includes(DepartmentsType.SUPPORT) &&
            this.supportRequestStream.asObservable()
                .pipe();

        this.startNumberTimer(this.requestStream, 1, this.requestDistribution);
        this.startNumberTimer(this.supportRequestStream, 1, this.requestTimeDistribution);
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
        this.requestStream.next()
    }

    public generateSupportRequest(): void {

    }

    private startNumberTimer(stream: Subject<any>, value: number, distribution: AbstractDistribution): NodeJS.Timeout {
        return setTimeout(() => {
            if (serverQuery.status === SimulationStatus.STARTED) {
                stream.next(value);
                this.startNumberTimer(stream, ++value, distribution);
            }
        }, distribution.getValue());
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
            case null: return null;
            case DFSDistribution.DETERMINISTIC:
            default:
                return new DetermineDistribution(
                    distributionEntity.value || defaultSimulationParams.distribution[DFSDistribution.DETERMINISTIC]
                );
        }
    }
}

export const simulationService = new SimulationService();
