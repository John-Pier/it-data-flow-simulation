import express, {NextFunction, RequestHandler} from "express";
import * as bodyParser from "body-parser";

const SERVER_PORT = 3000;
const app = express();
const uiUrl = "/ui-api/v1";

export const allowCrossDomain: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    next();
};

app.use(bodyParser.json());
app.use(allowCrossDomain);
