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
  RoutesRecognized
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
import {
  PopupComponent
} from './popup/popup.component';

@Injectable() //  异步导航到某特性模块的情况
export class canLoadGuard implements CanLoad {
  canLoad(
    route: Route
  ): Observable < boolean > | Promise < boolean > | boolean {
    return confirm('CanLoad three')
  }
}

const main: Routes = [{
    path: 'one',
    component: OneComponent
  },
  {
    path: 'two',
    loadChildren: 'app/two/twoModule#TwoModule'
  },
  {
    path: 'two/:id',
    loadChildren: 'app/two/twoModule#TwoModule'
  },
  {
    path: 'three',
    loadChildren: 'app/three/threeModule#ThreeModule',
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
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(main)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    canLoadGuard
  ]
})
export class MainRoute {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // router.events.subscribe(event => {
    //   // 本事件会在导航开始时触发。顺序为1
    //   if (event instanceof NavigationStart) {
    //     console.log(event)
    //   }
    //   // 本事件会在路由器解析完 URL，并识别出了相应的路由时触发。顺序为2
    //   if (event instanceof RoutesRecognized) {
    //     console.log(event)
    //   }
    //   // 本事件会在导航成功结束之后触发。顺序为3
    //   if (event instanceof NavigationEnd) {
    //     console.log(event)
    //   }
    //   // 这个事件会在导航由于意料之外的错误而失败时触发。
    //   if (event instanceof NavigationError) {
    //     console.log(event)
    //   }

    // })
  }
}
