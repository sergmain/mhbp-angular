import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CtModule } from '../ct/ct.module';
import { MaterialAppModule } from '@src/app/ngmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RoleRouteGuard} from "@app/guards/role-route.guard";
import {Role} from "@services/authentication";
import {ScenarioGroupsComponent} from "./scenario-groups/scenario-groups.component";
import {ScenariosComponent} from "./scenarios/scenarios.component";
import {ScenarioGroupAddComponent} from "./scenario-group-add/scenario-group-add.component";
import {ScenarioAddComponent} from "@app/modules/scenario/scenario-add/scenario-add.component";
import {ScenarioStepsComponent} from "@app/modules/scenario/steps/scenario-steps.component";

export const ScenarioRoutes: Routes = [
    {
        path: '',
        component: ScenarioGroupsComponent
    },
    {
        path: 'scenario-group-add',
        component: ScenarioGroupAddComponent,
        data: {
            backConfig: ['../']
        }
    },
    {
        path: ':scenarioGroupId/scenario-add',
        component: ScenarioAddComponent,
        data: {
            backConfig: ['../', 'scenarios']
        }
    },
    {
        path: ':scenarioGroupId/scenarios',
        component: ScenariosComponent,
        canActivate: [RoleRouteGuard],
        data: {
            backConfig: ['../', '../', ''],
            requiredRoles: [Role.Admin]
        }
    },
    {
        path: ':scenarioGroupId/scenario/:scenarioId/steps',
        component: ScenariosComponent,
        canActivate: [RoleRouteGuard],
        data: {
            backConfig: ['../', '../', '../', '../', ''],
            requiredRoles: [Role.Admin]
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(ScenarioRoutes)],
    exports: [RouterModule],
    declarations: []
})
export class ScenarioGroupRoutingModule { }


@NgModule({
    imports: [
        CommonModule,
        ScenarioGroupRoutingModule,
        CtModule,
        MaterialAppModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild({})
    ],
    declarations: [
        ScenarioGroupsComponent, ScenariosComponent,
        ScenarioGroupAddComponent, ScenarioAddComponent,
        ScenarioStepsComponent
    ]
})
export class ScenarioModule { }