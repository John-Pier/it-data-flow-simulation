import express, {NextFunction, Request, Response, RequestHandler} from "express";
import * as bodyParser from "body-parser";
import {ManageController} from "./controller/manage.controller";
import {SettingsController} from "./controller/settings.controller";

const SERVER_PORT = 3000;
const app = express();
const uiUrl = "/api/v/n/1";

export const allowCrossDomain: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};

export const loggingMiddleware: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    console.log(`${request.method} Request to: ${request.url}`);
    console.log("Request: ",request.body, request.statusCode);
    next();
};

app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(loggingMiddleware);

app.use((new SettingsController(uiUrl)).router);
app.use((new ManageController(uiUrl)).router);

app.listen(SERVER_PORT, () => {
    console.log(`DFS API server is listening on port: ${SERVER_PORT}`);
});
