import {Component, HostBinding, OnInit} from "@angular/core";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {Observable} from "rxjs";
import {SettingsConfigItem} from "src/app/modules/settings/state/settings.store";
import {dfsAppRoutesMap, DFSRoutesString} from "src/app/app-routers";
import {enterLeaveAnimation, routerAnimations} from "src/app/core/core.animations";
import {DFSDistributionValue, distributionsValues} from "src/app/core/models/distributions.type";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DFSSettingsFormService} from "src/app/modules/settings/services/settings-form.service";
import {DFSHeaderService} from "src/app/services/header.service";
import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";

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
                private headerService: DFSHeaderService) {
    }

    public ngOnInit(): void {
        this.headerService.setLabel("Симуляция");
    }
}
