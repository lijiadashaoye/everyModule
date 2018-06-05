import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { OneComponent } from './one.component';
import { OneChild1Component } from './one-child1/one-child1.component';
import { OneChild2Component } from './one-child2/one-child2.component';
import { OneRoute } from './oneRoute';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from './one-child1/directive';
import { OneChild3Component } from './one-child3/one-child3.component';
import { OneChild4Component } from './one-child4/one-child4.component';
import { OneChild3ChildComponent } from './one-child3/one-child3-child/one-child3-child.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlyingHeroes } from './one-child1/pip';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OneRoute,
        BrowserAnimationsModule
    ],
    declarations: [
        OneComponent,
        OneChild1Component,
        OneChild2Component,
        OneChild3Component,
        OneChild4Component,
        OneChild3ChildComponent,
        HighlightDirective,
        FlyingHeroes,
    ]
})
export class OneModule { }