import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core";

@Component({
    selector: "dfs-help",
    templateUrl: "./help.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DFSHelpComponent {

    @HostBinding("class.dfs-help")
    private hostClass: boolean = true;

    constructor() {
    }
}
