import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rd1',
  templateUrl: './rd1.component.html',
  styleUrls: ['./rd1.component.css']
})
export class Rd1Component implements OnInit {
  @Input() inData;
  @Output() toEmitData = new EventEmitter<any>();
  constructor() { }
  ngOnInit() { }
  toEmit() {
    this.toEmitData.emit('emitData');
  }
}
