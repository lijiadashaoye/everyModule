import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  path;
  constructor(
    private router: Router,
    private act: ActivatedRoute
  ) {}
  ngOnInit() {
    this.act.data.subscribe(val => this.path = val.data)
  }
  close(e) {
    if (e instanceof Event) {
      e.stopPropagation();
    } else {
      switch (this.path) {
        case '1':
          this.router.navigate([{
            outlets: {
              popup1: null
            }
          }]);
          break;
        case '2':
          this.router.navigate([{
            outlets: {
              popup2: null
            }
          }]);
          break;
        default:
          this.router.navigate([{
            outlets: {
              popup3: null
            }
          }]);
      }
    }
  }
}