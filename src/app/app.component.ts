import { Component } from "@angular/core";
import { AppService } from "./serviceEmit.service";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  child: string = "";
  constructor(public appService: AppService, private route: Router) {
    this.appService.childService.subscribe((value: string) => {
      this.child = "通过服务中的 emit跳过来的：" + value;
    });
  }
  ngOnInit() {}
  login() {
    sessionStorage.setItem("name", "f");
  }
  loginOut() {
    sessionStorage.clear();
  }
  canGo() {
    sessionStorage.setItem("go", "f");
  }
  canNotGo() {
    sessionStorage.removeItem("go");
  }
  canLeave() {
    sessionStorage.setItem("leave", "f");
  }
  canNotLeave() {
    sessionStorage.removeItem("leave");
  }
  toTwo() {
    let routeChildData = "twoChild4";
    this.route.navigate([
      "two",
      routeChildData,
      {
        id: "heroId",
        foo: "foo"
      }
    ]);
  }
  comfirmModal() {
    this.appService.comfirmModal().subscribe(val => console.log(val));
  }
}
