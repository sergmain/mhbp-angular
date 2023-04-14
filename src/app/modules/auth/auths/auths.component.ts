import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UIStateComponent } from '@src/app/models/UIStateComponent';
import { AuthenticationService } from '@src/app/services/authentication';
import {ConfirmationDialogInterface, ConfirmationDialogMethod} from "@src/app/components/app-dialog-confirmation/app-dialog-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {SimpleAuthsResult} from "@services/auth/SimpleAuthsResult";
import {AuthService} from "@services/auth/auth.service";
import {SimpleAuth} from "@services/auth/SimpleAuth";

@Component({
  selector: 'auths',
  templateUrl: './auths.component.html',
  styleUrls: ['./auths.component.scss']
})
export class AuthsComponent extends UIStateComponent implements OnInit, ConfirmationDialogInterface {
  columnsToDisplay: string[] = ['id', 'code', 'bts'];
  secondColumnsToDisplay: string[] = ['empty', 'params'];
  simpleAuthsResult: SimpleAuthsResult;
  dataSource = new MatTableDataSource<SimpleAuth>([]);
  expandParams: boolean = false;

  constructor(
      readonly dialog: MatDialog,
      readonly authenticationService: AuthenticationService,
      private authService: AuthService,
  ) {
    super(authenticationService);
  }

  ngOnInit(): void {
    console.log('auths.component.ts.ngOnInit()');
    this.getAuths(0);
  }

  getAuths(pageNumber: number): void {
    this.setIsLoadingStart();
    this.authService
        .getAuths(pageNumber.toString())
        .subscribe({
          next: simpleApisResult => {
            this.simpleAuthsResult = simpleApisResult;
            // console.log('ApisComponent.simpleApisResult: ' + JSON.stringify(this.simpleApisResult));
            this.dataSource = new MatTableDataSource(this.simpleAuthsResult.auths.content || []);
            // console.log('ApisComponent.simpleApisResult: #3');
          },
          complete: () => {
            this.setIsLoadingEnd();
          }
        });
  }

  @ConfirmationDialogMethod({
    question: (auth: SimpleAuth): string =>
        `Do you want to delete Auth params of API #${auth.id}`,

    resolveTitle: 'Delete',
    rejectTitle: 'Cancel'
  })
  delete(auth: SimpleAuth): void {
    this.authService
        .authDeleteCommit(auth.id.toString())
        .subscribe(v => this.getAuths(this.simpleAuthsResult.auths.number));
  }

  prevPage(): void {
    this.getAuths((this.simpleAuthsResult.auths.number - 1));
  }

  nextPage(): void {
    this.getAuths((this.simpleAuthsResult.auths.number + 1));
  }
}
