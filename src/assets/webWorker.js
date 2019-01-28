// 使用onmessage，自动执行，也可以使用XMLHttpRequest构造函数
onmessage = function (event) {
    // console.log(event)

    let sleep = function (time) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // 返回 ‘ok'
                let obj = {
                    data: 'ok',
                    type: 'worker'
                }
                resolve(obj);
            }, time);
        })
    };

    // 立即执行的 async 函数
    (async () => {
        let result = await sleep(event.data);
        //向主线程返回消息
        postMessage(result);
        // 停止Worker
        close();
    })();
}
// 总结：其实在angular里，webwoker与服务实现的效果一样