// 我希望写入10个数 （0-9） 只用一个字节的内存

const fs = require('fs');
const path = require('path');
const WriteStream = require('./WriteStream');
let ws = new WriteStream(path.resolve(__dirname, 'copy.md'), {
    flags: 'w',
    encoding: 'utf8',
    mode: 0o666,
    emitClose: true,
    start: 0,
    highWaterMark: 5, // 我期望使用多少个字节完成写入操作，如果超出后write的返回值会变成false， 返回false 可以用于判断，告知用户不要在写入了，再写入只能放到内存中，占用内存
});
let index = 0;
// 循环操作时同步的，会批量写入十次，第一次调用fs.write, 后面的操作都放到了内存中
// 读和写的搭配流程 先读取=》调用write方法写入，如果放下超过预期，暂停读取 =》 等待写入完毕后=》触发drain事件=》在恢复读取，周而复始。 实现边读边写的功能


function write() {
    let writting = true;
    while (index < 10) { // 真正写入到文件后会减少数量
        writting = ws.write(index++ + ''); // write方法只能使用string 或buffer;
        if (!writting) {
            break;
        }
    }
    if(index == 10){
        //ws.end('ok'); // write after end 不能在关闭后继续写入 end = write + close
        // 触发了end 就不会再触发drain事件了
    }
}
ws.on('drain',()=>{ // 当写入的个数达到或者超过预期后被消费掉后，会触发drain事件
    console.log('drain');
    write();
});

ws.on('close',()=>{
    console.log('close')
})
write();
// write() end()  on('drain')  
