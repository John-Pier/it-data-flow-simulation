import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntilDestroy} from "@ngneat/until-destroy";
import {enterLeaveAnimation, routerAnimations} from "../../../core/core.animations";
import {DFSDistribution} from "../../../core/models/distributions.type";

export type DFSDialogRequestData = Readonly<{
    type: DFSDistribution
}>;

@UntilDestroy()
@Component({
    selector: "dfs-generate-request",
    templateUrl: "generate-request.component.html",
    animations: [
        routerAnimations,
        enterLeaveAnimation
    ]
})
export class DFSSManageComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DFSSManageComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DFSDistribution) {
    }

    public ngOnInit(): void {
    }
}
