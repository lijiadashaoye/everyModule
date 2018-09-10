import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * app服务
 */
@Injectable()
export class AppService {
  childService = new EventEmitter<string>(); // 用来控制退出按钮的显示
  compo = new Subject();
  constructor(private route: Router) {}
  comfirmModal() {
    let that = this;
    let sub = new Subject();
    (async () => {
      let result = await new Promise(resolve => {
        that.route.navigate([
          {
            outlets: {
              popup2: ["compose2"]
            }
          }
        ]);
        that.compo.subscribe(val => {
          resolve(val);
        });
      });
      sub.next(result);
    })();
    return sub;
  }
}
