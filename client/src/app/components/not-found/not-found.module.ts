import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DFSNotFoundComponent} from "./not-found.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DFSNotFoundComponent
    ],
    exports: [
        DFSNotFoundComponent
    ],
    providers: []
})
export class DFSNotFoundModule {}
