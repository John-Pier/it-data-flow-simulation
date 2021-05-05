import {Query} from "@datorama/akita";
import {ServerState} from "./server.state";
import {serverStore, ServerStore} from "./server.store";

export class ServerQuery extends Query<ServerState>{
    constructor(protected store: ServerStore) {
        super(store)
    }
}

export const serverQuery: ServerQuery = new ServerQuery(serverStore);
