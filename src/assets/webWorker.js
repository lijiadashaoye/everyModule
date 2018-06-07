// let i = 0;
// function timedCount() {
//     i = i + 1;
//     postMessage(i);
//     setTimeout("timedCount()", 500);
// }
// timedCount();

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