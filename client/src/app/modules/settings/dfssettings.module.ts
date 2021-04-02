import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DFSStartPageComponent} from "src/app/modules/settings/components/start-page/start-page.component";
import {MatButtonModule} from "@angular/material";
import {DFSSettingsComponent} from "src/app/modules/settings/components/settings/settings.component";

@NgModule({
    declarations: [
        DFSStartPageComponent,
        DFSSettingsComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule
    ],
    exports: [
        DFSStartPageComponent,
        DFSSettingsComponent
    ]
})
export class DFSSettingsModule {}
