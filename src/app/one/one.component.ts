import { Component, OnInit } from '@angular/core';
import { AppService } from './../serviceEmit.service';
@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {
  childInterval = 0;
  constructor(private appService: AppService) { }
  ngOnInit() {
    this.appService.childService.emit('emit(one)');
  }
  ngOnDestroy() {
    this.appService.childService.emit('');
  }
  canLeave() {
    return confirm('one.component CanDeactivate')
  }
}
