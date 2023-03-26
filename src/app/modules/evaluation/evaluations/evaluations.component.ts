import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UIStateComponent } from '@src/app/models/UIStateComponent';
import { AuthenticationService } from '@src/app/services/authentication';
import { EvaluationService } from '@src/app/services/evaluation/evaluation.service';
import { SimpleEvaluationsResult } from '@src/app/services/evaluation/SimpleEvaluationsResult';
import { SimpleEvaluation } from '@src/app/services/evaluation/SimpleEvaluation';

@Component({
  selector: 'evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.sass']
})
export class EvaluationsComponent extends UIStateComponent implements OnInit {
  columnsToDisplay: string[] = ['sessionId', 'createdOn', 'finishedOn',
    'sessionStatus', 'safe', 'normal', 'fail', 'error', 'providerCode', 'modelInfo'];

/*
  export interface SimpleEvaluation {
  sessionId: number;
  createdOn: number;
  finishedOn: number;
  sessionStatus: string;
  safe: string;
  normal: number;
  fail: number;
  error: number;
  providerCode: string;
  modelInfo: string;
}
*/

  simpleEvaluationsResult: SimpleEvaluationsResult;
  dataSource: MatTableDataSource<SimpleEvaluation> = new MatTableDataSource([]);

  constructor(
      readonly authenticationService: AuthenticationService,
      private evaluationService: EvaluationService,
  ) {
    super(authenticationService);
  }

  ngOnInit(): void {
    this.updateTable(0);
  }

  updateTable(pageNumber: number): void {
    this.setIsLoadingStart();
    this.evaluationService
        .evaluations(pageNumber.toString())
        .subscribe({
          next: simpleEvaluationsResult => {
            this.simpleEvaluationsResult = simpleEvaluationsResult;
            this.dataSource = new MatTableDataSource(this.simpleEvaluationsResult.evaluations.content);
          },
          complete: () => {
            this.setIsLoadingEnd();
          }
        });
  }


  prevPage(): void {
    this.updateTable((this.simpleEvaluationsResult.evaluations.number - 1));
  }

  nextPage(): void {
    this.updateTable((this.simpleEvaluationsResult.evaluations.number + 1));
  }
}
