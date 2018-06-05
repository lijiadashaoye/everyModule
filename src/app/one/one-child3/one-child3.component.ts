import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-one-child3',
  templateUrl: './one-child3.component.html',
  styleUrls: ['./one-child3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneChild3Component implements OnInit {
  froms: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.froms = this.fb.group({
      one1: ['', Validators.compose([Validators.required, this.oneValid])],
      two1: ['', Validators.compose([Validators.required, this.oneValid])],
      three: { child1: 'lichild1', child2: 'lichild2' }
    })
  }
  isSubmit(froms, ev: Event) {
    ev.preventDefault()
    console.log(froms.value)
    console.log(froms)
  }
  // 表单内单独添加验证函数
  oneValid(c: FormControl): { [key: string]: any } {  // 验证器只有出错时才返回值,
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
  childValid(e) {
    console.log(e)
  }

}
