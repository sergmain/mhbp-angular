import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CtModule } from '../ct/ct.module';
import { MaterialAppModule } from '@src/app/ngmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EvaluationsComponent } from './evaluations/evaluations.component';

export const EvaluationRoutes: Routes = [
    {
        path: '',
        component: EvaluationsComponent,
    },
    {
        path: 'evaluations',
        component: EvaluationsComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(EvaluationRoutes)],
    exports: [RouterModule],
    declarations: []
})
export class EvaluationRoutingModule { }


@NgModule({
    imports: [
        CommonModule,
        EvaluationRoutingModule,
        CtModule,
        MaterialAppModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild({})
    ],
    declarations: [
        EvaluationsComponent
    ]
})
export class EvaluationModule { }