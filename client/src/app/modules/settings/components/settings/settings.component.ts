import {Component, HostBinding, OnInit} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {Observable} from "rxjs";
import {SettingsConfigItem} from "src/app/modules/settings/state/settings.store";
import {dfsAppRoutesMap, DFSRoutesString} from "src/app/app-routers";
import {enterLeaveAnimation, routerAnimations} from "src/app/core/core.animations";
import {DFSDistributionValue, distributionsValues} from "src/app/core/models/distributions.type";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DFSSettingsFormService} from "src/app/modules/settings/services/settings-form.service";
import {DFSHeaderService} from "src/app/services/header.service";
import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";

@UntilDestroy()
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

    public _settingsFormGroups = this.settingsFormService.getSettingsFormGroups();

    public _distributionsValues = distributionsValues;

    @HostBinding("[@routerAnimations]")
    private animations: boolean = true;

    @HostBinding("class.dfs-settings")
    private hostClass: boolean = true;

    constructor(protected query: DFSSettingsQuery,
                private navigationService: DFSNavigationService,
                private settingsFormService: DFSSettingsFormService,
                private headerService: DFSHeaderService,
                private settingsService: DFSSettingsService) {
    }

    public ngOnInit(): void {
        this.headerService.setLabel(this.query.getValue().projectName || "Настройка");
        this.settingsFormService.subscribeSettingsFormGroupsValues(this._settingsFormGroups)
            .pipe(
                untilDestroyed(this)
            )
            .subscribe();
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

    public _trackValuesById(index: number, value: DFSDistributionValue): string {
        return value.value;
    }
}
