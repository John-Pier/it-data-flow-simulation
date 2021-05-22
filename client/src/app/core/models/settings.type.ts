import {DepartmentsType} from "./departments.type";
import {DFSDistributionEntity} from "./distributions.type";

export type DFSSettings = Readonly<{
    name: string;
}> &
    DFSDepartmentsSettings &
    DFSRequestSettings &
    DFSManagementSettings &
    Partial<DFSDesignersSettings> &
    DFSDevelopersSettings &
    Partial<DFSSupportSettings>;

export type DFSDepartmentsSettings = Readonly<{
    departments: DepartmentsType[];
}>;

export type DFSRequestSettings = Readonly<{
    requestDistribution: DFSDistributionEntity;
    responseCustomerDistribution: DFSDistributionEntity;
    requestManualControl: boolean;
}>;

export type DFSManagementSettings = Readonly<{
    processingTimeDistribution: DFSDistributionEntity;
    designNeededPercent: number;
}>;

export type DFSDesignersSettings = Readonly<{
    designerWorkersCount: number;
    designCostsDistribution: DFSDistributionEntity;
    revisionTimeDistribution: DFSDistributionEntity;
    revisionProbability: number;
}>;

export type DFSDevelopersSettings = Readonly<{
    developerWorkersCount: number;
    developCostsDistribution: DFSDistributionEntity;
}>;

export type DFSSupportSettings = Readonly<{
    supportWorkersCount: number;
    supportProcessingTimeDistribution: DFSDistributionEntity;
    requestTimeDistribution: DFSDistributionEntity;
    supportManualControl: boolean;
}>;
