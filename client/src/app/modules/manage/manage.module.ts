import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {DFSPageBlockModule} from "../../components/page-block/sitting-block.module";
import {DFSSManageComponent} from "./manage.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
    imports: [
        MatButtonModule,
        DFSPageBlockModule,
        MatButtonToggleModule
    ],
    exports: [
        DFSSManageComponent
    ],
    declarations:[
        DFSSManageComponent
    ]
})
export class DFSManageModule {
}
