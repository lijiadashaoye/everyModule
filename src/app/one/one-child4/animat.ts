import { trigger, state, transition, style, animate, keyframes, group, query, stagger } from '@angular/animations'

export const animates = trigger(  // 路由动画
    'square', [
        // state里面的style定义元素最终状态、样式
        state('void', style({ 'position': 'fixed', 'background': 'pink', 'transform': 'scale(.2)' })),
        state('*', style({ 'position': 'fixed', 'background': 'pink' })),
        // transition里面的style定义动画开始执行时元素的初始状态、样式
        transition(':enter', [
            style({ transform: 'translateX(-100%)', 'opacity': 0 }),
            group([   // group可以同时执行很多animate
                // animate里面的style定义动画执行过程中元素的状态、样式
                animate(1000, style({ transform: 'translateX(0)', })),
                animate(900, style({ opacity: 1 }))
            ])

        ]),
        transition(':leave', [
            style({ transform: 'translateX(150%)' }),
            group([
                animate(900, style({ transform: 'translateX(-100%)' })),
                animate(900, style({ opacity: 0 }))
            ])
        ]),
    ]
)
export const buttonAnimt = trigger(
    'clicks', [
        state('void', style({ 'background': 'black', 'transform': 'scale(0.2)' })),
        state('*', style({ 'background': 'red', 'transform': 'scale(1)' })),
        state('one2', style({ 'background': 'yellow', 'transform': 'scale(.2)' })),
        state('two2', style({ 'background': 'green', 'transform': 'scale(1)' })),
        transition('void=>*', animate(1000)),
        transition('*=>one2', animate(1000)),
        transition('one2=>two2', animate(1000)),
        transition('two2=>one2', animate(1000)),
        transition('two2=>void', animate(1000)),

    ]
)

export const queryAnimat = trigger('queryAinm', [  // query 一般用在设置组件内子元素的动画
    transition('*=>*', [
        query(':enter', style({ opacity: 0 }),{optional:true}),
        query(':enter', stagger(200, [
            animate('1s', style({ opacity: 1 }))
        ]),{optional:true}),
        query(':leave', style({ opacity: 1 }),{optional:true}),
        query(':leave', stagger(700, [
            animate('1s', style({ opacity: 0 }))
        ]),{optional:true}),
    ]),
])