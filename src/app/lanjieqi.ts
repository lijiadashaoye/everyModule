import {
    Injectable
} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {
    Observable
} from 'rxjs';
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> { // 拦截请求前：在此处可以处理请求头；例如Content-type// 此处也可以加loading的监听// 我这里是有2个不同的服务器地址
        let headerOptions;
        if (req.url.indexOf('upload/bytes') > -1) {
            headerOptions = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                token: 'tokentokentokentoken'
            };
        } else {
            headerOptions = {
                'Content-Type': 'application/json;charset=UTF-8',
                token: 'tokentokentokentoken'
            };
        }
        let reqOptions = {
            headers: new HttpHeaders(headerOptions),
            withCredentials: true,
            reportProgress: true // 报告进度
        };
        const authReq = req.clone(reqOptions); //发送新请求头的http请求;
        return next.handle(authReq)
            .do((event: HttpEvent < any > ) => { // 拦截请求后：正常处理，但不影响数据返回，因为用了 do
                    console.log(event) // 可以用来写进度条
                },
                (err: any) => { //拦截请求后：错误处理
                    return Observable.throw(err);
                }
            )
    }
}