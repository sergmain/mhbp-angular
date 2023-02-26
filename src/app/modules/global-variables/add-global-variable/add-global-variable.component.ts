import { Component } from '@angular/core';
import { OperationStatusRest } from '@src/app/models/OperationStatusRest';
import { Router, ActivatedRoute } from '@angular/router';
import { OperationStatus } from '@src/app/enums/OperationStatus';

@Component({
    selector: 'app-add-global-variable',
    templateUrl: './add-global-variable.component.html',
    styleUrls: ['./add-global-variable.component.scss']
})

export class AddGlobalVariableComponent {
    addVariableResponse: OperationStatusRest;
    addVariableStorageResponse: OperationStatusRest;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    updateStatusAfterAddVarible(response: OperationStatusRest): void {
        if (response.status !== OperationStatus.OK) {
            this.addVariableResponse = response;
        } else {
            this.back();
        }
    }

    updateStatusAfterAddVaribleStorage(response: OperationStatusRest): void {
        if (response.status !== OperationStatus.OK) {
            this.addVariableStorageResponse = response;
        } else {
            this.back();
        }
    }

    back(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}