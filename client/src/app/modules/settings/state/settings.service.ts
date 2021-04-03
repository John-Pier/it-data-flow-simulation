import {Injectable} from "@angular/core";
import {DepartmentsConfig, DFSSettingsStore, SettingsConfig, SettingsState} from "src/app/modules/settings/state/settings.store";
import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";
import {arrayUpdate, UpdateStateCallback} from "@datorama/akita";
import {Observable} from "rxjs";

@Injectable()
export class DFSSettingsService {
   constructor(protected store: DFSSettingsStore,
               protected query: DFSSettingsQuery) {
   }

   public updateState(updateStateCallback: UpdateStateCallback<SettingsState>): void {
       this.store.update(updateStateCallback);
   }

   public selectSettingsConfig(): Observable<SettingsConfig> {
       return this.query.select(store => store.settingsConfig);
   }

    public selectDepartmentsConfig(): Observable<DepartmentsConfig> {
        return this.query.select(store => store.departmentsConfig);
    }

    public setDepartmentActive(settingsConfigId: number, isActive: boolean): void {
       this.updateState(state => {
           return {
               settingsConfig: arrayUpdate(state.settingsConfig, settingsConfigId, {active: isActive})
           };
       });
    }

    public setProjectName(name: string): void {
        this.updateState(() => {
            return {
                projectName: name
            };
        });
    }
}
