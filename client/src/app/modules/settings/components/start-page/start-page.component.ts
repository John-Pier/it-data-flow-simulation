import {Component, HostBinding} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {dfsAppRoutesMap, DFSRoutesString} from "src/app/app-routers";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: "dfs-start-page",
    templateUrl: "start-page.component.html",
})
export class DFSStartPageComponent {

    public _formGroup: FormGroup;

    @HostBinding("class.dfs-start-page")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService) {
        this._formGroup = new FormGroup({
            projectName: new FormControl("", [Validators.required]),
            configuration: new FormControl(null)
        });
    }

    public _onNavigateToNextStepClick(): void {
        this.navigationService.navigateTo(dfsAppRoutesMap[DFSRoutesString.SETTINGS]);
    }
}
