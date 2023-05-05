import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@src/environments/environment';
import {Observable} from 'rxjs';
import {SimpleScenarioGroupsResult} from './SimpleScenarioGroupsResult';
import {OperationStatusRest} from "@app/models/OperationStatusRest";
import {generateFormData} from "@app/helpers/generateFormData";
import {ScenariosResult} from "@services/scenario/ScenariosResult";
import {EvaluationUidsForCompany} from "@services/evaluation/EvaluationUidsForCompany";
import {ScenarioUidsForAccount} from "@services/scenario/ScenarioUidsForAccount";


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
        return this.http.post<OperationStatusRest>(url(`scenario-group-delete-commit`), generateFormData({ scenarioGroupId: scenarioGroupId }));
    }

    scenarios = (page: string, scenarioGroupId: string): Observable<ScenariosResult> =>
        this.http.get<ScenariosResult>(url(`scenarios/${scenarioGroupId}`), { params: { page } })


    addScenarioGroupFormCommit(name: string, description: string): Observable<OperationStatusRest> {
        return this.http.post<OperationStatusRest>(
            url(`scenario-group-add-commit`),
            generateFormData({
                name, description
            })
        );
    }

    addScenarioFormCommit(scenarioGroupId: string, name: string, description: string, apiId: string): Observable<OperationStatusRest> {
        return this.http.post<OperationStatusRest>(
            url(`scenario-add-commit`),
            generateFormData({
                scenarioGroupId, name, description, apiId
            })
        );
    }

    scenarioDeleteCommit(scenarioId: string): Observable<OperationStatusRest> {
        console.log("Delete Scenario #"+ scenarioId);
        return this.http.post<OperationStatusRest>(url(`scenario-delete-commit`), generateFormData({ scenarioId: scenarioId }));
    }

    scenarioAdd(): Observable<ScenarioUidsForAccount> {
        return this.http.get<ScenarioUidsForAccount>(url(`scenario-add`));
    }

}