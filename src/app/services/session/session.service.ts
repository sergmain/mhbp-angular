import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@src/environments/environment';
import {Observable} from 'rxjs';
import {SimpleSessionsResult} from './SimpleSessionsResult';
import {OperationStatusRest} from "@app/models/OperationStatusRest";
import {generateFormData} from "@app/helpers/generateFormData";


const url = (s: string): string => `${environment.baseUrl}dispatcher/session/${s}`;

@Injectable({ providedIn: 'root' })
export class SessionService {
    constructor(
        private http: HttpClient
    ) { }

    getEvaluations(page: string): Observable<SimpleSessionsResult> {
        let newUrl = url('sessions')
        console.log('SessionService.newUrl: ' + newUrl);
        return this.http.get<SimpleSessionsResult>(newUrl, {params: {page}});
    }

    sessionDeleteCommit(sessionId: string): Observable<OperationStatusRest> {
        console.log("Delete session #"+ sessionId);
        return this.http.post<OperationStatusRest>(url(`session-delete-commit`), generateFormData({ sessionId: sessionId }));
    }


}