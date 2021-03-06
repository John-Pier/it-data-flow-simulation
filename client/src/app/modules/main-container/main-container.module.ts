import {CommonModule} from "@angular/common";
import {NgModule, Type} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {DFSAccessDeniedModule} from "../../components/access-denied/access-denied.module";
import {DFSHeaderModule} from "../../components/header/header.module";
import {DFSHelpModule} from "../../components/popowers/help-page/help.module";
import {DFSNotFoundModule} from "../../components/not-found/not-found.module";
import {DFSMainContainerComponent} from "./main-container.component";
import {MAIN_ROUTES} from "./main-routing";
import {DFSSettingsModule} from "src/app/modules/settings/settings.module";
import {RouterModule, Routes} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {DFSHeaderService} from "src/app/services/header.service";
import {DFSManageModule} from "src/app/modules/manage/manage.module";

const DFSMainContainerRoutes: Routes = [
    {
        path: "",
        component: DFSMainContainerComponent,
        children: MAIN_ROUTES
    }
];

const dfsModules: Type<any>[] = [
    DFSHeaderModule,
    DFSNotFoundModule,
    DFSAccessDeniedModule,
    DFSSettingsModule,
    DFSManageModule,
    DFSHelpModule
];

const matModules: Type<any>[] = [
    MatButtonModule,
    MatMenuModule,
    MatIconModule
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DFSMainContainerRoutes),
        ...dfsModules,
        ...matModules
    ],
    declarations: [
        DFSMainContainerComponent
    ],
    exports: [
        DFSMainContainerComponent
    ],
    providers: [
        DFSHeaderService
    ]
})
export class DFSMainContainerModule {}
