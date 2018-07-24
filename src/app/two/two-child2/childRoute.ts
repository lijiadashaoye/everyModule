import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    NgModule
} from '@angular/core';

import {
    TwoChild2Component
} from './two-child2.component';
import {
    Cild1Component
} from './cild1/cild1.Component';
import {
    Cild2Component
} from './cild2/cild2.Component';
import {
    Cild3Component
} from './cild3/cild3.component';
import {
    Cild4Component
} from './cild4/cild4.component';

const child: Routes = [
    // 路由到twoChild2就直接加载Child2组件（子路由）,只有懒加载才可以这么用,而且必须放前边
    {
        path: '',
        redirectTo: 'Child1'
    },
    {
        path: '',
        component: TwoChild2Component,
        children: [{
                path: 'Child1',
                component: Cild1Component
            },
            {
                path: 'Child2',
                component: Cild2Component
            },
            {
                path: 'Child3',
                component: Cild3Component
            },
            {
                path: 'Child4',
                component: Cild4Component
            }
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
export class ChildRoute {}