// 使用onmessage，自动执行，也可以使用XMLHttpRequest构造函数
self.onmessage = function (event) {
    console.log(event)
    let result = 0,
        num = event.data;

    for (let i = 1; i < num; i++) {
        result += i;
    }
    //向主线程返回消息
    postMessage(result);
    // 停止Worker
    self.close();
}
// 总结：其实在angular里，webwoker与服务实现的效果一样