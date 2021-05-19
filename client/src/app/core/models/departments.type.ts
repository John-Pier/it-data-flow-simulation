export enum DepartmentsType {
    MANAGE = "manage",
    DESIGNERS = "designers",
    DEVELOPERS = "developers",
    SUPPORT = "support"
}

export type DFSDepartmentsParams = Readonly<{
    workersCount?: number,
    employedWorkersCount?: number
}>;
