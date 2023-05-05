import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DispatcherIndexComponent } from './dispatcher-index/dispatcher-index.component';
import { DispatcherRootComponent } from './dispatcher-root/dispatcher-root.component';
import { MaterialAppModule } from '@src/app/ngmaterial.module';
import { TranslateModule } from '@ngx-translate/core';
import { CtModule } from '../ct/ct.module';
import { CopyRightModule } from '../copy-right/copy-right.module';
import { Role } from '@src/app/services/authentication';
import { RoleRouteGuard } from '@src/app/guards/role-route.guard';
import {ScenarioModule} from "@app/modules/scenario/scenario.module";


const commonRequiredRoles: Role[] = [
    Role.MainAssetManager,
    Role.MainAdmin,
    Role.MainOperator,
    Role.MainSupport,
    Role.Admin,
    Role.Data,
    Role.Manager,
];


export const DispatcherRoutes: Routes = [
    {
        path: '',
        canActivate: [RoleRouteGuard],
        component: DispatcherRootComponent,
        data: {
            requiredRoles: commonRequiredRoles
        },
        children: [
            {
                path: '',
                component: DispatcherIndexComponent
            }]
    },
    {
        path: 'scenario',
        canActivate: [RoleRouteGuard],
        component: DispatcherRootComponent,
        loadChildren: () => import('@app/modules/scenario/scenario.module').then(m => m.ScenarioModule),
        data: {
            requiredRoles: [Role.MainAdmin, Role.MainOperator, Role.MainSupport, Role.Manager],
            section: 'scenario-groups'
        }
    },
    {
        path: 'session',
        canActivate: [RoleRouteGuard],
        component: DispatcherRootComponent,
        loadChildren: () => import('@app/modules/session/session.module').then(m => m.SessionModule),
        data: {
            requiredRoles: [Role.MainAdmin, Role.MainOperator, Role.MainSupport, Role.Manager],
            section: 'sessions'
        }
    },
    {
        path: 'evaluation',
        canActivate: [RoleRouteGuard],
        component: DispatcherRootComponent,
        loadChildren: () => import('@app/modules/evaluation/evaluation.module').then(m => m.EvaluationModule),
        data: {
            requiredRoles: [Role.MainAdmin, Role.MainOperator, Role.MainSupport, Role.Manager],
            section: 'evaluations'
        }
    },
    {
        path: 'kb',
        canActivate: [RoleRouteGuard],
        component: DispatcherRootComponent,
        loadChildren: () => import('src/app/modules/kb/kb.module').then(m => m.KbModule),
        data: {
            requiredRoles: [Role.MainAdmin, Role.MainOperator, Role.MainSupport, Role.Manager],
            section: 'kbs'
        }
    },
    {
        path: 'auth',
        canActivate: [RoleRouteGuard],
        component: DispatcherRootComponent,
        loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule),
        data: {
            requiredRoles: [Role.MainAdmin, Role.MainOperator, Role.MainSupport, Role.Manager],
            section: 'auths'
        }
    },
    {
        path: 'api',
        canActivate: [RoleRouteGuard],
        component: DispatcherRootComponent,
        loadChildren: () => import('src/app/modules/api/api.module').then(m => m.ApiModule),
        data: {
            requiredRoles: [Role.MainAdmin, Role.MainOperator, Role.MainSupport, Role.Manager],
            section: 'apis'
        }
    },
    {
        path: 'accounts',
        canActivate: [RoleRouteGuard],
        component: DispatcherRootComponent,
        loadChildren: () => import('src/app/modules/accounts/accounts.module').then(m => m.AccountsModule),
        data: {
            requiredRoles: [Role.Admin],
            section: 'accounts'
        }
    },
    {
        path: 'company',
        canActivate: [RoleRouteGuard],
        component: DispatcherRootComponent,
        loadChildren: () => import('src/app/modules/company/company.module').then(m => m.CompnyModule),
        data: {
            requiredRoles: [Role.MainAdmin, Role.MainOperator, Role.MainSupport],
            section: 'company'
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(DispatcherRoutes)],
    exports: [RouterModule],
})
export class DispatcherRoutingModule { }


@NgModule({
    declarations: [
        DispatcherRootComponent,
        DispatcherIndexComponent
    ],
    imports: [
        CommonModule,
        DispatcherRoutingModule,

        CtModule,
        CopyRightModule,
        MaterialAppModule,
        TranslateModule.forChild({})
    ]
})
export class DispatcherModule { }
