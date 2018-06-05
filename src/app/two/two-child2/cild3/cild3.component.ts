import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cild3',
  templateUrl: './cild3.component.html',
  styleUrls: ['./cild3.component.css']
})
export class Cild3Component implements OnInit {
  qrdata: string;  // 要转成二维码的文字
  size: number;   //  要转成的二维码图片的大小
  level: string;  // 要转成的二维码的质量等级（'L', 'M', 'Q', 'H'）H为最高等级
  colorlight: string;  // 输出的二维码图片中高亮部分的颜色（可以为空）
  colordark: string;  // 输出的二维码图片底色的颜色（可以为空）
  usesvg: boolean;  // 是否输出svg图片（可以为空）
  constructor() { }

  ngOnInit() {
    this.size = 100;

    let arr = ['L', 'M', 'Q', 'H']
    this.level = arr[3];
    this.colorlight = 'blue'
    this.colordark = 'red'
    this.usesvg = false

  }
  show(data) {
    this.qrdata = data
  }

}
