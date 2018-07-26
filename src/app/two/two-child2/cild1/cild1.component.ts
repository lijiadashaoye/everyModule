import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cild1',
  templateUrl: './cild1.component.html',
  styleUrls: ['./cild1.component.css']
})
export class Cild1Component {

  testPromise() {
    let type = true;

    // Promise 新建后就会立即执行，但then可以依需求决定运行
    let promise1 = new Promise((resolve) => {
      // do something
      if (type) {
        return resolve('value');
      } else {
        throw new Error('test');
      }
    })
    let promise2 = new Promise((resolve) => {
      // do something
      if (type) {
        return resolve('value');
      } else {
        throw new Error('test');
      }
    })
    promise1.then(
      value => {
        console.log(value)
        return true
      })
      .catch(err => {
        console.log(err)
      })

    Promise.all([promise1, promise1])
      .then(val => console.log(val))
      .then(val => console.log(3));
  }

  testGenerator() {
    function* gen(x) {
      var y = yield x + 2;
      return y;
    }

    var g = gen(1);
    let kk = g.next() // { value: 3, done: false }
    let kkk = g.next(2) // { value: 2, done: true }
    console.log(kk)
    console.log(kkk)
  }
  testasync() {
    function timeout(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    async function asyncPrint(value, ms) {
      await timeout(ms);
      console.log(value);
    }

    asyncPrint('hello world', 2000);
  }

  testClass() {
    // 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承(无法通过new 新建后继承方法),
    // 而是直接通过类来调用，这就称为“静态方法”。
    // 父类的静态方法，可以被子类通过extends继承。
    class Foo {
      classMethod1() {
        return 'hello';
      }
      static classMethod2() {
        return 'hello';
      }
    }

    var foo = new Foo();
    console.log(foo.classMethod1())
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
    b.m();  // 2
  }
}