import {ScrollingModule} from "@angular/cdk/scrolling";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {DFSHelpComponent} from "./help.component";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        ScrollingModule
    ],
    declarations:[
        DFSHelpComponent,
    ],
    exports: [
        DFSHelpComponent
    ]
})
export class DFSHelpModule {
}
