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
        this.registerPUTStopSimulation();
        this.registerPUTPauseSimulation();
        this.registerPUTResumeSimulation();
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
        this.put("manage/generate-support-request", (request: Request, response: Response) => {
            if(serverQuery.settings.requestManualControl) {
                simulationService.generateSupportRequest();
                response.status(200).json({status: "ok"});
            } else {
                response.status(500).json({status: "error"});
            }
        });
    }

    public registerPUTStopSimulation(): void {
        this.put("manage/stop", (request: Request, response: Response) => {
            if(serverQuery.status !== SimulationStatus.INITIAL) {
                serverService.setStatus(SimulationStatus.INITIAL);
                simulationService.stopSimulation();
                response.status(200).json({status: "ok"});
            } else {
                response.status(500).json({status: "error"});
            }
        });
    }

    public registerPUTPauseSimulation(): void {
        this.put("manage/pause", (request: Request, response: Response) => {
            if(serverQuery.status === SimulationStatus.STARTED) {
                serverService.setStatus(SimulationStatus.PAUSED);
                simulationService.pauseSimulation();
                response.status(200).json({status: "ok"});
            } else {
                response.status(500).json({status: "error"});
            }
        });
    }


    public registerPUTResumeSimulation(): void {
        this.put("manage/pause", (request: Request, response: Response) => {
            if(serverQuery.status === SimulationStatus.PAUSED) {
                serverService.setStatus(SimulationStatus.STARTED);
                simulationService.resumeSimulation();
                response.status(200).json({status: "ok"});
            } else {
                response.status(500).json({status: "error"});
            }
        });
    }
}
