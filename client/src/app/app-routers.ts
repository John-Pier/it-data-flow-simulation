import {DFSTypedMap} from "./core/base.types";

export enum DFSRoutesString {
    MAIN = "main",
    NOT_FOUND = "not-found",
    ACCESS_DENIED = "access-denied",
    START_PAGE = "start",
    SETTINGS = "settings",
    FINAL_SETTINGS = "final-settings",
    MANAGE_PAGE = "manage"
}

export const dfsAppRoutesMap: Record<DFSRoutesString, string> = {
    [DFSRoutesString.MAIN]: `/${DFSRoutesString.MAIN}` ,
    [DFSRoutesString.START_PAGE]: `/${DFSRoutesString.MAIN}/${DFSRoutesString.START_PAGE}` ,
    [DFSRoutesString.SETTINGS]: `/${DFSRoutesString.MAIN}/${DFSRoutesString.SETTINGS}` ,
    [DFSRoutesString.FINAL_SETTINGS]: `/${DFSRoutesString.MAIN}/${DFSRoutesString.FINAL_SETTINGS}` ,
    [DFSRoutesString.MANAGE_PAGE]: `/${DFSRoutesString.MAIN}/${DFSRoutesString.MANAGE_PAGE}` ,
    [DFSRoutesString.ACCESS_DENIED]: `/${DFSRoutesString.ACCESS_DENIED}`,
    [DFSRoutesString.NOT_FOUND]: `/${DFSRoutesString.NOT_FOUND}`
};

export const defaultAbsoluteRoute = dfsAppRoutesMap[DFSRoutesString.START_PAGE];
