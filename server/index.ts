import express, {NextFunction, RequestHandler} from "express";
import * as bodyParser from "body-parser";
import {SettingsController} from "./controller/settings.controller";

const SERVER_PORT = 3000;
const app = express();
const uiUrl = "/api/v/n/1.0/";

export const allowCrossDomain: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    next();
};

app.use(bodyParser.json());
app.use(allowCrossDomain);

app.use((new SettingsController(uiUrl)).router);

app.listen(SERVER_PORT, () => {
    console.log(`DFS API server is listening on port: ${SERVER_PORT}`);
});
