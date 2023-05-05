import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UIStateComponent } from '@src/app/models/UIStateComponent';
import { AuthenticationService } from '@src/app/services/authentication';
import {ScenariosResult} from "@services/scenario/ScenariosResult";
import {ScenarioService} from "@services/scenario/scenario.service";
import {SimpleScenario} from "@services/scenario/SimpleScenario";
import {ConfirmationDialogMethod} from "@app/components/app-dialog-confirmation/app-dialog-confirmation.component";
import {SimpleKb} from "@services/kb/SimpleKb";
import {LoadStates} from "@app/enums/LoadStates";
import {ScenarioUidsForAccount} from "@services/scenario/ScenarioUidsForAccount";
import {OperationStatusRest} from "@app/models/OperationStatusRest";
import {ApiUid} from "@services/evaluation/ApiUid";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SimpleScenarioSteps} from "@services/scenario/SimpleScenarioSteps";

@Component({
    selector: 'scenario-steps',
    templateUrl: './scenario-steps.component.html',
    styleUrls: ['./scenario-steps.component.sass']
})
export class ScenarioStepsComponent extends UIStateComponent implements OnInit {
    readonly states = LoadStates;

    currentStates: Set<LoadStates> = new Set();

    dataSource: MatTableDataSource<SimpleScenarioSteps> = new MatTableDataSource<SimpleScenarioSteps>([]);
    columnsToDisplay: string[] = ['id', 'prompt', 'bts'];
    simpleScenarioSteps: SimpleScenarioSteps;
    scenarioGroupId: string;
    scenarioId: string;

    response: ScenarioUidsForAccount;
    uploadResponse: OperationStatusRest;

    apiUid: ApiUid;
    listOfApis: ApiUid[] = [];
    form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(5)]),
        prompt: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    constructor(
        private scenarioService: ScenarioService,
        private activatedRoute: ActivatedRoute,
        readonly authenticationService: AuthenticationService
    ) {
        super(authenticationService);
    }

    ngOnInit(): void {
        this.scenarioGroupId = this.activatedRoute.snapshot.paramMap.get('scenarioGroupId');
        this.scenarioId = this.activatedRoute.snapshot.paramMap.get('scenarioId');
        this.updateTable(0);
    }

    updateTable(page: number): void {
        this.setIsLoadingStart();
        this.scenarioService
            .scenarioSteps(this.scenarioGroupId, this.scenarioId)
            .subscribe({
                next: simpleScenarioSteps => {
                    this.simpleScenarioSteps = simpleScenarioSteps;
                    this.dataSource = new MatTableDataSources(this.simpleScenarioSteps.steps.content || []);
                },
                complete: () => {
                    this.setIsLoadingEnd();
                }
            });
    }

    @ConfirmationDialogMethod({
        question: (kb: SimpleKb): string =>
            `Do you want to delete Scenario Step #${kb.id}`,

        resolveTitle: 'Delete',
        rejectTitle: 'Cancel'
    })
    delete(scenario: SimpleScenario): void {
        this.scenarioService
            .scenarioDeleteCommit(scenario.scenarioId.toString())
            .subscribe(v => this.updateTable(this.simpleScenarioSteps.steps.number));
    }

    nextPage(): void {
        this.updateTable(this.simpleScenarioSteps.steps.number + 1);
    }

    prevPage(): void {
        this.updateTable(this.simpleScenarioSteps.steps.number - 1);
    }

}
