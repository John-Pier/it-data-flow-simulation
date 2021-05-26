import {Query} from "@datorama/akita";
import {DFSSettings} from "../../client/src/app/core/models/settings.type";
import {ServerState, SimulationState} from "./server.state";
import {serverStore, ServerStore} from "./server.store";

export class ServerQuery extends Query<ServerState>{
    constructor(protected store: ServerStore) {
        super(store)
    }

    get settings(): DFSSettings {
        return this.getValue().currentSettings;
    }

    get status(): SimulationState {
        return this.getValue().simulationStatus;
    }
}

export const serverQuery: ServerQuery = new ServerQuery(serverStore);
