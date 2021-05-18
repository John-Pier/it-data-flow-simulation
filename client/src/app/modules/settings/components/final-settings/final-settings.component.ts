import {Component, HostBinding, OnInit} from "@angular/core";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {Observable} from "rxjs";
import {SettingsConfigItem} from "src/app/modules/settings/state/settings.store";
import {DFSDistributionValue, distributionsValues} from "src/app/core/models/distributions.type";
import {DFSSettingsFormService} from "src/app/modules/settings/services/settings-form.service";
import {dfsAppRoutesMap, DFSRoutesString} from "src/app/app-routers";
import {enterLeaveAnimation} from "src/app/core/core.animations";
import {DFSHeaderService} from "src/app/services/header.service";
import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";

@UntilDestroy()
@Component({
    selector: "dfs-final-settings",
    templateUrl: "final-settings.component.html",
    animations: [
        enterLeaveAnimation
    ]
})
export class DFSFinalSettingsComponent implements OnInit {

    public _settingsConfig$: Observable<SettingsConfigItem[]> = this.settingsService.selectSettingsConfig();

    public _departmentsConfig$ = this.settingsService.selectDepartmentsConfigWithValues();

    public _settingsFormGroups = this.settingsFormService.getSettingsFormGroups();

    public _distributionsValues = distributionsValues;

    @HostBinding("class.dfs-settings")
    private hostClass: boolean = true;

    constructor(protected query: DFSSettingsQuery,
                private navigationService: DFSNavigationService,
                private settingsFormService: DFSSettingsFormService,
                private headerService: DFSHeaderService,
                private settingsService: DFSSettingsService) {
    }

    public ngOnInit(): void {
        this.headerService.setLabel((this.query.getValue().projectName || "[Настройка]") + ` > [Итоговые настройки]`);
    }

    public _onNextClick(): void {
        this.navigationService.navigateTo(dfsAppRoutesMap[DFSRoutesString.MANAGE_PAGE]);
        this.settingsService.startSimulation()
            .pipe(
                untilDestroyed(this)
            )
            .subscribe(() => {
                this.navigationService.navigateTo(dfsAppRoutesMap[DFSRoutesString.MANAGE_PAGE]);
            });
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
