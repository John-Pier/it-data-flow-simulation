import {Request, Response} from "express";
import {serverService} from "../state/server.service";
import {SettingsState} from "../state/server.state";
import {AbstractController} from "./abstract.controller";

export class SettingsController extends AbstractController {
    constructor(baseUrl: string) {
        super(baseUrl);
        this.registerPOSTSetSettings();
    }

    registerPOSTSetSettings(): void {
        this.post("settings", (request: Request, response: Response) => {
            const settings: SettingsState = request.body;
            serverService.setupSettings(settings);
            response.status(404).json({status: "ok"});
        });
    }
}
