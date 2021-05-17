import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {DFSDetermineComponent} from "./distributions/determine.component";
import {DFSExponentialComponent} from "./distributions/exponential.component";

@NgModule({
    imports:[
        CommonModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule
    ],
    declarations: [
        DFSExponentialComponent,
        DFSDetermineComponent
    ],
    exports: [
        DFSExponentialComponent,
        DFSDetermineComponent
    ]
})
export class DFSDistributionsPopoversModule {
}
