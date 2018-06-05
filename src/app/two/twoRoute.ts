import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    NgModule
} from '@angular/core';
import {
    TwoComponent
} from './two.component';
import {
    TwoChild1Component
} from './two-child1/two-child1.component';
import {
    TwoChild3Component
} from './two-child3/two-child3.component';
import {
    TwoChild4Component
} from './two-child4/two-child4.component';

const two: Routes = [{
    path: '',
    component: TwoComponent,
    children: [{
            path: 'twoChild1',
            component: TwoChild1Component
        },
        {
            path: 'twoChild2',
            loadChildren: 'app/two/two-child2/childModule#ChildModule'
        },
        {
            path: 'twoChild3',
            component: TwoChild3Component
        },
        {
            path: 'twoChild4',
            component: TwoChild4Component
        },
    ]
}]
@NgModule({
    imports: [
        RouterModule.forChild(two)
    ],
    exports: [
        RouterModule
    ]
})
export class TwoRoute {}