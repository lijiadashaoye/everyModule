import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  ViewContainerRef,
  HostListener,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  FormControl
} from '@angular/forms';

import {
  datas
} from './datas';
import {
  Hero
} from './datas';
import {
  User
} from './datas';

import {
  Observable
} from 'rxjs';
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/delay';

import {
  HttpEventType,
  HttpClient,
  HttpRequest
} from '@angular/common/http';

@Component({
  selector: 'app-two-child1',
  templateUrl: './two-child1.component.html',
  styleUrls: ['./two-child1.component.css'],
})
export class TwoChild1Component implements OnInit {
  public users;
  public user: FormGroup;
  public groups: FormGroup;
  public funValid: FormGroup;
  public genders;
  public roles;
  public themes;
  public topics;
  public hobbies;
  public provinces;
  public citieData;
  public cities;
  public heroes;
  public scrollDatas;
  public asyncData;
  public ismultiple = false;

  constructor(
    public fb: FormBuilder,
    public rd: Renderer2,
    public http: HttpClient
  ) {}

  ngOnInit(): void {
    // console.log(document.documentElement.clientHeight)
    this.heroes = datas.heroes;
    this.genders = datas.genders;
    this.roles = datas.roles;
    this.themes = datas.themes;
    this.topics = datas.topics;
    this.hobbies = datas.hobbies;
    this.provinces = datas.provinces;
    this.citieData = datas.citieData;
    this.cities = this.citieData.filter(city => city.pk)
    // 模版表单
    this.users = { // 新增用户
      name: '',
      gender: this.genders[0].value,
      role: this.roles[1].value,
      theme: this.themes[0],
      isActive: false,
      hobbies: {
        'music': true
      },
      topics: [this.topics[1].value],
      province: 16, // 福建省
      city: 1315 // 厦门市
    }
    // 动态表单
    this.user = this.fb.group({ //  表单的
      name: ['', [Validators.required, Validators.minLength(2), this.nameMatcher]], // 对单个表单进行验证
      account: this.fb.group({
        email: ['', Validators.required],
        confirm: ['', Validators.required]
      })
    })

    this.funValid = this.fb.group({
      ages: ['', this.ageRange(20, 120)],
      go: [''],
    }, {
      validator: this.formMatcher
    }) // 对整个表单进行验证，注意验证函数写的位置：this.fb.group({},{})

  }

  nameMatcher(c: FormControl) { // 自定义验证函数,此处是对整表单中的单个control进行验证
    if (c.value > 10) {
      return {
        'from': '单个表单进行验证'
      }
    } else {
      return null
    }
  }
  formMatcher(c: FormControl) {
    let ages = c.get('ages').value;
    let go = c.get('go').value;
    if (ages && go) {
      return null
    } else {
      return {
        'from': '对整个表单进行验证'
      }
    }
  }

  // 可传参数的验证函数
  ageRange(min: number, max: number): ValidatorFn {
    return (c: FormControl): {
      [key: string]: any
    } | null => {
      let age = c.value;
      if (age && (isNaN(age) || age < min || age > max)) {
        return {
          'range': true,
          min: min,
          max: max
        };
      }
      return null;
    }
  }

  changeHobby(hobby, event) {
    this.users.hobbies[hobby.value] = event.target.checked;
  }
  ngAfterViewInit() {
    // console.log(this.user.get('name'))
    // console.log(this.user)
    this.user.get('name').valueChanges
      .map(x => x + ':map过')
      .subscribe(val => console.log(val))
  }

  changeProvince(pk) {
    this.cities = this.citieData.filter((city) => city.pk == pk);
    this.users.city = this.cities[0].ck;
  }
  heroesData = [];
  num = 0;
  makeChage() {
    if (this.num < this.heroes.length) {
      this.heroesData.push(this.heroes[this.num]);
      this.num++;
    } else {
      this.num = 0;
      this.makeChage()
    }
  }
  trackByHeroes(index: number, hero: Hero): number {
    return index;
  }

  save() {
    console.log(this.users);
  }
  onSubmit({
    value,
    valid
  }: {
    value: User,
    valid: boolean
  }) {
    console.log(value, valid);
  }
  myVar;
  makeChage2() {
    let arr = ['A', 'B', 'C', 'D'];
    let num = Math.floor(Number(Math.random() * arr.length));
    this.myVar = arr[num]
  }
  shown;
  makeChage3() {
    let message = '3s later return Hello World!';
    this.shown = new Promise(resolve => {
      setTimeout(() => resolve(message), 3000);
    });
  }
  // angular的dom操作方法
  @ViewChild('isP') isP: ElementRef;
  @ViewChild('isH2', {
    read: ViewContainerRef
  }) isH2: ViewContainerRef;
  makeChage4() {
    console.log(this.isH2)
    console.log('#isP的id：' + this.isP.nativeElement.id)
    this.rd.setAttribute(this.isP.nativeElement, 'style', 'background:skyblue;')
  }

  @ViewChild('isScroll') public fff: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onScrollEvent(e) {
    console.log(e)
    this.fff.nativeElement.innerHTML = 'window:scroll'
  }
  onscroll(e) {
    this.scrollDatas = '';
    this.scrollDatas = 'scrollTop：' + e.target.scrollTop;
    console.log(this.scrollDatas)
  }

  // async(异步) 函数总是返回 Promises
  // await（只允许在 async(异步) 函数内部使用）等待其操作对象 Promise 返回：
  async anss() {
    let dishes = [{
      name: "fish",
      time: 3
    }, {
      name: "fish1",
      time: 5
    }, {
      name: "fish3",
      time: 3
    }];
    this.asyncData = [];

    for (let d of dishes) {
      this.asyncData.push("开始做" + d.name)
      await (() => {
        return new Promise(res => {
          setTimeout(res, d.time * 1000)
        })
      })();
      this.asyncData.push(`做好了 ${d.name}，用时${d.time}秒`)
    }
  }

  testFormData() {

    // 直接选取form表单的形式进行上传
    // 这与提交网页表单的效果，完全一样。
    // let formdata = new FormData(this.funValid.value);
    // this.upLoad(formdata);

    // 逐个向formData里添加数据的形式进行上传
    let formdata = new FormData();
    let ages = this.funValid.get('ages').value;
    let go = this.funValid.get('go').value;

    formdata.append('ages', ages);
    formdata.append('go', go);
    // this.upLoad(formdata);
  }

  upLoad(data) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://other.server/and/path/to/script');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.onprogress = function (ev) {
      console.log('下载量:' + ev.loaded + '下载总量' + ev.total)
    }
    xhr.upload.onprogress = function (ev) {
      console.log('发送量:' + ev.loaded + '发送总量' + ev.total)
    }
    // 重置表单
    this.funValid.reset()
  }

  upFile(item) {
    let formdata = new FormData();
    let num = item.files.length;
    for (let i = 0; i < num; i++) {
      formdata.append(item.files[i].name, item.files[i])
    }
    // this.upLoad(formdata)

    let blobdata = new Blob([item.files[0]], {
      type: 'image/png'
    }); // 新建二进制Blob对象
    // var blob = new Blob([xhr.response], {type: 'image/png'});   // 下载时，读取xhr.response
    // this.http.request(new HttpRequest('POST', 'URL', 'body', {
    //     reportProgress: true
    //   }))
    //   .subscribe(event => {
    //     if (event.type === HttpEventType.DownloadProgress) {}
    //     if (event.type === HttpEventType.UploadProgress) {}
    //     if (event.type === HttpEventType.Response) {
    //       console.log(event.body);
    //     }
    //   })
  }
}