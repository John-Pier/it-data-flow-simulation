import {BehaviorSubject, Observable} from "rxjs";

export class DFSHeaderService {
    private headerLabel$ = new BehaviorSubject<string>("Приветствие");

    constructor() {
    }

    public setLabel(label: string): void {
        this.headerLabel$.next(label);
    }

    public selectLabel(): Observable<string> {
        return this.headerLabel$;
    }
}
