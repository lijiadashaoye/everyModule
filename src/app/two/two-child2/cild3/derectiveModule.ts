import { Directive, Input, ElementRef, Renderer, HostListener } from "@angular/core";

@Directive({
    selector: '[exeBackground]'
})
export class ExeBackgroundDirective {
    private _defaultColor = 'red';

    @Input('exeBackground')
    backgroundColor: string; // 输入属性，用于设置元素的背景颜色

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
        this.setStyle(this._defaultColor);
    }

    @HostListener('click')
    onClick() { // 监听宿主元素的点击事件，设置元素背景色
        if (this._defaultColor == 'yellow') {
            this.setStyle(this.backgroundColor)
            this._defaultColor = this.backgroundColor;
        } else {
            this.setStyle('red')
            this._defaultColor = 'red';
        }
    }
    @HostListener('window:click', ['$event'])
    onCl() {
        if (this.elementRef.nativeElement.contains(event.target)) {
            this.setStyle('yellow');
        } else {
            this.setStyle('blue');
        }
    }
    setStyle(color: string) { // 调用renderer对象提供的API设置元素的背景颜色
        this.renderer.setElementStyle(this.elementRef.nativeElement,
            'backgroundColor', color);
    }
}