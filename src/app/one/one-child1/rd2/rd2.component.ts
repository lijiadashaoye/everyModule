import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-rd2',
  templateUrl: './rd2.component.html',
  styleUrls: ['./rd2.component.css']
})
export class Rd2Component implements OnInit {
  @Input() inData;
  toEmitData: Observable<string>

  constructor() { 
    this.toEmitData = Observable.of('Rd2Component')
  }

  ngOnInit() {
    
  }

}
