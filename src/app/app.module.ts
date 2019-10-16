import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { OneModule } from "./one/oneModule";
import { MainRoute } from "./mainRoute";
import { AppService } from "./serviceEmit.service";
import { HttpModule } from "@angular/http";
import { HttpService, BASE_URL, urlText } from "./http.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NoopInterceptor } from "./lanjieqi";
import { PopupComponent } from "./popup/popup.component";

import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, PopupComponent],
  imports: [BrowserModule, OneModule, MainRoute, HttpModule, HttpClientModule],
  providers: [
    AppService,
    HttpService,
    { provide: BASE_URL, useValue: urlText },
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true } // 拦截器，useClass必须用 NoopInterceptor
    // { provide: LOCALE_ID, useValue: 'zh-Hans' }   // 规定国际化为中文简体
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
