import {Request, Response} from "express";
import {simulationService} from "../services/simulation.service";
import {serverQuery} from "../state/server.query";
import {serverService} from "../state/server.service";
import {SimulationStatus} from "../state/server.state";
import {AbstractController} from "./abstract.controller";

export class ManageController extends AbstractController {
    constructor(baseUrl: string) {
        super(baseUrl);
        this.registerPOSTSetStatus();
        this.registerPUTGenerateRequest();
        this.registerPUTGenerateSupportRequest();
    }

    public registerPOSTSetStatus(): void {
        this.post("manage/status", (request: Request, response: Response) => {
            const status: SimulationStatus = request.body;
            serverService.setStatus(status);
            response.status(200).json({status: "ok"});
        });
    }

    public registerPUTGenerateRequest(): void {
        this.put("manage/generate-request", (request: Request, response: Response) => {
            if(serverQuery.settings.requestManualControl) {
                simulationService.generateRequest();
                response.status(200).json({status: "ok"});
            } else {
                response.status(500).json({status: "error"});
            }
        });
    }

    public registerPUTGenerateSupportRequest(): void {
        this.post("manage/generate-support-request", (request: Request, response: Response) => {
            if(serverQuery.settings.requestManualControl) {
                simulationService.generateSupportRequest();
                response.status(200).json({status: "ok"});
            } else {
                response.status(500).json({status: "error"});
            }
        });
    }
}
