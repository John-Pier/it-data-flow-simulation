import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatOptionModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {DFSPageBlockModule} from "../page-block/sitting-block.module";
import {DFSDetermineComponent} from "./distributions/determine.component";
import {DFSExponentialComponent} from "./distributions/exponential.component";
import {DFSNormalComponent} from "./distributions/normal.component";
import {DFSUniformComponent} from "./distributions/uniform.component";

@NgModule({
    imports:[
        CommonModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule
    ],
    declarations: [
        DFSExponentialComponent,
        DFSDetermineComponent,
        DFSNormalComponent,
        DFSUniformComponent
    ],
    exports: [
        DFSExponentialComponent,
        DFSDetermineComponent,
        DFSNormalComponent,
        DFSUniformComponent
    ]
})
export class DFSDistributionsPopoversModule {
}
