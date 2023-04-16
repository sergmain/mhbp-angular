import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CtModule } from '../ct/ct.module';
import { MaterialAppModule } from '@src/app/ngmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SessionsComponent } from './sessions/sessions.component';

export const SessionRoutes: Routes = [
    {
        path: '',
        component: SessionsComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(SessionRoutes)],
    exports: [RouterModule],
    declarations: []
})
export class SessionRoutingModule { }


@NgModule({
    imports: [
        CommonModule,
        SessionRoutingModule,
        CtModule,
        MaterialAppModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild({})
    ],
    declarations: [
        SessionsComponent
    ]
})
export class SessionModule { }