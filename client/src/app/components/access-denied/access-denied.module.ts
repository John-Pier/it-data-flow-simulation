import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DFSAccessDeniedComponent} from "./access-denied.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DFSAccessDeniedComponent
    ],
    exports: [
        DFSAccessDeniedComponent
    ],
    providers: []
})
export class DFSAccessDeniedModule {}
