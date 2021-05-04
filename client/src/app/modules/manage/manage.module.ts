import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {DFSPageBlockModule} from "../../components/page-block/sitting-block.module";
import {DFSSManageComponent} from "./manage.component";

@NgModule({
    imports: [
        MatButtonModule,
        DFSPageBlockModule
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
