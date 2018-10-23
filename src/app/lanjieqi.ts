import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { Observable } from "rxjs";
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  // 拦截请求前：在此处可以处理请求头；例如Content-type
  // 此处也可以加loading的监听
  // 我这里是有2个不同的服务器地址
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /*****************************************************************/
    let headerOptions;
    if (req.url.indexOf("upload/bytes") > -1) {
      headerOptions = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        token: "tokentokentokentoken"
      };
    } else {
      headerOptions = {
        "Content-Type": "application/json;charset=UTF-8",
        token: "tokentokentokentoken"
      };
    }

    /*****************************************************************/
    // 拦截器可以注册在任何模块里，而一个网络请求所经过拦截器从模块向上查找至根模块，若一个模块包含多个拦截器时按代码顺序执行。
    // 拦截器核心功能实现部分
    // 拦截器返回的结果是一个 Observable 值
    let reqOptions = {
      // 向拦截器里添加更多有关http的数据
      // headers: new HttpHeaders(headerOptions),  // 如果http服务里没添加header，可以在拦截器里统一添加
      headers: req.headers.set("Authorization", "authToken"), // 如果http服务里添加了header，可以在拦截器里以这种方式修改
      withCredentials: true,
      reportProgress: true // 报告进度
    };
    let authReq = req.clone(reqOptions); //发送新请求头的http请求;
    let authReq2 = req.clone({
      // 只设置header时的简写方法
      setHeaders: { Authorization: "authToken3333333333" }
    });
    return next.handle(authReq).do(
      (event: HttpEvent<any>) => {
        // 拦截请求后：正常处理，但不影响数据返回，因为用了 do
        console.log(event); // 可以用来写进度条
        console.log("拦截器pipe里的操作"); // 可以用来写进度条
      },
      (err: any) => {
        //拦截请求后：错误处理
        return Observable.throw(err);
      }
    );
  }
}
