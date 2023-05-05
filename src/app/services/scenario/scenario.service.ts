import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@src/environments/environment';
import {Observable} from 'rxjs';
import {SimpleScenarioGroupsResult} from './SimpleScenarioGroupsResult';
import {OperationStatusRest} from "@app/models/OperationStatusRest";
import {generateFormData} from "@app/helpers/generateFormData";
import {ScenariosResult} from "@services/scenario/ScenariosResult";


const url = (s: string): string => `${environment.baseUrl}dispatcher/scenario/${s}`;

@Injectable({ providedIn: 'root' })
export class ScenarioService {
    constructor(
        private http: HttpClient
    ) { }

    getScenarioGroups(page: string): Observable<SimpleScenarioGroupsResult> {
        let newUrl = url('scenario-groups')
        console.log('ScenarioService.newUrl: ' + newUrl);
        return this.http.get<SimpleScenarioGroupsResult>(newUrl, {params: {page}});
    }

    scenarioGroupDeleteCommit(scenarioGroupId: string): Observable<OperationStatusRest> {
        console.log("Delete Scenario Group #"+ scenarioGroupId);
        return this.http.post<OperationStatusRest>(url(`scenario-group-delete-commit`), generateFormData({ sessionId: scenarioGroupId }));
    }

    scenarios = (page: string, scenarioGroupId: string): Observable<ScenariosResult> =>
        this.http.get<ScenariosResult>(url(`scenarios/${scenarioGroupId}`), { params: { page } })


    addScenarioGroupFormCommit(code: string, description: string): Observable<OperationStatusRest> {
        return this.http.post<OperationStatusRest>(
            url(`scenario-group-add-commit`),
            generateFormData({
                code, description
            })
        );
    }

    addScenarioFormCommit(scenarioGroupId: number, code: string, description: string): Observable<OperationStatusRest> {
        return this.http.post<OperationStatusRest>(
            url(`scenario-add-commit`),
            generateFormData({
                scenarioGroupId, code, description
            })
        );
    }

    scenarioDeleteCommit(scenarioId: string): Observable<OperationStatusRest> {
        console.log("Delete Scenario #"+ scenarioId);
        return this.http.post<OperationStatusRest>(url(`scenario-delete-commit`), generateFormData({ scenarioId: scenarioId }));
    }

}