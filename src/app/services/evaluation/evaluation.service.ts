import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { from, Observable, of, Subscription } from 'rxjs';
import { SimpleEvaluationsResult } from './SimpleEvaluationsResult';


const url = (s: string): string => `${environment.baseUrl}dispatcher/evaluation/${s}`;

interface ProcessableItem {
    id: string;
    companyId: string;
    response: HttpResponse<Blob>;
    fileName: string;
}

@Injectable({ providedIn: 'root' })
export class EvaluationService {
    constructor(
        private http: HttpClient
    ) { }

    evaluations = (page: string): Observable<SimpleEvaluationsResult> => {
        let newUrl = url('evaluations')
        console.log('newUrl: ' + newUrl);
        return this.http.get<SimpleEvaluationsResult>(newUrl, {params: {page}});
    }


}