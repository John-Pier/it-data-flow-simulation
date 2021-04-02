import {Component, HostBinding} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {dfsAppRoutesMap, DFSRoutesString} from "src/app/app-routers";

@Component({
    selector: "dfs-start-page",
    templateUrl: "start-page.component.html",
})
export class DFSStartPageComponent {

    @HostBinding("class.spq-start-page.component.ts")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService) {
    }

    public _onNavigateToNextStepClick(): void {
        this.navigationService.navigateTo(dfsAppRoutesMap[DFSRoutesString.SETTINGS]);
    }
}
