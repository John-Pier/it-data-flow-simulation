import {Injectable} from "@angular/core";
import {Store, StoreConfig} from "@datorama/akita";
import {DFSSimulationState} from "../../../core/models/manage.type";
import {DFSSettings} from "../../../core/models/settings.type";
import {DataStatus, LoadingState} from "../../../core/models/state.type";

export interface ManageState {
    projectName: string;
    simulationState: DFSSimulationState;
    settings: DFSSettings;
}

export function createInitialState(): ManageState & LoadingState {
    return {
        projectName: null,
        simulationState: null,
        settings: {
            departments: [],
            designNeededPercent: 100,
            designerWorkersCount: 1,
            processingTimeDistribution: null,
            requestDistribution: null,
            responseCustomerDistribution: null,
            requestManualControl: true,
            developerWorkersCount: 1,
            developCostsDistribution: null
        },
        loading: DataStatus.INITIAL
    };
}

@Injectable()
@StoreConfig({ name: "manageState" })
export class DFSManageStore extends Store<ManageState & LoadingState>  {
    constructor() {
        super(createInitialState());
    }
}
