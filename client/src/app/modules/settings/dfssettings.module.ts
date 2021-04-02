import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DFSStartPageComponent} from "src/app/modules/settings/components/start-page/start-page.component";
import {MatButtonModule} from "@angular/material";
import {DFSSettingsComponent} from "src/app/modules/settings/components/settings/settings.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        DFSStartPageComponent,
        DFSSettingsComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    exports: [
        DFSStartPageComponent,
        DFSSettingsComponent
    ]
})
export class DFSSettingsModule {}
