// 方法一：手动执行函数
// let i = 0;
// function timedCount() {
//     i = i + 1;
//     postMessage(i);
//     setTimeout("timedCount()", 500);
// }
// timedCount();

// 方法二：使用onmessage，自动执行
onmessage = function (event) {
    console.log(event)
    let result = 0,
        num = event.data;

    for (let i = 1; i < num; i++) {
        result += i;
    }
    //向主线程返回消息
    postMessage(result);
}
// 总结：其实在angular里，webwoker与服务实现的效果一样