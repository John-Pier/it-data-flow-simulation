import {Component, HostBinding, OnInit} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {Observable} from "rxjs";
import {DepartmentsConfig, SettingsConfig} from "src/app/modules/settings/state/settings.store";
import {dfsAppRoutesMap, DFSRoutesString} from "src/app/app-routers";

@Component({
    selector: "dfs-settings",
    templateUrl: "settings.component.html",
})
export class DFSSettingsComponent implements OnInit {

    public _settingsConfig$: Observable<SettingsConfig> = this.settingsService.selectSettingsConfig();

    public _departmentsConfig$: Observable<DepartmentsConfig> = this.settingsService.selectDepartmentsConfig();

    @HostBinding("class.dfs-settings")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService,
                private settingsService: DFSSettingsService) {
    }

    public ngOnInit(): void {
    }

    public _onDepartmentToggle(settingsConfigId: number, checked: boolean) {
        this.settingsService.setDepartmentActive(settingsConfigId, checked);
    }

    public _onNextClick(): void {
        this.navigationService.navigateTo(dfsAppRoutesMap[DFSRoutesString.FINAL_SETTINGS]);
    }

    public _onBackClick(): void {
        this.navigationService.back();
    }
}
