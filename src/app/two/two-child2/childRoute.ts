import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TwoChild2Component } from './two-child2.component';
import { Cild1Component } from './cild1/cild1.Component';
import { Cild2Component } from './cild2/cild2.Component';
import { Cild3Component } from './cild3/cild3.component';
import { Cild4Component } from './cild4/cild4.component';
import { Cild5Component } from './cild5/cild5.component';


const child: Routes = [
    {
        path: '', component: TwoChild2Component,
        children: [
            { path: 'Child1', component: Cild1Component },
            { path: 'Child2', component: Cild2Component },
            { path: 'Child3', component: Cild3Component },
            { path: 'Child4', component: Cild4Component },
            { path: 'Child5', component: Cild5Component }
        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(child)
    ],
    exports: [
        RouterModule
    ]
})
export class ChildRoute { }