import {AfterViewInit, Component, HostBinding, OnInit, QueryList, TemplateRef, ViewChildren} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {Observable} from "rxjs";
import {DepartmentsConfig, SettingsConfig} from "src/app/modules/settings/state/settings.store";

@Component({
    selector: "dfs-final-settings",
    templateUrl: "final-settings.component.html",
})
export class DFSFinalSettingsComponent implements OnInit {

    public _settingsConfig$: Observable<SettingsConfig> = this.settingsService.selectSettingsConfig();

    public _departmentsConfig$: Observable<DepartmentsConfig> = this.settingsService.selectDepartmentsConfig();

    @HostBinding("class.dfs-final-settings")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService,
                private settingsService: DFSSettingsService) {
    }

    public ngOnInit(): void {
    }

    public _onBackClick(): void {
        this.navigationService.back();
    }

    public _onDepartmentToggle(settingsConfigId: number, checked: boolean) {
        this.settingsService.setDepartmentActive(settingsConfigId, checked);
    }
}
