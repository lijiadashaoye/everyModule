import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-ng-view-child',
  templateUrl: './ng-view-child.component.html',
  styleUrls: ['./ng-view-child.component.css']
})
export class NgViewChildComponent implements OnInit {
  @Input() data3;
  @Input() data4;
  constructor() {}

  ngOnInit() {}
  ngOnChanges() {
    // console.log('ngOnChanges work')
  }
}