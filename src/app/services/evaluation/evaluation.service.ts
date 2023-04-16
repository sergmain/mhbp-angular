import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@src/environments/environment';
import {Observable} from 'rxjs';
import {SimpleEvaluationsResult} from './SimpleEvaluationsResult';
import {OperationStatusRest} from "@app/models/OperationStatusRest";
import {generateFormData} from "@app/helpers/generateFormData";


const url = (s: string): string => `${environment.baseUrl}dispatcher/evaluation/${s}`;

@Injectable({ providedIn: 'root' })
export class EvaluationService {
    constructor(
        private http: HttpClient
    ) { }

    getEvaluations(page: string): Observable<SimpleEvaluationsResult> {
        let newUrl = url('evaluations')
        console.log('Evaluation.newUrl: ' + newUrl);
        return this.http.get<SimpleEvaluationsResult>(newUrl, {params: {page}});
    }

    evaluationDeleteCommit(evaluationId: string): Observable<OperationStatusRest> {
        console.log("Delete evaluation #"+ evaluationId);
        return this.http.post<OperationStatusRest>(url(`evaluation-delete-commit`), generateFormData({ evaluationId: evaluationId }));
    }


}