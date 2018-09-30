// 引入WebSocket模块
var ws = require('nodejs-websocket')
var PORT = 3000

// on就是addListener，添加一个监听事件调用回调函数
// Scream server example:"hi"->"HI!!!",服务器把字母大写
ws.createServer(function (conn) {
    console.log('建立连接')
    conn.on("text", function (str) {
        console.log("收到信息：" + str)
        conn.sendText(str) //收到直接发回去
    })
    conn.on("close", function (code, reason) {
        console.log("服务器关闭")
    })
    conn.on("error", function (err) {
        console.log("服务器错误")
        console.log(err)
    })
}).listen(PORT)
console.log('websocket server listening on port ' + PORT)