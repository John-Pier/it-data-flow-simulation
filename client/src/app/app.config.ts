import {InjectionToken} from "@angular/core";

export const DFS_APP_API_CONFIG: InjectionToken<DFSAppAPIConfig> = new InjectionToken<DFSAppAPIConfig>("DFS_APP_API_CONFIG");
export const DFS_CONTACTS_DATA_CONFIG: InjectionToken<DFSContactsDataConfig> = new InjectionToken<DFSContactsDataConfig>("DFS_CONTACTS_DATA_CONFIG");

export type DFSAppAPIConfig = Readonly<{
    PORT: string | number;
    HOST_NAME: string;
    PROTOCOL: string;
    API_ADDRESS: string;
    API_VERSION: string | number;
}>;

export type DFSContactsDataConfig = Readonly<{
    adminEmail: string;
    repoLink: string;
    repoText: string;
}>;

export const mockAppAPIConfig: DFSAppAPIConfig = {
    PORT: 3000,
    HOST_NAME: location.hostname,
    PROTOCOL: "http:",
    API_ADDRESS: "/api/v/n/",
    API_VERSION: 1.0
};

export const localAppAPIConfig: DFSAppAPIConfig = {
    PORT: 3000,
    HOST_NAME: location.hostname,
    PROTOCOL: "http:",
    API_ADDRESS: "/api/v/n/",
    API_VERSION: 1.0
};

export const deployAppAPIConfig: DFSAppAPIConfig = {
    PORT: location.port,
    HOST_NAME: location.hostname,
    PROTOCOL: location.protocol,
    API_ADDRESS: "/api/v/n/",
    API_VERSION: 1.0
};

export const contactsDataConfig = {
    adminEmail: "j0hnpier.key@gmail.com",
    repoLink: "https://github.com/John-Pier/it-data-flow-simulation",
    repoText: "[github.com] IT Data-Flow Simulation"
};
