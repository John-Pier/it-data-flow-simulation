import {Component, HostBinding, OnInit} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {enterLeaveAnimation, routerAnimations} from "src/app/core/core.animations";
import {UntilDestroy} from "@ngneat/until-destroy";
import {DFSHeaderService} from "src/app/services/header.service";
import {DFSManageService} from "./state/manage.service";

@UntilDestroy()
@Component({
    selector: "dfs-manage",
    templateUrl: "manage.component.html",
    animations: [
        routerAnimations,
        enterLeaveAnimation
    ]
})
export class DFSSManageComponent implements OnInit {

    @HostBinding("[@routerAnimations]")
    private animations: boolean = true;

    @HostBinding("class.dfs-manage")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService,
                private headerService: DFSHeaderService,
                private manageService: DFSManageService) {
    }

    public ngOnInit(): void {
        this.headerService.setLabel("Симуляция");
    }
}
