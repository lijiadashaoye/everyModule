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
} from '@angular/core';

@Directive({ selector: '[appHighlight]' })

export class HighlightDirective {
    constructor(
        private el: ElementRef,
        private rd: Renderer2,
        @Attribute('author') private author: string
    ) { }
    @Input('appHighlight') highlightColor: string;
    @HostListener('mouseenter') onMouseEnter() {
        this.author ? console.log(this.author) : '';
        this.highlight('red', 'mouseenter');
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(this.highlightColor, 'mouseleave');
    }
    // 方法也可以添加private 或者 public
    private highlight(color: string, type) {
        // this.el.nativeElement.style.backgroundColor = color;
        let elem = this.el.nativeElement;
        this.rd.setAttribute(elem, 'style', `background:${color};`)
    }
}

@Directive({ selector: '[hostbindingd]' })
export class HostBindTest {
    @HostBinding('attr.role') role = 'button';
    @HostBinding('class.pressed') isPressed: boolean = false;
    @HostListener('click', ['$event'])
    onclick(ev: Event) {
        this.isPressed = !this.isPressed
    }
}

import { HttpService } from '../../http.service';
@Directive({ selector: '[httplisten]' })
export class HttpListen {
    constructor(private http: HttpService) { }
    @HostListener('click', ['$event'])
    onclick(ev: Event) {
        let obj = {
            name: 'directived'
        }
        this.http.directiveHttp(obj)
            .subscribe(val => console.log(val))
    }
}

@Directive({ selector: '[hostlisten]' })
export class HostListen {
    @Output() emData = new EventEmitter()
    @HostListener('click', ['$event'])
    onclick(ev: Event) {
        console.log(ev)
        this.emData.emit('Directive 事件')
    }
}
