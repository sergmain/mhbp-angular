import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@src/environments/environment';
import {Observable} from 'rxjs';
import {SimpleApisResult} from './SimpleApisResult';
import {OperationStatusRest} from "@app/models/OperationStatusRest";
import {generateFormData} from "@app/helpers/generateFormData";
import {FormControl, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {AccountResult} from "@services/accounts";
import {SimpleApiResult} from "@services/api/SimpleApiResult";


const url = (s: string): string => `${environment.baseUrl}dispatcher/api/${s}`;

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(
        private http: HttpClient
    ) { }

    getApis(page: string): Observable<SimpleApisResult> {
        let newUrl = url('apis')
        console.log('ApiService.newUrl: ' + newUrl);
        return this.http.get<SimpleApisResult>(newUrl, {params: {page}});
    }

    getApi(id: string): Observable<SimpleApiResult> {
        return this.http.get<SimpleApiResult>(url(`api/${id}`));
    }

    apiDeleteCommit(apiId: string): Observable<OperationStatusRest> {
        console.log("Delete API scheme #"+ apiId);
        return this.http.post<OperationStatusRest>(url(`api-delete-commit`), generateFormData({ id: apiId }));
    }

    runEvaluation(apiId: string) {
        console.log("Run evaluation for API scheme #"+ apiId);
        return this.http.post<OperationStatusRest>(url(`run-evaluation`), generateFormData({ id: apiId }));
    }

    addFormCommit(name: string, code: string, params: string, scheme: string): Observable<OperationStatusRest> {
        return this.http.post<OperationStatusRest>(
            url(`api-add-commit`),
            generateFormData({
                name, code, params, scheme
            })
        );
    }

    editFormCommit = (id: string, params: string): Observable<OperationStatusRest> =>
        this.http.post<OperationStatusRest>(
            url(`api-edit-commit/${id}`),
            generateFormData({
                params
            }))

}