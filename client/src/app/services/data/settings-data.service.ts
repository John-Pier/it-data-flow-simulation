import {HttpClient} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DFS_APP_API_CONFIG, DFSAppAPIConfig} from "../../app.config";
import {SettingsState} from "../../modules/settings/state/settings.store";
import {DFSDataService} from "./abstract-data.service";

@Injectable()
export class DFSSettingsDataService extends DFSDataService {
    constructor(@Inject(DFS_APP_API_CONFIG) protected config: DFSAppAPIConfig,
                protected http: HttpClient) {
        super(config, http);
    }

    public startSimulation(settings: SettingsState): Observable<any> {
        return this.post<SettingsState>("settings", settings);
    }
}
