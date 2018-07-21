import {
    Observable
} from 'rxjs/Observable';

import {
    Injectable,
    Inject
} from '@angular/core';
import {
    UserData
} from './two/two-child3/user-data.model';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpHeaders,
    HttpErrorResponse,
    HttpClient
} from '@angular/common/http';
import {
    Http,
    Headers
} from '@angular/http';
import 'rxjs/add/operator/shareReplay';

// 使用 InjectionToken 对字符串令牌进行包装，防止命名重复被覆盖
import {
    InjectionToken
} from '@angular/core';
export const BASE_URL = new InjectionToken < string > ('');
export const urlText = '/datas';

const HEADER = {
    headers: new Headers({
        'Content-Type': 'application/json',
        token: 'tokentokentokentoken'
    })
};

// 设置header ，angular5+的方法
export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class HttpService {
    constructor(
        @Inject(BASE_URL) private baseUrl,
        private http: Http,
        private http2: HttpClient
    ) {}
    // 不使用拦截器的
    toGet(id): Observable < UserData > {
        let url = this.baseUrl + `/${id}`; // 使用proxy代理重定向url
        // shareReplay用于避免发送重复请求
        return this.http.get(url)
            .map(res => res.json()).shareReplay()
    }
    // 使用了拦截器的
    toGet2(id): Observable < any > {
        let url = this.baseUrl + `/${id}`; // 使用proxy代理重定向url
        // shareReplay用于避免发送重复请求
        return this.http2.get(url, 
        //     {
        //     reportProgress: true
        // }
    )
    }

    // ngrx：
    // createItem(item) {  // post请求，要记得加上 header
    //     let url = this.baseUrl + `/${item}`;
    //     this.http.post(`${url}`, JSON.stringify(item), HEADER)
    //         .map(res => res.json())
    //         .map(payload => ({ type: 'ADD_ITEMS', payload }))
    //         .subscribe(action => this.store.dispatch(action));
    // }
}