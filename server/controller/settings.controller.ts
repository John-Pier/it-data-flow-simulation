import {AbstractController} from "./abstract.controller";

export class SettingsController extends AbstractController{
    constructor(baseUrl: string) {
        super(baseUrl);
        this.registerPOSTSetSettings();
    }

    registerPOSTSetSettings(): void {
        this.post("", (request, response) => {
            response.send("Got a POST request");
        });
    }
}
