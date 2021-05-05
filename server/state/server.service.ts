import {serverQuery, ServerQuery} from "./server.query";
import {serverStore, ServerStore} from "./server.store";

export class ServerService {
    constructor(protected query: ServerQuery,
                protected store: ServerStore) {
    }
}

export const serverService: ServerService = new ServerService(serverQuery, serverStore);
