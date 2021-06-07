import {Request, Response} from "express";
import {DFSSettings} from "../../client/src/app/core/models/settings.type";
import {simulationService} from "../services/simulation.service";
import {serverQuery} from "../state/server.query";
import {serverService} from "../state/server.service";
import {SimulationStatus} from "../state/server.state";
import {AbstractController} from "./abstract.controller";

export class SettingsController extends AbstractController {
    constructor(baseUrl: string) {
        super(baseUrl);
        this.registerPOSTSetSettings();
    }

    public registerPOSTSetSettings(): void {
        this.post("settings", (request: Request, response: Response) => {
            const settings: DFSSettings = request.body;
            if(serverQuery.status === SimulationStatus.INITIAL) {
                serverService.setupSettings(settings);
                simulationService.startSimulation();
                response.status(200).json();
            }
            response.status(500).json();
        });
    }
}
