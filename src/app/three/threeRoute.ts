import {
    NgModule
} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    ThreeComponent
} from './three.component';
import {
    ThreeChild1Component
} from './three-child1/three-child1.component';
import {
    ThreeChild2Component
} from './three-child2/three-child2.component';
import { ThreeChild3Component } from './three-child3/three-child3.component';


const three: Routes = [
    // 路由到three就直接加载threeChild1组件（子路由）,只有懒加载才可以这么用,而且必须放前边
    {
        path: '',
        redirectTo: 'threeChild1'
    },
    {
        path: '',
        component: ThreeComponent,
        children: [{
                path: 'threeChild1',
                component: ThreeChild1Component
            },
            {
                path: 'threeChild2',
                component: ThreeChild2Component
            },
            {
                path: 'threeChild3',
                component: ThreeChild3Component
            }
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
export class ThreeRoute {}