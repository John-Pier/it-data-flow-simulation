import {ChangeDetectionStrategy, Component, HostBinding, OnDestroy} from "@angular/core";
import {flashAnimations} from "../../core/core.animations";
import {DFSLoaderService} from "./services/loader.service";

@Component({
    selector: "dfs-loader",
    templateUrl: "loader.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        flashAnimations
    ]
})
export class DFSLoaderComponent implements OnDestroy {

    @HostBinding("class.dfs-loader")
    private hostClass: boolean = true;

    constructor(public loaderService: DFSLoaderService) {}

    public ngOnDestroy(): void {
        this.loaderService._complete();
    }
}
