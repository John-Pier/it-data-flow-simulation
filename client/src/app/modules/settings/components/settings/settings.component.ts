import {Component, HostBinding} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";

@Component({
    selector: "dfs-settings",
    templateUrl: "settings.component.html",
})
export class DFSSettingsComponent {

    @HostBinding("class.spq-start-page.component.ts")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService) {
    }

    public _onBackClick(): void {
        this.navigationService.back();
    }
}
