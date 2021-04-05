import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DFSStartPageComponent} from "src/app/modules/settings/components/start-page/start-page.component";
import {DFSSettingsComponent} from "src/app/modules/settings/components/settings/settings.component";
import {DFSSittingBlockModule} from "src/app/components/setting-block/sitting-block.module";
import {DFSBlockComponent} from "src/app/modules/settings/components/block/block.component";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";
import {DFSSettingsStore} from "src/app/modules/settings/state/settings.store";
import {DFSFinalSettingsComponent} from "src/app/modules/settings/components/final-settings/final-settings.component";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {DFSSettingsFormService} from "src/app/modules/settings/services/settings-form.service";

@NgModule({
    declarations: [
        DFSStartPageComponent,
        DFSSettingsComponent,
        DFSFinalSettingsComponent,
        DFSBlockComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        DFSSittingBlockModule,
        MatInputModule,
        MatCheckboxModule,
        MatOptionModule,
        MatSelectModule
    ],
    exports: [
        DFSStartPageComponent,
        DFSSettingsComponent,
        DFSFinalSettingsComponent
    ],
    providers: [
        DFSSettingsStore,
        DFSSettingsQuery,
        DFSSettingsService,
        DFSSettingsFormService
    ]
})
export class SettingsModule {}
