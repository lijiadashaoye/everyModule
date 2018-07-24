import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-three-child2',
  templateUrl: './three-child2.component.html',
  styleUrls: ['./three-child2.component.css']
})
export class ThreeChild2Component implements OnInit {
  text: string = '';
  constructor() { }
  ngOnInit() {
  }
  save() {
    console.log(this.text)
    sessionStorage.setItem('data', this.text);
  }
  geted() {
    this.text = sessionStorage.getItem('data');
  }
  move() {
    this.text = '';
    sessionStorage.removeItem('data');
  }
  clear() {
    this.text = ''
  }
  ngOnDestroy(): void {
    this.clear()
  }
}