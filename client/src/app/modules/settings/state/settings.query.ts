import {DFSSettingsStore, SettingsState} from "src/app/modules/settings/state/settings.store";
import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";

@Injectable()
export class DFSSettingsQuery extends Query<SettingsState> {
    constructor(protected store: DFSSettingsStore) {
        super(store);
    }
}
