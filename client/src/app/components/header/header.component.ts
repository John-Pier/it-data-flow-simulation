import {ChangeDetectionStrategy, Component, HostBinding, Input, TemplateRef} from "@angular/core";
import {DFSTabsModel} from "./model/tabs.type";

@Component({
    selector: "dfs-header",
    templateUrl: "header.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DFSHeaderComponent {

    @Input()
    public logoTemplate: TemplateRef<any>;

    @Input()
    public headerTemplate: TemplateRef<any>;

    @Input()
    public logoLabel: string;

    @Input()
    public models: DFSTabsModel[];

    @Input()
    public tabTemplate: TemplateRef<any>;

    @Input()
    public rightBarTemplate: TemplateRef<any>;

    @HostBinding("class.dfs-header")
    private hostClass: boolean = true;
}
