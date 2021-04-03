import {defaultAbsoluteRoute, DFSRoutesString} from "../../app-routers";
import {DFSAccessDeniedComponent} from "../../components/access-denied/access-denied.component";
import {DFSNotFoundComponent} from "../../components/not-found/not-found.component";
import {Routes} from "@angular/router";
import {DFSStartPageComponent} from "src/app/modules/settings/components/start-page/start-page.component";
import {DFSSettingsComponent} from "src/app/modules/settings/components/settings/settings.component";
import {DFSFinalSettingsComponent} from "src/app/modules/settings/components/final-settings/final-settings.component";

export const MAIN_ROUTES: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: defaultAbsoluteRoute
    },
    {
        path: DFSRoutesString.START_PAGE,
        component: DFSStartPageComponent
    },
    {
        path: DFSRoutesString.SETTINGS,
        component: DFSSettingsComponent
    },
    {
        path: DFSRoutesString.FINAL_SETTINGS,
        component: DFSFinalSettingsComponent
    },
    {
        path: DFSRoutesString.NOT_FOUND,
        component: DFSNotFoundComponent
    },
    {
        path: DFSRoutesString.ACCESS_DENIED,
        component: DFSAccessDeniedComponent
    },
    {
        path: "**",
        redirectTo: DFSRoutesString.NOT_FOUND
    }
];
