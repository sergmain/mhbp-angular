import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadStates } from '@app/enums/LoadStates';
import {SimpleApi} from "@services/api/SimpleApi";
import {ApiService} from "@services/api/api.service";

@Component({
    selector: 'api-params-edit',
    templateUrl: './api-params-edit.component.html',
    styleUrls: ['./api-params-edit.component.scss']
})

export class ApiParamsEditComponent implements OnInit {
    readonly states = LoadStates;
    currentStates = new Set();
    response;
    api: SimpleApi;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService,
        private location: Location
    ) { }

    ngOnInit() {
        this.currentStates.add(this.states.firstLoading);
        this.getApi();
    }

    getApi(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.apiService
            .getApi(id)
            .subscribe(
                (response) => {
                    this.api = response.api;
                },
                () => { },
                () => {
                    this.currentStates.delete(this.states.firstLoading);
                }
            );
    }

    back() {
        this.location.back();
    }

    save() {
        this.currentStates.add(this.states.wait);
        this.apiService
            .editFormCommit(this.api.id.toString(), this.api.params)
            .subscribe(
                (response) => {
                    this.router.navigate(['/dispatcher', 'accounts']);
                },
                () => { },
                () => {
                    this.currentStates.delete(this.states.wait);
                }
            );
    }
}