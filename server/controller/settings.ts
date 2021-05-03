import express from "express";

const app = express();

export class SettingsController {
    constructor() {
        this.registerPOSTSetSettings();
    }

    registerPOSTSetSettings(): void {
        app.post('/', (request, response) => {
            response.send('Got a POST request');
        });
    }
}
