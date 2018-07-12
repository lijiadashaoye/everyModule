import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"

import { ChildRoute } from './childRoute';
import { TwoChild2Component } from './two-child2.component';
import { Cild1Component } from './cild1/cild1.Component';
import { Cild2Component } from './cild2/cild2.Component';
import { Cild3Component } from './cild3/cild3.component';
import { Cild4Component } from './cild4/cild4.component';
import { Cild5Component } from './cild5/cild5.component';

// cnpm install echarts --save
// cnpm install ngx-echarts --save
// 在 .angular-cli.json/apps/script:[ "./node_modules/echarts/dist/echarts.min.js"]
// 在styles中添加样式文件： "./node_modules/quill/dist/quill.snow.css"
import { NgxEchartsModule } from 'ngx-echarts';

// 1:cnpm install angularx-qrcode@1.0.3 --save
// 2:module文件中inports：import { QRCodeModule } from 'angularx-qrcode';
import { QRCodeModule } from 'angularx-qrcode';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxEchartsService } from 'ngx-echarts';


@NgModule({
    imports: [
        CommonModule,
        ChildRoute,
        NgxEchartsModule,
        QRCodeModule,
        FormsModule,
        AccordionModule.forRoot()
    ],
    declarations: [
        TwoChild2Component,
        Cild1Component,
        Cild2Component,
        Cild3Component,
        Cild4Component,
        Cild5Component,
    ],
    providers:[
        NgxEchartsService
    ]
})
export class ChildModule { }