import { Injectable } from '@angular/core';
import {
    CanActivate, CanActivateChild, CanDeactivate, Router,
    ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { OneComponent } from './one.component';

@Injectable()
export class OneGuardService {
    isLogin() {
        let login = sessionStorage.getItem('name');
        if (login) {
            return true
        } else {
            alert('clikc login');
            return false
        }
    }
    toChild() {
        let canGo = sessionStorage.getItem('go');
        if (canGo) {
            return true
        } else {
            alert('clikc toChild');
            return false
        }
    }
    leave() {
        let canGo = sessionStorage.getItem('leave');
        if (canGo) {
            return true
        } else {
            alert('clikc canLeave');
            return false
        }
    }
}
@Injectable()
export class OneGuard implements CanActivate, CanActivateChild {
    constructor(private login: OneGuardService) {

    }
    canActivate(a: ActivatedRouteSnapshot, b: RouterStateSnapshot) {
        // console.log(a, b)
        return this.login.isLogin()
    }
    canActivateChild() {
        return this.login.toChild()
    }
    canDeactivate() {
        return this.login.leave()
    }
}

@Injectable()  // 是否可以离开页面的路由守卫
export class CanLeaveGuard implements CanDeactivate<OneComponent> {
    canDeactivate(component: OneComponent) {
        return component.canLeave();
    }
}