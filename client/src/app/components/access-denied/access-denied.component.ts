import {Component, HostBinding} from "@angular/core";

@Component({
    selector: "dfs-access-denied",
    templateUrl: "access-denied.component.html",
})
export class DFSAccessDeniedComponent {

    @HostBinding("class.dfs-access-denied")
    private hostClass: boolean = true;

    constructor() {
    }
}
