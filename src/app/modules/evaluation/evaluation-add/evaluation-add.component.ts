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
import {KbUid} from "@services/evaluation/KbUid";
import {OperationStatus} from "@app/enums/OperationStatus";
import {Subscription} from "rxjs";
import {MatButton} from "@angular/material/button";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'evaluation-add',
    templateUrl: './evaluation-add.component.html',
    styleUrls: ['./evaluation-add.component.scss']
})

export class EvaluationAddComponent extends UIStateComponent implements OnInit, OnDestroy {
    readonly states = LoadStates;

    currentStates: Set<LoadStates> = new Set();
    response: EvaluationUidsForCompany;
    uploadResponse: OperationStatusRest;

    selection: SelectionModel<KbUid> = new SelectionModel<KbUid>(true, []);
    dataSource: MatTableDataSource<KbUid> = new MatTableDataSource<KbUid>([]);
    columnsToDisplay: string[] = ['check', 'id', 'uid'];

    apiUid: ApiUid;
    listOfApis: ApiUid[] = [];
    listOfKbs: KbUid[] = [];
    form = new FormGroup({
        code: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    constructor(
        private evaluationService: EvaluationService,
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private settingsService: SettingsService,
        readonly authenticationService: AuthenticationService,
    ) {
        super(authenticationService);
    }

    @ViewChild(MatButton) button: MatButton;

    ngOnInit(): void {
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
        this.evaluationService
            .evaluationAdd()
            .subscribe((response) => {
                this.response = response;
                this.listOfApis = this.response.apis;
                this.listOfKbs = this.response.kbs;
                this.dataSource = new MatTableDataSource(this.listOfKbs || []);
                this.isLoading = false;
            });
    }

    isAllSelected(): boolean {
        return this.selection.selected.length === this.dataSource.data.length;
    }

    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    create(): void {
        this.button.disabled = true;
        this.currentStates.add(this.states.wait);
        const subscribe: Subscription = this.evaluationService
            .addFormCommit(
                this.form.value.code,
                this.apiUid.id.toString(),
                this.selection.selected.map(v => v.id.toString())
            )
            .subscribe(
                (response) => {
                    if (response.status === OperationStatus.OK) {
                        this.router.navigate(['../', 'evaluations'], { relativeTo: this.route });
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
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    notToCreate() {
        return this.apiUid==null || this.selection.isEmpty() || this.form.invalid;
    }
}