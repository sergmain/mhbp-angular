import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AddFunctionComponent } from './add-function/add-function.component';
import { FunctionsComponent } from './functions/functions.component';
import { MaterialAppModule } from '@src/app/ngmaterial.module';
import { CtModule } from '../ct/ct.module';


export const FunctionsRoutes: Routes = [
    {
        path: '',
        component: FunctionsComponent,
    }, {
        path: 'add',
        component: AddFunctionComponent,
        data: {
            backConfig: ['../']
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(FunctionsRoutes)],
    exports: [RouterModule]
})
export class FunctionsRoutingModule { }


@NgModule({
    imports: [
        CommonModule,
        FunctionsRoutingModule,
        CtModule,
        MaterialAppModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild({})
    ],
    declarations: [
        AddFunctionComponent,
        FunctionsComponent
    ]
})
export class FunctionsModule { }