import {Component, HostBinding, Input, OnInit, TemplateRef} from "@angular/core";
import {DFSNavigationService} from "../../services/navigation.service";

@Component({
    selector: "dfs-page-block",
    templateUrl: "./page-block.component.html",
    styleUrls: ["./page-block.component.less"]
})
export class DFSPageBlockComponent implements OnInit {

    @Input()
    public title: string = "";

    @Input()
    public rightTemplate: TemplateRef<any>;

    @HostBinding("class.dfs-page-block")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService) {
    }

    public ngOnInit(): void {
    }
}
