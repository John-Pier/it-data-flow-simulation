import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DFSPageHeaderComponent} from "./page-header.component";
import {MatButtonModule} from "@angular/material/button";

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
