import { Component, OnInit } from '@angular/core';
import { AppService } from './../serviceEmit.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css']
})
export class TwoComponent implements OnInit {

  constructor(
    private appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.appService.childService.emit('emit(two)');
  }
}
