// file system 文件操作的api  同步api 异步api

// 文件读写操作
const fs = require('fs');
const path = require('path');
// 带有sync字样都是同步api
// 读取的数据默认编码都是null，二进制数据（buffer） 文件不存在报错
// 写入的时候也是默认以二进制形式写入，如果文件不存在会创建文件，如果文件已经存在会覆盖文件

// 我们在开发时使用同步api并不多 （阻塞） 用起来方便

try {
    // let r = fs.readFileSync(path.resolve(__dirname,'note.md'));
    // fs.writeFileSync(path.resolve(__dirname,'copy.md'),r); // 写入操作写入的是二进制
} catch (e) {

}


// 阻塞（速度快）后续逻辑需要等待  （读取小文件没有问题 64k 以下都可以认为是小的）
fs.readFile(path.resolve(__dirname, 'note.md'), function(err, data) {
    if (err) {
        return console.log(err);
    }
    fs.writeFile(path.resolve(__dirname, 'copy.md'), data, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('copy ok')
    })
});

// 文件如果过大,怎么办？ 淹没可用内存 或者内存溢出，不能读取大文件操作的
// 读取部分数据再进行写入

// fs.open fs.read fs.write 


// js 单线程的，如果出错没有捕获 会终止运行