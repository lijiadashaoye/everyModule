import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as datas from './datas.model';
import { AddressDataChinaService } from 'ngx-address/data/china';
@Component({
  selector: 'app-three-child1',
  templateUrl: './three-child1.component.html',
  styleUrls: ['./three-child1.component.css']
})
export class ThreeChild1Component implements OnInit {
  multipleMultiple: boolean = true; // 控制是否是多选:true/false
  optionsMultiple: Array<any> = [];   // 用来存储下拉选项列表数据
  initialValueMultiple: Array<string> = []; // 用来存储已选择好的
  @ViewChild('multipleSelectComponent') multipleSelectComponent;
  opts;
  alternativeOpts;
  public id: any;
  public opt: any;
  constructor(private china: AddressDataChinaService) {
    this.optionsMultiple = datas.datas.slice(0);
    this.opt = {
      jumps: this.china.getJumps(),
      data: this.china.getData.bind(this.china)
  };
  }

  ngOnInit() {
  }

  onMultipleOpened() {  // 打开选项框执行函数
    console.log('onMultipleOpened')
  }

  onMultipleClosed() {   // 关闭选项框执行函数
    console.log('onMultipleClosed')
  }

  onMultipleSelected(item) {   // 选中下拉项执行函数
    console.log(item);
    console.log(this.initialValueMultiple)
  }

  onMultipleDeselected(item) { // 删除选中下拉项执行函数
    console.log(item)
  }
}
