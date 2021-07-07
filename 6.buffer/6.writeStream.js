// 可写流也是基于fs模块的 但是内部是 继承自stream流中writable接口

const fs = require('fs');
const path = require('path');

// fs.open  fs.write fs.close
let ws = fs.createWriteStream(path.resolve(__dirname,'copy.md'),{
    flags:'w',
    encoding:'utf8',
    mode:0o666,
    emitClose:true,
    start:0,
    highWaterMark:4, // 16*1024, // 默认写"期望"使用16k， 不会影响写入没写入
});

// 异步代码进行排序
let r = ws.write('ok','utf8',()=>{ // okno ok
    console.log(1);
})
console.log(r)
r = ws.write('o','utf8',()=>{
    console.log(2);
})
r = ws.write('o','utf8',()=>{
    console.log(2);
})
r = ws.write('o','utf8',()=>{
    console.log(2);
})
r = ws.write('o','utf8',()=>{
    console.log(2);
})
console.log(r);

// 每次open的时候参会将文件清空 r w 都是传递给open的