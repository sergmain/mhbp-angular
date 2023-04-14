import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CtModule } from '../ct/ct.module';
import { MaterialAppModule } from '@src/app/ngmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AuthsComponent} from './auths/auths.component';
import {AuthEditComponent} from "@app/modules/auth/auth-edit/auth-edit.component";
import {AuthAddComponent} from "@app/modules/auth/auth-add/auth-add.component";

export const AuthRoutes: Routes = [
    {
        path: '',
        component: AuthsComponent
    },
    {
        path: 'add',
        component: AuthAddComponent,
        data: {
            backConfig: ['../']
        }
    },
    {
        path: 'params-edit',
        component: AuthEditComponent,
        data: {
            backConfig: ['../']
        }
    },
];


@NgModule({
    imports: [RouterModule.forChild(AuthRoutes)],
    exports: [RouterModule],
    declarations: []
})
export class AuthRoutingModule { }


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        CtModule,
        MaterialAppModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild({})
    ],
    declarations: [
        AuthsComponent, AuthAddComponent, AuthEditComponent
    ]
})
export class AuthModule { }