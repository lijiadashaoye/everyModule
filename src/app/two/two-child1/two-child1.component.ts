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

  // 截图
  offLeft;
  offTop;
  offw;
  offh;
  constructor(
    public fb: FormBuilder,
    public rd: Renderer2,
    public http: HttpClient,
    private elem: ElementRef
  ) { }

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
    let message = '2s later return Hello World!';
    this.shown = new Promise(resolve => {
      setTimeout(() => resolve(message), 2000);
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
    this.rd.setAttribute(this.isP.nativeElement, 'style', 'background:skyblue;padding:10px;')
  }

  @ViewChild('isScroll') public fff: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onScrollEvent(e) {
    this.fff.nativeElement.innerHTML = 'has window:scroll'
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

  test_FormData() {

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

  datas = [12, 23, 16, 21, 45, 3];
  dat;
  arr = [];
  toSort(type) {
    this.arr = [...this.datas]; // 使用...拓展符号，克隆数组

    if (type) {
      this.arr = this.arr.sort(function (a, b) {
        return a - b
      })
    } else {
      this.arr = this.arr.sort(function (a, b) {
        return b - a
      })
    }

    this.dat = this.arr.reduce((a, b) => a + b, 10)
  }
  otherTableFun() {  // 获取表格的另一种方法，angular中尽量不要用原生 DOM 操作方法
    let trs = document.getElementsByTagName('table')[0];
    // console.log(trs.rows)
    // console.log(trs.rows[0].cells)
  }

  wheelData;
  whe(e) {
    this.wheelData = e.type
  }
  mouseDown(e) {
    e.returnValue = false;  // 去掉其他部分被选中时一闪一闪的效果
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    e.stopPropagation();
    if (e['target'].id == 'main') {
      this.makePositin(e, mouseX, mouseY)
    } else {
      this.makeSize(e, mouseX, mouseY)
    }
  }

  makePositin(e, mouseX, mouseY) {
    let target = e['target'];
    target.onmousemove = (ev) => {
      if (!this.offw) { this.offw = target.offsetWidth; }
      if (!this.offh) { this.offh = target.offsetHeight; }
      let mouseMoveX = ev.offsetX;
      let mouseMoveY = ev.offsetY;

      this.offLeft = e.target.offsetLeft + mouseMoveX - mouseX; // 移动的距离
      this.offTop = e.target.offsetTop + mouseMoveY - mouseY;

      let offRight = e.target.parentNode.offsetWidth - e.target.offsetWidth; // 右侧的距离
      let offBottom = e.target.parentNode.offsetHeight - e.target.offsetHeight;

      if (this.offLeft >= 0 && this.offTop >= 0 && this.offLeft <= offRight && this.offTop <= offBottom) {
        this.rd.setAttribute(target, 'style', `width:${this.offw}px;height:${this.offh}px;left:${this.offLeft}px;top:${this.offTop}px`)
        let img2 = this.elem.nativeElement.querySelector('#img2')
        let kk = `clip:rect(${target.offsetTop}px ${e.target.offsetLeft + e.target.offsetWidth}px
              ${target.offsetHeight + target.offsetTop}px 
              ${target.offsetLeft}px)`;
        this.rd.setAttribute(img2, 'style', kk)
      } else {
        if (this.offLeft < 0) { this.offLeft = 0 };
        if (this.offTop < 0) { this.offTop = 0 };
        if (this.offLeft > offRight) { this.offLeft = offRight };
        if (this.offTop > offBottom) { this.offTop = offBottom };
        this.rd.setAttribute(target, 'style', `width:${this.offw}px;height:${this.offh}px;left:${this.offLeft}px;top:${this.offTop}px`);
        let img2 = this.elem.nativeElement.querySelector('#img2')
        let kk = `clip:rect(${target.offsetTop}px ${e.target.offsetLeft + e.target.offsetWidth}px
              ${target.offsetHeight + target.offsetTop}px 
              ${target.offsetLeft}px)`;
        this.rd.setAttribute(img2, 'style', kk)
      }
    }
  }

  makeSize(e, mouseX, mouseY) {
    if (e['target'].parentNode.id == 'main') {
      let target = e['target'];
      target.onmousemove = (ev) => {
        let mouseMoveX = ev.offsetX;  // 鼠标的坐标
        let mouseMoveY = ev.offsetY;

        let offLeftdian = mouseMoveX - mouseX; // 移动的距离
        let offTopdian = mouseMoveY - mouseY;

        let offRight = e.target.parentNode.parentNode.offsetWidth + e.target.offsetWidth / 2; // 右侧的距离
        let offBottom = e.target.parentNode.parentNode.offsetHeight + e.target.offsetHeight / 2;
        if (
          target.id == 'dian8' ||
          target.id == 'dian3' ||
          target.id == 'dian6' ||
          target.id == 'dian8'
        ) {
          this.offw = target.parentNode.offsetWidth + offLeftdian;
          this.offh = target.parentNode.offsetHeight + offTopdian;
          this.rd.setAttribute(target.parentNode, 'style',
            `width:${this.offw}px;height:${this.offh}px;
          left:${this.offLeft}px;top:${this.offTop}px;
          transform-origin:100% 100%;
          `)
          let img2 = this.elem.nativeElement.querySelector('#img2');
          let kk = `clip:rect(${target.parentNode.offsetTop}px 
            ${e.target.parentNode.offsetLeft + e.target.parentNode.offsetWidth}px
            ${target.parentNode.offsetHeight + target.parentNode.offsetTop}px 
            ${target.parentNode.offsetLeft}px)`;

          this.rd.setAttribute(img2, 'style', kk)
        }
        else {
          switch (target.id) {
            case 'dian2':
              this.offh = target.parentNode.offsetHeight + offTopdian;
              break;
            case 'dian4':
              this.offw = target.parentNode.offsetWidth + offLeftdian;
              break;
            case 'dian5':
              this.offw = target.parentNode.offsetWidth + offLeftdian;
              break;
            case 'dian7':
              this.offh = target.parentNode.offsetHeight + offTopdian;
              break;
          }

          this.rd.setAttribute(target.parentNode, 'style',
            `width:${this.offw}px;height:${this.offh}px;
          left:${this.offLeft}px;top:${this.offTop}px;
          transform-origin:100% 100%;
          `)
          let img2 = this.elem.nativeElement.querySelector('#img2');
          let kk = `clip:rect(${target.parentNode.offsetTop}px 
            ${e.target.parentNode.offsetLeft + e.target.parentNode.offsetWidth}px
            ${target.parentNode.offsetHeight + target.parentNode.offsetTop}px 
            ${target.parentNode.offsetLeft}px)`;

          this.rd.setAttribute(img2, 'style', kk)
        }
      }
    }
  }
  @HostListener('window:mouseup', ['$event'])
  mouseUp(e) {
    let target = this.elem.nativeElement.querySelector('#main')
    let targetChild = target.children;
    target.onmousemove = null
    for (let i = 0; i < targetChild.length; i++) {
      targetChild[i].onmousemove = null
    }
  }
}