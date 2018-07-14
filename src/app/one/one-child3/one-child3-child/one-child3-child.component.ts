import { Component, OnInit, forwardRef, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms'

@Component({
  selector: 'app-one-child3-child',
  templateUrl: './one-child3-child.component.html',
  styleUrls: ['./one-child3-child.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OneChild3ChildComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,  //  下边需要写以 validate 为名字的验证函数
      useExisting: forwardRef(() => OneChild3ChildComponent),
      multi: true
    }
  ]
})
export class OneChild3ChildComponent implements OnInit, ControlValueAccessor {
  @Output() isvalid = new EventEmitter<boolean>();
  fromc: FormGroup;
  makeChild;
  private propagateChange = (_: any) => { };// 用来承接向上传递数据的函数
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fromc = this.fb.group({
      child1: ['', Validators.compose([Validators.required, this.validate])],
      child2: ['']
    })
    this.fromc.valueChanges.subscribe(val => {
      this.propagateChange(val);
    })
  }
  isSubmit(froms, ev: Event) {
    ev.preventDefault();
    this.propagateChange(froms.value);
  }
  makeChild2() {
    this.makeChild = '两个input框实现change联动'
    this.isvalid.emit(true);
    console.log(this.fromc)
  }

  validate(c: FormControl): { [key: string]: any } {  // 验证器只有出错时才返回值
    let data = /^li/;
    const val = c.value;
    if (!val) {
      return null
    }
    if (typeof val == 'object') {
      if (data.test(val.child1)) {
        return null
      }
      return {
        'child1-valid': '表单验证不通过'
      }
    } else {
      if (data.test(val)) {
        return null
      }
      return {
        'child1-valid': '表单验证不通过'
      }
    }
  }
  //ControlValueAccessor 必须有的三个函数
  public writeValue(obj: any): void {   // obj根据传进来的数据而定类型string?object?array?
    if (obj) {
      this.fromc.get('child1').patchValue(obj.child1);  // 初始化值
      this.fromc.get('child2').patchValue(obj.child2);
    }
  }
  public registerOnChange(fn: any): void {
    this.propagateChange = fn
  }
  public registerOnTouched(fn: any): void { }
}
