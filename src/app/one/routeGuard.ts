import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from "@angular/router";
import { OneComponent } from "./one.component";
import { Observable } from "rxjs/Observable";

@Injectable()
export class OneGuardService {
  isLogin() {
    let login = sessionStorage.getItem("name");
    if (login) {
      alert(" canActivate");
      return true;
    } else {
      alert("clikc login canActivate");
      return false;
    }
  }
  toChild() {
    let canGo = sessionStorage.getItem("go");
    if (canGo) {
      alert("canActivateChild");
      return true;
    } else {
      alert("clikc toChild canActivateChild");
      return false;
    }
  }
  leave() {
    let canGo = sessionStorage.getItem("leave");
    if (canGo) {
      alert("canDeactivate");
      return true;
    } else {
      alert("clikc canLeave canDeactivate");
      return false;
    }
  }
}
@Injectable() // 是否可以打开页面的守卫
export class OneGuard implements CanActivate, CanActivateChild {
  constructor(private login: OneGuardService) {}
  canActivate(a: ActivatedRouteSnapshot, b: RouterStateSnapshot) {
    // console.log(a, b)
    return this.login.isLogin();
  }
  canActivateChild() {
    return this.login.toChild();
  }
  canDeactivate() {
    return this.login.leave();
  }
}

@Injectable() // 是否可以离开页面的路由守卫
export class CanLeaveGuard implements CanDeactivate<OneComponent> {
  canDeactivate(component: OneComponent) {
    return component.canLeave();
  }
}

@Injectable() // 用来定义怎么resolve数据的服务
export class resolveService {
  getData() {
    return ["这是resolve方法获得的数据", 1, 2];
  }
}
@Injectable() // 用来定义resolve服务
export class ResolveGuard implements Resolve<resolveService> {
  constructor(private resol: resolveService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    // console.log(route)
    // console.log(state.root)
    // state.root与route内容相同
    return this.resol.getData();
  }
}
