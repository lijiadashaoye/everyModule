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
  Inject
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
  //  动态加载组件
  ads: AdItem[];
  currentAdIndex = -1;
  interval: any;
  componentRef;

  constructor(
    private el: ElementRef,
    private vcRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private adService: AdService,
  ) { }
  @ViewChild('tpl') tplRef: TemplateRef<any>;
  ngOnInit() {
    this.color = 'yellow';
    this.someHTML = `<h1>innerHTML</h1>`
    this.route.data   // 获取resolve数据
      .subscribe(gg => {
        this.resolveDatas = gg.resolveData;
      });

    // ES7中代替indexOf方法，用于查找数组元素
    // let arr = ['react', 'angular', 'vue'];
    // console.log(arr.includes('react'));

    // ES7中求幂运算
    // let bb = 2 ** 2;
    // console.log(Math.pow(2, 2) === bb);

    // 你使用老方式for /in (ES5)也许用的非常好。但是他会迭代所有可以枚举属性（像原型中的带名字的）, 
    // 不仅仅自己的属性，会意外的破坏那些 像prototype和tostring得到意想不到的值。
    // Object.values返回对象自身可以迭代属性值（values）为数组类型。
    // 我们最好使用Array.prototype.forEach迭代它，结合ES6的箭头函数隐形返回值：

    // let obj = { a: 1, b: 2, c: 3 }
    // Object.values(obj).forEach(value => console.log(value)) // 1, 2, 3

    // for (let value of Object.values(obj)) {  // 1, 2, 3
    //   console.log(value)
    // }
    // 将字符串通过使用第二个参数补齐成第一个参数规定的长度，
    // console.log('250.00'.padStart(10, '*')); // 在前边补
    // console.log('backbone'.padEnd(10, '*'))  // 在后边补
    // this.vcRef.createEmbeddedView(this.tplRef) // 动态创建<ng-template>标签
  }

  ngOnDestroy() {
    clearInterval(this.interval);
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
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 4000);
  }
  startAd() {
    this.ads = this.adService.getAds();
    this.loadComponent();
    this.getAds();
  }
  closeRD() {  // 关闭自动生成组件功能
    clearInterval(this.interval);
    this.componentRef.destroy();
  }
}

