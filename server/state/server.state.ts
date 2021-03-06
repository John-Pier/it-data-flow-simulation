import {DFSSettings} from "../../client/src/app/core/models/settings.type";

export type ServerState = Readonly<{
    currentSettings: DFSSettings;
    simulationStatus: SimulationStatus
    state: SimulationState,
}>;

export type SimulationState = Readonly<{
    isRequestPreparing: boolean;
    modelTimeInMinutes: number;
    currentRequest: number;
    finalProjectCount: number;
    supportedRequestCount: number;
}>;

export enum SimulationStatus {
    INITIAL,
    STARTED,
    PAUSED,
}

export function createInitialState(): ServerState {
    return {
        simulationStatus: SimulationStatus.INITIAL,
        state: {
            isRequestPreparing: false,
            currentRequest: 0,
            finalProjectCount: 0,
            modelTimeInMinutes: 0,
            supportedRequestCount: 0
        },
        currentSettings: null
    };
}
