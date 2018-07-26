import {
    Routes,
    RouterModule,
    CanLoad,
    Route,
    ActivatedRoute,
    Router,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
    RoutesRecognized,
    PreloadingStrategy      // 路由预加载，步骤一
} from '@angular/router';

import {
    NgModule
} from '@angular/core';
import {
    OneComponent
} from './one/one.component';
import {
    PageNotFoundComponent
} from './page-not-found/page-not-found.component';
import {
    Injectable
} from '@angular/core';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/of'
import {
    PopupComponent
} from './popup/popup.component';

@Injectable() //  异步导航到某特性模块的情况
export class canLoadGuard implements CanLoad {
    canLoad(
        route: Route
    ): Observable<boolean> | Promise<boolean> | boolean {
        return confirm('CanLoad three')
    }
}

const main: Routes = [{
    path: 'one',
    component: OneComponent
},
{
    path: 'two',
    loadChildren: 'app/two/twoModule#TwoModule',
    data: {
        preload: true
    }
},
{
    path: 'two/:id',
    loadChildren: 'app/two/twoModule#TwoModule',
    data: {
        preload: true      // 路由预加载，步骤五
    }
},
{
    path: 'three',
    loadChildren: 'app/three/threeModule#ThreeModule',
    data: {
        preload: true
    }
    // canLoad: [canLoadGuard]
},
{
    path: '',
    redirectTo: 'one',
    pathMatch: 'full'
},
{
    path: '**',
    component: PageNotFoundComponent
},
{ // 小广告弹出框1
    path: 'compose1',
    component: PopupComponent,
    outlet: 'popup1',
    data: {
        data: '1'
    }
},
{ // 小广告弹出框2
    path: 'compose2',
    component: PopupComponent,
    outlet: 'popup2',
    data: {
        data: '2'
    }
},
{ // 小广告弹出框2
    path: 'compose3',
    component: PopupComponent,
    outlet: 'popup3',
}
]

// 路由预加载，步骤二
@Injectable()
export class MyPreloadingStrategy implements PreloadingStrategy {
    constructor(private route: ActivatedRoute, private router: Router) {
        //可以注入 router route 任何其他 service，来执行一些其他操作，比如路由事件
    }
    preload(route: Route, load: () => Observable<any>): Observable<any> {

        // ng 会把每一个 lazyload 的 module 丢进来这个函数, 问问你是否要 preload, 
        // 如果要, 你就返回 load() 不要 preload 的话就返回 Observable.of(null); 
        if (route.data && route.data['preload']) {
            return load();
        } else {
            return Observable.of(null);
        }
    }
}
@NgModule({
    imports: [
        // RouterModule.forRoot(main)  // 使用路由懒加载策略
        RouterModule.forRoot(main, {    // 使用路由预加载测略，步骤三
            preloadingStrategy: MyPreloadingStrategy,
            // useHash: true
        })
    ],
    exports: [
        RouterModule
    ],
    providers: [
        canLoadGuard,
        MyPreloadingStrategy    // 路由预加载，步骤四
    ]
})
export class MainRoute {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
        // 路由事件，任何一个路由的变更都会触发
        // router.events.subscribe(event => {
        //     // 本事件会在路由开始时触发。顺序为1
        //     if (event instanceof NavigationStart) {
        //         console.log('NavigationStart', event)
        //     }
        //     // 本事件会在路由器解析完 URL，并识别出了相应的路由时触发。顺序为2
        //     if (event instanceof RoutesRecognized) {
        //         console.log('RoutesRecognized', event)
        //     }
        //     // 本事件会在导航成功结束之后触发。顺序为3
        //     if (event instanceof NavigationEnd) {
        //         console.log('NavigationEnd', event)
        //     }
        //     // 这个事件会在导航由于意料之外的错误而失败时触发。
        //     if (event instanceof NavigationError) {
        //         console.log('NavigationError', event)
        //     }
        // })
    }
}