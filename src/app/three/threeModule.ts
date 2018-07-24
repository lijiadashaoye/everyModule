import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ThreeComponent } from './three.component';
import { ThreeChild1Component } from './three-child1/three-child1.component';
import { ThreeChild2Component } from './three-child2/three-child2.component';
import { ThreeRoute } from './threeRoute';

// cnpm install ngx-quill --save
import { QuillModule } from 'ngx-quill';   // 富文本组件第一种

// cnpm install quill@1.3.4 --save
// 在 .angular-cli.json/apps/script:["../node_modules/quill/dist/quill.js"]  // 富文本组建依赖库
// 在 .angular-cli.json/apps/styles 中"../node_modules/quill/dist/quill.snow.css"
import { EditorComponent } from './editor/editor.component';  // 富文本组件第二种

// cnpm install ngx-pagination --save // 省市地区组件
import { NgxAddressModule } from 'ngx-address';
import { AddressDataChinaService } from 'ngx-address/data/china';

@NgModule({
    declarations: [
        ThreeComponent,
        ThreeChild1Component,
        ThreeChild2Component,
        EditorComponent
    ],
    imports: [
        CommonModule,
        ThreeRoute,
        ReactiveFormsModule,
        FormsModule,
        NgxAddressModule,
        QuillModule,
    ],
    providers:[AddressDataChinaService]
})
export class ThreeModule { }