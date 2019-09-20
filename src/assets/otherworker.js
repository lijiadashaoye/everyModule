console.log('otherworker')

function kk() {
  console.log('kk函数')
  return 'kk函数被调用了'
}
console.log('otherworker.js内部自己执行一遍kk函数：'+kk())