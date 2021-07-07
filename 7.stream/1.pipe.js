const ReadStream = require('./ReadStream');
const WriteStream = require('./WriteStream');
const path = require('path');

const rs = new ReadStream(path.resolve(__dirname,'note.md'));
const ws = new WriteStream(path.resolve(__dirname,'copy.md'));

// 边读边写入  为了解决大文件读写操作
rs.pipe(ws); // 管道 on('data') on('end') ws.end（） ws.write()


// pipe 用处非常多 
 
// 数据结构 队列 （先进先出） 栈 （先进的最后出）  （数组来模拟）  (链表模拟)
// 线性结构

// 单向链表 
// 双向链表
// 循环链表
// 环形链表
