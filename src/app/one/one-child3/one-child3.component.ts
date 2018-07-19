import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms'
import {
  Observable
} from 'rxjs/Observable';

@Component({
  selector: 'app-one-child3',
  templateUrl: './one-child3.component.html',
  styleUrls: ['./one-child3.component.css'],
})
// ChangeDetectionStrategy.OnPush：组件的变化监测只检查输入属性（即@Input修饰的变量）的值是否发生变化，
// 当这个值为引用类型（Object，Array等）时，则只对比该值的引用。

// 显然，OnPush策略相比Default降低了变化监测的复杂度，很好地提升了变化监测的性能。
// 如果组件的更新只依赖输入属性的值，那么在该组件上使用OnPush策略是一个很好的选择。

export class OneChild3Component implements OnInit {
  froms: FormGroup;
  worker;
  source;
  constructor(private fb: FormBuilder) { }

  // ngOnChanges()	在ngOnInit之前调用，或者当组件输入数据（通过@Input装饰器显式指定的那些变量）变化时调用,
  // 可以实现同时监视多个输入属性值的变化。
  // ngOnInit()	第一次ngOnChanges之后调用。建议此时获取数据，不要在构造函数中获取。
  // ngAfterViewInit()	创建了组件的视图及其子视图之后被调用（只适用组件）。
  // ngAfterContentInit()	使用<ng-content>将外部内容嵌入到组件视图后被调用，第一次ngDoCheck之后调用且只执行一次（只适用组件）。
  ngOnInit() {
    this.froms = this.fb.group({
      one1: ['', Validators.compose([Validators.required, this.oneValid])],
      two1: ['', Validators.compose([Validators.required, this.oneValid])],
      check: true,
      three: [
        {
          child1: 'lichild1',
          child2: 'lichild2'
        }
      ]
    })
    // 设置表单值
    this.froms.patchValue({
      one1: 'patchValue'
    })
    // this.otherFun();
    this.otherFunction()
  }
  isSubmit(froms, ev: Event) {
    ev.preventDefault()
  }
  // 表单内单独添加验证函数
  oneValid(c: FormControl): { [key: string]: any } { // 验证器只有出错时才返回值,
    if (!c.value) {
      return null
    }
    let data = /^li/;
    if (data.test(c.value)) {
      return null
    }
    return {
      validData: '主表单里验证不通过'
    }
  }
  otherFun() {
    console.log(navigator.onLine) // 判断设备是否可以上网
  }
  startWorker() { // web werker
    this.worker = ''
    if (typeof (Worker) !== "undefined") {
      this.worker = new Worker("assets/webWorker.js");
      this.worker.postMessage(10);
      this.worker.onmessage = (event) => {
        document.getElementById("result").innerHTML = event.data;
      };
    } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
  }
  stopWorker() {
    this.worker.terminate()
  }
  // sse() {
  //   if (typeof (EventSource) !== "undefined") {
  //     let url = 'http://javascript.ruanyifeng.com/htmlapi/eventsource.html';
  //     this.source = new EventSource(url);
  //     this.source.onopen = function (event) {
  //       console.log(event)
  //     };
  //     this.source.onerror = function (event) {
  //       console.log(event)
  //     };
  //     // 客户端收到服务器发来的数据，就会触发message事件，可以在onmessage属性定义回调函数。
  //     this.source.onmessage = function (event) {
  //       document.getElementById("result").innerHTML += event.data + "<br />";
  //     };
  //   }
  //   else {
  //     document.getElementById("result").innerHTML = "抱歉，您的浏览器不支持 server-sent 事件 ...";
  //   }
  // }
  // closeSSE() {  // 关闭 SSE 连接。
  //   this.source.close()
  // }
  otherFunction() {
    // filter ,map ,forEach方法
    let heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
    let filterRe = /m/i;
    let filterHeroes = heroes.filter(name => filterRe.test(name));
    let prefixedHeroes = heroes.map(name => 'Super_' + name);
    // heroes.forEach(name => console.log(name));
  }
  websocket() {
    let myWebsocket = new WebSocket("ws://www.websocket.org");
    myWebsocket.onopen = function (evt) {
      alert("Connection open ...");
    };
    myWebsocket.onmessage = function (evt) {
      alert("Received Message: " + evt.data);
    };
    myWebsocket.onclose = function (evt) {
      alert("Connection closed.");
    };

    myWebsocket.send("Hello WebSockets!");
    myWebsocket.close();
  }
  dasdf() {
    console.log(this.froms)

  }
}