import {
  Component,
  OnInit
} from "@angular/core";
import {
  AddressDataChinaService
} from "ngx-address/data/china";
import {
  HttpService
} from "../../http.service";
import { AppService } from "../../serviceEmit.service";

@Component({
  selector: "app-three-child1",
  templateUrl: "./three-child1.component.html",
  styleUrls: ["./three-child1.component.css"]
})
export class ThreeChild1Component implements OnInit {
  public opt: any;
  id;
  // 二维码
  value: string = "";   // 二维码内容
  levels: string = "";  // 图片清晰度等级
  // 'url' | 'canvas' | 'img' = 'url';
  elementType : 'img'


  constructor(
    public appService: AppService,
    private china: AddressDataChinaService,
    public http: HttpService
  ) {
    this.opt = {
      jumps: this.china.getJumps(),
      data: this.china.getData.bind(this.china)
    };
  }

  comfirmModal() {  // 写在appModule里的命名路由
    // 这说明，声明在更高级模块的服务，可以被任何子组件、子模块引入使用
    this.appService.comfirmModal().subscribe(val => console.log(val));
  }
  ngOnInit() { }
  show2(data) {
    this.value = data;
  }
  setNgxQrcode() {
    let arr = ["L", "M", "Q", "H"];
    this.levels = arr[3];
  }
  testPromise() {
    let type = true;
    // Promise 新建后就会立即执行，但then可以依需求决定运行
    let promise1 = new Promise(resolve => {
      // do something
      if (type) {
        resolve("value");
        // resolved 的 Promise 总是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务，即使写在前边
        console.log('kkkkkkk');
      } else {
        throw new Error("test");
      }
    });
    // then方法可以接受两个回调函数作为参数。
    // 第一个回调函数是Promise对象的状态变为resolved时调用，
    // 第二个回调函数是Promise对象的状态变为rejected时调用
    // 其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
    promise1
      .then(value => {
        console.log(value);
        return true;
      })
      .catch(err => {
        console.log(err);
      });
  }
  testPromiseAll() {
    var p1 = new Promise(function (resolve, reject) {
      setTimeout(resolve, 500, "P1");
    });
    var p2 = new Promise(function (resolve, reject) {
      setTimeout(resolve, 600, "P2");
    });
    // 同时执行p1和p2，并在它们都完成后执行then:
    Promise.all([p1, p2]).then(function (results) {
      console.log(results); // 获得一个Array: ['P1', 'P2']
    });
  }
  testPromiseRace() {
    var p1 = new Promise(function (resolve, reject) {
      setTimeout(resolve, 500, "P1");
    });
    var p2 = new Promise(function (resolve, reject) {
      setTimeout(resolve, 600, "P2");
    });
    Promise.race([p1, p2]).then(function (result) {
      console.log(result); // 'P1'
    });
  }

  testGenerator() {
    function* gen(x) {
      var y = yield x + 2;
      return y;
    }

    var g = gen(1);
    let kk = g.next(); // { value: 3, done: false }
    let kkk = g.next(2); // { value: 2, done: true }
    console.log(kk);
    console.log(kkk);
  }
  /*********************************************************************************************************/
  // async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
  // 不管在函数体内 return 了什么值, async 函数的实际返回值总是一个 Promise 对象
  // 当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
  // await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
  // 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
  testasync() {
    function timeout(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }
    async function asyncPrint(value, ms) {
      await timeout(ms);
      return value;
    }

    asyncPrint("hello world", 2000) // 不添加错误处理
      .then(_ => {
        console.log(_);
      });
  }

  test() {
    let sleep = function (time) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          // 返回 ‘ok'
          resolve('ok');
        }, time);
      })
    };
    let start = async () => {
      let result = await sleep(2000);
      console.log(result); // 收到 ‘ok'
    };
    start()
  }
  testasyncError1() {
    function timeout(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }
    // 将错误处理放到async里，一般用在async函数里有多个await但前边的有可能报错，不至于影响后边的await
    async function asyncPrint(value, ms) {
      try {
        await timeout(ms);
        throw Error("fadfadsfasdf");
      } catch (err) {
        console.log("这里是asycn函数里第一个await执行完的报错" + err);
      }
      await timeout(ms);
      return "第二个await正常执行并返回值";
    }

    asyncPrint("hello world", 2000).then(_ => {
      // then可以正常执行
      console.log(_);
    });
  }
  testasyncError2() {
    function timeout(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }
    // 一般用在对整个asyc函数统一进行错误处理，不会再执行then
    async function asyncPrint(value, ms) {
      await timeout(ms);
      throw Error("jjjjj");
    }
    asyncPrint("hello world", 2000)
      .then(_ => {
        console.log(_);
      })
      .catch(err => console.log("ff", err));
  }
  tim = 0;
  asyncData = null;
  intervals;
  normalasync() {
    // 使用async 将多个同步函数以异步函数的写法写出来
    // r1执行完，才执行r2，r2执行完再执行r3，r3执行完，再返回整个example的值，所以用时6秒才返回值
    this.intervals = setInterval(_ => this.tim++, 1000);
    async function example() {
      const r1 = await new Promise(resolve => setTimeout(resolve, 1000, "r1"));
      const r2 = await new Promise(resolve => setTimeout(resolve, 2000, "r2"));
      const r3 = await new Promise(resolve => setTimeout(resolve, 3000, "r3"));
      return [r1, r2, r3];
    }

    example().then(result => {
      this.asyncData = result;
      clearInterval(this.intervals);
      this.tim = 0;
    });
  }
  /*********************************************************************************************************/
  testClass() {
    // 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承(无法通过new 新建后继承方法),
    // 而是直接通过类来调用，这就称为“静态方法”。
    // 父类的静态方法，可以被子类通过extends继承。
    class Foo {
      classMethod1() {
        return "hello";
      }
      static classMethod2() {
        return "hello";
      }
    }

    var foo = new Foo();
    console.log(foo.classMethod1());
    // console.log(foo.classMethod2())  // 无法实现，会报错
  }
  testExtends() {
    class A {
      x;
      constructor() {
        this.x = 1;
      }
      print() {
        console.log(this.x);
      }
    }
    class B extends A {
      constructor() {
        // 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
        super();
        // 在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
        this.x = 2;
      }
      m() {
        //  super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。当于A.prototype.p()
        super.print();
      }
    }
    let b = new B();
    b.m(); // 2
  }
}