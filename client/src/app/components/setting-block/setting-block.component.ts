import {Component, HostBinding, Input, OnInit} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";

@Component({
  selector: "dfs-setting-block",
  templateUrl: "./setting-block.component.html",
  styleUrls: ["./setting-block.component.less"]
})
export class SettingBlockComponent implements OnInit {

    @Input()
    public title: string = "";

    @HostBinding("class.dfs-setting-block")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService) { }

  ngOnInit() {
  }

}
