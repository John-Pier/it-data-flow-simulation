import {Injectable} from "@angular/core";
import {DepartmentsConfigItem, DFSSettingsStore, SettingsConfigItem, SettingsState} from "src/app/modules/settings/state/settings.store";
import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";
import {arrayUpdate, UpdateStateCallback} from "@datorama/akita";
import {Observable} from "rxjs";
import {first, map} from "rxjs/operators";

@Injectable()
export class DFSSettingsService {
   constructor(protected store: DFSSettingsStore,
               protected query: DFSSettingsQuery) {
   }

   public updateState(updateStateCallback: UpdateStateCallback<SettingsState>): void {
       this.store.update(updateStateCallback);
   }

   public selectSettingsConfig(): Observable<SettingsConfigItem[]> {
       return this.query.select(store => store.settingsConfig);
   }

    public selectDepartmentsConfigWithValues(): Observable<(DepartmentsConfigItem | {isSelected: boolean; required: boolean})[]> {
        return this.query.select([
            store => store.departmentsConfig,
            store => store.settingsConfig
        ])
            .pipe(
                first(),
                map(([departmentsConfig, settingsConfig]) => {
                    return departmentsConfig.map(value => {
                        const item = settingsConfig.find(item => item.id === value.settingsConfigId);
                        return {
                            ...value,
                            isSelected: item.active,
                            required: !!item.required
                        };
                    });
                })
            );
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

    public setFileConfigName(name: string): void {
        this.updateState(() => {
            return {
                fileConfigName: name
            };
        });
    }
}
