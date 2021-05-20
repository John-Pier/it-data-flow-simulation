import {environment} from "../environments/environment";
import {DFSRoutesString} from "./app-routers";
import {AppComponent} from "./app.component";
import {contactsDataConfig, DFS_APP_API_CONFIG, DFS_CONTACTS_DATA_CONFIG} from "./app.config";
import {DFSLoaderModule} from "./components/loader/loader.module";
import {DFSManageDataService} from "./services/data/manage-data.service";
import {DFSNavigationHistoryService} from "./services/navigation-history.service";
import {DFSNavigationService} from "./services/navigation.service";
import {PreloadAllModules, Router, RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {DFSManageQuery} from "./state/manage.query";
import {DFSManageService} from "./state/manage.service";
import {DFSManageStore} from "./state/manage.store";

export const dfsRoutes: Routes = [
    {
        path: DFSRoutesString.MAIN,
        canActivate: [],
        canActivateChild: [],
        loadChildren: () => import("./modules/main-container/main-container.module").then(m => m.DFSMainContainerModule)
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: DFSRoutesString.MAIN
    },
    {
        path: "**",
        redirectTo: DFSRoutesString.MAIN
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(dfsRoutes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: "reload" }),
        HttpClientModule,
        DFSLoaderModule
    ],
    providers: [
        {
            provide: DFS_APP_API_CONFIG,
            useValue: environment.config
        },
        {
            provide: DFS_CONTACTS_DATA_CONFIG,
            useValue: contactsDataConfig
        },
        DFSNavigationHistoryService,
        {
            provide: DFSNavigationService,
            useClass: DFSNavigationService,
            deps: [
                Router,
                DFSNavigationHistoryService,
                // Location - use the platform"s history
            ]
        },
        DFSManageDataService,
        DFSManageStore,
        DFSManageQuery,
        DFSManageService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
