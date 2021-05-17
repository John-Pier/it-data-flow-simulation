import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ManageDataService {
    private dateStateSubject$: BehaviorSubject<any> = new BehaviorSubject<any>({});

    constructor() {
    }

    public get dateState$() {
        return this.dateStateSubject$;
    }
}
