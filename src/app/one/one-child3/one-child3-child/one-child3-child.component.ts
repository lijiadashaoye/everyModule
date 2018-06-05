import { Component, OnInit, forwardRef,Output,EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS
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
  @Output() isvalid=new EventEmitter<boolean>();
  froms: FormGroup;
  registerOnChanged;  // 用来承接向上传递数据的函数
  makeChild;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.froms = this.fb.group({
      child1: ['', Validators.compose([Validators.required, this.validate])],
      child2: ['', Validators.required]
    })
  }
  isSubmit(froms, ev: Event) {
    ev.preventDefault();
    this.registerOnChanged(this.froms.value);
  }
  makeChild2() {
    this.makeChild='两个input框实现change联动'
    this.isvalid.emit(true);
  }

  validate(c: FormControl): { [key: string]: any } {  // 验证器只有出错时才返回值
    if (!c.value) {
      return null
    }
    let data = /^li/;
    if (data.test(c.value)) {
      return null
    }
    return {
      'child1-valid': '第二个表单验证不通过'
    }

  }
  //ControlValueAccessor 必须有的三个函数
  writeValue(obj: any): void {   // obj根据传进来的数据而定类型string?object?array?
    this.froms.get('child1').patchValue(obj.child1);  // 初始化值
    this.froms.get('child2').patchValue(obj.child2);
  }
  registerOnChange(fn: any): void {
    this.registerOnChanged = fn
  }
  registerOnTouched(fn: any): void { }
}
