import {DepartmentsType, DFSDepartmentsParams} from "./departments.type";

export type DFSSimulationState = {
    modelTime: number,
    timeAcceleration: number,
    departmentsParams: Record<DepartmentsType, DFSDepartmentsParams>
}
