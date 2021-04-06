import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {dfsAppRoutesMap, DFSRoutesString} from "src/app/app-routers";
import {FormGroup} from "@angular/forms";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {UntilDestroy} from "@ngneat/until-destroy";
import {Observable} from "rxjs";
import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";
import {DFSSettingsFormService} from "src/app/modules/settings/services/settings-form.service";
import {DFSHeaderService} from "src/app/services/header.service";

@UntilDestroy()
@Component({
    selector: "dfs-start-page",
    templateUrl: "start-page.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DFSStartPageComponent implements OnInit {

    public _formGroup: FormGroup = this.settingsFormService.getStartPageFormGroup();

    public _formValid$: Observable<boolean>;

    @HostBinding("class.dfs-start-page")
    private hostClass: boolean = true;

    constructor(protected query: DFSSettingsQuery,
                private navigationService: DFSNavigationService,
                private headerService: DFSHeaderService,
                private settingsFormService: DFSSettingsFormService,
                private settingsService: DFSSettingsService) {
    }

    public ngOnInit(): void {
        this.headerService.setLabel("Приветствие");
        this._formValid$ = this.settingsFormService.selectStartPageFormGroupValid(this._formGroup);
    }

    public _onNavigateToNextStepClick(): void {
        this.settingsService.setProjectName(this._formGroup.value.projectName);
        if (this._formGroup.value.configuration) {
            this.settingsService.setFileConfigName(this._formGroup.value.configuration);
            // TODO: Загрузка файла
            this.navigationService.navigateTo(dfsAppRoutesMap[DFSRoutesString.FINAL_SETTINGS]);
        } else {
            this.navigationService.navigateTo(dfsAppRoutesMap[DFSRoutesString.SETTINGS]);
        }
    }
}
