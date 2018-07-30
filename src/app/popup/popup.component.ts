import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { AppService } from '../serviceEmit.service';
import { tipsAnimate, comfirmAnimate } from './popup.anim'
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [tipsAnimate, comfirmAnimate]
})
export class PopupComponent implements OnInit {
  path;
  tipModal;
  confirms;
  constructor(
    private router: Router,
    private act: ActivatedRoute,
    private composeServ: AppService
  ) { }
  ngOnInit() {
    this.tipModal = 'tipOne';
    this.confirms = 'confirms';
    this.act.data.subscribe(val => this.path = val.data);
  }
  ngAfterViewInit() {
    if (this.path == '1') {
      setTimeout(_ => this.close(), 3000)
    }
  }
  close() {
    this.tipModal = 'void';
    setTimeout(_ => this.router.navigate([{
      outlets: {
        popup1: null
      }
    }]), 500)
  }
  comfirmClose(type) {
    switch (type) {
      case 'sure': this.composeServ.compo.next('true'); this.closeConfirm(); break;
      case 'no': this.composeServ.compo.next('false'); this.closeConfirm(); break;
    }
  }
  closeConfirm() {
    this.confirms = 'void';
    setTimeout(_ => this.router.navigate([{
      outlets: {
        popup2: null
      }
    }]), 500)
  }
}