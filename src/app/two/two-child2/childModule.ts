import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"

import { ChildRoute } from './childRoute';
import { TwoChild2Component } from './two-child2.component';
import { Cild1Component } from './cild1/cild1.Component';
import { Cild2Component } from './cild2/cild2.Component';
import { Cild3Component } from './cild3/cild3.component';
import { Cild4Component } from './cild4/cild4.component';
@NgModule({
    imports: [
        CommonModule,
        ChildRoute,
        FormsModule,
    ],
    declarations: [
        TwoChild2Component,
        Cild1Component,
        Cild2Component,
        Cild3Component,
        Cild4Component,
    ],
    providers: [
       
    ],
    entryComponents: [

    ]
})
export class ChildModule { }