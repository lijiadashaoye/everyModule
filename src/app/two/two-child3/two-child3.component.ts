import {
  Component,
  OnInit,
  ElementRef,
  Inject
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
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
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
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
import 'rxjs/add/operator/find';
import 'rxjs/add/operator/max';
import 'rxjs/add/operator/min';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/partition';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/audit'

import {
  HttpService
} from '../../http.service';
import {
  UserData
} from './user-data.model'
import {
  Subject
} from 'rxjs/Subject';

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
    this.everyObservable();
    this.everyObservable2();

    // for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值。
    let list = [4, 5, 6];
    for (let i in list) {
      console.log(i); // "0", "1", "2",
    }
    for (let i of list) {
      console.log(i); // "4", "5", "6"
    }
  }
  seeOf() {
    Observable.of({
      n: 'ff',
      age: 1
    }, {
        n: 'dd',
        age: 2
      }, {
        n: 'ss',
        age: 3
      })
      .subscribe(obj => {
        console.log(obj)
        this.seeOfs += obj.age
      })
  }
  useJsonServer(id) {
    this.http.toGet(id).subscribe(val => this.useJsonServers = val)
  }
  seeScan() {
    // scan()会将执行过程中的每一个值进行输出
    let inter$ = Observable.interval(600)
      .filter(val => val % 2 == 0)
      .take(4)
      .do(val => this.doData = `do执行了,传进来的y值为${val}`)
      .scan((x, y) => x + y);
    inter$.subscribe(val => this.scanData = val)

    // reduce 只会发出一个值，并且是当源 Observable 完成时才发出。它等价于使用 scan 操作符后面再跟 last 操作符。
    // 计算5秒内发生的点击次数
    var clicksInFiveSeconds = Observable.fromEvent(document, 'click')
      .takeUntil(Observable.interval(5000));
    var ones = clicksInFiveSeconds.mapTo(1);
    var seed = 0;
    var count = ones.reduce((acc, one) => acc + one, seed);
    count.subscribe(x => console.log(x));
  }
  merges() {
    // merge 创建一个输出 Observable ，发出每个给定的输入 Observable 中的所有值。
    // 只是 将所有输入 Observables 的所有值不进行任何转换发送到输出 Observable 
    let merges1 = this.el.nativeElement.querySelector('.merges1');
    let merges2 = this.el.nativeElement.querySelector('.merges2');
    let merges1$ = Observable.fromEvent(merges1, 'keyup')
      .pluck('target', 'value')
    let merges2$ = Observable.fromEvent(merges2, 'keyup')
      .pluck('target', 'value')

    Observable.merge(merges1$, merges2$)
      .subscribe(val => this.mergeData = val)

    // var timer1 = Observable.interval(1000).take(4);
    // var timer2 = Observable.interval(1000).take(5);
    // var timer3 = Observable.interval(1000).take(3);
    // var concurrent = 3; // 参数,可以同时订阅的输入 Observables 的最大数量。
    // var merged = timer1.merge(timer2, timer3,timer3, concurrent);
    // merged.subscribe(x => console.log(x));

    // // 每次点击都会从0到9计数(每秒计数一次) ，但只允许最多同时只能有两个计时器 mergeAll(2)
    // var clicks = Observable.fromEvent(document, 'click');
    // var higherOrder = clicks.map((ev) => Observable.interval(1000));
    // var firstOrder = higherOrder.mergeAll(2);
    // firstOrder.subscribe(x => console.log(x));

    // // 返回的 Observable 基于应用一个函数来发送项，该函数提供给源 Observable 发出的每个项， 
    // // 并返回一个 Observable，然后合并这些作为结果的 Observable，并发出本次合并的结果。
    // Observable.of('a', 'b', 'c')
    //   .mergeMap(x => Observable.interval(1000).map(i => x + i))
    //   .subscribe(val=>console.log(val))
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
    // 将过往的值收集到一个数组中，当数组数量到达设定的 bufferSize 时发出该数组。
    Observable.interval(500).bufferCount(5).take(5)
      .subscribe(val => console.log(val))
  }
  bufferTimes() {
    // 将过往的值收集到数组中，并周期性地发出这些数组。
    Observable.interval(472).bufferTime(2213).take(5)
      .subscribe(val => console.log(val))
  }
  forkJoin_concat() {
    let one = Observable.interval(1000).take(2);
    let two = Observable.interval(1000).take(3);
    // 通过顺序地发出多个 Observables 的值将它们连接起来，一个接一个的。
    Observable.concat(one, two)
      .subscribe(value => console.log(value))
    // 将多个 Observables 的最后一个值，组成对应顺序的数组发出来。
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

    // 类似于 map，但仅用于选择每个发出对象的某个嵌套属性。
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

    // // 它发出源 Observable 的值，但要等到直到第二个 Observable 执行完成。
    // Observable.interval(1000)
    //   .takeUntil(Observable.of(1).delay(3000))
    //   .subscribe(x => console.log(x));

    // Observable.of( 1,2,3,4,3,2,1)
    // .takeWhile( x => x < 4 )
    // .subscribe( x => console.log( x ))

    // Observable.interval(1000).take(4)
    // .map( ev => Observable.of( 1, 2, 3 ))
    // .take( 3 )
    // .combineAll( )
    // .subscribe( x => console.log( x ));

    // Observable.interval(1000).take(4).map(x=>x+10)
    // .withLatestFrom( Observable.interval( 1000 ))
    // .subscribe( x => console.log( x ));

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
  everyObservable2() {
    // // 只发出源 Observable 所发出的值中第一个满足条件的值。
    // Observable.interval(100)
    //   .find(x => x != 0 && x % 3 == 0)
    //   .subscribe(x => console.log(x));

    // // 使用比较函数来获取最大值的项max(),最小值的项min()
    // interface Person {
    //   age: number,
    //   name: string
    // }
    // Observable.of<Person>({ age: 7, name: 'Foo' },
    //   { age: 5, name: 'Bar' },
    //   { age: 9, name: 'Beer' })
    //   .max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1)
    //   .subscribe((x: Person) => console.log(x.name));

    // // 将点击事件划分为点击 DIV 元素和点击其他元素
    // var clicks = Observable.fromEvent(document, 'click');
    // var parts = clicks.partition(ev => ev['target'].tagName === 'DIV');
    // var clicksOnDivs = parts[0];
    // var clicksElsewhere = parts[1];
    // clicksOnDivs.subscribe(x => console.log('DIV clicked: ', x));
    // clicksElsewhere.subscribe(x => console.log('Other clicked: ', x));

    // // 该 Observable 发出特定的时间周期从源 Observable 取样的最新值。
    // // 每秒， 发出最近的一个点击
    // Observable.fromEvent(document, 'click')
    //   .sampleTime(1000)
    //   .subscribe(x => console.log(x));

    // // 当发出一个新的内部 Observable 时，switchMap 会停止发出先前发出的内部 Observable,
    // // 并开始发出新的内部 Observable 的值
    // // 每次点击返回一个 interval Observable
    // var clicks = Observable.fromEvent(document, 'click');
    // var result = clicks.switchMap((ev) => Observable.interval(1000));
    // result.subscribe(x => console.log(x));

    // // 该 Observable 执行节流操作，以限制源 Observable 的 发送频率。
    // // 以限定时间内最多点击一次的频率发出点击事件
    // var clicks = Observable.fromEvent(document, 'click');
    // var result = clicks.throttle(ev => Observable.interval(3000));
    // result.subscribe(x => console.log(x));

    // // 以每秒最多点击一次的频率发出点击事件
    // var clicks = Observable.fromEvent(document, 'click');
    // var result = clicks.throttleTime(1000);
    // result.subscribe(x => console.log(x));

    // // 将 Observable 序列转换为符合 ES2015 标准的 Promise 。
    // let source = Observable
    //   .of(42)
    //   .toPromise();
    // source.then((value) => console.log('Value:', value))
    //   .catch((err) => console.log('Error:', err));

    // // 不发出第一个Observable的发出的值，只有第二个Observable发出值时，才把第一个Observable的最新值发出来
    // let tim = Observable.interval(1000)
    // var clicks = Observable.fromEvent(document, 'click');
    // var result = tim.audit(ev => clicks);
    // result.subscribe(x => console.log(x));
  }
}