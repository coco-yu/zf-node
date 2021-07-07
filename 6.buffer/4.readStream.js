const fs = require('fs');
const path = require('path');
// fs.open fs.read fs.close 
// 文件流可读流 是基于stream模块中Readable接口
const ReadStream = require('./ReadStream');
let rs = new ReadStream(path.resolve(__dirname,'note.md'),{
    flags:'r',
    encoding:null,
    autoClose:true,
    start:0,
    highWaterMark:3, // 每次读取3个字节
    end:6 // 从索引0的位置读取到索引3的位置
    // 2爷1直4读书
    // mode:0o666, // 权限  // d (rwx) (r-x) (r-x)  4 2 1 chmod -R 777 
});
// rs 是可读流对象
rs.on('open',function (fd) { // 内部会emit
    console.log(fd);
});
let arr = []
rs.on('data',function (chunk) { // 当用户监听data事件时内部会不停的将数据发射出来
     console.log(chunk);
    //  rs.pause(); // 暂停读取
     arr.push(chunk);
})
rs.on('end',function () {
    console.log(Buffer.concat(arr).toString())
})
rs.on('close',function () { // close 事件需要等待读取完毕后才会触发 fs.close
    console.log('close')
})
// 文件流 和 流 俩概念 文件流是基于流来实现的 (文件流采用open和close事件)
// on('data') on('end') 都是流中的方法 =》 可读流标识就是拥有data 和 end方法

// setInterval(() => {
//     rs.resume(); // 恢复
// }, 1000);


// on('data') on('end') on('error');
// on('open') on('close')
// rs.pause() rs.resume();

// 发布订阅的使用