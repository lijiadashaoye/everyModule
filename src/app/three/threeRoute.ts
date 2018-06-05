import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreeComponent } from './three.component';
import { ThreeChild1Component } from './three-child1/three-child1.component';
import { ThreeChild2Component } from './three-child2/three-child2.component';

const three: Routes = [
    {
        path: '', 
        component: ThreeComponent,
        children: [
            { path: 'threeChild1', component: ThreeChild1Component },
            { path: 'threeChild2', component: ThreeChild2Component }
        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(three)
    ],
    exports: [
        RouterModule
    ]
})
export class ThreeRoute { }