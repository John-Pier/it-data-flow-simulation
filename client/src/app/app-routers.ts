import {DFSTypedMap} from "./core/base.types";

export enum DFSRoutesString {
    DFS_MAIN = "main",
    DFS_NOT_FOUND = "not-found",
    DFS_ACCESS_DENIED = "access-denied"
}

export const DFSRoutesMap: DFSTypedMap<string> = {
    [DFSRoutesString.DFS_MAIN]: "/" + DFSRoutesString.DFS_MAIN,
};

export const defaultAbsoluteRoute = "/" + DFSRoutesString.DFS_MAIN.toString();
