import {Component, HostBinding} from "@angular/core";

@Component({
    selector: "dfs-block",
    templateUrl: "block.component.html",
})
export class DFSBlockComponent {

    @HostBinding("class.spq-block")
    private hostClass: boolean = true;

    constructor() {

    }
}
