import {Component, HostBinding, OnInit} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {Observable} from "rxjs";
import {DepartmentsConfigItem, SettingsConfigItem} from "src/app/modules/settings/state/settings.store";
import {dfsAppRoutesMap, DFSRoutesString} from "src/app/app-routers";
import {enterLeaveAnimation, routerAnimations} from "src/app/core/core.animations";

@Component({
    selector: "dfs-settings",
    templateUrl: "settings.component.html",
    animations: [
        routerAnimations,
        enterLeaveAnimation
    ]
})
export class DFSSettingsComponent implements OnInit {

    public _settingsConfig$: Observable<SettingsConfigItem[]> = this.settingsService.selectSettingsConfig();

    public _departmentsConfig$ = this.settingsService.selectDepartmentsConfigWithValues();

    @HostBinding("[@routerAnimations]")
    private animations: boolean = true;

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

    public _trackSettingsConfigById(index: number, value: SettingsConfigItem): string {
        return value.id.toString();
    }
}
