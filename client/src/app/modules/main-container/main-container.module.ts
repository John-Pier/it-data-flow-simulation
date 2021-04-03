import {CommonModule} from "@angular/common";
import {NgModule, Type} from "@angular/core";
import {MatIconModule, MatMenuModule} from "@angular/material";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule, Routes} from "@angular/router";
import {DFSAccessDeniedModule} from "../../components/access-denied/access-denied.module";
import {DFSHeaderModule} from "../../components/header/header.module";
import {DFSNotFoundModule} from "../../components/not-found/not-found.module";
import {DFSMainContainerComponent} from "./main-container.component";
import {MAIN_ROUTES} from "./main-routing";
import {SettingsModule} from "src/app/modules/settings/settings.module";

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
    SettingsModule
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

    ]
})
export class DFSMainContainerModule {}
