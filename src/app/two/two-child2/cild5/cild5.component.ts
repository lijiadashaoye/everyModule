import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import * as $ from 'jquery'
import {
  calcBindingFlags
} from '_@angular_core@5.2.11@@angular/core/src/view/util';
import {
  Observable
} from 'rxjs';
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

    c.clearRect(0, 0, 200, 200); // 擦除(0,0)位置大小为200x200的矩形，擦除的意思是把该区域变为透明
    c.fillStyle = '#dddddd'; // 设置颜色
    c.fillRect(10, 10, 130, 130); // 把(10,10)位置大小为130x130的矩形涂色
    // 利用Path绘制复杂路径:
    var path = new Path2D();
    path.arc(75, 75, 50, 0, Math.PI * 2, true);
    path.moveTo(110, 75);
    path.arc(75, 75, 35, 0, Math.PI, false);
    path.moveTo(65, 65);
    path.arc(60, 65, 5, 0, Math.PI * 2, true);
    path.moveTo(95, 65);
    path.arc(90, 65, 5, 0, Math.PI * 2, true);
    c.strokeStyle = '#0000ff';
    c.stroke(path);

    c.shadowOffsetX = 2;
    c.shadowOffsetY = 2;
    c.shadowBlur = 3;
    c.shadowColor = '#666666';
    c.font = '24px Arial';
    c.fillStyle = '#333333';
    c.fillText('带阴影的文字', 150, 30);

    c.moveTo(160, 70);
    c.arcTo(250, 70, 300, 300, 60); // arcTo(x1,y1,x2,y2,r);
    c.strokeStyle = 'blue'; // x1	弧的起点的 x 坐标。
    c.lineWidth = 5; // y1	弧的起点的 y 坐标。
    c.stroke(); // x2	弧的终点的 x 坐标。
    // y2	弧的终点的 y 坐标。
    // r	弧的半径。       

    // 将canvas转成base64图片，用img显示出来，达到图片截取
    let imgs = this.elem.nativeElement.querySelector('#img');
    // console.log(cav.toDataURL())
    imgs.src = cav.toDataURL()
    // navigator.geolocation.getCurrentPosition(function (success) {
    //   console.log(success.coords.latitude)
    // }, function (error) {
    //   console.log(error)
    // })
  }
 
 
}