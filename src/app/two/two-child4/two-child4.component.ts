import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: "app-two-child4",
  templateUrl: "./two-child4.component.html",
  styleUrls: ["./two-child4.component.css"]
})
export class TwoChild4Component implements OnInit {
  paramsData;
  paramsData2;
  path;
  constructor(private location: Location, private rout: ActivatedRoute) {}

  ngOnInit() {
    // 通过：
    // let routeChildData = 'twoChild4'; 可以动态设置路由路径及参数
    // this.route.navigate(['two', routeChildData, { id: 'heroId', foo: 'foo' }]) 方式跳过来的
    this.rout.paramMap.subscribe((paramsMap: ParamMap) => {
      this.paramsData = paramsMap;
      this.paramsData2 = paramsMap.get("id");
    });
    this.path = this.location.path();
  }
  goBack(): void {
    this.location.back();
  }
}
