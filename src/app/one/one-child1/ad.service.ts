import { Type } from "@angular/core";
import { Injectable } from "@angular/core";

import { Rd1Component } from "./rd1/rd1.component";
import { Rd2Component } from "./rd2/rd2.component";

export class AdItem {
  //  定义数据结构
  constructor(public component: Type<any>, public data: any) {}
}
@Injectable()
export class AdService {
  // 创建数据
  getAds() {
    return [
      new AdItem(Rd1Component, { name: "Bombasto", bio: "Brave as they come" }),
      new AdItem(Rd2Component, {
        headline: "Hiring for several positions",
        body: "Submit your resume today!"
      })
    ];
  }
}
