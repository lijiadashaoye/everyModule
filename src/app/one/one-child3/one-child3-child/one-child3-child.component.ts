import {
  Component,
  OnInit,
  forwardRef,
  Output,
  EventEmitter
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  ValidationErrors
} from "@angular/forms";

// 自定义验证函数
export const validateCounterRange: ValidatorFn = (
  control: FormControl
): ValidationErrors => {
  console.log(control.value);
  return null;
};

@Component({
  selector: "app-one-child3-child",
  templateUrl: "./one-child3-child.component.html",
  styleUrls: ["./one-child3-child.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OneChild3ChildComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OneChild3ChildComponent), //  第一种写法：下边需要写以 validate 为名字的验证函数
      // useValue: validateCounterRange,    // 第二种写法，自定义验证函数
      multi: true
    }
  ]
})
export class OneChild3ChildComponent
  implements OnInit, ControlValueAccessor, Validator {
  fromc: FormGroup;
  makeChild;
  private propagateChange = (_: any) => { }; // 用来承接向上传递数据的函数
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fromc = this.fb.group({
      child1: ["", Validators.compose([Validators.required, this.validate])],
      child2: ["", Validators.compose([Validators.required, this.validate])],
    });
    this.fromc.valueChanges.subscribe(val => {
      this.propagateChange(val);
    });
  }
  makeChild2() {
    this.makeChild =
      "监听输入框的输入完毕(change事件)，不同于正在输入(input事件)";
  }

  validate(c: FormControl): { [key: string]: any } {
    // 验证器只有出错时才返回值
    let data = /^li/;
    const val = c.value;
    if (!val) {
      return null;
    }
    if (typeof val == "object") {  // 对当前整个表单进行验证，
      if (data.test(val.child1)) {
        return null;
      }
      return {
        "child1-valid": "子表单验证不通过"
      };
    } else {
      if (data.test(val)) {  // 对当前表单的每个 formcontrol 进行验证
        return null;
      }
      return {
        "child1-valid": "子表单验证不通过"
      };
    }
  }
  //ControlValueAccessor 必须有的三个函数
  public writeValue(obj: any): void {
    // obj根据传进来的数据而定类型string?object?array?
    if (obj) {
      this.fromc.get("child1").patchValue(obj.child1); // 初始化值
      this.fromc.get("child2").patchValue(obj.child2);
    }
  }
  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  public registerOnTouched(fn: any): void { }
}
