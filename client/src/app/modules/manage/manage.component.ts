import {Component, HostBinding, OnDestroy, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {map, tap} from "rxjs/operators";
import {enterLeaveAnimation, routerAnimations} from "src/app/core/core.animations";
import {DFSHeaderService} from "src/app/services/header.service";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {DFSManageQuery} from "../../state/manage.query";
import {DFSManageService} from "../../state/manage.service";

@UntilDestroy()
@Component({
    selector: "dfs-manage",
    templateUrl: "manage.component.html",
    animations: [
        routerAnimations,
        enterLeaveAnimation
    ]
})
export class DFSSManageComponent implements OnInit, OnDestroy {

    public simulationState$ = this.manageService.selectSimulationState();

    public simulationStatus$ = this.manageService.selectSimulationState()
        .pipe(
            map(value => {
                switch (value?.state) {
                    case "run":
                        return "Запущена";
                    case "pause":
                        return "Приостановлена";
                    case "stop":
                        return "Завершена";
                }
            })
        );

    @ViewChild("resultStatisticTemplate")
    private resultTemplate: TemplateRef<void>;

    @HostBinding("[@routerAnimations]")
    private animations: boolean = true;

    @HostBinding("class.dfs-manage")
    private hostClass: boolean = true;

    constructor(private query: DFSManageQuery,
                private navigationService: DFSNavigationService,
                private headerService: DFSHeaderService,
                private manageService: DFSManageService,
                private snackBar: MatSnackBar,
                private dialog: MatDialog) {
    }

    public ngOnInit(): void {
        this.manageService.asyncInitSimulation()
            .pipe(
                tap(value => {
                    const projectName = this.query.getValue().projectName;
                    this.headerService.setLabel(projectName ? "Симуляция: " + projectName : "Симуляция");
                }),
                untilDestroyed(this)
            )
            .subscribe();
    }

    public _onStopSimulationClick(): void {
        this.manageService.updateState(state => {
            return {
                simulationState: {
                    ...state.simulationState,
                    state: "stop"
                }
            }
        });
        this.dialog.open(this.resultTemplate);
    }

    public _onChangeSimulationState(): void {
        this.manageService.updateState(state => {
            return {
                simulationState: {
                    ...state.simulationState,
                    state: state.simulationState.state === "run" ? "pause" : "run"
                }
            }
        });
    }

    public _onExitClick(): void {
        this.navigationService.navigateToDefault();
    }

    public ngOnDestroy(): void {
        this.manageService.updateState(state => {
            return {
                simulationState: {
                    ...state.simulationState,
                    state: "stop"
                }
            }
        });
    }

    public _onGenerateRequest(): void {
        this.manageService.generateProjectRequest()
            .subscribe(() => {
                this.snackBar.open("Заявка на разработку сгенерирована", "Ок", {
                    duration: 2100
                });
            });
    }

    public _onGenerateSupportRequest(): void {
        this.manageService.generateSupportRequest()
            .subscribe(() => {
                this.snackBar.open("Заявка поддержки сгенерирована", "Ок", {
                    duration: 2100
                });
            });
    }
}
