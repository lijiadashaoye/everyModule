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
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AdService, AdItem } from './ad.service';

@Component({
  selector: 'app-one-child1',
  templateUrl: './one-child1.component.html',
  styleUrls: ['./one-child1.component.css']
})
export class OneChild1Component implements OnInit {
  color: string;
  resolveDatas;
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

  constructor(
    private el: ElementRef,
    private vcRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private adService: AdService,
  ) { }
  ngOnInit() {
    this.color = 'yellow';
    this.route.data   // 获取resolve数据
      .subscribe(gg => {
        this.resolveDatas = gg.resolveData;
      });
  }
  @ViewChild('tpl') tplRef: TemplateRef<any>;
  ngAfterViewInit() {  // 动态创建<ng-template>标签
    this.vcRef.createEmbeddedView(this.tplRef)
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
    setTimeout(() => this.isChage = true, 200)
  }

  @ViewChild("adhost", { read: ViewContainerRef }) adHost: ViewContainerRef;
  loadComponent() {  // 动态生成组件
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    let adItem = this.ads[this.currentAdIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    this.adHost.clear();

    let componentRef = this.adHost.createComponent(componentFactory);
    componentRef.instance.data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 2000);
  }
  startAd() {
    this.ads = this.adService.getAds();
    this.loadComponent();
    this.getAds();
  }
}

