import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {MatProgressSpinnerModule} from "@angular/material";
import {DFSLoaderComponent} from "./loader.component";
import {DFSLoaderService} from "./services/loader.service";

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        DFSLoaderComponent
    ],
    exports: [
        DFSLoaderComponent
    ],
    providers: [
        DFSLoaderService
    ]
})
export class DFSLoaderModule {
}
