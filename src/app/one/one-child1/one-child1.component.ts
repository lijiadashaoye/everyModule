import {
  Component,
  OnInit,
  Directive,
  ElementRef,
  HostListener,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  Inject,
  Renderer2
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdService, AdItem } from './ad.service';

@Component({
  selector: 'app-one-child1',
  templateUrl: './one-child1.component.html',
  styleUrls: ['./one-child1.component.css']
})
export class OneChild1Component implements OnInit {
  today = new Date();
  color: string;
  resolveDatas;
  someHTML;
  heroes = [
    { id: 14 },
    { id: 21 },
    { id: 22 },
    { id: 31 },
  ]
  componentRef;

  constructor(
    private el: ElementRef,
    private vcRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private adService: AdService,
    private rd: Renderer2
  ) { }
  @ViewChild('tpl') tplRef: TemplateRef<any>;
  ngOnInit() {
    this.color = 'yellow';
    this.someHTML = `<p style="padding:5px;background:rgb(231, 105, 231);">使用 innerHTML 添加标签</p>`
    this.route.data   // 获取resolve数据
      .subscribe(gg => {
        this.resolveDatas = gg.resolveData;
      });
  }
  createEmbeddedViews() { // 动态创建<ng-template>标签
    this.vcRef.createEmbeddedView(this.tplRef)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.interva2);
  }
  isChage: boolean = true;
  toggles() {  // 管道
    this.isChage = false;
    for (let i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].id % 2 == 0) {
        this.heroes[i].id += 1
      } else {
        this.heroes[i].id += 1
      }
    }
    setTimeout(() => this.isChage = true, 0)
  }

  @ViewChild("adhost", { read: ViewContainerRef }) adHost: ViewContainerRef;
  loadComponent() {  // 动态生成组件
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    let adItem = this.ads[this.currentAdIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    this.adHost.clear();

    this.componentRef = this.adHost.createComponent(componentFactory);
    this.componentRef.instance.inData = adItem.data;
    this.componentRef.instance.toEmitData   //  this.componentRef.instance 代表组件实例
      .subscribe(val => console.log(val));
    console.log(this.componentRef.instance)
  }
  //  动态加载组件
  ads: AdItem[];
  currentAdIndex = -1;
  time: number = 1;
  interval: any;
  interva2;
  getAds() {
    this.interva2 = setInterval(() => {
      this.time++;
    }, 1000);
    this.interval = setInterval(() => {
      this.loadComponent();
      this.time = 1;
    }, 3000);
  }
  startAd() {
    this.ads = this.adService.getAds();
    this.loadComponent();
    this.getAds();
  }
  closeRD() {  // 关闭自动生成组件功能
    clearInterval(this.interval);
    clearInterval(this.interva2);
    this.time = 1;
    this.componentRef.destroy();
  }
  reg() {
    let str = 'asdjf 3iA4 234LAKS DJAL SKDJkl 2234sfa';
    let str2 = 'https://www.bjhjyd.gov.cn/';

    let reg1 = /\d{2,4}/; // 匹配2-4个连续的数字,一次
    let reg2 = /\d{2,4}/g; // 匹配2-4个连续的数字，全局多次


    let toRge1 = str.replace(reg2, '****'); // 替换匹配到的
    let toRge2 = str.search(reg1); // 查找，返回匹配到的字符的索引
    let toRge3 = str.match(reg2); // 查找,返回匹配到的字符组成的数组

    let toRge5 = reg2.test(str);  // 查找字符串里是否有正则要匹配的内容
    let toRge6 = reg1.test(str);

    // let pattern = /Java/g;
    // let text = 'JavaScript is more fun than Java!';
    // let result;
    // while ((result = pattern.exec(text)) != null) {
    //   console.log(result)
    //   console.log(result[0], result.index, pattern.lastIndex)
    // }

    // let httpStr = /(\w+):\/\/([\w.]+)\/(\S*)/;  // 提取网址
    // let toRge4 = str2.match(httpStr)
    // console.log(toRge4);

    // console.log(toRge1);
    // console.log(toRge2);
    // console.log(toRge3);

    // console.log(toRge5);
    // console.log(toRge6);
  }

  es6() {
    // ES7中代替indexOf方法，用于查找数组元素
    let arr = ['react', 'angular', 'vue'];
    console.log(arr.includes('react'));

    // ES7中求幂运算
    let bb = 2 ** 2;
    console.log(Math.pow(2, 2) === bb);

    // 你使用老方式for /in (ES5)也许用的非常好。但是他会迭代所有可以枚举属性（像原型中的带名字的）, 
    // 不仅仅自己的属性，会意外的破坏那些 像prototype和tostring得到意想不到的值。
    // Object.values返回对象自身可以迭代属性值（values）为数组类型。
    // 我们最好使用Array.prototype.forEach迭代它，结合ES6的箭头函数隐形返回值：

    let obj = { a: 1, b: 2, c: 3 }
    Object.values(obj).forEach(value => console.log(value)) // 1, 2, 3

    for (let value of Object.values(obj)) {  // 1, 2, 3
      console.log(value)
    }
    // 将字符串通过使用第二个参数补齐成第一个参数规定的长度，
    let pad1 = '250.00'.padStart(10, '*')
    let pad2 = 'backbone'.padEnd(10, '*')
    console.log(pad1); // 在前边补
    console.log(pad2)  // 在后边补

    // Math.trunc方法用于去除一个数的小数部分，返回整数部分。
    let one = Math.trunc(4.231);
    console.log(one)
  }

  findDoms; // 用来保存查找到的元素
  tickDom; // 用来保存要查找的元素
  arrayFrom(id) {
    this.findDoms = this.el.nativeElement.querySelectorAll('h3');
    let kk = Array.from(this.findDoms);

    kk.map(dom => this.rd.removeStyle(dom, 'background'));
    this.tickDom = kk.filter(dom => dom['id'] === `ticked${id}`);
    this.rd.setStyle(this.tickDom[0], 'background', 'red')
  }
}

