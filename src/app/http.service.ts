import { Observable } from "rxjs/Observable";
import { Injectable, Inject } from "@angular/core";
import { UserData } from "./two/two-child3/user-data.model";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
  HttpClient
} from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/shareReplay";

// 使用 InjectionToken 对字符串令牌进行包装，防止命名重复被覆盖
import { InjectionToken } from "@angular/core";
export const BASE_URL = new InjectionToken<string>("");
export const urlText = "/datas";

const HEADER = {
  headers: new Headers({
    "Content-Type": "application/json",
    token: "tokentokentokentoken"
  })
};

// 设置header ，angular6的方法
export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token",
    token: "tokentokentokentoken"
  })
};

@Injectable()
export class HttpService {
  constructor(
    @Inject(BASE_URL) private baseUrl,
    private http: Http, // 2~5的http模块
    private http2: HttpClient // 6的http模块
  ) {}
  // 不使用拦截器的
  toGet(id): Observable<UserData> {
    let url = this.baseUrl + `/${id}`; // 使用proxy代理重定向url
    // shareReplay用于避免发送重复请求
    return this.http
      .get(url)
      .map(res => res.json())
      .shareReplay();
  }

  //  Angular 会按照你提供它们的顺序应用这些拦截器。
  //  如果你提供拦截器的顺序是先 A，再 B，再 C，那么请求阶段的执行顺序就是 A->B->C，
  //  而响应阶段的执行顺序则是 C->B->A。
  //  使用了拦截器的
  toGet2(id): Observable<any> {
    let url = this.baseUrl + `/${id}`; // 使用proxy代理重定向url
    // shareReplay用于避免发送重复请求
    return this.http2.get(
      url
      //   ,{
      //       reportProgress: true
      //   }
    );
  }

  // ngrx：
  // createItem(item) {  // post请求，要记得加上 header
  //     let url = this.baseUrl + `/${item}`;
  //     this.http.post(`${url}`, JSON.stringify(item), HEADER)
  //         .map(res => res.json())
  //         .map(payload => ({ type: 'ADD_ITEMS', payload }))
  //         .subscribe(action => this.store.dispatch(action));
  // }
  directiveHttp(data) {
    let url = `http://localhost:3000/fromDirective`; // 使用proxy代理重定向url
    httpOptions.headers = httpOptions.headers
      .set(
        // 可以这样在每个post请求里添加、修改headers
        "kkkkkk",  // 添加
        "33333333hdfgh33333"
      )
      .set("token", "sadfasdfasdfasdf");  // 修改
    return this.http.post(url, JSON.stringify(data), HEADER);
  }
}
