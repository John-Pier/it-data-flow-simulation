import {ComponentType} from "@angular/cdk/portal";
import {DFSSettingsQuery} from "src/app/modules/settings/state/settings.query";
import {DFSSettingsService} from "src/app/modules/settings/state/settings.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {combineLatest, merge, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map, startWith, tap} from "rxjs/operators";
import {Component, Injectable} from "@angular/core";
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
        return merge([
            this.getValueChangesStream(formGroups.requestForm)
                .pipe(
                   map(value => {
                       return {
                           requestManualControl: value.manualControl,
                           requestDistribution: {
                               ...this.query.getValue().settings.requestDistribution,
                               type: value.distribution
                           }
                       } as Partial<DFSSettings>;
                   })
                ),
            this.getValueChangesStream(formGroups.responseCustomerForm)
                .pipe(
                    map(value => {
                        return {
                            responseCustomerDistribution: {
                                ...this.query.getValue().settings.responseCustomerDistribution,
                                type: value.distribution
                            }
                        } as Partial<DFSSettings>;
                    })
                ),
            this.getValueChangesStream(formGroups.processingTimeForm)
                .pipe(
                    map(value => {
                        return {
                            designNeededPercent: value.designNeededPercent ?? 0,
                            processingTimeDistribution: {
                                ...this.query.getValue().settings.processingTimeDistribution,
                                type: value.distribution
                            }
                        } as Partial<DFSSettings>;
                    })
                ),
            this.getValueChangesStream(formGroups.designForm)
                .pipe(
                    map(value => {
                        return {
                            designerWorkersCount: value.workersCount,
                            revisionProbability: value.revisionProbability ?? 0,
                            developCostsDistribution: {
                                ...this.query.getValue().settings.designCostsDistribution,
                                type: value.costsDistribution
                            },
                            revisionTimeDistribution: {
                                ...this.query.getValue().settings.revisionTimeDistribution,
                                type: value.revisionTimeDistribution
                            }
                        } as Partial<DFSSettings>;
                    })
                ),
            this.getValueChangesStream(formGroups.developersForm)
                .pipe(
                    map(value => {
                        return {
                            developerWorkersCount: value.workersCount,
                            developCostsDistribution: {
                                ...this.query.getValue().settings.developCostsDistribution,
                                type: value.costsDistribution
                            }
                        } as Partial<DFSSettings>;
                    })
                ),
            this.getValueChangesStream(formGroups.supportForm)
                .pipe(
                    map(value => {
                        return {
                            supportWorkersCount: value.workersCount,
                            supportManualControl: value.manualControl,
                            supportProcessingTimeDistribution: {
                                ...this.query.getValue().settings.supportProcessingTimeDistribution,
                                type: value.supportProcessingTimeDistribution
                            },
                            requestTimeDistribution: {
                                ...this.query.getValue().settings.requestTimeDistribution,
                                type: value.requestTimeDistribution
                            }
                        } as Partial<DFSSettings>;
                    })
                ),
        ])
            .pipe(
                debounceTime(300),
                tap(console.log),
                tap((value) => {
                    this.settingsService.updateState(state => {
                        return {
                            settings: {
                                ...state,
                               ...value
                            }
                        }
                    });
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
                distribution: new FormControl(null),
                manualControl: new FormControl(true)
            }),
            responseCustomerForm: new FormGroup({
                distribution: new FormControl(null),
            })
        };
    }

    public getManagementSettingsFormGroups(): ManagementSettingsFormGroups {
        return {
            processingTimeForm: new FormGroup({
                distribution: new FormControl(null),
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
                supportProcessingTimeDistribution: new FormControl(null),
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

    public getComponent(distributionType: DFSDistribution): ComponentType<any> {
        switch (distributionType) {
            case DFSDistribution.DETERMINISTIC: return DFSDetermineComponent;
            case DFSDistribution.EXPONENTIAL: return DFSExponentialComponent;
            case DFSDistribution.NORMAL: return DFSNormalComponent;
            case DFSDistribution.UNIFORM: return DFSUniformComponent;
        }
    }

    public getValueChangesStream(formGroup: FormGroup): Observable<any> {
        return formGroup.valueChanges
            .pipe(debounceTime(300));
    }
}
