// 使用onmessage，自动执行，也可以使用XMLHttpRequest构造函数
onmessage = function (event) {

    // 在 Worker中可以使用的
    // console.log(event)
    // console.log(navigator)
    // console.log(location)  // 与window.location 相同，但都是只读的
    // console.log(XMLHttpRequest)
    importScripts('./otherworker.js'); // 用来加载当前Worder所用到的外部js代码

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
        // 使用另外一个js文件
        console.log('在使用importScripts()的文件中调用：'+kk())
        // 停止Worker
        close();
    })();
}
// 总结：其实在angular里，webwoker与服务实现的效果一样