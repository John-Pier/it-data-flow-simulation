import {Injectable} from "@angular/core";
import {Store, StoreConfig} from "@datorama/akita";
import {DFSSettings} from "../../../core/models/settings.type";
import {DataStatus, LoadingState} from "../../../core/models/state.type";

export type SettingsConfigItem = {
    id: number;
    title: string;
    active: boolean;
    template: string;
    isDepartment: boolean;
    required?: boolean
};

export  type DepartmentsConfigItem = {
    name: string,
    settingsConfigId: number
};

export interface SettingsState {
    projectName: string;
    fileConfig: Blob;
    fileConfigName: string;
    settingsConfig: SettingsConfigItem[];
    departmentsConfig: DepartmentsConfigItem[];
    settings: DFSSettings
}

export function createInitialState(): SettingsState & LoadingState {
    return {
        projectName: null,
        fileConfig: null,
        fileConfigName: null,
        departmentsConfig: [
            {
                name: "Отдел менеджмента",
                settingsConfigId: 2,
            },
            {
                name: "Отдел дизайна",
                settingsConfigId: 3
            },
            {
                name: "Отдел разработки",
                settingsConfigId: 4,
            },
            {
                name: "Отдел поддержки",
                settingsConfigId: 5
            }
        ],
        settingsConfig: [
            {
                id: 0,
                title: "Настройка заявок",
                active: true,
                template: "requestSettings",
                isDepartment: false,
                required: true
            },
            {
                id: 1,
                title: "Настройка отделов",
                active: true,
                template: "departmentSettings",
                isDepartment: false
            },
            {
                id: 2,
                title: "Настройка отдела менеджмента",
                active: true,
                template: "managementSettings",
                isDepartment: true,
                required: true
            },
            {
                id: 3,
                title: "Настройка отдела дизайна",
                active: true,
                template: "designersSettings",
                isDepartment: true
            },
            {
                id: 4,
                title: "Настройка отдела разработки",
                active: true,
                template: "developersSettings",
                isDepartment: true,
                required: true
            },
            {
                id: 5,
                title: "Настройка отдела поддержки",
                active: true,
                template: "supportSettings",
                isDepartment: true
            }
        ],
        settings: null,
        loading: DataStatus.INITIAL
    };
}

@Injectable()
@StoreConfig({ name: "settingsState" })
export class DFSSettingsStore extends Store<SettingsState & LoadingState>  {
    constructor() {
        super(createInitialState());
    }
}
