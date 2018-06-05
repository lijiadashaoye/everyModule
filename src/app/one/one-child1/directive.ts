import { Directive, ElementRef, HostListener, Input, Renderer2, Attribute } from '@angular/core';

@Directive({ selector: '[appHighlight]' })

export class HighlightDirective {
    constructor(
        private el: ElementRef,
        private rd: Renderer2,
        @Attribute('author') private author: string
    ) { }
    @Input('appHighlight') highlightColor: string;
    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('red');
        this.author ? console.log(this.author):''
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(this.highlightColor);
    }
    // 方法也可以添加private 或者 public
    private highlight(color: string) {
        // this.el.nativeElement.style.backgroundColor = color;
        let elem = this.el.nativeElement;
        this.rd.setAttribute(elem, 'style', `background:${color};`)
    }

}