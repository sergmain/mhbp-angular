import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UIStateComponent } from '@src/app/models/UIStateComponent';
import { AuthenticationService } from '@src/app/services/authentication';
import { EvaluationService } from '@src/app/services/evaluation/evaluation.service';
import { SimpleEvaluationsResult } from '@src/app/services/evaluation/SimpleEvaluationsResult';
import { SimpleEvaluation } from '@src/app/services/evaluation/SimpleEvaluation';
import {SimpleAccount} from "@services/accounts";

@Component({
  selector: 'evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.sass']
})
export class EvaluationsComponent extends UIStateComponent implements OnInit {

  // columnsToDisplay: string[] = ['sessionId', 'createdOn', 'finishedOn',
  //   'sessionStatus', 'safe', 'normal', 'fail', 'error', 'providerCode', 'modelInfo'];
  columnsToDisplay: string[] = ['sessionId', 'startedOn'];
  simpleEvaluationsResult: SimpleEvaluationsResult;
  dataSource = new MatTableDataSource<SimpleEvaluation>([]);

  constructor(
      readonly authenticationService: AuthenticationService,
      private evaluationService: EvaluationService,
  ) {
    super(authenticationService);
  }

  ngOnInit(): void {
    console.log('evaluations.component.ts.ngOnInit()');
    this.updateTable(0);
  }

  updateTable(pageNumber: number): void {
    this.setIsLoadingStart();
    this.evaluationService
        .getEvaluations(pageNumber.toString())
        .subscribe({
          next: simpleEvaluationsResult => {
            this.simpleEvaluationsResult = simpleEvaluationsResult;
            // console.log('EvaluationsComponent.simpleEvaluationsResult: ' + JSON.stringify(this.simpleEvaluationsResult));
            // console.log('EvaluationsComponent.simpleEvaluationsResult: #2');
            // console.log('EvaluationsComponent.simpleEvaluationsResult: #2.1 ' + this.simpleEvaluationsResult.status);
            // console.log('EvaluationsComponent.simpleEvaluationsResult: #2.2 ' + this.simpleEvaluationsResult.evaluations);
            // console.log('EvaluationsComponent.simpleEvaluationsResult: #2.3 ' + JSON.stringify(this.simpleEvaluationsResult));
            // console.log('EvaluationsComponent.simpleEvaluationsResult: #2.4 ' + JSON.stringify(this.simpleEvaluationsResult.status));
            // console.log('EvaluationsComponent.simpleEvaluationsResult: #2.5 ' + JSON.stringify(this.simpleEvaluationsResult.evaluations));
            // let cnt = this.simpleEvaluationsResult===undefined ? [] : this.simpleEvaluationsResult.evaluations.content || [];
            this.dataSource = new MatTableDataSource(this.simpleEvaluationsResult.evaluations.content || []);
            // console.log('EvaluationsComponent.simpleEvaluationsResult: #3');
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
