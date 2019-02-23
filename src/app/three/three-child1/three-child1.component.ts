import {
  Component,
  OnInit,
  ElementRef,
  Renderer2
} from "@angular/core";
import {
  AddressDataChinaService
} from "ngx-address/data/china";
import {
  HttpService
} from "../../http.service";
import {
  AppService
} from "../../serviceEmit.service";

@Component({
  selector: "app-three-child1",
  templateUrl: "./three-child1.component.html",
  styleUrls: ["./three-child1.component.css"]
})
export class ThreeChild1Component implements OnInit {
  public opt: any;
  id;
  // 二维码
  value: string = ""; // 二维码内容
  levels: string = ""; // 图片清晰度等级
  // 'url' | 'canvas' | 'img' = 'url';
  elementType: 'img';

  constructor(
    public appService: AppService,
    private china: AddressDataChinaService,
    public http: HttpService,
    public rd: Renderer2,
    public elem: ElementRef
  ) {
    this.opt = {
      jumps: this.china.getJumps(),
      data: this.china.getData.bind(this.china)
    };
  }

  comfirmModal() { // 写在appModule里的命名路由
    // 这说明，声明在更高级模块的服务，可以被任何子组件、子模块引入使用
    this.appService.comfirmModal().subscribe(val => console.log(val));
  }
  ngOnInit() {}
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
  do_Time = 0;
  testPromiseAll() {
    let do_Time = setInterval(() => {
      ++this.do_Time
    }, 1000)
    var p1 = new Promise((resolve, reject) => {
      setTimeout(resolve, 500, "P1");
    });
    var p2 = new Promise((resolve, reject) => {
      setTimeout(resolve, 4000, "P2");
    });
    // 同时执行p1和p2，并在它们都完成后执行then:
    Promise.all([p1, p2]).then((results) => {
      clearInterval(do_Time);
      this.do_Time = 0;
      console.log(results); // 获得一个Array: ['P1', 'P2']
    });
  }
  testPromiseRace() {
    var p1 = new Promise(function (resolve, reject) {
      setTimeout(resolve, 500, "P1");
    });
    var p2 = new Promise(function (resolve, reject) {
      setTimeout(resolve, 800, "P2");
    });
    Promise.race([p1, p2]).then(function (result) {
      console.log(result); // 'P1'
    });
  }

