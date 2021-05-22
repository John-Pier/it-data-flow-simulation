import {Request, Response} from "express";
import {DFSSettings} from "../../client/src/app/core/models/settings.type";
import {serverService} from "../state/server.service";
import {AbstractController} from "./abstract.controller";

export class SettingsController extends AbstractController {
    constructor(baseUrl: string) {
        super(baseUrl);
        this.registerPOSTSetSettings();
    }

    public registerPOSTSetSettings(): void {
        this.post("settings", (request: Request, response: Response) => {
            const settings: DFSSettings = request.body;
            serverService.setupSettings(settings);
            console.log(settings);
            response.status(200).json();

        });
    }
}
