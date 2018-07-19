import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-rd2',
  templateUrl: './rd2.component.html',
  styleUrls: ['./rd2.component.css']
})
export class Rd2Component implements OnInit {
  @Input() inData;
  constructor() { }

  ngOnInit() {
  }

}
