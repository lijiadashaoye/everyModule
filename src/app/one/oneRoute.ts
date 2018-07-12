import {
    NgModule
} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    OneComponent
} from './one.component';
import {
    OneChild1Component
} from './one-child1/one-child1.component';
import {
    OneChild2Component
} from './one-child2/one-child2.component';
import {
    OneChild3Component
} from './one-child3/one-child3.component';
import {
    OneChild4Component
} from './one-child4/one-child4.component';
import {
    OneGuard,
    CanLeaveGuard,
    resolveService,
    ResolveGuard,
    OneGuardService,
} from './routeGuard'
// 所有的路由守卫的判定，可以通过立即返回一个true或false，
// 也可以 Observable<boolean> 或 Promise<boolean>，
// 并且路由器会等待这个可观察对象被解析为 true 或 false。
const one: Routes = [{
    path: 'one',
    component: OneComponent,
    // canActivate: [OneGuard],
    // canActivateChild: [OneGuard],
    // canDeactivate: [OneGuard],      // 第一种写法，通过服务进行判断
    // canDeactivate: [CanLeaveGuard], // 第二种写法，通过对应的组件进行判断
    children: [{
            path: 'oneChild1',
            component: OneChild1Component,
            resolve: {
                resolveData: ResolveGuard
            },
        },
        {
            path: 'oneChild2',
            component: OneChild2Component
        },
        {
            path: 'oneChild3',
            component: OneChild3Component
        },
        {
            path: 'oneChild4',
            component: OneChild4Component
        },
    ]
}]

@NgModule({
    imports: [
        RouterModule.forChild(one)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        OneGuard,
        CanLeaveGuard,
        resolveService,
        ResolveGuard,
        ResolveGuard,
        OneGuardService
    ]
})
export class OneRoute {}