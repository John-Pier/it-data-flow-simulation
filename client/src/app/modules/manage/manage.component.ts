import {Component, HostBinding, OnInit} from "@angular/core";
import {UntilDestroy} from "@ngneat/until-destroy";
import {map} from "rxjs/operators";
import {enterLeaveAnimation, routerAnimations} from "src/app/core/core.animations";
import {DFSHeaderService} from "src/app/services/header.service";
import {DFSNavigationService} from "src/app/services/navigation.service";
import {DFSManageService} from "./state/manage.service";

@UntilDestroy()
@Component({
    selector: "dfs-manage",
    templateUrl: "manage.component.html",
    animations: [
        routerAnimations,
        enterLeaveAnimation
    ]
})
export class DFSSManageComponent implements OnInit {

    public simulationState$ = this.manageService.selectSimulationState();

    public simulationStatus$ = this.manageService.selectSimulationState()
        .pipe(
            map(value => {
                switch (value?.state) {
                    case "run": return "Запущена";
                    case "pause": return "Приостановлена";
                    case "stop": return "Завершена";
                }
            })
        );

    @HostBinding("[@routerAnimations]")
    private animations: boolean = true;

    @HostBinding("class.dfs-manage")
    private hostClass: boolean = true;

    constructor(private navigationService: DFSNavigationService,
                private headerService: DFSHeaderService,
                private manageService: DFSManageService) {
    }

    public ngOnInit(): void {
        this.headerService.setLabel("Симуляция");
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

    public _onGenerateRequest(): void {

    }

    public _onExitClick(): void {
        this.navigationService.navigateToDefault();
    }
}
