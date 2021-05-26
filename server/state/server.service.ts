import {DFSSettings} from "../../client/src/app/core/models/settings.type";
import {serverQuery, ServerQuery} from "./server.query";
import {SimulationStatus} from "./server.state";
import {serverStore, ServerStore} from "./server.store";

export class ServerService {
    constructor(protected query: ServerQuery,
                protected store: ServerStore) {
    }

    public setupSettings(settings: DFSSettings): void {
        this.store.update(() => {
            return {
                currentSettings: settings,
                state: SimulationStatus.STARTED
            }
        });
    }

    public setStatus(status: SimulationStatus): void {
        this.store.update(() => {
            return {
                state: status
            }
        });
    }
}

export const serverService: ServerService = new ServerService(serverQuery, serverStore);
