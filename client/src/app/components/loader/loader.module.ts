import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DFSLoaderComponent} from "./loader.component";
import {DFSLoaderService} from "./services/loader.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

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
