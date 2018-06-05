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
import { FormBuilder, FormGroup, Validators, NG_VALIDATORS, } from '@angular/forms';

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
  private user;
  private groups: FormGroup;
  private genders;
  private roles;
  private themes;
  private topics;
  private hobbies;
  private provinces;
  private citieData;
  private cities;
  private heroes;
  constructor(
    private fb: FormBuilder,
    private rd: Renderer2
  ) { }

  ngOnInit(): void {
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
      })
    }, { validator: emailMatcher })  // 对整个表单进行验证，注意验证函数写的位置：this.fb.group({},{})
  }
  changeHobby(hobby, event) {
    this.users.hobbies[hobby.value] = event.target.checked;
  }
  ngAfterViewInit() {
    console.log(this.user.get('name'))
    console.log(this.user)
    this.user.get('name').valueChanges
    .map(x=>x+':map过')
    .subscribe(val=>console.log(val))
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
    this.heroes[num]['name'] = Math.floor(Number(this.heroes[num]['name']) / 5).toString()
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
  @ViewChild('isP') isP: ElementRef;
  @ViewChild('isH2', { read: ViewContainerRef }) isH2: ViewContainerRef;
  makeChage4() {
    console.log(this.isH2)
    this.rd.setAttribute(this.isP.nativeElement, 'style', 'background:skyblue;')
  }

  @ViewChild('isScroll') private fff: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onScrollEvent(e) {
    console.log(e)
    this.fff.nativeElement.innerHTML = 'window:scroll'
  }
}