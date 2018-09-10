import {
  trigger,
  state,
  transition,
  style,
  animate,
  keyframes,
  group,
  query,
  stagger
} from "@angular/animations";

export const tipsAnimate = trigger(
  // 路由动画，整个组件
  "tips",
  [
    state(
      "void",
      style({
        position: "fixed",
        background: "none",
        left: "25%",
        width: "550px",
        opacity: 0
      })
    ), // 初始化

    // state里面的style定义元素最终状态、样式
    state(
      "tipOne",
      style({
        position: "fixed",
        opacity: 1,
        background: "rgb(62, 241, 17)",
        width: "550px",
        left: "25%",
        top: "10%"
      })
    ), // 最终

    // transition里面的style定义动画开始执行时元素的初始状态、样式
    // 进场
    transition(":enter", [
      animate(
        "300ms",
        keyframes([
          style({
            transform: "translateY(-100%)",
            width: "550px",
            background: "rgb(62, 241, 17)",
            opacity: 0,
            offset: 0
          }),
          style({ transform: "translateY(0)", opacity: 0.2, offset: 0.1 }),
          style({ transform: "translateY(50%)", opacity: 0.4, offset: 0.3 }),
          style({ transform: "translateY(80%)", opacity: 0.7, offset: 0.5 }),
          style({ transform: "translateY(100%)", opacity: 0.8, offset: 0.7 }),
          style({ transform: "translateY(80%)", opacity: 1, offset: 1 })
        ])
      )
    ]),
    // 离场
    transition(":leave", [
      group([
        // animate里面的style定义动画执行过程中元素的状态、样式
        animate(500, style({ transform: "translateX(100%)" })),
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
);

export const comfirmAnimate = trigger(
  // 路由动画，整个组件
  "comf",
  [
    state(
      "void",
      style({
        background: "none",
        opacity: 0
      })
    ), // 初始化

    // state里面的style定义元素最终状态、样式
    state(
      "confirms",
      style({
        opacity: 1,
        background: "pink"
      })
    ), // 最终

    // transition里面的style定义动画开始执行时元素的初始状态、样式
    // 进场
    transition(":enter", [
      style({
        // 进场动画开始时，初始状态
        transform: "scale(0)",
        opacity: 0
      }),
      group([
        // group可以同时执行很多animate
        // animate里面的style定义动画执行过程中元素的状态、样式
        animate(500, style({ transform: "scale(1)", background: "pink" })),
        animate(500, style({ opacity: 1 }))
      ])
    ]),
    // 离场
    transition(":leave", [
      group([
        // animate里面的style定义动画执行过程中元素的状态、样式
        animate(300, style({ transform: "scale(0)", background: "none" })),
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
);
