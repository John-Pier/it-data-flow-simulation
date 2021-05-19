import {Injectable} from "@angular/core";
import {UpdateStateCallback} from "@datorama/akita";
import {Observable} from "rxjs";
import {DFSSimulationState} from "../../../core/models/manage.type";
import {DFSSettings} from "../../../core/models/settings.type";
import {DataStatus} from "../../../core/models/state.type";
import {DFSManageDataService} from "../../../services/data/manage-data.service";
import {DFSManageQuery} from "./manage.query";
import {DFSManageStore, ManageState} from "./manage.store";

@Injectable()
export class DFSSettingsService {
    constructor(protected store: DFSManageStore,
                protected query: DFSManageQuery,
                protected dateService: DFSManageDataService) {
    }

    public updateState(updateStateCallback: UpdateStateCallback<ManageState>): void {
        this.store.update(updateStateCallback);
    }

    public selectSettings(): Observable<DFSSettings> {
        return this.query.select(store => store.settings);
    }

    public selectSimulationState(): Observable<DFSSimulationState> {
        return this.query.select(store => store.simulationState);
    }

    public setLoading(loadingStatus: DataStatus): void {
        this.store.update(() => {
            return {
                loading: loadingStatus
            }
        })
    }
}
