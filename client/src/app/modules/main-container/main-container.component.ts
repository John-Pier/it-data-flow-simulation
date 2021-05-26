import {Component, HostBinding, Inject, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DFS_CONTACTS_DATA_CONFIG, DFSContactsDataConfig} from "../../app.config";
import {DFSTabsModel} from "../../components/header/model/tabs.type";
import {DFSHelpComponent} from "../../components/popowers/help-page/help.component";
import {flashAnimations} from "../../core/core.animations";
import {DFSNavigationService} from "../../services/navigation.service";
import {DFSHeaderService} from "src/app/services/header.service";

@Component({
    selector: "dfs-main-container",
    templateUrl: "main-container.component.html",
    animations: [
        flashAnimations
    ]
})
export class DFSMainContainerComponent implements OnInit {

    public label$ = this.headerService.selectLabel();

    public _models: DFSTabsModel[];

    @HostBinding("class.dfs-main-container")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService,
                private headerService: DFSHeaderService,
                public dialog: MatDialog,
                @Inject(DFS_CONTACTS_DATA_CONFIG) public _contactsDataConfig: DFSContactsDataConfig) {
    }

    public ngOnInit(): void {
        this._models = [];
    }

    public _navigateTo(route: string): void {
        this.navigationService.navigateTo(route);
    }

    public _onLogoClick(): void {
        this.navigationService.navigateToDefault();
    }

    public _onOpenHelpPageClick(): void {
        this.dialog.open(DFSHelpComponent, {
            width: "1200px"
        })
    }
}
