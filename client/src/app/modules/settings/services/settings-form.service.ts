import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {combineLatest, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map, startWith, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

export type RequestSettingsFormGroups = Readonly<{
    requestStream: FormGroup,
    responseCustomerStream: FormGroup
}>;

export type ManagementSettingsFormGroups = Readonly<{
    processingTimeStream: FormGroup
}>;

export type DesignerSettingsFormGroups = Readonly<{
    designForm: FormGroup
}>;

export type DevelopersSettingsFormGroups = Readonly<{
    developersForm: FormGroup
}>;

export type SupportSettingsFormGroups = Readonly<{
    supportForm: FormGroup
}>;

export type SettingsFormGroups = DesignerSettingsFormGroups &
    ManagementSettingsFormGroups &
    RequestSettingsFormGroups &
    DevelopersSettingsFormGroups &
    SupportSettingsFormGroups;

@Injectable()
export class DFSSettingsFormService {

    constructor(protected query: DFSSettingsQuery,
                private settingsService: DFSSettingsService) {
    }

    public subscribeSettingsFormGroupsValues(formGroups: SettingsFormGroups): Observable<any> {
        return combineLatest([
            this.selectValueChanges(formGroups.requestStream),
            this.selectValueChanges(formGroups.supportForm, "revisionTimeDistribution", "manualRequestControl"),
        ])
            .pipe(
                tap(([requestValue, supportFormValue]) => {
                    // TODO: Set values to store
                })
            );

    }

    public selectStartPageFormGroupValid(formGroup: FormGroup): Observable<boolean> {
        return formGroup.valueChanges
            .pipe(
                startWith(formGroup.valid),
                map(value => value && formGroup.valid)
            );
    }

    public getSettingsFormGroups(): SettingsFormGroups {
        return {
            ...this.getRequestSettingsFormGroups(),
            ...this.getDesignerSettingsFormGroups(),
            ...this.getManagementSettingsFormGroups(),
            ...this.getDevelopersSettingsFormGroups(),
            ...this.getSupportSettingsFormGroups()
        };
    }

    public getRequestSettingsFormGroups(): RequestSettingsFormGroups {
        return {
            requestStream: new FormGroup({
                distribution: new FormControl(null),
                manualControl: new FormControl(true)
            }),
            responseCustomerStream: new FormGroup({
                distribution: new FormControl(null),
                manualControl: new FormControl(true)
            })
        };
    }

    public getManagementSettingsFormGroups(): ManagementSettingsFormGroups {
        return {
            processingTimeStream: new FormGroup({
                distribution: new FormControl(null),
                sprintTimeDistribution: new FormControl(null),
                designNeededPercent: new FormControl(100, [Validators.min(0), Validators.max(100)]),
            }),
        };
    }

    public getDesignerSettingsFormGroups(): DesignerSettingsFormGroups {
        return {
            designForm: new FormGroup({
                workersCount: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(25)]),
                costsDistribution: new FormControl(null),
                revisionTimeDistribution: new FormControl(null),
                revisionProbability: new FormControl(0, [Validators.min(0), Validators.max(100)]),
            }),
        };
    }

    public getDevelopersSettingsFormGroups(): DevelopersSettingsFormGroups {
        return {
            developersForm: new FormGroup({
                workersCount: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(25)]),
                costsDistribution: new FormControl(null)
            })
        };
    }

    public getSupportSettingsFormGroups(): SupportSettingsFormGroups {
        return {
            supportForm: new FormGroup({
                workersCount: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(25)]),
                costsDistribution: new FormControl(null),
                requestTimeDistribution: new FormControl(null),
                manualRequestControl: new FormControl(true)
            })
        };
    }

    public getStartPageFormGroup(): FormGroup {
        return new FormGroup({
            projectName: new FormControl(this.query.getValue().projectName, [Validators.required, Validators.minLength(3)]),
            configuration: new FormControl(this.query.getValue().fileConfigName)
        });
    }

    private selectValueChanges(formGroup: FormGroup, distribution: string = "distribution", manualControl: string = "manualControl"): Observable<any> {
        return formGroup.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged((a, b) => a[distribution] === b[distribution]),
                tap(value => {
                    if (!value[distribution]) {
                        formGroup.patchValue({
                            [manualControl]: true
                        }, { emitEvent: false });
                        formGroup.controls[manualControl].disable();
                    } else if (formGroup.controls[manualControl].disabled) {
                        formGroup.controls[manualControl].enable();
                    }
                }),
            );
    };
}
