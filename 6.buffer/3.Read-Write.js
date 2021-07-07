// fs.open fs.read fs.write  (自己定位读取哪个位置)

const fs = require('fs');

const path = require('path');

// r (read) w(write) a(append 追加内容) (r+ (以读取为基础要求文件必须存在) w+(以写为基础，文件不存在也可以操作))

// 我打开文件要做哪些事  I/O
// let buffer = Buffer.alloc(3);
// fs.open(path.resolve(__dirname, 'note.md'), 'r', function(err, fd) { // file descriptor
//     // fd 可以来描述我要对这个文件做什么操作
//     console.log('fd', fd)
//     // 读取文件 (读取位置) 从buffer的第0个位置写入，写3个
//     // 文件描述符 读取到哪个buffer中，从buffer的哪个位置开始写入，写入几个，读取文件的位置是多少
//     fs.read(fd, buffer, 0, 3, 0, function(err, bytesRead) { // bytesRead 真实读取到的个数
//         console.log(buffer, bytesRead);
//         // 将读取到的结果消费掉
//         fs.open(path.resolve(__dirname, 'copy.md'), 'w', function(err, wfd) {
//             console.log('wfd', wfd)
//             // 从buffer的第0个位置读取3个 写入到文件的第0个位置
//             fs.write(wfd, buffer, 0, 3, 0, function(err, written) {
//                 fs.close(fd, () => {});
//                 fs.close(wfd, () => {})
//             })
//         })
//     });
// });
// 读取3个字节消费三个字节怎么实现？


// 异步迭代采用递归来实现
let BUFFER_SIZE = 3;
let buffer = Buffer.alloc(BUFFER_SIZE);
let readOffset = 0;
let writeOffset = 0;
fs.open(path.resolve(__dirname, 'note.md'), 'r', function(err, fd) { // file descriptor
    fs.open(path.resolve(__dirname, 'copy.md'), 'w', function(err, wfd) {
        function next() {
            fs.read(fd, buffer, 0, BUFFER_SIZE, readOffset, function(err, bytesRead) {
                if(bytesRead >0){ // 读取到内容
                    fs.write(wfd, buffer, 0, bytesRead, writeOffset, function(err, written) {
                        readOffset += bytesRead;
                        writeOffset += written;
                        next();
                    })
                }else{
                    // 关闭操作
                    fs.close(fd, () => {});
                    fs.close(wfd, () => {})
                }
            });
        }
        next();
    })
});
// 嵌套  读写可以分开操作 （发布订阅来进行解耦） fs就基于流来实现 大文件的读取 
// fs中 createReadStream createWriteStream  基于stream模块来实现的

