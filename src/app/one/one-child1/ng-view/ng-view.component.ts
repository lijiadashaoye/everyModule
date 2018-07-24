import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-view',
  templateUrl: './ng-view.component.html',
  styleUrls: ['./ng-view.component.css']
})
export class NgViewComponent implements OnInit {
  data1=10;
  data2=10;
  constructor() { }

  ngOnInit() {
  }
  adfhdaf(){
    this.data1+=1
  }
  gsdg(){
    this.data2+=3
  }
}
