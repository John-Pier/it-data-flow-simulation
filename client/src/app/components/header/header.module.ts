import {NgModule} from "@angular/core";
import {DFSHeaderComponent} from "./header.component";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DFSHeaderComponent
    ],
    exports: [
        DFSHeaderComponent
    ],
    providers: []
})
export class DFSHeaderModule {}
