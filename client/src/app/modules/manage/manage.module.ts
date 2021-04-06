import {NgModule} from "@angular/core";
import {DFSSManageComponent} from "src/app/modules/manage/manage.component";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        MatButtonModule

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
