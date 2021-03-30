import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output} from "@angular/core";
import {DFSNavigationService} from "../../services/navigation.service";

@Component({
    selector: "dfs-page-header",
    templateUrl: "page-header.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DFSPageHeaderComponent {

    @Input()
    public pageTitle: string;

    @Output()
    public onBackClick: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding("class.dfs-page-header")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService) {}

    public _onBackClick(): void {
        this.navigationService.back();
        this.onBackClick.emit();
    }
}
