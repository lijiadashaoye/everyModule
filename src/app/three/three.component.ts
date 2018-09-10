import { Component, OnInit } from "@angular/core";
import { AppService } from "./../serviceEmit.service";

@Component({
  selector: "app-three",
  templateUrl: "./three.component.html",
  styleUrls: ["./three.component.css"]
})
export class ThreeComponent implements OnInit {
  constructor(private appService: AppService) {}
  ngOnInit() {
    this.appService.childService.emit("emit(three)");
  }
}
