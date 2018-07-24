import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  AddressDataChinaService
} from 'ngx-address/data/china';
@Component({
  selector: 'app-three-child1',
  templateUrl: './three-child1.component.html',
  styleUrls: ['./three-child1.component.css']
})
export class ThreeChild1Component implements OnInit {
  public opt: any;
  id;
  constructor(private china: AddressDataChinaService) {
    this.opt = {
      jumps: this.china.getJumps(),
      data: this.china.getData.bind(this.china)
    }
  }

  ngOnInit() {
    // this.reg()
  }
  reg() {
    let str = 'asdjf 3iA4 234LAKS DJAL SKDJkl 2234sfa';
    let str2 = 'https://www.bjhjyd.gov.cn/'
    let reg1 = /\d{2,4}/; // 匹配2-4个连续的数字,一次
    let reg2 = /\d{2,4}/g; // 匹配2-4个连续的数字，全局多次
    let reg3 = /(\w+):\/\/([\w.]+)\/(\S*)/;
    let toRge1 = str.replace(reg2, 'fff'); // 替换匹配到的
    let toRge2 = str.search(reg1); // 查找，返回匹配到的字符的索引
    let toRge3 = str.match(reg2); // 查找,返回匹配到的字符组成的数组
    let toRge4 = str2.match(reg3)
    let toRge5 = reg2.test(str)

    let pattern=/Java/g;
    let text='JavaScript is more fun than Java!';
    let result;
    while((result=pattern.exec(text))!=null){
      console.log(result)
      console.log(result[0],result.index,pattern.lastIndex)
    }

    console.log(toRge1);
    console.log(toRge2);
    console.log(toRge3);
    console.log(toRge4);
    console.log(toRge5);
  }
}