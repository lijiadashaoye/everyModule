import {
  Component,
  OnInit,
  ElementRef,
  Inject
} from '@angular/core';
import {
  Observable,
  BehaviorSubject
} from 'rxjs';
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
import 'rxjs/add/observable/zip';

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
import 'rxjs/add/operator/audit';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/exhaust';

import {
  HttpService
} from '../../http.service';
import {
  UserData,
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
  f: any;
  constructor(
    private el: ElementRef,
    private http: HttpService,
  ) {
    this.f = (phrase) => {
      return class {
        sayHi() { console.log(phrase) }
      }
    }
  }
  extendsFun() {
    // 对于高级编程模式，当我们使用的类是根据许多条件使用函数来生成时，这就很有用。
    class User extends this.f("Hello") { }
    new User().sayHi(); // Hello
  }
  ngOnInit() {
    this.everyObservable();
    this.everyObservable2();
    this.everyObservable3();
    this.everyObservable4();

    let list = [
      { name: '赵四' }, { name: '旺旺' }, { name: '二狗' }
    ];
    for (let i in list) {  // for..in迭代的是数组，i为索引值
      console.log(i);
    }
    for (let i of list) {  // for..of则迭代数组,i为索引对应的值。
      console.log(i);
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
    // 只是 将所有输入 Observables 的所有值不进行任何转换发送到输出,但每个Observable输
    // 出的值不与其他Observable合并，相独立的
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
    // var merged = timer1.merge(timer2, timer3, concurrent);
    // merged.subscribe(x => console.log(x));

    // // 每次点击都会从0到9计数(每秒计数一次) ，但只允许最多同时只能有两个计时器 mergeAll(2)
    // var clicks = Observable.fromEvent(document, 'click');
    // var higherOrder = clicks.map((ev) => Observable.interval(1000));
    // var firstOrder = higherOrder.mergeAll(2);
    // firstOrder.subscribe(x => console.log(x));

    // 返回将外部Observable的每个值，作为mergeMap内部函数的参数执行后的结果
    // 即，内部每出现一个新值，都会读取一次所有的外部值
    // 仅当内部的 Observable 对象发出值后，才会合并源 Observable 对象输出的值，并最终输出合并的值。
    // Observable.of('a', 'b', 'c')
    //   .mergeMap(x => Observable.interval(1000).take(5).map(i => x + i))
    //   .subscribe(val => console.log(val))
    // 输出：a0,b0,c0, a1,b1,c1, a2,b2,c2, a3,b3,c3
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

    // 顺序地发出多个 Observables 的值,将它们连接起来，一个接一个的。
    Observable.concat(one, two)
      .subscribe(value => console.log(value))

    // 将多个 Observables 的最后一个值，组成对应顺序的数组发出来。
    // forkJoin 是 Rx 版本的 Promise.all()，即表示等到所有的 Observable 都完成后，才一次性返回值。
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

    // 对之前出现过的所有值进行去重排查
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

    // // 源 Observable 发出最新值与前一项不相同即可
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

    // // 它发出源 Observable 的值，直到第二个 Observable 执行完成才停止发出出源 Observable 的值。
    // // 源 Observable 与takeUntil里的Observable从最开始都会执行，但takeUntil里的Observable发出值后，
    // // 源 Observable就不再执行了
    // Observable.interval(1000).map(val => val + 'ff')
    //   .takeUntil(Observable.interval(2200))
    //   .subscribe(x => console.log(x));

    // // 当高阶 Observable 完成时，通过使用 combineLatest 将其打平。
    // Observable.interval(600).take(4)
    // .map( ev => Observable.interval(1000).take(5))
    // // .take( 2 )
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
    // // 只发出源 Observable 所发出的值中第一个满足条件的值,只发出一次
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

    // 将源 Observable 一分为二，一个是所有满足函数的值，另一个是所有不满足的值
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
    // switchMap 的触发取决于外部的Observable，但result返回是内部的值
    // var clicks = Observable.fromEvent(document, 'click');
    // var result = clicks.switchMap((ev) => Observable.interval(1000));
    // result.subscribe(x => console.log(x));

    // // 让一个值通过，然后在接下来的 n 毫秒内忽略源值。
    // throttle,通过函数计算设置停滞时间，可以使用多变的时间，如用Math.random()生成时间
    // throttleTime，通过直接写出来的数字来设置停滞时间
    // // 该 Observable 执行节流操作，以限制源 Observable 的 发送频率。
    // // 以限定时间内最多点击一次的频率发出点击事件

    // 不定时发出值，导致值也不确定
    // var clicks = Observable.interval(500)
    // var result = clicks.throttle(ev => {
    //   let time=Math.random()*1000;
    //   console.log(time);
    //   return Observable.interval(time)
    // });
    // result.subscribe(x => console.log(x));

    // // 以每秒最多点击一次的频率发出点击事件
    // var clicks = Observable.interval(1000);
    // var result = clicks.throttleTime(2000);
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

  everyObservable3() {
    // // 每次点击都会触发从0到3的定时器(时间间隔为1秒)，定时器之间是串行的,即：每一个外部Observable
    // // 返回值都对应触发一次内部Observable执行一次
    // var clicks = Observable.fromEvent(document, 'click');
    // var result = clicks.concatMap(ev => Observable.interval(1000).take(4));
    // result.subscribe(x => console.log(x));

    // // 记录1到7中间有多少个奇数，count内的函数是最终返回一个boolean的判断函数，count返回为true的值
    // var numbers =Observable.range(1, 7);
    // var result = numbers.count(i => i % 2 === 1);
    // result.subscribe(x => console.log(x));

    // // 记录第一次点击之前经过了几秒
    // var seconds = Observable.interval(1000);
    // var clicks = Observable.fromEvent(document, 'click');
    // var secondsBeforeClick = seconds.takeUntil(clicks)
    // var result = secondsBeforeClick.count();
    // result.subscribe(x => console.log(x));

    // 发出每一个外部Observable的值，直到takeWhile里的函数返回false才停止值输出
    // var clicks = Observable.interval(1000)
    // var result = clicks.takeWhile(ev => ev < 4);
    // result.subscribe(x => console.log(x));

    // 在debounceTime内，外部Observable不会有另外的值发出的话，才把外部Observable的值作为终值发出
    // 所以，此语句永远不会有值发出
    // var clicks = Observable.interval(610)
    // var result = clicks.debounceTime(620);
    // result.subscribe(x => console.log(x));

    //  // 等待的时间随机，导致值也不确定
    // var clicks = Observable.interval(500)
    // var result = clicks.delayWhen(ev => {
    //   let time=Math.random()*10000;
    //   return Observable.interval(time)
    // });
    // result.subscribe(x => console.log(x));

    // 接收源 Observable 并只专注于传播第一个 Observable 直到它完成，然后订阅下一个 Observable
    // 如果前一个 Observable 还未完成的话，exhaust 会忽略每个新的内部 Observable,整个语句返回的是
    // 内部Observable产生的值
    // 这俩等效

    // var clicks = Observable.fromEvent(document, 'click');
    // var higherOrder = clicks.map((ev) => Observable.interval(1000).take(5));
    // var result = higherOrder.exhaust();
    // result.subscribe(x => console.log(x));

    // 由一个 Observable1 触发另一个可以执行一系类操作的 Observable2，
    // 并忽略 Observable1 之后发送的值，直到 Observable2 执行完毕才从Observable1取值
    // exhaustMap在从流还没有结束的时候如果主流仍然有数据在发射，它会忽略此时主流发射的数据，
    // 而在从流结束以后才会去响应主流中发射的数据。
    // var result2 = clicks.exhaustMap((ev) => Observable.interval(300).take(5));
    // result2.subscribe(x => console.log(x));
  }

  // 对数组分组，根据id
  everyObservable4() {
    // mergeMap = map + mergeAll
    // concatMap = map + concatAll
    // switchMap = map + switch

    // 需要保证执行顺序的可以使用 concatMap 操作符
    // 需要取消内部 Observable可以使用switchMap操作符
    // 需要简单执行可以使用mergeMap操作符

    // flatMapLatest在RxJS 5.x中已更名为switchMap
    // flatMap将响应数据“打平”，也就是说把映射后新的Observable转化为了数据流，
    // 订阅之后会获得这个新Observable发射的数据，而不是Observable本身。
    // Observable.of(
    //   { id: 1, name: 'aze1' },
    //   { id: 2, name: 'sf2' },
    //   { id: 2, name: 'dg2' },
    //   { id: 1, name: 'erg1' },
    //   { id: 1, name: 'df1' },
    //   { id: 2, name: 'sfqfb2' },
    //   { id: 3, name: 'qfs3' },
    //   { id: 2, name: 'qsgqsfg2' }
    // )
    //   .groupBy(p => p.id)
    //   .flatMap((group$) => group$.reduce((acc, cur) => [...acc, cur], []))
    //   .subscribe(p => console.log(p));

    // combineLatest与zip很相似，combineLatest一开始也会等待每个子流都发射完一次数据，但是
    // 在合并时，如果子流1在等待其他流发射数据期间又发射了新数据，则使用子流最新发射的数据进行
    // 合并，之后每当有某个流发射新数据，不再等待其他流同步发射数据，而是使用其他流之前的最近一次数据进行合并。

    // 将多个 Observable 组合以创建一个 Observable，该 Observable 的值是
    // 由所有输入 Observables 的值按顺序计算而来的。
    // zip会等待每个子流都发射完一次数据然后合并发射，之后继续等待
    // 从不同的源头结合年龄和名称
    // let age$ = Observable.of<number>(27, 25, 29);
    // let name$ = Observable.of<string>('Foo', 'Bar', 'Beer');
    // let isDev$ = Observable.of<boolean>(true, true, false);
    // Observable
    //   .zip(age$,
    //     name$,
    //     isDev$,
    //     (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
    //   .subscribe(x => console.log(x));

    // 如果不加share()，会打印两次
    let obs = Observable
      .create(observer => observer.next(Date.now()))
      .share();

    obs.subscribe(v => console.log("1st subscriber: " + v));
    obs.subscribe(v => console.log("2nd subscriber: " + v));

  }

  show() {
    let kk = new BehaviorSubject(null);
    let jj = Observable.interval(1000).take(5);
    jj.subscribe(_ => {
      kk.next(_)
    })
    kk.subscribe(val => console.log(val))
    kk.subscribe(val => console.log(val + 10))
  }

}