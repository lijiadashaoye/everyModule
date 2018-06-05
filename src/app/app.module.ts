import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OneModule } from './one/oneModule';
import { MainRoute } from './mainRoute';
import { AppService } from './serviceEmit.service';
import { HttpModule } from '@angular/http';
import { HttpService } from './http.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './lanjieqi';
import { PopupComponent } from './popup/popup.component';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    OneModule,
    MainRoute,
    HttpModule
  ],
  providers: [
    AppService,
    HttpService,
    { provide: 'BASE_URL', useValue: 'http://localhost:3000/datas' },
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }, // 拦截器
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
