import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {DFSManageContainersModule} from "../../components/manage-containers/manage-containers.module";
import {DFSPageBlockModule} from "../../components/page-block/sitting-block.module";
import {DFSManageDataService} from "../../services/data/manage-data.service";
import {DFSSManageComponent} from "./manage.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {DFSManageQuery} from "./state/manage.query";
import {DFSManageService} from "./state/manage.service";
import {DFSManageStore} from "./state/manage.store";

@NgModule({
    imports: [
        MatButtonModule,
        DFSPageBlockModule,
        MatButtonToggleModule,
        DFSManageContainersModule
    ],
    exports: [
        DFSSManageComponent
    ],
    declarations:[
        DFSSManageComponent
    ],
    providers: [
        DFSManageDataService,
        DFSManageStore,
        DFSManageQuery,
        DFSManageService,
    ]
})
export class DFSManageModule {
}
