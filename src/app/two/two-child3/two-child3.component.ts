import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/forkJoin';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/bufferCount';
import 'rxjs/add/operator/bufferTime';

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
  distinctUntilChangedData;
  mergeData;
  newSubject;
  constructor(
    private el: ElementRef,
    private http: HttpService,
  ) { }

  ngOnInit() {
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

    let distinctUntilChanged1 = this.el.nativeElement.querySelector('.distinctUntilChanged');
    Observable.fromEvent(distinctUntilChanged1, 'keyup')
      .debounceTime(400)
      .pluck('target', 'value')
      .distinctUntilChanged()
      .subscribe(val => this.distinctUntilChangedData = val);

    this.newSubject = new Subject();
    this.newSubject.subscribe(x => console.log(x));
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
}
