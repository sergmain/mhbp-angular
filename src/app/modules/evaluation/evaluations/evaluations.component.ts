import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UIStateComponent } from '@src/app/models/UIStateComponent';
import { AuthenticationService } from '@src/app/services/authentication';
import { EvaluationService } from '@src/app/services/evaluation/evaluation.service';
import { SimpleEvaluationsResult } from '@src/app/services/evaluation/SimpleEvaluationsResult';
import { SimpleEvaluation } from '@src/app/services/evaluation/SimpleEvaluation';
import {SimpleAccount} from "@services/accounts";
import {ConfirmationDialogMethod} from "@src/app/components/app-dialog-confirmation/app-dialog-confirmation.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.sass']
})
export class EvaluationsComponent extends UIStateComponent implements OnInit {
//   columnsToDisplay: string[] = ['sessionId', 'startedOn', 'finishedOn',
//     'sessionStatus', 'safe', 'normalPercent', 'failPercent', 'errorPercent', 'providerCode', 'modelInfo'];
  columnsToDisplay: string[] = ['sessionId', 'startedOn', 'providerCode',
    'normalPercent', 'failPercent', 'errorPercent', 'bts'];
  simpleEvaluationsResult: SimpleEvaluationsResult;
  dataSource = new MatTableDataSource<SimpleEvaluation>([]);

  constructor(
      readonly dialog: MatDialog,
      readonly authenticationService: AuthenticationService,
      private evaluationService: EvaluationService,
  ) {
    super(authenticationService);
  }

  ngOnInit(): void {
    console.log('evaluations.component.ts.ngOnInit()');
    this.getEvaluations(0);
  }

  getEvaluations(pageNumber: number): void {
    this.setIsLoadingStart();
    this.evaluationService
        .getEvaluations(pageNumber.toString())
        .subscribe({
          next: simpleEvaluationsResult => {
            this.simpleEvaluationsResult = simpleEvaluationsResult;
            // console.log('EvaluationsComponent.simpleEvaluationsResult: ' + JSON.stringify(this.simpleEvaluationsResult));
            this.dataSource = new MatTableDataSource(this.simpleEvaluationsResult.evaluations.content || []);
            // console.log('EvaluationsComponent.simpleEvaluationsResult: #3');
          },
          complete: () => {
            this.setIsLoadingEnd();
          }
        });
  }

  @ConfirmationDialogMethod({
    question: (evaluation: SimpleEvaluation): string =>
        `Do you want to delete SimpleEvaluation\xa0#${evaluation.sessionId}`,

    rejectTitle: 'Cancel',
    resolveTitle: 'Delete'
  })
  delete(evaluation: SimpleEvaluation): void {
    this.evaluationService
        .evaluationDeleteCommit(evaluation.sessionId.toString())
        .subscribe(v => this.getEvaluations(this.simpleEvaluationsResult.evaluations.number));
  }

  prevPage(): void {
    this.getEvaluations((this.simpleEvaluationsResult.evaluations.number - 1));
  }

  nextPage(): void {
    this.getEvaluations((this.simpleEvaluationsResult.evaluations.number + 1));
  }
}
