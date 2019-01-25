import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { OneComponent } from "../one.component";

@Component({
  selector: "app-one-child2",
  templateUrl: "./one-child2.component.html",
  styleUrls: ["./one-child2.component.css"]
})
export class OneChild2Component implements OnInit {
  isCheckbox;
  imgData;
  imgData2 = "assets/4.jpg";
  imgData3 = "assets/3.jpg";

  time;
  ff = false; // 判断是否点击全选
  num = 0;
  interval; // 计时只能用在全局，放在嵌套的函数里就不好使（无法停止，this指向不明）
  myForm: FormGroup;
  form: FormGroup;
  likesArr: string[] = [
    "喜欢",
    "不喜欢",
    "非常喜欢",
    "超级喜欢",
    "喜欢得不得了"
  ];
  selects: string[] = [];
  item = {
    id: 1
  };
  seeItem;
  formGroupSelect;
  intervals;

  constructor(
    private fb: FormBuilder,
    public oneComponent: OneComponent // 子组建获取、修改父组件的方法（把父组件注入到子组件中）
  ) {}
  // 类的get 和 set 属性，虽然像函数，但操作的是属性
  get likes() {
    return this.myForm.get("likes");
  }
  set likes(value) {
    console.log(value);
  }

  ngOnInit() {
    this.time = 0;
    this.myForm = this.fb.group({
      likes: this.fb.array([false, false, false, false, false])
    });
    this.form = this.fb.group({
      one: false,
      two: false,
      three: false,
      four: false
    });

    this.likes.valueChanges.subscribe(values => {
      let selects: string[] = [];
      values.forEach((selected: boolean, i: number) => {
        selected === true && selects.push(this.likesArr[i]);
      });
      this.selects = selects;
    });

    this.intervals = setInterval(() => {
      this.oneComponent.childInterval++;
    }, 1000);
    this.imgData =
      "http://img18.3lian.com/d/file/201712/30/1a8380b9c21b50b370d9bf1ada4e8679.png";
  }

  start() {
    // 要用全局属性定义interval，才可以进行停止
    this.time = 5;
    this.interval = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
  stop() {
    clearInterval(this.interval);
  }
  onSubmit(form, event) {
    event.preventDefault();
    this.formGroupSelect = form.value;
  }
  turnAll(form) {
    // 点击全选
    let value = form.value;
    if (this.ff == true) {
      for (let i in value) {
        this.form.get(i).patchValue(true);
      }
      this.num = 4;
    } else {
      for (let i in value) {
        this.form.get(i).patchValue(false);
      }
      this.num = 0;
    }
  }
  isAll() {
    // 判断是否将全部checkbox一个一个点过了
    for (let i in this.form.value) {
      if (this.form.value[i] == true) {
        this.num++;
      }
    }
    if (this.num == 4) {
      this.ff = true;
    } else {
      this.ff = false;
      this.num = 0;
    }
  }
  selectItem(item, ite) {
    if (ite.checked) {
      this.seeItem = item;
    } else {
      this.seeItem = null;
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.intervals);
    this.oneComponent.childInterval = 0;
  }
}
