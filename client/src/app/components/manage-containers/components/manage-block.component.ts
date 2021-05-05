import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {DFSNavigationService} from "../../../services/navigation.service";

@Component({
  selector: "dfs-manage-block",
  templateUrl: "./manage-block.component.html",
  styleUrls: ["./manage-block.component.less"]
})
export class DFSManageBlockComponent implements OnInit {

    @Input()
    public title: string = "";

    @HostBinding("class.dfs-manage-block")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService) { }

  ngOnInit() {
  }

}
