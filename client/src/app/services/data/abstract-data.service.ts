import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Inject} from "@angular/core";
import {Observable} from "rxjs";
import {DFS_APP_API_CONFIG, DFSAppAPIConfig} from "../../app.config";

export const defaultHttpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
    observe: "body",
    responseType: "json"
};

export class DFSDataService {

    private resourcesUrl = "image/";

    constructor(@Inject(DFS_APP_API_CONFIG) protected config: DFSAppAPIConfig,
                private http: HttpClient) {
    }

    public getResourcesUrl(): string {
        // TODO -> refactoring - make service
        return this.makeURL(this.resourcesUrl) + "?path=";
    }

    public get<T>(address: string, options: any = {}): Observable<T> {
        // @ts-ignore
        return this.http.get<T>(this.makeURL(address), { ...defaultHttpOptions, ...options});
    }

    public post<T>(address: string, value: any, options: any = {}): Observable<T> {
        // @ts-ignore
        return this.http.post<T>(this.makeURL(address), value, { ...defaultHttpOptions, ...options});
    }

    protected getAbsoluteAddress(): string {
        return `${this.config.PROTOCOL}//${this.config.HOST_NAME}:${this.config.PORT}${this.config.API_ADDRESS}${this.config.API_VERSION}/`;
    }

    private makeURL(address: string): string {
        return this.getAbsoluteAddress() + address;
    }
}
