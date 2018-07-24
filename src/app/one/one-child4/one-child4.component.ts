import {
  Component,
  OnInit,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  Renderer2
} from '@angular/core';
import {
  animates,
  buttonAnimt,
  queryAnimat,
  staggerAnims
} from './animat';

@Component({
  selector: 'app-one-child4',
  templateUrl: './one-child4.component.html',
  styleUrls: ['./one-child4.component.css'],
  animations: [animates, buttonAnimt, staggerAnims, queryAnimat],
  changeDetection: ChangeDetectionStrategy.OnPush // 组件有变化时才进行检查，性能优化
})
export class OneChild4Component implements OnInit {

  // 用于自动执行样式变换
  interval;
  one = true;
  two = false;
  three = false;

  // 注意观察两个p元素(绑定了buttonAnimts)，消失的先后顺序
  @HostBinding('@queryAinm')
  AAA// 这个变量没有实际用处，但必须有
  // 用HostBinding，将动画帮定到<app-one-child4></app-one-child4>上
  @HostBinding('@routeAnim') state;

  // clicks动画，用于决定执行动画里的哪个状态
  buttonAnimts = 'two2';
  constructor(
    private ch: ChangeDetectorRef,
    private rd: Renderer2,
    private el: ElementRef
  ) { }
  datas = [];
  addData() {
    this.datas.push('fffff')
  }
  ngAfterViewInit() {
    let obj = {
      "id": "1",
      "name": "旺旺",
      "age": "20",
      "job": "学生"
    }
    setTimeout(_ => this.datas = [obj, obj], 3000)
  }
  ngOnInit() {
    // 查询元素的尺寸数据
    // let kk = this.el.nativeElement.querySelector('#dd').getBoundingClientRect();
    // console.log(kk)

    this.interval = setInterval(() => {
      if (this.one == true) {
        this.two = true;
        this.one = false;
        this.three = false;
      } else
        if (this.two == true) {
          this.three = true;
          this.two = false;
          this.one = false;
        } else
          if (this.three == true) {
            this.three = false;
            this.two = false;
            this.one = true;
          }
      this.ch.markForCheck()  // 手动执行变更检测
    }, 2000)

  }
  hasclidk(e) {
    e.preventDefault();
    e.stopPropagation();
    this.buttonAnimts == 'one2' ? this.buttonAnimts = 'two2' : this.buttonAnimts = 'one2';
    this.ch.markForCheck()
  }

  addBorder(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    let elem = this.el.nativeElement.querySelector('.nose');
    this.rd.addClass(elem, 'addBorder');
    this.rd.setStyle(elem, 'background', 'rgb(228, 30, 218)')
  }
  moveBorder(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    let elem = this.el.nativeElement.querySelector('.nose');
    this.rd.removeClass(elem, 'addBorder');
    this.rd.removeAttribute(elem, 'style');
    this.rd.setAttribute(elem, 'style', 'background:red')
  }
}