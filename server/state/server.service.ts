import {UpdateStateCallback} from "@datorama/akita";
import {DFSSettings} from "../../client/src/app/core/models/settings.type";
import {serverQuery, ServerQuery} from "./server.query";
import {SimulationState, SimulationStatus} from "./server.state";
import {serverStore, ServerStore} from "./server.store";

export class ServerService {
    constructor(protected query: ServerQuery,
                protected store: ServerStore) {
    }

    public setupSettings(settings: DFSSettings): void {
        this.store.update(() => {
            return {
                currentSettings: settings,
                simulationStatus: SimulationStatus.STARTED
            }
        });
    }

    public setStatus(status: SimulationStatus): void {
        this.store.update(() => {
            return {
                simulationStatus: status
            }
        });
    }

    public updateState(updateStateCallback: UpdateStateCallback<SimulationState>): void {
        this.store.update(store => {
            return {
                state: {
                    ...store.state,
                    ...updateStateCallback(store.state)
                }
            };
        });
    }
}

export const serverService: ServerService = new ServerService(serverQuery, serverStore);
