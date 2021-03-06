import {NgModule} from "@angular/core";
import {DFSManageBlockComponent} from "./components/manage-block.component";
import {DFSManageContainersComponent} from "./manage-container.component";

@NgModule({
    exports: [
        DFSManageContainersComponent,
        DFSManageBlockComponent
    ],
    declarations: [
        DFSManageContainersComponent,
        DFSManageBlockComponent
    ]
})
export class DFSManageContainersModule {
}
