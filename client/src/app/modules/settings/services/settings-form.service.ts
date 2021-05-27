import {ComponentType} from "@angular/cdk/portal";
import {Injectable} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UpdateStateCallback} from "@datorama/akita";
import {combineLatest, Observable} from "rxjs";
import {debounceTime, map, startWith, tap} from "rxjs/operators";
import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {DFSDetermineComponent} from "../../../components/popowers/distributions/determine.component";
import {DFSExponentialComponent} from "../../../components/popowers/distributions/exponential.component";
import {DFSNormalComponent} from "../../../components/popowers/distributions/normal.component";
import {DFSUniformComponent} from "../../../components/popowers/distributions/uniform.component";
import {DFSDistribution} from "../../../core/models/distributions.type";
import {DFSSettings} from "../../../core/models/settings.type";

export type RequestSettingsFormGroups = Readonly<{
    requestForm: FormGroup,
    responseCustomerForm: FormGroup
}>;

export type ManagementSettingsFormGroups = Readonly<{
    processingTimeForm: FormGroup
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
            this.getValueChangesStream(formGroups.requestForm)
                .pipe(
                    tap(value => {
                        this.updateSettings(state => {
                            return {
                                requestManualControl: value.manualControl,
                                requestDistribution: {
                                    ...state.requestDistribution,
                                    type: value.distribution
                                }
                            };
                        });
                    })
                ),
            this.getValueChangesStream(formGroups.responseCustomerForm)
                .pipe(
                    tap(value => {
                        this.updateSettings(state => {
                            return {
                                responseCustomerDistribution: {
                                    ...state.responseCustomerDistribution,
                                    type: value.distribution
                                }
                            }
                        });
                    })
                ),
            this.getValueChangesStream(formGroups.processingTimeForm)
                .pipe(
                    tap(value => {
                        this.updateSettings(state => {
                            return {
                                designNeededPercent: value.designNeededPercent ?? 0,
                                processingTimeDistribution: {
                                    ...this.query.getValue().settings.processingTimeDistribution,
                                    type: value.distribution
                                }
                            }
                        });
                    })
                ),
            this.getValueChangesStream(formGroups.designForm)
                .pipe(
                    tap(value => {
                        this.updateSettings(state => {
                            return {
                                designerWorkersCount: value.workersCount,
                                revisionProbability: value.revisionProbability ?? 0,
                                developCostsDistribution: {
                                    ...state.designCostsDistribution,
                                    type: value.costsDistribution
                                },
                                revisionTimeDistribution: {
                                    ...state.revisionTimeDistribution,
                                    type: value.revisionTimeDistribution
                                }
                            }
                        });
                    })
                ),
            this.getValueChangesStream(formGroups.developersForm)
                .pipe(
                    tap(value => {
                        this.updateSettings(state => {
                            return {
                                developerWorkersCount: value.workersCount,
                                developCostsDistribution: {
                                    ...state.developCostsDistribution,
                                    type: value.costsDistribution
                                }
                            }
                        });
                    })
                ),
            this.getValueChangesStream(formGroups.supportForm)
                .pipe(
                    tap(value => {
                        this.updateSettings(state => {
                            return {
                                supportWorkersCount: value.workersCount,
                                supportManualControl: value.manualControl,
                                supportProcessingTimeDistribution: {
                                    ...state.supportProcessingTimeDistribution,
                                    type: value.supportProcessingTimeDistribution
                                },
                                requestTimeDistribution: {
                                    ...state.requestTimeDistribution,
                                    type: value.requestTimeDistribution
                                }
                            }
                        });
                    })
                )
        ]);
    }

    public selectFormsValid(formGroups: SettingsFormGroups): Observable<boolean> {
        return combineLatest([
            formGroups.requestForm.statusChanges
                .pipe(
                    startWith(formGroups.requestForm.status)
                ),
            formGroups.supportForm.statusChanges
                .pipe(
                    startWith(this.query.getValue().settingsConfig.find(value => value.template === "supportSettings" && value.active) ? formGroups.supportForm.status : "VALID")
                ),
            formGroups.responseCustomerForm.statusChanges
                .pipe(
                    startWith(formGroups.responseCustomerForm.status)
                ),
            formGroups.developersForm.statusChanges
                .pipe(
                    startWith(formGroups.developersForm.status)
                ),
            formGroups.designForm.statusChanges
                .pipe(
                    startWith(startWith(this.query.getValue().settingsConfig.find(value => value.template === "designersSettings" && value.active) ? formGroups.designForm.status : "VALID"))
                ),
            formGroups.processingTimeForm.statusChanges
                .pipe(
                    startWith(formGroups.processingTimeForm.status)
                )
        ])
            .pipe(
                map((values: string[]) => {
                    return values.filter(value => value !== "VALID").length === 0;
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
            requestForm: new FormGroup({
                distribution: new FormControl(this.query.getValue().settings.requestDistribution?.type, [this.getRequiredValidatorFunction("requestManualControl")]),
                manualControl: new FormControl(this.query.getValue().settings.requestManualControl)
            }),
            responseCustomerForm: new FormGroup({
                distribution: new FormControl(this.query.getValue().settings.responseCustomerDistribution?.type, [Validators.required]),
            })
        };
    }

    public getManagementSettingsFormGroups(): ManagementSettingsFormGroups {
        return {
            processingTimeForm: new FormGroup({
                distribution: new FormControl(this.query.getValue().settings.processingTimeDistribution?.type, [Validators.required]),
                designNeededPercent: new FormControl(this.query.getValue().settings.designNeededPercent ?? 100, [Validators.min(0), Validators.max(100)]),
            }),
        };
    }

    public getDesignerSettingsFormGroups(): DesignerSettingsFormGroups {
        return {
            designForm: new FormGroup({
                workersCount: new FormControl(this.query.getValue().settings.designerWorkersCount ?? 1, [Validators.required, Validators.min(1), Validators.max(25)]),
                costsDistribution: new FormControl(this.query.getValue().settings.designCostsDistribution?.type, [Validators.required]),
                revisionTimeDistribution: new FormControl(this.query.getValue().settings.revisionTimeDistribution?.type, [Validators.required]),
                revisionProbability: new FormControl(this.query.getValue().settings.revisionProbability ?? 0, [Validators.min(0), Validators.max(100)]),
            }),
        };
    }

    public getDevelopersSettingsFormGroups(): DevelopersSettingsFormGroups {
        return {
            developersForm: new FormGroup({
                workersCount: new FormControl(this.query.getValue().settings.developerWorkersCount ?? 1, [Validators.required, Validators.min(1), Validators.max(25)]),
                costsDistribution: new FormControl(this.query.getValue().settings.designCostsDistribution?.type, [Validators.required])
            })
        };
    }

    public getSupportSettingsFormGroups(): SupportSettingsFormGroups {
        return {
            supportForm: new FormGroup({
                workersCount: new FormControl(this.query.getValue().settings.supportWorkersCount ?? 1, [Validators.required, Validators.min(1), Validators.max(25)]),
                supportProcessingTimeDistribution: new FormControl(this.query.getValue().settings.supportProcessingTimeDistribution?.type, [Validators.required]),
                requestTimeDistribution: new FormControl(this.query.getValue().settings.requestTimeDistribution?.type, [this.getRequiredValidatorFunction("supportManualControl")]),
                manualRequestControl: new FormControl(this.query.getValue().settings.supportManualControl ?? true)
            })
        };
    }

    public getStartPageFormGroup(): FormGroup {
        return new FormGroup({
            projectName: new FormControl(this.query.getValue().projectName, [Validators.required, Validators.minLength(3)]),
            configuration: new FormControl(this.query.getValue().fileConfigName)
        });
    }

    public getComponent(distributionType: DFSDistribution): ComponentType<any> {
        switch (distributionType) {
            case DFSDistribution.DETERMINISTIC:
                return DFSDetermineComponent;
            case DFSDistribution.EXPONENTIAL:
                return DFSExponentialComponent;
            case DFSDistribution.NORMAL:
                return DFSNormalComponent;
            case DFSDistribution.UNIFORM:
                return DFSUniformComponent;
        }
    }

    public getValueChangesStream(formGroup: FormGroup): Observable<any> {
        return formGroup.valueChanges
            .pipe(debounceTime(300));
    }

    public updateSettings(updateStateCallback: UpdateStateCallback<DFSSettings>): void {
        this.settingsService.updateState(state => {
            return {
                settings: {
                    ...state.settings,
                    ...updateStateCallback(state.settings)
                }
            }
        });
    }

    private getRequiredValidatorFunction(manualControlName: keyof DFSSettings): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (this.query.getValue().settings[manualControlName]) {
                return null;
            } else {
                return !control.value
                    ? {
                        required: true
                    }
                    : null
            }
        }
    }
}
