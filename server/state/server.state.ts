export type ServerState = Readonly<{
    currentSettings: any;
    simulationStatus: SimulationStatus
    state: SimulationState,
}>;

export type SimulationState = Readonly<{}>;

export enum SimulationStatus {
    INITIAL,
    STARTED,
    PAUSED
}

export function createInitialState(): ServerState {
    return {
        simulationStatus: SimulationStatus.INITIAL,
        state: null,
        currentSettings: null
    };
}
