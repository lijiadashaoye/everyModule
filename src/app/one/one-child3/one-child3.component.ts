import {
  Component,
  OnInit,
  ChangeDetectionStrategy
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
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-one-child3',
  templateUrl: './one-child3.component.html',
  styleUrls: ['./one-child3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneChild3Component implements OnInit {
  froms: FormGroup;
  worker;
  source;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.froms = this.fb.group({
      one1: ['', Validators.compose([Validators.required, this.oneValid])],
      two1: ['', Validators.compose([Validators.required, this.oneValid])],
      three: {
        child1: 'lichild1',
        child2: 'lichild2'
      }
    })
    // this.otherFun();
    this.otherFun2()
  }
  isSubmit(froms, ev: Event) {
    ev.preventDefault()
    console.log(froms.value)
    console.log(froms)
  }
  // 表单内单独添加验证函数
  oneValid(c: FormControl): {
    [key: string]: any
  } { // 验证器只有出错时才返回值,
    if (!c.value) {
      return null
    }
    let data = /^li/;
    if (data.test(c.value)) {
      return null
    }
    return {
      validData: '验证不通过'
    }
  }
  childValid(e) { // 子表单验证的结果
    console.log(e)
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
  sse() {
    let url = 'http://javascript.ruanyifeng.com/htmlapi/eventsource.html';
    this.source = new WebSocket(url);
    this.source.onopen = function (event) {
      console.log(event)
    };
    this.source.onerror = function (event) {
      console.log(event)
    };
    // 客户端收到服务器发来的数据，就会触发message事件，可以在onmessage属性定义回调函数。
    this.source.onmessage = function (event) {
      document.getElementById("result").innerHTML += event.data + "<br/>";
    }
  }
  closeSSE() { // 关闭 SSE 连接。
    this.source.close()
  }
  otherFun2() {

  }

}