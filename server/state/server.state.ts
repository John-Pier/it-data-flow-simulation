export type ServerState = Readonly<{
    currentSettings: SettingsState;
    simulationStatus: SimulationStatus
    state: SimulationState,
}>;

export type SettingsState = Readonly<{
    departments: string[],
}>;

export type SimulationState = Readonly<{}>;

export enum SimulationStatus {
    INITIAL,
    STARTED,
    PAUSED,
}

export function createInitialState(): ServerState {
    return {
        simulationStatus: SimulationStatus.INITIAL,
        state: null,
        currentSettings: null
    };
}
