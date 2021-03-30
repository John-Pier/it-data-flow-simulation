import {Component, HostBinding} from "@angular/core";

@Component({
    selector: "dfs-not-found",
    templateUrl: "not-found.component.html",
})
export class DFSNotFoundComponent {

    @HostBinding("class.dfs-not-found")
    private hostClass: boolean = true;

    constructor() {
    }
}
