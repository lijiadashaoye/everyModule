import {
  Component, OnInit, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef,
  ElementRef, Renderer2
} from '@angular/core';
import { animates, buttonAnimt, queryAnimat } from './animat';

@Component({
  selector: 'app-one-child4',
  templateUrl: './one-child4.component.html',
  styleUrls: ['./one-child4.component.css'],
  animations: [animates, buttonAnimt, queryAnimat],
  changeDetection: ChangeDetectionStrategy.OnPush   // 组件有变化时才进行检查，性能优化
})
export class OneChild4Component implements OnInit {

  // @HostBinding('@queryAinm')  // 注意观察两个p元素，消失的先后顺序
  @HostBinding('@square') squareStyle
  buttonAnimts;
  interval;
  one;
  two;
  three;
  constructor(
    private ch: ChangeDetectorRef,
    private rd: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      if (this.one == true) {
        this.two = true;
        this.one=false;
        this.three=false;
      } else
        if (this.two == true) {
          this.three = true;
          this.two=false;
        }else{
          this.one=true
        }
      this.ch.markForCheck()
    }, 2000)

  }
  hasclidk(e) {
    e.preventDefault();
    this.buttonAnimts == 'one2' ? this.buttonAnimts = 'two2' : this.buttonAnimts = 'one2';
    this.ch.markForCheck()
  }

  addBorder(ev: Event) {
    let elem = this.el.nativeElement.querySelector('p');
    this.rd.addClass(elem, 'addBorder');
    this.rd.setStyle(elem, 'background', 'rgb(228, 30, 218)')
  }
  moveBorder() {
    let elem = this.el.nativeElement.querySelector('p');
    this.rd.removeClass(elem, 'addBorder');
    this.rd.removeAttribute(elem, 'style');
    this.rd.setAttribute(elem, 'style', 'background:red')
  }
}

