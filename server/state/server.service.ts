import {serverQuery, ServerQuery} from "./server.query";
import {SettingsState, SimulationStatus} from "./server.state";
import {serverStore, ServerStore} from "./server.store";

export class ServerService {
    constructor(protected query: ServerQuery,
                protected store: ServerStore) {
    }

    public setupSettings(settings: SettingsState): void {
        this.store.update(state => {
            return {
                currentSettings: settings,
                state: SimulationStatus.STARTED
            }
        })
    }
}

export const serverService: ServerService = new ServerService(serverQuery, serverStore);
