import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  Attribute
} from '@angular/core';
import * as $ from 'jquery'
import {
  calcBindingFlags
} from '_@angular_core@5.2.11@@angular/core/src/view/util';

@Component({
  selector: 'app-cild5',
  templateUrl: './cild5.component.html',
  styleUrls: ['./cild5.component.css']
})
export class Cild5Component implements OnInit {
  vals;
  arr = [{
      id: 0,
      num: 3
    },
    {
      id: 1,
      num: 39
    },
    {
      id: 2,
      num: 23
    },
    {
      id: 3,
      num: 8
    },
    {
      id: 4,
      num: 13
    }
  ]
  constructor(
    private elem: ElementRef,
    private rd: Renderer2,
  ) {}

  ngOnInit() {
    let domOrders = this.elem.nativeElement.querySelectorAll('.div1');
    for (let i = 0; i < domOrders.length; i++) {
      domOrders[i].css('order', i);
    }
    this.cav()
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
    arr.sort((a, b) => {
      return b - a
    });
    for (let j = 0; j < arr.length; j++) {
      for (let i = 0; i < domOrders.length; i++) {
        if (domOrders[i].id == arr[j]) {
          this.rd.setStyle(domOrders[i], 'order', j);
        }
      }
    }
  }
  cav() {
    let cav = this.elem.nativeElement.querySelector('#cav');
    let c = cav.getContext('2d');
    c.beginPath();
    c.moveTo(20, 10);
    c.lineTo(100, 50);
    c.lineTo(100, 120);
    c.closePath();
    c.fillStyle = 'red';
    c.strokeStyle = 'blue';
    c.lineWidth = 5;
    c.fill();
    c.stroke();

    c.beginPath();
    c.moveTo(100, 10);
    c.lineTo(150, 30);
    c.lineTo(80, 130);
    c.closePath();
    c.fillStyle = 'red';
    c.strokeStyle = 'blue';
    c.lineWidth = 5;
    c.fill();
    c.stroke();

    c.beginPath();
    c.arc(200, 60, 50,0,1.5*Math.PI,true)
    c.strokeStyle = 'blue';
    c.lineWidth = 5;
    c.stroke();
    c.closePath();

    c.moveTo(160,50);
    c.arcTo(250,50,300,300,60);  // arcTo(x1,y1,x2,y2,r);
    c.strokeStyle = 'blue';      // x1	弧的起点的 x 坐标。
    c.lineWidth = 5;             // y1	弧的起点的 y 坐标。
    c.stroke();                  // x2	弧的终点的 x 坐标。
                                 // y2	弧的终点的 y 坐标。
                                 // r	弧的半径。       
                                 
  
    // 将canvas转成base64图片，用img显示出来，达到图片截取
    let imgs = this.elem.nativeElement.querySelector('#img');
    // console.log(cav.toDataURL())
    imgs.src=cav.toDataURL()
  }
}