import {RequestHandler, Router} from "express";

export abstract class AbstractController {
    protected _router: Router = Router();
    public baseUrl: string

    protected constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public get router(): Router {
        return this._router;
    }

    protected post(url: string, handler: (Request, Response) => void) {
        this.router.post(`${this.baseUrl}/${url}`, handler);
    }

    protected get(url: string, handler: (Request, Response) => void) {
        this.router.get(`${this.baseUrl}/${url}`, handler);
    }

    protected put(url: string, handler: (Request, Response) => void) {
        this.router.put(`${this.baseUrl}/${url}`, handler);
    }

    protected delete(url: string, handler: (Request, Response) => void) {
        this.router.delete(`${this.baseUrl}/${url}`, handler);
    }
}
