import {
  Component,
  OnInit,

} from '@angular/core';
import {
  AddressDataChinaService
} from 'ngx-address/data/china';
import {
  HttpService
} from '../../http.service';

@Component({
  selector: 'app-three-child1',
  templateUrl: './three-child1.component.html',
  styleUrls: ['./three-child1.component.css']
})
export class ThreeChild1Component implements OnInit {
  public opt: any;
  id;
  // 二维码
  qrdata: string; // 要转成二维码的文字
  size: number; //  要转成的二维码图片的大小
  level: string; // 要转成的二维码的质量等级（'L', 'M', 'Q', 'H'）H为最高等级
  colorlight: string; // 输出的二维码图片中高亮部分的颜色（可以为空）
  colordark: string; // 输出的二维码图片底色的颜色（可以为空）
  usesvg: boolean; // 是否输出svg图片（可以为空）

  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = '';
  levels: string = '';
  constructor(
    private china: AddressDataChinaService,
    public http: HttpService) {
    this.opt = {
      jumps: this.china.getJumps(),
      data: this.china.getData.bind(this.china)
    }
  }

  ngOnInit() {
    this.setErWeiMa();
  }
  setErWeiMa() {
    this.size = 100;
    let arr = ['L', 'M', 'Q', 'H']
    this.level = arr[3];
    this.colorlight = 'black'
    this.colordark = 'white'
    this.usesvg = false

  }
  show(data) {
    this.qrdata = data
  }
  show2(data) {
    this.value = data
  }
  setNgxQrcode() {
    let arr = ['L', 'M', 'Q', 'H']
    this.levels = arr[3];
  }
}