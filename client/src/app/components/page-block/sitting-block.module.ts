import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DFSPageBlockComponent} from "./page-block.component";

@NgModule({
    exports: [
        DFSPageBlockComponent
    ],
    imports: [
        CommonModule
    ],
    declarations: [
        DFSPageBlockComponent
    ]
})
export class DFSPageBlockModule {
}
