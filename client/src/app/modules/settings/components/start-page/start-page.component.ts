import {Component, HostBinding, OnInit} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {dfsAppRoutesMap, DFSRoutesString} from "src/app/app-routers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {UntilDestroy} from "@ngneat/until-destroy";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

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
                private settingsService: DFSSettingsService) {
        this._formGroup = new FormGroup({
            projectName: new FormControl("", [Validators.required, Validators.minLength(3)]),
            configuration: new FormControl(null)
        });
    }

    public ngOnInit(): void {
       this._formValid$ =  this._formGroup.statusChanges
           .pipe(
               map(value => value === "VALID")
           );
    }

    public _onNavigateToNextStepClick(): void {
        this.settingsService.setProjectName(this._formGroup.value.projectName);
        if (this._formGroup.value.configuration) {
            console.log(this._formGroup.value);
            //TODO: Загрузка файла
            this.navigationService.navigateTo(dfsAppRoutesMap[DFSRoutesString.FINAL_SETTINGS]);
        } else {
            this.navigationService.navigateTo(dfsAppRoutesMap[DFSRoutesString.SETTINGS]);
        }
    }
}
