import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  ViewContainerRef,
  HostListener,
  forwardRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  FormControl
} from '@angular/forms';

import { datas } from './datas';
import { Hero } from './datas';
import { User } from './datas';
import { emailMatcher } from './datas';

@Component({
  selector: 'app-two-child1',
  templateUrl: './two-child1.component.html',
  styleUrls: ['./two-child1.component.css'],
})
export class TwoChild1Component implements OnInit {
  private title = 'form表单';
  private users;
  private user: FormGroup;
  private groups: FormGroup;
  private funValid: FormGroup;
  private genders;
  private roles;
  private themes;
  private topics;
  private hobbies;
  private provinces;
  private citieData;
  private cities;
  private heroes;
  private scrollDatas;
  private asyncData;
  constructor(
    private fb: FormBuilder,
    private rd: Renderer2
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
    this.users = {   // 新增用户
      name: '',
      gender: this.genders[0].value,
      role: this.roles[1].value,
      theme: this.themes[0],
      isActive: false,
      hobbies: { 'music': true },
      topics: [this.topics[1].value],
      province: 16, // 福建省
      city: 1315 // 厦门市
    }
    this.user = this.fb.group({   //  表单的
      name: ['1', [Validators.required, Validators.minLength(2), emailMatcher]], // 对单个表单进行验证
      account: this.fb.group({
        email: ['', Validators.required],
        confirm: ['', Validators.required]
      }),
    }, { validator: emailMatcher })  // 对整个表单进行验证，注意验证函数写的位置：this.fb.group({},{})

    this.funValid = this.fb.group({
      ages: ['55', this.ageRange(20, 120)],
    })
  }
  // 可传参数的验证函数
  ageRange(min: number, max: number): ValidatorFn {
    return (c: FormControl): { [key: string]: any } | null => {
      let age = c.value;
      if (age && (isNaN(age) || age < min || age > max)) {
        console.log(age)
        return { 'range': true, min: min, max: max };
      }
      console.log(null)
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
  trackByHeroes(index: number, hero: Hero): number {
    return hero.id;
  }
  makeChage() {
    let num = Math.floor(Number(Math.random() * this.heroes.length));
    this.heroes[num]['name'] = Math.floor(Number(this.heroes[num]['name']) / 5).toString();
  }
  save() {
    console.log(this.users);
  }
  onSubmit({ value, valid }: { value: User, valid: boolean }) {
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
    this.shown ? this.shown = false : this.shown = true
  }
  // angular的dom操作方法
  @ViewChild('isP') isP: ElementRef;
  @ViewChild('isH2', { read: ViewContainerRef }) isH2: ViewContainerRef;
  makeChage4() {
    console.log(this.isH2)
    console.log('#isP的id：' + this.isP.nativeElement.id)
    this.rd.setAttribute(this.isP.nativeElement, 'style', 'background:skyblue;')
  }

  @ViewChild('isScroll') private fff: ElementRef;
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

  async anss() {
    let dishes = [{ name: "fish", time: 3 }, { name: "fish1", time: 5 }, { name: "fish3", time: 3 }];
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
}