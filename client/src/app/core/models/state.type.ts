export enum DataStatus {
    LOADING = "loading",
    INITIAL = "initial",
    LOADED = "loaded"
}

export type LoadingState  = Readonly<{
    loading: DataStatus
}>;
