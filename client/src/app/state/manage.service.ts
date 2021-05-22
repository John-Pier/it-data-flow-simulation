import {Injectable} from "@angular/core";
import {UpdateStateCallback} from "@datorama/akita";
import {Observable, of} from "rxjs";
import {finalize, tap} from "rxjs/operators";
import {DFSLoaderService} from "../components/loader/services/loader.service";
import {DFSSimulationState} from "../core/models/manage.type";
import {DFSSettings} from "../core/models/settings.type";
import {DataStatus, LoadingState} from "../core/models/state.type";
import {DFSManageDataService} from "../services/data/manage-data.service";
import {DFSManageQuery} from "./manage.query";
import {DFSManageStore, ManageState} from "./manage.store";

@Injectable()
export class DFSManageService {
    constructor(protected store: DFSManageStore,
                protected query: DFSManageQuery,
                public loaderService: DFSLoaderService,
                protected dateService: DFSManageDataService) {
    }

    public asyncInitSimulation(): Observable<any> {
        this.setLoading(DataStatus.LOADING)
        return of(null)
            .pipe(
                tap(value => {
                    this.updateState(state => {
                        return {
                            ...state,
                            simulationState: {
                                ...state.simulationState,
                                state: "run"
                            }
                        }
                    });
                }),
                finalize(() => this.setLoading(DataStatus.LOADED))
            );
    }

    public updateState(updateStateCallback: UpdateStateCallback<ManageState & LoadingState>): void {
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
        });
        this.loaderService.setLoading(loadingStatus === DataStatus.LOADING);
    }

    public generateProjectRequest(): Observable<any>{
        this.setLoading(DataStatus.LOADING);
        return of(null)
            .pipe(
                tap(value => {

                }),
                finalize(() => this.setLoading(DataStatus.LOADED))
            );
    }

    public generateSupportRequest(): Observable<any> {
        this.setLoading(DataStatus.LOADING);
        return of(null)
            .pipe(
                tap(value => {

                }),
                finalize(() => this.setLoading(DataStatus.LOADED))
            );
    }
}
