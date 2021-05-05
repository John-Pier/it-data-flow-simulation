import {Store, StoreConfig} from "@datorama/akita";
import {createInitialState, ServerState} from "./server.state";

@StoreConfig({ name: "serverState" })
export class ServerStore extends Store<ServerState> {
    constructor() {
        super(createInitialState());
    }
}

export const serverStore: ServerStore = new ServerStore();
