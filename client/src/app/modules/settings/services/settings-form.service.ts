import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {combineLatest, Observable} from "rxjs";
import {debounceTime, map, startWith, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

export type RequestSettingsFormGroups = Readonly<{
   requestStream: FormGroup,
   responseCustomerStream: FormGroup
}>;

@Injectable()
export class DFSSettingsFormService {
    constructor(protected query: DFSSettingsQuery,
                private settingsService: DFSSettingsService) {
    }

    public subscribeToRequestSettingsFormGroupValues(formGroups: RequestSettingsFormGroups): Observable<any> {
        const valueChangesFn = (formGroup: FormGroup): Observable<any>  => {
            return  formGroup.valueChanges
                .pipe(
                    debounceTime(300),
                    tap(value => {
                        if (!value.distribution) {
                            formGroup.patchValue({
                                manualControl: true
                            });
                            formGroup.controls.manualControl.disable();
                        } else if (formGroup.controls.manualControl.disabled) {
                            formGroup.controls.manualControl.enable();
                        }
                    }),
                );
        }
        return combineLatest([
            valueChangesFn(formGroups.requestStream),
            valueChangesFn(formGroups.responseCustomerStream),
        ])
            .pipe(
               tap(([requestValue, responseCustomerValue]) => {
                   // TODO: Set values to store
               })
            )

    }

    public selectStartPageFormGroupValid(formGroup: FormGroup): Observable<boolean> {
        return formGroup.valueChanges
            .pipe(
                startWith(formGroup.valid),
                map(value => value && formGroup.valid)
            );
    }

    public getRequestSettingsFormGroups(): RequestSettingsFormGroups {
        return {
            requestStream:  new FormGroup({
                distribution: new FormControl(null),
                manualControl: new FormControl(true),
                settingsButton: new FormControl(null)
            }),
            responseCustomerStream:  new FormGroup({
                distribution: new FormControl(null),
                manualControl: new FormControl(true),
                settingsButton: new FormControl(null)
            })
        }
    }

    public getStartPageFormGroup(): FormGroup {
        return new FormGroup({
            projectName: new FormControl(this.query.getValue().projectName, [Validators.required, Validators.minLength(3)]),
            configuration: new FormControl(this.query.getValue().fileConfigName)
        });
    }
}
