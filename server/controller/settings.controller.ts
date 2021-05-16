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
            console.log(settings);
            serverService.setupSettings(settings);
            response.status(200).json({status: "ok"});
            console.log(response);
        });
    }
}
