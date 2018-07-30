import { trigger, state, transition, style, animate, keyframes, group, query, stagger } from '@angular/animations'

export const animates = trigger(  // 路由动画，整个组件
    'routeAnim', [
        // state里面的style定义元素最终状态、样式
        state('void', style({ 'position': 'fixed', 'background': 'none' })),   // 初始化
        state('*', style({ 'position': 'fixed', 'background': 'rgb(221, 110, 110)', opacity: 1 })),  // 最终

        // transition里面的style定义动画开始执行时元素的初始状态、样式
        // 进场
        transition(':enter', [
            style({ // 进场动画开始时，初始状态
                transform: 'translateX(-100%)',
                opacity: 0,
            }),
            group([   // group可以同时执行很多animate
                // animate里面的style定义动画执行过程中元素的状态、样式
                animate(700, style({ transform: 'translateX(0)', })),
                animate(700, style({ opacity: 1, 'background': 'rgb(221, 110, 110)' }))
            ])
        ]),
        // 离场
        transition(':leave', [
            style({   // 离场动画初始状态
                transform: 'translateX(0)',
                position: 'fixed',
                top: 0,
                'z-index': 20
            }),
            group([
                // animate里面的style定义动画执行过程中元素的状态、样式
                animate(800, style({ transform: 'translateX(100%)' })),
                animate(800, style({ opacity: 0 }))
            ])
        ]),
    ]
)
// 定义点击时的动画
export const buttonAnimt = trigger(
    'clicks', [
        state('one2', style({ 'background': 'blue', 'transform': 'scale(.5)' })),
        state('two2', style({ 'background': 'green', 'transform': 'scale(1)' })),

        transition('*=>one2', animate(800)),
        transition('*=>two2', animate(800)),
    ]
)
// 定义子组件的动画
export const cardAnim = trigger('card', [
    state('out', style({
        transform: 'scale(1)',
        'box-shadow': 'none',
        cursor: 'pointer',
    })),
    state('hover', style({
        transform: 'scale(0.95)',
        'box-shadow': '0px 0px 30px rgba(0,0,0,.5)',
        cursor: 'pointer',
    })),
    transition('out=>hover', animate('250ms')),
    transition('hover=>out', animate('200ms')),
])

// 使用query 对整个页面进行查询，只要有执行可以查询到的状态就会执行相应的动画
// 一般只有绑定了动画的元素才有:enter和:leave
// query 一般用在设置子组件内子多个元素出现时的动画
export const queryAnimat = trigger('queryAinm', [  
    transition('*=>*', [
        query(":enter", style({
            opacity: 0
        }), { optional: true }),
        query(':enter', stagger(200, [
            animate('0.2s', style({
                opacity: 1
            }))
        ]), { optional: true }),
        query(":leave", style({
            opacity: 1
        }), { optional: true }),
        query(':leave', stagger(800, [
            animate('.8s', style({
                opacity: 0,
            }))
        ]), { optional: true }),
    ]),
])
