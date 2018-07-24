import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ThreeComponent } from './three.component';
import { ThreeChild1Component } from './three-child1/three-child1.component';
import { ThreeChild2Component } from './three-child2/three-child2.component';
import { ThreeChild3Component } from './three-child3/three-child3.component';

import { ThreeRoute } from './threeRoute';

// cnpm install ngx-quill --save
import { QuillModule } from 'ngx-quill';   // 富文本组件第一种

// cnpm install quill@1.3.4 --save
import { EditorComponent } from './editor/editor.component';  // 富文本组件第二种
// 在 .angular-cli.json/apps/script:["../node_modules/quill/dist/quill.js"]  // 富文本组建依赖库
// 在 .angular-cli.json/apps/styles 中"../node_modules/quill/dist/quill.snow.css"

// cnpm install ngx-pagination --save // 省市地区组件
import { NgxAddressModule } from 'ngx-address';
import { AddressDataChinaService } from 'ngx-address/data/china';

// cnpm install echarts --save
// cnpm install ngx-echarts --save
// 在 .angular-cli.json/apps/script:[ "./node_modules/echarts/dist/echarts.min.js"]
// 在styles中添加样式文件： "./node_modules/quill/dist/quill.snow.css"
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxEchartsService } from 'ngx-echarts';

// 二维码
// 1:cnpm install angularx-qrcode@1.0.3 --save
// 2:module文件中inports：import { QRCodeModule } from 'angularx-qrcode';
import { QRCodeModule } from 'angularx-qrcode';

import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
    declarations: [
        ThreeComponent,
        ThreeChild1Component,
        ThreeChild2Component,
        ThreeChild3Component,
        EditorComponent
    ],
    imports: [
        CommonModule,
        ThreeRoute,
        ReactiveFormsModule,
        FormsModule,
        NgxAddressModule,
        QuillModule,
        NgxEchartsModule,
        QRCodeModule,
        NgxQRCodeModule
    ],
    providers:[
        AddressDataChinaService,
        NgxEchartsService
    ]
})
export class ThreeModule { }