import {Injectable} from "@angular/core";
import {Store, StoreConfig} from "@datorama/akita";

export type SettingsConfig = {
    id: number;
    title: string;
    active: boolean;
    template: string;
    isDepartment: boolean;
}[];

export  type DepartmentsConfig = {
    name: string,
    settingsConfigId: number
}[];

export interface SettingsState {
    projectName: string;
    fileConfig: Blob;
    fileConfigName: string;
    settingsConfig: SettingsConfig;
    departmentsConfig: DepartmentsConfig;
}

export function createInitialState(): SettingsState {
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
                template: "",
                isDepartment: false
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
                template: "",
                isDepartment: true
            },
            {
                id: 3,
                title: "Настройка отдела дизайна",
                active: true,
                template: "",
                isDepartment: true
            },
            {
                id: 4,
                title: "Настройка отдела разработки",
                active: true,
                template: "",
                isDepartment: true
            },
            {
                id: 5,
                title: "Настройка отдела поддержки",
                active: true,
                template: "",
                isDepartment: true
            }
        ]
    };
}

@Injectable()
@StoreConfig({ name: "settings" })
export class DFSSettingsStore extends Store<SettingsState> {
    constructor() {
        super(createInitialState());
    }
}
