import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {DFSManageStore, ManageState} from "./manage.store";

@Injectable()
export class DFSManageQuery extends Query<ManageState> {
    constructor(protected store: DFSManageStore) {
        super(store);
    }
}
