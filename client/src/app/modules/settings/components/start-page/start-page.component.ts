import {Component, HostBinding, OnInit} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {dfsAppRoutesMap, DFSRoutesString} from "src/app/app-routers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {UntilDestroy} from "@ngneat/until-destroy";
import {map, startWith, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";

@UntilDestroy()
@Component({
    selector: "dfs-start-page",
    templateUrl: "start-page.component.html",
})
export class DFSStartPageComponent implements OnInit {

    public _formGroup: FormGroup;

    public _formValid$: Observable<boolean>;

    @HostBinding("class.dfs-start-page")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService,
                protected query: DFSSettingsQuery,
                private settingsService: DFSSettingsService) {
        this._formGroup = new FormGroup({
            projectName: new FormControl(this.query.getValue().projectName, [Validators.required, Validators.minLength(3)]),
            configuration: new FormControl(this.query.getValue().fileConfigName)
        });
    }

    public ngOnInit(): void {
       this._formValid$ =  this._formGroup.valueChanges
           .pipe(
               startWith(this._formGroup.valid),
               map(value => value && this._formGroup.valid)
           );
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
