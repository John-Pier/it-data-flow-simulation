import {Component, HostBinding, Inject, OnInit} from "@angular/core";
import {DFS_CONTACTS_DATA_CONFIG, DFSContactsDataConfig} from "../../app.config";
import {DFSTabsModel} from "../../components/header/model/tabs.type";
import {flashAnimations} from "../../core/core.animations";
import {DFSNavigationService} from "../../services/navigation.service";

@Component({
    selector: "dfs-main-container",
    templateUrl: "main-container.component.html",
    animations: [
        flashAnimations
    ]
})
export class DFSMainContainerComponent implements OnInit {

    public _models: DFSTabsModel[];

    @HostBinding("class.dfs-main-container")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService,
                @Inject(DFS_CONTACTS_DATA_CONFIG) public _contactsDataConfig: DFSContactsDataConfig) {
    }

    public ngOnInit(): void {
        this._models = [
            // {
            //     tabName: "Главная",
            //     route: dfsAppRoutesMap[DFSRoutesString.MAIN],
            // },
            // {
            //     tabName: "Квесты",
            //     route: dfsAppRoutesMap[DFSRoutesString.MAIN],
            // }
        ];

    }

    public _navigateTo(route: string): void {
        this.navigationService.navigateTo(route);
    }
}