import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';

// 这个无操作的拦截器，会直接使用原始的请求调用 next.handle()，并返回它返回的可观察对象，而不做任何后续处理
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
            console.log(req)
            console.log(next)
        return next.handle(req);
    }
}