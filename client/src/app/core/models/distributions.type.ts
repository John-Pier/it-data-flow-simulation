export type DFSDistributionEntity = DFSDeterminedDistributionParams |
    DFSExponentialDistributionParams |
    DFSNormalDistributionParams |
    DFSUniformDistributionParams | null;

export type DFSDeterminedDistributionParams = Readonly<{
    type: DFSDistribution.DETERMINISTIC
    value: number;
}>;

export type DFSExponentialDistributionParams = Readonly<{
    type: DFSDistribution.EXPONENTIAL
    value: number;
}>;

export type DFSNormalDistributionParams = Readonly<{
    type: DFSDistribution.NORMAL
    value: number;
    variance: number;
}>;

export type DFSUniformDistributionParams = Readonly<{
    type: DFSDistribution.UNIFORM
    min: number;
    max: number;
}>;

export enum DFSDistribution {
    DETERMINISTIC = "deterministic",
    NORMAL = "normal",
    EXPONENTIAL = "exponential",
    UNIFORM = "uniform"
}

export type DFSDistributionValue = {
    type: DFSDistribution,
    value: string
}

export const distributionsValues: DFSDistributionValue[] = [
    {
        type: DFSDistribution.DETERMINISTIC,
        value: "Детерминированный"
    },
    {
        type: DFSDistribution.EXPONENTIAL,
        value: "Экспоненциальный"
    },
    {
        type: DFSDistribution.NORMAL,
        value: "Нормальный"
    },
    {
        type: DFSDistribution.UNIFORM,
        value: "Равномерный"
    },
]
