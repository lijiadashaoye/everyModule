import { Component, OnInit, ElementRef, Renderer2, Attribute } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-cild5',
  templateUrl: './cild5.component.html',
  styleUrls: ['./cild5.component.css']
})
export class Cild5Component implements OnInit {
  vals;
  arr = [
    { id: 0, num: 3 },
    { id: 1, num: 39 },
    { id: 2, num: 23 },
    { id: 3, num: 8 },
    { id: 4, num: 13 }
  ]
  constructor(
    private elem: ElementRef,
    private rd: Renderer2,
  ) { }

  ngOnInit() {
    let domOrders = this.elem.nativeElement.querySelectorAll('.div1');
    for (let i = 0; i < domOrders.length; i++) {
      domOrders[i].css('order', i);
    }
  }
  orders() {
    let div1 = this.elem.nativeElement.querySelector('.div1');
    this.rd.setStyle(div1, 'order', this.vals);
  }

  duixiang() {
    this.arr.sort((a, b) => {
      if (a.num > b.num) {
        return -1
      } else {
        return 1
      }
    })
  }
  yuansu() {
    let domOrders = this.elem.nativeElement.querySelectorAll('.div1');
    let arr = [];
    for (let i = 0; i < domOrders.length; i++) {
      arr.push(Number(domOrders[i].id))
    }
    arr.sort((a, b) => { return b - a });
    for (let j = 0; j < arr.length; j++) {
      for (let i = 0; i < domOrders.length; i++) {
        if (domOrders[i].id == arr[j]) {
          this.rd.setStyle(domOrders[i], 'order', j);
        }
      }
    }
  }

}
