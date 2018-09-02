import { Component, OnInit } from "@angular/core";
import { AddressDataChinaService } from "ngx-address/data/china";
import { HttpService } from "../../http.service";

@Component({
  selector: "app-three-child1",
  templateUrl: "./three-child1.component.html",
  styleUrls: ["./three-child1.component.css"]
})
export class ThreeChild1Component implements OnInit {
  public opt: any;
  id;

  value: string = "";
  levels: string = "";
  constructor(
    private china: AddressDataChinaService,
    public http: HttpService
  ) {
    this.opt = {
      jumps: this.china.getJumps(),
      data: this.china.getData.bind(this.china)
    };
  }

  ngOnInit() {
    
  }

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
        return resolve("value");
      } else {
        throw new Error("test");
      }
    });
    let promise2 = new Promise(resolve => {
      // do something
      if (type) {
        return resolve("value");
      } else {
        throw new Error("test");
      }
    });
    promise1
      .then(value => {
        console.log(value);
        return true;
      })
      .catch(err => {
        console.log(err);
      });

    Promise.all([promise1, promise2])
      .then(val => console.log(val))
      .then(val => console.log(3));
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
