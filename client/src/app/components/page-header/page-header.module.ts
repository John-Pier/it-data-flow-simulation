import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material";
import {DFSPageHeaderComponent} from "./page-header.component";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule
    ],
    declarations: [
        DFSPageHeaderComponent
    ],
    exports: [
        DFSPageHeaderComponent
    ],
    providers: []
})
export class DFSPageHeaderModule {}
