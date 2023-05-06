import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UIStateComponent} from '@src/app/models/UIStateComponent';
import {AuthenticationService} from '@src/app/services/authentication';
import {ScenarioService} from "@services/scenario/scenario.service";
import {ConfirmationDialogMethod} from "@app/components/app-dialog-confirmation/app-dialog-confirmation.component";
import {LoadStates} from "@app/enums/LoadStates";
import {ScenarioUidsForAccount} from "@services/scenario/ScenarioUidsForAccount";
import {OperationStatusRest} from "@app/models/OperationStatusRest";
import {ApiUid} from "@services/evaluation/ApiUid";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SimpleScenarioSteps} from "@services/scenario/SimpleScenarioSteps";
import {SimpleScenarioStep} from "@services/scenario/SimpleScenarioStep";
import {Subscription} from "rxjs";
import {OperationStatus} from "@app/enums/OperationStatus";
import {MatButton} from "@angular/material/button";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'scenario-steps',
    templateUrl: './scenario-steps.component.html',
    styleUrls: ['./scenario-steps.component.sass']
})
export class ScenarioStepsComponent extends UIStateComponent implements OnInit {
    readonly states = LoadStates;

    currentStates: Set<LoadStates> = new Set();

    columnsToDisplay: string[] = ['api', 'name', 'prompt', 'answer', 'bts'];

    simpleScenarioSteps: SimpleScenarioSteps;
    scenarioGroupId: string;
    scenarioId: string;

    dataSource = new MatTableDataSource<SimpleScenarioStep>([]);

    response: ScenarioUidsForAccount;

    @ViewChild(MatButton) cancelCreationButton: MatButton;

    constructor(
        private scenarioService: ScenarioService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        readonly authenticationService: AuthenticationService
    ) {
        super(authenticationService);
    }

    ngOnInit(): void {
        this.scenarioGroupId = this.activatedRoute.snapshot.paramMap.get('scenarioGroupId');
        this.scenarioId = this.activatedRoute.snapshot.paramMap.get('scenarioId');
        this.updateTable();
    }

    updateTable(): void {
        this.setIsLoadingStart();
        this.scenarioService
            .scenarioSteps(this.scenarioGroupId, this.scenarioId)
            .subscribe({
                next: simpleScenarioSteps => {
                    this.simpleScenarioSteps = simpleScenarioSteps;
                    // console.log('ScenarioStepsComponent.simpleScenarioSteps: ' + JSON.stringify(this.simpleScenarioSteps));
                    this.dataSource = new MatTableDataSource(this.simpleScenarioSteps.steps || []);
                    // console.log('ScenarioStepsComponent.simpleScenarioSteps: #3');
                },
                complete: () => {
                    this.setIsLoadingEnd();
                }
            });
    }

    @ConfirmationDialogMethod({
        question: (scenarioStep: SimpleScenarioStep): string =>
            `Do you want to delete Scenario Step #${scenarioStep.uuid}`,

        resolveTitle: 'Delete',
        rejectTitle: 'Cancel'
    })
    delete(scenarioStep: SimpleScenarioStep): void {
        this.scenarioService
            .scenarioStepDeleteCommit(scenarioStep.scenarioId.toString(), scenarioStep.uuid)
            .subscribe(v => this.updateTable());
    }
}