  kk2() {
    let time = 5,
      inter = 0;
    let wap = this.elem.nativeElement.querySelector('#wap');
    let arr2 = [];
    let arr1 = [
      'http://pic.vjshi.com/2018-07-06/39f4a47d5d96e97e2a8fdba98fcd942b/00004.jpg?x-oss-process=style/watermark',
      'http://pic.vjshi.com/2017-05-19/1175b476b9ffad11a3f5ff043289185b/00002.jpg?x-oss-process=style/watermark',
      'http://attachments.gfan.net.cn/forum/201806/02/150827jqzbh5rjxh2q5tvj.jpg',
      'http://t.qianlong.com/data/attachment/forum/201410/03/165837iflyv2obob00b2b0.jpg',
      'http://pic.vjshi.com/2016-08-13/5fcf97554572faa8b05a4bea600ca8d0/00001.jpg?x-oss-process=style/watermark',
    ]
    let promis_all_test = () => {
      inter++;
      for (let i = 5; i--;) {
        arr2[i] = new Promise(resolve => {
          let img = new Image();
          img.style.width = '40px';
          img.style.marginRight = '5px';
          img.src = arr1[i];
          img.onload = () => {
            resolve(img)
          }
        })
      }
      let hr = this.rd.createElement('hr');
      hr.style.margin = '2px'
      // arr2 是一个promise对象组成的数组
      Promise.all(arr2).then((item) => { // item是一个由 img 对象组成的数组
        this.rd.appendChild(wap, hr)
        item.forEach(val => { // 遍历 item 数组，将 img 对象插入 DOM 树
          this.rd.appendChild(wap, val)
        })
      })
      setTimeout(() => {
        if (inter < time) {
          promis_all_test()
        }
      }, 1000)
    }
    promis_all_test()
  }
  /************************************************************ */
  isGeneratorFn(x) {
      return (x + 10)
    }
    * gen(x) {
      // 一个yield内如果执行多个语句，要用小括号括起来，一定要将返回的值放到最后
      yield(console.log('执行1'), console.log('执行2'), x + 2)
      yield this.isGeneratorFn(x)
      yield x + 20
    }
  gener = null;
  testGenerator1() {
    // 初始化 Generator 函数，使 x 固定为 2，后续在next里写的参数，没用！！
    this.gener = this.gen(2);
    //执行到第一个 yield;返回 { value: 4, done: false }
    let kk = this.gener.next(50);
    console.log(kk)
  }
  testGenerator2() {
    // 执行到第二个 yield；返回 { value: 12, done: false }
    let kk = this.gener.next();
    console.log(kk)
  }
  testGenerator3() {
    // 函数中就三个 yield，则执行完这句，就到此就结束了，后续无法继续有返回值
    let kk = this.gener.next(); //执行到 yield(x + 20); { value: 22, done: false }
    console.log(kk)
  }
  testGenerator4() { // 已经结束，无法继续返回值
    let kk = this.gener.next(); // { value: undefined, done: true }
    console.log(kk)
  }
  /*********************************************************************************************************/
  // async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
  // 不管在函数体内 return 了什么值, async 函数的实际返回值总是一个 Promise 对象
  // 当函数执行的时候，一旦遇到await就会先暂停在此，等到异步操作完成，再接着自动执行函数体内后面的语句。
  // await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
  // 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
  // 如果promise有返回值，可以读取await语句得到 test()
  time = 0;
  time1 = 0;
  test() {
    let inter = null;
    // 另外定义好异步函数
    let sleep = (times) => {
      inter = setInterval(() => {
        ++this.time
      }, 1000)
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          // 返回 ‘ok'
          resolve('ok');
        }, times);
      })
    };
    // 立即执行
    (async () => {
      await sleep(5000).then((result) => {
        console.log(result); // 收到 ‘ok'
        clearInterval(inter);
        this.time = 0
      })
    })()
  }
  test1() {
    let inter = null;
    let sleep = (times) => {
      inter = setInterval(() => {
        ++this.time1
      }, 1000)
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          // 返回 ‘ok'
          // resolve('ok');
          resolve();
        }, times);
      })
    };
    let start = async () => {
      await sleep(5000);
      let result = 'await 后需操作'
      console.log(result);
      clearInterval(inter);
      this.time = 0;
      this.time1 = 0
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
      return "第二个await正常执行并返回值" + value;
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
    // 一般用在对整个asyc函数统一进行错误处理，不会再执行then，直接执行catch
    async function asyncPrint(value, ms) {
      await timeout(ms);
      throw Error("错误内容");
    }
    asyncPrint("hello world", 2000)
      .then(_ => {
        console.log(_);
      })
      .catch(err => console.log(err))
      .then(_ => {
        console.log('可以继续添加then');
      })
      .then(_ => {
        console.log('可以继续添加then');
      })
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
      const r2 = await new Promise(resolve => setTimeout(resolve, 1000, "r2"));
      const r3 = await new Promise(resolve => setTimeout(resolve, 1000, "r3"));
      return [r1, r2, r3];
    }

    example().then(result => {
      this.asyncData = result;
      clearInterval(this.intervals);
      this.tim = 0;
    });
  }
  /***************************************************************/
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
  /****************************************************************/
  testExtends() {
    class A {
      x='father';
      z;
      constructor(yy) {
        this.z = 'get' + yy;
      }
      print(xs) {
        console.log(xs);
      }
    }
    class B extends A {
      y = 'yyyyyy';
      constructor() {
        // 继承时，必须执行 super() 函数并写道子类的 constructor 里，也可传递初始化父类的参数
        super('ccccccc');
        // 在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
        // 如果子类修改了父类内的变量，则会覆盖父类的赋值
        this.x = 'form A'; // 当前类里面并没有定义变量 x
      }
      m() {
        // super作为对象时，在普通方法中，指向父类的原型对象；
        // 在静态方法中，指向父类。当于A.prototype.p()
        super.print(this.x);  // 读取重新赋值的 x
        super.print(this.y);
        super.print.call(this, this.y); // 只借用父类的方法，与 super.print(this.y) 同效果
        super.print(this.z);  // 调用父类的函数，并调用父类的变量
      }
    }
    let b = new B();
    b.m();
  }
}