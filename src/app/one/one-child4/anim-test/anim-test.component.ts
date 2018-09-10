import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener
} from "@angular/core";
import { cardAnim } from "../animat";

@Component({
  selector: "anim-test",
  templateUrl: "./anim-test.component.html",
  styleUrls: ["./anim-test.component.css"],
  animations: [cardAnim]
})
export class AnimTestComponent implements OnInit {
  @Input()
  data;
  @HostBinding("@card")
  cardState = "out";
  constructor() {}

  ngOnInit() {}
  @HostListener("mouseover")
  onmouseenter() {
    this.cardState = "hover";
  }
  @HostListener("mouseout")
  onmouseleave() {
    this.cardState = "out";
  }
}
