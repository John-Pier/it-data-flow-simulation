import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {DFSManageContainersModule} from "../../components/manage-containers/manage-containers.module";
import {DFSPageBlockModule} from "../../components/page-block/sitting-block.module";
import {DFSSManageComponent} from "./manage.component";

@NgModule({
    imports: [
        MatButtonModule,
        DFSPageBlockModule,
        MatButtonToggleModule,
        DFSManageContainersModule,
        CommonModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    exports: [
        DFSSManageComponent
    ],
    declarations: [
        DFSSManageComponent
    ],
    providers: []
})
export class DFSManageModule {
}
