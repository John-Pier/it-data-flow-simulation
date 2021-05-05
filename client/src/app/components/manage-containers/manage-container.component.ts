import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {DFSNavigationService} from "../../services/navigation.service";

@Component({
  selector: "dfs-manage-containers",
  templateUrl: "./manage-containers.component.html",
  styleUrls: ["./manage-containers.component.less"]
})
export class DFSManageContainersComponent implements OnInit {

    @Input()
    public title: string = "";

    @HostBinding("class.dfs-manage-containers")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService) { }

  ngOnInit() {
  }

}
