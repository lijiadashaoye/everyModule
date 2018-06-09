import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-one-child2',
  templateUrl: './one-child2.component.html',
  styleUrls: ['./one-child2.component.css']
})
export class OneChild2Component implements OnInit {
  time;
  ff = false;  // 判断是否点击全选
  num = 0;
  interval;  // 计时只能用在全局，放在嵌套的函数里就不好使（无法停止，this指向不明）
  myForm: FormGroup;
  form: FormGroup;
  likesArr: string[] = ['喜欢', '不喜欢', '非常喜欢', '超级喜欢', '喜欢得不得了'];
  selects: string[] = [];
  item = { id: 1 }
  seeItem;
  formGroupSelect;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.time = 0;
    this.myForm = this.fb.group({
      likes: this.fb.array([false, false, false, false, false])
    });
    this.form = this.fb.group({
      one: false,
      two: false,
      three: false,
      four: false,
    });

    this.likes.valueChanges.subscribe(values => {
      let selects: string[] = [];
      values.forEach((selected: boolean, i: number) => {
        selected === true && selects.push(this.likesArr[i])
      });
      this.selects = selects;
    });
  }
  get likes() {
    return this.myForm.get('likes');
  }
  start() {
    this.time = 5;
    this.interval = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0) {
        clearInterval(this.interval);
      }
    }, 1000)
  }
  stop() {
    clearInterval(this.interval)
  }
  onSubmit(form, event) {
    event.preventDefault();
    this.formGroupSelect = form.value
  }
  turnAll(form) {  // 点击全选
    let value = form.value;
    if (this.ff == true) {
      for (let i in value) {
        this.form.get(i).patchValue(true)
      }
      this.num = 4;
    } else {
      for (let i in value) {
        this.form.get(i).patchValue(false)
      }
      this.num = 0
    }
  }
  isAll() {  // 判断是否将全部checkbox一个一个点过了
    for (let i in this.form.value) {
      if (this.form.value[i] == true) {
        this.num++
      }
    }
    if (this.num == 4) {
      this.ff = true
    } else {
      this.ff = false
      this.num = 0
    }
  }
  selectItem(item, ite) {
    this.seeItem = item;
  }

}