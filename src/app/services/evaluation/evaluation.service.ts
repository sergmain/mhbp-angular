import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@src/environments/environment';
import {Observable} from 'rxjs';
import {SimpleEvaluationsResult} from './SimpleEvaluationsResult';


const url = (s: string): string => `${environment.baseUrl}dispatcher/evaluation/${s}`;

@Injectable({ providedIn: 'root' })
export class EvaluationService {
    constructor(
        private http: HttpClient
    ) { }

    getEvaluations(page: string): Observable<SimpleEvaluationsResult> {
        let newUrl = url('evaluations')
        console.log('EvaluationService.newUrl: ' + newUrl);
        return this.http.get<SimpleEvaluationsResult>(newUrl, {params: {page}});
    }
}