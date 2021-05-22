import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatOptionModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {DFSDetermineComponent} from "./distributions/determine.component";
import {DFSExponentialComponent} from "./distributions/exponential.component";
import {DFSNormalComponent} from "./distributions/normal.component";
import {DFSUniformComponent} from "./distributions/uniform.component";
import {DFSSManageComponent} from "./generate-request/generate-request.component";

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
        DFSUniformComponent,
        DFSSManageComponent
    ],
    exports: [
        DFSExponentialComponent,
        DFSDetermineComponent,
        DFSNormalComponent,
        DFSUniformComponent,
        DFSSManageComponent
    ]
})
export class DFSPopoversModule {
}
