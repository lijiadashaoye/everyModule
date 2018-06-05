import {
  Component,
  OnInit,
  Directive,
  ElementRef,
  HostListener,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval'
import 'rxjs/add/observable/range'
import 'rxjs/add/observable/timer'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/combineLatest'

import 'rxjs/add/operator/bufferCount'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/groupBy'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/takeWhile'
import 'rxjs/add/operator/combineAll'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/switch'
import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/operator/publish'


@Component({
  selector: 'app-one-child1',
  templateUrl: './one-child1.component.html',
  styleUrls: ['./one-child1.component.css']
})
export class OneChild1Component implements OnInit {
  color: string;
  datas;
  heroes = [
    { id: 14 },
    { id: 21 },
    { id: 22 },
    { id: 31 },
  ]
  @ViewChild('tpl')
  tplRef: TemplateRef<any>;
  constructor(
    private el: ElementRef,
    private vcRef: ViewContainerRef
  ) { }
  ngOnInit() {
    this.color = 'yellow';
    let sub = Observable.interval(1000).map(val => val + 10)
      .subscribe((val) => {
        let data = val;
        this.datas = data++
        if (this.datas >= 15) {
          sub.unsubscribe()
        }
      })

    // var source1 = Observable.range(1, 6)
    //   .bufferCount(2);
    // source1.subscribe(val => console.log(val));

    // var source = Observable.timer(0, 1000);//序列：0 1 2 ...
    // var gf = function (item) {
    //   return item % 2 === 0 ? "EVEN" : "ODD"; // 分为EVEN与ODD组
    // }
    // var target = source.groupBy(gf);
    // target.subscribe(x => {
    //   if (x.key === 'EVEN') { // 根据key值选择group
    //     x.subscribe(x => console.log(x))
    //   }
    // });

    // var letters = Observable.of('a', 'b', 'c');
    // var result = letters.mergeMap(x =>
    //   Observable.interval(1000).map(i => x + i)
    // );
    // result.subscribe(x => console.log(x));
    // Observable.interval( 1000 )
    // .takeUntil( Observable.of( 1 ).delay( 3000 ))
    // .subscribe( x => console.log( x ));

    // Observable.of( 1,2,3,4,3,2,1)
    // .takeWhile( x => x < 4 )
    // .subscribe( x => console.log( x ))

    // Observable.interval(1000).take(4)
    // .map( ev => Observable.of( 1, 2, 3 ))
    // .take( 3 )
    // .combineAll( )
    // .subscribe( x => console.log( x ));

    // 当做方法用来合并数据流
    // var weight = Observable.of(1,2,3,4);
    // var height = Observable.of(1,2,3);
    // var bmi = weight.combineLatest(height, (w, h) => w+h);
    // bmi.subscribe(x => console.log('BMI is ' + x));

    // 当做数据处理过滤可观察对象
    // const firstTimer = Observable.timer(0, 1000); // 从现在开始，每隔1秒发出0, 1, 2...
    // const secondTimer = Observable.timer(500, 1000); // 0.5秒后，每隔1秒发出0, 1, 2...
    // const combinedTimers = Observable.combineLatest(firstTimer, secondTimer);
    // combinedTimers.subscribe(value => console.log(value));

    // Observable.interval(1000).take(4).map(x=>x+10)
    // .withLatestFrom( Observable.interval( 1000 ))
    // .subscribe( x => console.log( x ));

    // var a$ = Observable.interval(1000).take(4)
    //   .publish()

    // a$.subscribe(v => console.log(v + 10));
    // a$.subscribe(v => console.log(v));
    // a$.connect();
  }
  ngAfterViewInit() {
    this.vcRef.createEmbeddedView(this.tplRef)
  }
  isChage: boolean = true;
  toggles() {
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
}

