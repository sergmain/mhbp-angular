import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UIStateComponent } from '@src/app/models/UIStateComponent';
import { AuthenticationService } from '@src/app/services/authentication';
import {SessionService} from "@services/session/session.service";
import {ErrorsResult} from "@services/session/ErrorsResult";
import {SimpleError} from "@services/session/SimpleError";

@Component({
    selector: 'errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.sass']
})
export class ErrorsComponent extends UIStateComponent implements OnInit {
    dataSource: MatTableDataSource<SimpleError> = new MatTableDataSource<SimpleError>([]);
    columnsToDisplay: string[] = ['id', 'isEnabled', 'login', 'publicName', 'role', 'createdOn'];
    errorsResult: ErrorsResult;
    sessionId: string;

    constructor(
        private sessionService: SessionService,
        private activatedRoute: ActivatedRoute,
        readonly authenticationService: AuthenticationService
    ) {
        super(authenticationService);
    }

    ngOnInit(): void {
        this.sessionId = this.activatedRoute.snapshot.paramMap.get('sessionId');
        this.updateTable(0);
    }

    updateTable(page: number): void {
        this.setIsLoadingStart();
        this.sessionService
            .errors(page.toString(), this.sessionId)
            .subscribe({
                next: accountsResult => {
                    this.errorsResult = accountsResult;
                    this.dataSource = new MatTableDataSource(this.errorsResult.errors.content || []);
                },
                complete: () => {
                    this.setIsLoadingEnd();
                }
            });
    }

    nextPage(): void {
        this.updateTable(this.errorsResult.errors.number + 1);
    }

    prevPage(): void {
        this.updateTable(this.errorsResult.errors.number - 1);
    }
}
