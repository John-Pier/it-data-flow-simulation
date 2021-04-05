
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

export const distributionsValues: DFSDistributionValue[]  = [
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
