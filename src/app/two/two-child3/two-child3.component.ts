import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/forkJoin';

import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/combineAll';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/delayWhen';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/expand';


import { HttpService } from '../../http.service';
import { UserData } from './user-data.model'
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-two-child3',
  templateUrl: './two-child3.component.html',
  styleUrls: ['./two-child3.component.css']
})
export class TwoChild3Component implements OnInit {
  seeOfs: number = 0;
  useJsonServers;
  Observable1;
  Observable2;
  combineLatestData;
  scanData;
  doData;
  distincData;
  mergeData;
  newSubject;
  datas;
  constructor(
    private el: ElementRef,
    private http: HttpService,
  ) { }

  ngOnInit() {
    this.everyObservable()
  }
  seeOf() {
    Observable.of({ n: 'ff', age: 1 }, { n: 'dd', age: 2 }, { n: 'ss', age: 3 })
      .subscribe(obj => {
        console.log(obj)
        this.seeOfs += obj.age
      })
  }
  useJsonServer(id) {
    this.http.toGet(id).subscribe(val => this.useJsonServers = val)
  }

  seeScan() {
    let inter$ = Observable.interval(600)
      .filter(val => val % 2 == 0)
      .take(4)
      .do(val => this.doData = `do执行了,传进来的y值为${val}`)
      .scan((x, y) => x + y);
    inter$.subscribe(val => this.scanData = val)
  }
  merges() {
    let merges1 = this.el.nativeElement.querySelector('.merges1');
    let merges2 = this.el.nativeElement.querySelector('.merges2');
    let merges1$ = Observable.fromEvent(merges1, 'keyup')
      .pluck('target', 'value')
    let merges2$ = Observable.fromEvent(merges2, 'keyup')
      .pluck('target', 'value')

    Observable.merge(merges1$, merges2$)
      .subscribe(val => this.mergeData = val)
  }
  useNewSubject() {
    this.newSubject.next('newSubject value');

    let observers = Observable.create(observer => {
      observer.next('foo');
      setTimeout(() => observer.next('bar'), 2000)
    });
    observers.subscribe(value => console.log(value))
  }
  bufferCounts() {
    Observable.interval(500).bufferCount(5).take(5)
      .subscribe(val => console.log(val))
  }
  bufferTimes() {
    Observable.interval(472).bufferTime(2213).take(5)
      .subscribe(val => console.log(val))
  }
  forkJoin_concat() {
    let one = Observable.interval(1000).take(5);
    let two = Observable.interval(1000).take(3);

    Observable.concat(one, two)
      .subscribe(value => console.log(value))
    Observable.forkJoin(one, two)
      .subscribe(value => console.log(value))
  }
  everyObservable() {
    this.merges();
    let sub = Observable.interval(1000).map(val => val + 10)
      .subscribe((val) => {
        let data = val;
        this.datas = data++
        if (this.datas >= 15) {
          sub.unsubscribe()
        }
      })

    let pluck1 = this.el.nativeElement.querySelector('.pluck');
    let pluck1$ = Observable.fromEvent(pluck1, 'keyup').pluck('target', 'value')
      .subscribe(val => this.Observable1 = val);

    let map1 = this.el.nativeElement.querySelector('.map');
    let map1$ = Observable.fromEvent(map1, 'keyup').map(ev => ev['target'].value)
      .subscribe(val => this.Observable2 = val);

    let combineLatest1 = this.el.nativeElement.querySelector('.combineLatest1');
    let combineLatest2 = this.el.nativeElement.querySelector('.combineLatest2');
    let combineLatest1$ = Observable.fromEvent(combineLatest1, 'keyup').map(ev => ev['target'].value);
    let combineLatest2$ = Observable.fromEvent(combineLatest2, 'keyup').map(ev => ev['target'].value);
    Observable.combineLatest(combineLatest1$, combineLatest2$, (x, y) => x + y)
      .subscribe(val => this.combineLatestData = val)

    let distinc1 = this.el.nativeElement.querySelector('.distinc1');
    Observable.fromEvent(distinc1, 'keyup')
      .debounceTime(400)
      .pluck('target', 'value')
      .distinct()
      .subscribe(val => this.distincData = val)
    // // 返回 Observable，它发出由源 Observable 所发出的所有与之前的项都不相同的项。达到数据、对象去重
    // interface Person { age: number, name: string }
    // Observable.of(
    //   { age: 4, name: 'Foo' },
    //   { age: 7, name: 'Bar' },
    //   { age: 5, name: 'Foo' })
    //   .distinct((p: Person) => p.name)
    //   .subscribe(x => console.log(x));

    // // 它发出源 Observable 发出的所有与前一项不相同的项
    // Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
    //   .distinctUntilChanged()
    //   .subscribe(x => console.log(x));

    this.newSubject = new Subject();
    this.newSubject.subscribe(x => console.log(x));

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

    // // 当做方法用来合并数据流
    // var weight = Observable.of(1,2);
    // var height = Observable.of(1,2,3);
    // var bmi = weight.combineLatest(height, (w, h) => w+h);
    // bmi.subscribe(x => console.log('BMI is ' + x));

    // 当做数据处理过滤可观察对象，组合多个 Observables 来创建一个 Observable ，
    // 该 Observable 的值根据每个输入 Observable 的最新值计算得出的，任何一个 Observable 发生
    // 变动，都会生成顺序对应的每个 Observable 最新值组成的数组
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

    // // 在一秒内，顿狂点多次，也只发出一次最新的点击
    // var clicks = Observable.fromEvent(document, 'click');
    // var result = clicks.debounce(() => Observable.interval(1000));
    // result.subscribe(x => console.log(x));

    // // 延时源Observable的发出时间，该时间由delayDurationSelector 返回的Observable决定.
    // var clicks = Observable.fromEvent(document, 'click');
    // var delayedClicks = clicks.delayWhen(event =>
    //   Observable.interval(Math.random() * 5000)
    // );
    // delayedClicks.subscribe(x => console.log(x));

    // // 由一个 Observable1 触发另一个可以执行一系类操作的 Observable2，
    // // 并忽略 Observable1 之后发送的值，直到 Observable2 执行完毕才从Observable1取值
    // var clicks = Observable.fromEvent(document, 'click');
    // var result = clicks.exhaustMap((ev) => Observable.interval(300).take(10));
    // result.subscribe(x => console.log(x));

    // // 将上一次Observable发出的值进行处理后（expand()内的函数），再将处理完的值进行用样的方法进行处理，递归效果
    // // 每次点击开始发出的值都是乘以2的，最多连乘5次用take()限制的，
    // // 如果不加take，则每次点击都生成一个Observable，形成多个Observable并行执行
    // var clicks = Observable.fromEvent(document, 'click');
    // var powersOfTwo = clicks
    //   .mapTo(1)  // 将每次点击事件转化为发出值为1的Observable
    //   .expand(x => Observable.of(2 * x).delay(1000))
    //   .take(5)
    //   .subscribe(x => console.log(x));
  }
}
