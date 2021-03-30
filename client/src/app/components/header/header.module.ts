import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DFSHeaderComponent} from "./header.component";

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
