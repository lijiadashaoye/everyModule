import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddressDataChinaService } from 'ngx-address/data/china';
@Component({
  selector: 'app-three-child1',
  templateUrl: './three-child1.component.html',
  styleUrls: ['./three-child1.component.css']
})
export class ThreeChild1Component implements OnInit {
  public opt: any;
  constructor(private china: AddressDataChinaService) {
    this.opt = {
      jumps: this.china.getJumps(),
      data: this.china.getData.bind(this.china)
  }
  }

  ngOnInit() {
  }

}
