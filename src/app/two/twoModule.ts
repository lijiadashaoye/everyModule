import {
    CommonModule
} from '@angular/common';
import {
    NgModule
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

import {
    TwoChild1Component
} from './two-child1/two-child1.component';
import {
    TwoComponent
} from './two.component';
import {
    TwoRoute
} from './twoRoute';
import {
    TwoChild3Component
} from './two-child3/two-child3.component';
import {
    TwoChild4Component
} from './two-child4/two-child4.component';
import { Cild5Component } from './two-child3/cild5/cild5.component';
import { MediaLearnComponent } from './two-child3/media-learn/media-learn.component';

@NgModule({
    imports: [
        CommonModule,
        TwoRoute,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        TwoComponent,
        TwoChild1Component,
        TwoChild3Component,
        TwoChild4Component,
        Cild5Component,
        MediaLearnComponent
    ],
    providers: []
})
export class TwoModule { }