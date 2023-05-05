import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadStates} from '@app/enums/LoadStates';
import {TranslateService} from '@ngx-translate/core';
import {OperationStatusRest} from '@src/app/models/OperationStatusRest';
import {UIStateComponent} from '@src/app/models/UIStateComponent';
import {AuthenticationService} from '@src/app/services/authentication';
import {SettingsService, SettingsServiceEventChange} from '@src/app/services/settings/settings.service';
import {EvaluationService} from "@services/evaluation/evaluation.service";
import {EvaluationUidsForCompany} from "@services/evaluation/EvaluationUidsForCompany";
import {ApiUid} from "@services/evaluation/ApiUid";
import {ChapterUid} from "@services/evaluation/ChapterUid";
import {OperationStatus} from "@app/enums/OperationStatus";
import {Subscription} from "rxjs";
import {MatButton} from "@angular/material/button";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ScenarioService} from "@services/scenario/scenario.service";
import {ScenarioUidsForAccount} from "@services/scenario/ScenarioUidsForAccount";

@Component({
    selector: 'scenario-add',
    templateUrl: './scenario-add.component.html',
    styleUrls: ['./scenario-add.component.scss']
})

export class ScenarioAddComponent extends UIStateComponent implements OnInit, OnDestroy {
    readonly states = LoadStates;

    currentStates: Set<LoadStates> = new Set();
    response: ScenarioUidsForAccount;
    uploadResponse: OperationStatusRest;
    scenarioGroupId: string;

    apiUid: ApiUid;
    listOfApis: ApiUid[] = [];
    form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(5)]),
        description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });

    constructor(
        private scenarioService: ScenarioService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private translate: TranslateService,
        private settingsService: SettingsService,
        readonly authenticationService: AuthenticationService,
    ) {
        super(authenticationService);
    }

    @ViewChild(MatButton) button: MatButton;

    ngOnInit(): void {
        this.scenarioGroupId = this.activatedRoute.snapshot.paramMap.get('scenarioGroupId');
        this.subscribeSubscription(this.settingsService.events.subscribe(event => {
            if (event instanceof SettingsServiceEventChange) {
                this.translate.use(event.settings.language);
            }
        }));

        this.updateResponse();
    }

    ngOnDestroy(): void {
        this.unsubscribeSubscriptions();
    }

    updateResponse(): void {
        this.scenarioService
            .scenarioAdd()
            .subscribe((response) => {
                this.response = response;
                this.listOfApis = this.response.apis;
                this.isLoading = false;
            });
    }

    create(): void {
        this.button.disabled = true;
        this.currentStates.add(this.states.wait);
        const subscribe: Subscription = this.scenarioService
            .addScenarioFormCommit(
                this.scenarioGroupId,
                this.form.value.name,
                this.form.value.description,
                this.apiUid.id.toString()
            )
            .subscribe(
                (response) => {
                    if (response.status === OperationStatus.OK) {
                        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
                    }
                },
                () => {},
                () => {
                    this.currentStates.delete(this.states.wait);
                    subscribe.unsubscribe();
                }
            );
    }

    back(): void {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }

    notToCreate() {
        return this.apiUid==null || this.form.invalid;
    }
}