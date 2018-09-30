import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  Attribute,
  HostBinding,
  EventEmitter,
  Output
} from "@angular/core";

@Directive({
  selector: "[appHighlight]",
  // 使用exportAs 输出指令示例，可以用来在模板中把该指令赋值给一个变量，从而在别的地方可以执行指令
  exportAs: "inDirectiveFn"
})
export class HighlightDirective {
  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    @Attribute("author") private author: string
  ) {}
  @Input("appHighlight")
  highlightColor: string;

  @HostListener("mouseenter")
  onMouseEnter() {
    // 使用HostListener为元素添加指令
    this.author ? console.log(this.author) : "";
    this.highlight("red", "mouseenter");
  }

  @HostListener("mouseleave", ["$event"])
  onMouseLeave(e) {
    // console.log(e);
    this.highlight(this.highlightColor, "mouseleave");
  }

  // 方法也可以添加private 或者 public(默认)
  private highlight(color: string, type) {
    // this.el.nativeElement.style.backgroundColor = color;
    let elem = this.el.nativeElement;
    this.rd.setAttribute(elem, "style", `background:${color};`);
  }

  // 另外一种为元素设置样式的方法
  hide() {
    let elem = this.el.nativeElement;
    elem.classList.remove("tooltip--active");
  }

  show() {
    let elem = this.el.nativeElement;
    elem.classList.add("tooltip--active");
  }
}

// 可使用下列形式之一：
// element-name：根据元素名选取。
// .class：根据类名选取。
// [attribute]：根据属性名选取。
// [attribute=value]：根据属性名和属性值选取。
// :not(sub_selector)：只有当元素不匹配子选择器 sub_selector 的时候才选取。
// selector1, selector2：无论 selector1 还是 selector2 匹配时都选取。
@Directive({
  selector: "[hostbindingd]"
})
export class HostBindTest {
  @HostBinding("attr.role") // 添加一个自定义属性
  role = "anyRole";

  @HostBinding("class.pressed") // 如果isPressed=true，则为元素添加class样式
  isPressed: boolean = false;

  @HostListener("click", ["$event"]) // 绑定鼠标事件
  onclick(ev: Event) {
    this.isPressed = !this.isPressed;
  }
}

import { HttpService } from "../../http.service";
@Directive({
  selector: "[httplisten]"
})
export class HttpListen {
  constructor(private http: HttpService) {}
  @HostListener("click", ["$event"])
  onclick(ev: Event) {
    let obj = {
      name: "directived"
    };
    this.http.directiveHttp(obj).subscribe(val => console.log(val));
  }
}

@Directive({
  selector: "[hostlisten]"
})
export class HostListen {
  @Output()
  emData = new EventEmitter();

  @HostListener("click", ["$event"])
  onclick(ev: Event) {
    console.log(ev);
    this.emData.emit("Directive 事件");
  }
}
