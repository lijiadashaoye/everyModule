import {
  Component,
  OnInit,
  Directive,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-cild4',
  templateUrl: './cild4.component.html',
  styleUrls: ['./cild4.component.css'],

})
export class Cild4Component implements OnInit {
  datas = [1, 2, 3];
  dat;
  offLeft;
  offTop;
  offw;
  offh;
  constructor(
    private elem: ElementRef,
    private rend: Renderer2
  ) { }

  ngOnInit() {
    this.datas = this.datas.sort(function (a, b) {
      return b - a
    })
    this.dat = this.datas.reduce((a, b) => a + b, 10)
  }
  ngAfterViewInit() {  // 获取表格的另一种方法
    let trs = document.getElementsByTagName('table')[0];
    console.log(trs.rows)
    console.log(trs.rows[0].cells)
  }
  mouseDown(e) {
    e.returnValue = false;  // 去掉其他部分被选中时一闪一闪的效果
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    e.stopPropagation();
    if (e['target'].id == 'main') {
      this.makePositin(e, mouseX, mouseY)
    } else {
      this.makeSize(e, mouseX, mouseY)
    }
  }

  makePositin(e, mouseX, mouseY) {
    let target = e['target'];
    target.onmousemove = (ev) => {
      if (!this.offw) { this.offw = target.offsetWidth; }
      if (!this.offh) { this.offh = target.offsetHeight; }
      let mouseMoveX = ev.offsetX;
      let mouseMoveY = ev.offsetY;

      this.offLeft = e.target.offsetLeft + mouseMoveX - mouseX; // 移动的距离
      this.offTop = e.target.offsetTop + mouseMoveY - mouseY;

      let offRight = e.target.parentNode.offsetWidth - e.target.offsetWidth; // 右侧的距离
      let offBottom = e.target.parentNode.offsetHeight - e.target.offsetHeight;

      if (this.offLeft >= 0 && this.offTop >= 0 && this.offLeft <= offRight && this.offTop <= offBottom) {
        this.rend.setAttribute(target, 'style', `width:${this.offw}px;height:${this.offh}px;left:${this.offLeft}px;top:${this.offTop}px`)
        let img2 = this.elem.nativeElement.querySelector('#img2')
        let kk = `clip:rect(${target.offsetTop}px ${e.target.offsetLeft + e.target.offsetWidth}px
              ${target.offsetHeight + target.offsetTop}px 
              ${target.offsetLeft}px)`;
        this.rend.setAttribute(img2, 'style', kk)
      } else {
        if (this.offLeft < 0) { this.offLeft = 0 };
        if (this.offTop < 0) { this.offTop = 0 };
        if (this.offLeft > offRight) { this.offLeft = offRight };
        if (this.offTop > offBottom) { this.offTop = offBottom };
        this.rend.setAttribute(target, 'style', `width:${this.offw}px;height:${this.offh}px;left:${this.offLeft}px;top:${this.offTop}px`);
        let img2 = this.elem.nativeElement.querySelector('#img2')
        let kk = `clip:rect(${target.offsetTop}px ${e.target.offsetLeft + e.target.offsetWidth}px
              ${target.offsetHeight + target.offsetTop}px 
              ${target.offsetLeft}px)`;
        this.rend.setAttribute(img2, 'style', kk)
      }
    }
  }

  makeSize(e, mouseX, mouseY) {
    if (e['target'].parentNode.id == 'main') {
      let target = e['target'];
      target.onmousemove = (ev) => {
        let mouseMoveX = ev.offsetX;  // 鼠标的坐标
        let mouseMoveY = ev.offsetY;

        let offLeftdian = mouseMoveX - mouseX; // 移动的距离
        let offTopdian = mouseMoveY - mouseY;

        let offRight = e.target.parentNode.parentNode.offsetWidth + e.target.offsetWidth / 2; // 右侧的距离
        let offBottom = e.target.parentNode.parentNode.offsetHeight + e.target.offsetHeight / 2;
        if (
          target.id == 'dian8' ||
          target.id == 'dian3' ||
          target.id == 'dian6' ||
          target.id == 'dian8'
        ) {
          this.offw = target.parentNode.offsetWidth + offLeftdian;
          this.offh = target.parentNode.offsetHeight + offTopdian;
          this.rend.setAttribute(target.parentNode, 'style',
            `width:${this.offw}px;height:${this.offh}px;
          left:${this.offLeft}px;top:${this.offTop}px;
          transform-origin:100% 100%;
          `)
          let img2 = this.elem.nativeElement.querySelector('#img2');
          let kk = `clip:rect(${target.parentNode.offsetTop}px 
            ${e.target.parentNode.offsetLeft + e.target.parentNode.offsetWidth}px
            ${target.parentNode.offsetHeight + target.parentNode.offsetTop}px 
            ${target.parentNode.offsetLeft}px)`;

          this.rend.setAttribute(img2, 'style', kk)
        }
        else {
          switch (target.id) {
            case 'dian2':
              this.offh = target.parentNode.offsetHeight + offTopdian;
              break;
            case 'dian4':
              this.offw = target.parentNode.offsetWidth + offLeftdian;
              break;
            case 'dian5':
              this.offw = target.parentNode.offsetWidth + offLeftdian;
              break;
            case 'dian7':
              this.offh = target.parentNode.offsetHeight + offTopdian;
              break;
          }

          this.rend.setAttribute(target.parentNode, 'style',
            `width:${this.offw}px;height:${this.offh}px;
          left:${this.offLeft}px;top:${this.offTop}px;
          transform-origin:100% 100%;
          `)
          let img2 = this.elem.nativeElement.querySelector('#img2');
          let kk = `clip:rect(${target.parentNode.offsetTop}px 
            ${e.target.parentNode.offsetLeft + e.target.parentNode.offsetWidth}px
            ${target.parentNode.offsetHeight + target.parentNode.offsetTop}px 
            ${target.parentNode.offsetLeft}px)`;

          this.rend.setAttribute(img2, 'style', kk)
        }
      }
    }
  }
  @HostListener('window:mouseup', ['$event'])
  mouseUp(e) {
    let target = this.elem.nativeElement.querySelector('#main')
    let targetChild = target.children;
    target.onmousemove = null
    for (let i = 0; i < targetChild.length; i++) {
      targetChild[i].onmousemove = null
    }
  }
}