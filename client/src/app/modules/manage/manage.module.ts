import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {DFSManageContainersModule} from "../../components/manage-containers/manage-containers.module";
import {DFSPageBlockModule} from "../../components/page-block/sitting-block.module";
import {DFSSManageComponent} from "./manage.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
    imports: [
        MatButtonModule,
        DFSPageBlockModule,
        MatButtonToggleModule,
        DFSManageContainersModule,
        CommonModule,
        MatDialogModule
    ],
    exports: [
        DFSSManageComponent
    ],
    declarations:[
        DFSSManageComponent
    ],
    providers: [
    ]
})
export class DFSManageModule {
}
