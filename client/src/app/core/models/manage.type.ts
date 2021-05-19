import {DepartmentsType, DFSDepartmentsParams} from "./departments.type";

export type DFSSimulationState = Readonly<{
    modelTime: number,
    timeAcceleration: number,
    departmentsParams: Record<DepartmentsType, DFSDepartmentsParams>
}>;
