import {defaultAbsoluteRoute, DFSRoutesString} from "../../app-routers";
import {DFSAccessDeniedComponent} from "../../components/access-denied/access-denied.component";
import {DFSNotFoundComponent} from "../../components/not-found/not-found.component";
import {Routes} from "@angular/router";

export const MAIN_ROUTES: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: defaultAbsoluteRoute
    },
    {
        path: DFSRoutesString.DFS_NOT_FOUND,
        component: DFSNotFoundComponent
    },
    {
        path: DFSRoutesString.DFS_ACCESS_DENIED,
        component: DFSAccessDeniedComponent
    },
    {
        path: "**",
        redirectTo: DFSRoutesString.DFS_NOT_FOUND
    }
];
