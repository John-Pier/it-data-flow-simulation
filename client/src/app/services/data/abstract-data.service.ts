import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Inject} from "@angular/core";
import {Observable} from "rxjs";
import {DFS_APP_API_CONFIG, DFSAppAPIConfig} from "../../app.config";

export const defaultHttpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
    observe: "body",
    responseType: "json"
};

export abstract class DFSDataService {

    protected absoluteAddress: string = `${this.config.PROTOCOL}//${this.config.HOST_NAME}:${this.config.PORT}${this.config.API_ADDRESS}${this.config.API_VERSION}/`;

    protected constructor(protected config: DFSAppAPIConfig,
                          protected http: HttpClient) {
    }

    public get<T>(address: string, options: any = {}): Observable<T> {
        // @ts-ignore
        return this.http.get<T>(this.makeURL(address), { ...defaultHttpOptions, ...options});
    }

    public post<T>(address: string, value: any, options: any = {}): Observable<T> {
        // @ts-ignore
        return this.http.post<T>(this.makeURL(address), value, { ...defaultHttpOptions, ...options});
    }

    private makeURL(address: string): string {
        return this.absoluteAddress + address;
    }
}
