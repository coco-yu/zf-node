const fs = require('fs').promises; // libv提供的非阻塞的i/o方法
const path = require('path');
// 尽量不去阻塞主线程 多数采用异步API的方式
// linux 命令 mkdir -p a/b/c (子进程的方式去操作目录)

// fs.mkdir()  fs.rmdir() 先清空子目录

// fs.rmdir('a',function (err) {
//     console.log(err)
// })

// 异步串行 （把所有的流程都做成了一根线 co）和并发 （同时多个异步操作，最后通知我）

// 读取目录中的子节点

// fs.rmdir 删除目录
// fs.readdir 读取目录 读取儿子
// fs.stat  ( isDirectory ) 文件状态信息
// fs.unlink删除文件

// fs.readdir('public',function (err,dirs) {
//     dirs = dirs.map(dir=> path.join('public',dir))
//     dirs.forEach(dir=>{
//         fs.stat(dir,function (err,statObj) {
//             if(statObj.isFile()){
//                 fs.unlink(dir,()=>{})
//             }else{
//                 // console.log('目录',dir);
//                 fs.rmdir(dir,()=>{}); // abc 就没目录
//             }
//         })
//     })
//     fs.rmdir('public',()=>{})
// })

// 删除 遇到文件夹先去遍历子节点 ，当子节点删除完毕后在删除自己，如果子节点在有子节点 需要递归
// 1.异步串行 深度优先
// function myRmdir(dir,callback){
//    fs.stat(dir,(err,statObj)=>{
//         if(statObj.isFile()){
//             fs.unlink(dir,callback); // 如果是文件直接删除即可
//         }else{
//             fs.readdir(dir,(err,dirs)=>{
//                 dirs = dirs.map(d=> path.join(dir,d)); // 2
//                 // 可以获取 a 和 .js文件
//                 //  先拿到第一个儿子来删除, 二儿子，三儿子.....
//                 let index = 0;
//                 function next(){
//                     if(index == dirs.length) return fs.rmdir(dir,callback); // node rmdir
//                     let current = dirs[index++];
//                     myRmdir(current,next); // [b,'.js']
//                 }
//                 next();
//             })
//         }
//     });
// }
// 2.异步串行 广度优先
// function myRmdir(dir, cb) {
//     let stack = [dir];
//     let index = 0;
//     function reverseRemove(){
//         let idx = stack.length - 1;
//         function next(){
//             if(idx <0) return cb();
//             let cur = stack[idx--];
//             fs.rmdir(cur,next);
//         }
//         next();
//     }
//     fs.stat(dir, (err, statObj) => {
//         if (statObj.isFile()) {
//             fs.unlink(dir, cb); // 如果是文件直接删除即可
//         } else {
//             // 如果时目录 采用广度遍历的方式， 采用异步的方式读取目录 维护想要的结果，最终将结果倒叙删除
//             let idx = 0;
//             function next(){
//                 let dir = stack[idx++];
//                 if(!dir) return reverseRemove();
//                 fs.readdir(dir,(err,dirs)=>{
//                     dirs = dirs.map(d=> path.join(dir,d));
//                     stack.push(...dirs);
//                     next();
//                 })
//             }
//             next();           
//         }
//     });
// }
// 3.并发删除
// function myRmdir(dir, cb) {
//     fs.stat(dir, (err, statObj) => {
//         if (statObj.isFile()) {
//             fs.unlink(dir, cb); // 如果是文件直接删除即可
//         } else {
//             // 同时删除子元素 （如果子元素为空需要删除自己）
//             fs.readdir(dir, (err, dirs) => {
//                 dirs = dirs.map(d => path.join(dir, d));
//                 if (dirs.length == 0) {
//                     return fs.rmdir(dir, cb); // 没有子文件或者文件夹
//                 }
//                 let idx = 0;
//                 function removeCount() {
//                     if (++idx === dirs.length) {
//                         fs.rmdir(dir, cb);
//                     }
//                 }
//                 dirs.forEach(dir => {
//                     myRmdir(dir, removeCount);
//                 })
//             })
//         }
//     });
// }
// 4.promise优化
// function myRmdir(dir) {
//     return new Promise((resolve, reject) => {
//         fs.stat(dir, (err, statObj) => {
//             if (err) reject(err);
//             if (statObj.isFile()) {
//                 fs.unlink(dir, resolve); // 如果是文件直接删除即可
//             } else {
//                 // 同时删除子元素 （如果子元素为空需要删除自己）
//                 fs.readdir(dir, (err, dirs) => {
//                     if (err) reject(err);
//                     // map返回的是删除儿子列表的promise数组
//                     dirs = dirs.map(d => myRmdir(path.join(dir, d)));
//                     Promise.all(dirs).then(() => {
//                         fs.rmdir(dir, resolve)
//                     }).catch(err => {
//                         reject(err);
//                     })
//                 })
//             }
//         });
//     })
// }
// 5.使用async + await
// 深度优先，广度优先

async function myRmdir(dir) { 
    let statObj = await fs.stat(dir); // statObj, 如果文件不存在就报错了 
    if (statObj.isDirectory()) {
        let dirs = await fs.readdir(dir); // 这个返回的是数组
        // 将所有子文件进行删除 并且用promise.all包裹起来
        // Promise.all返回的是promise实例
        await Promise.all(dirs.map(d => myRmdir(path.join(dir, d))));
        await fs.rmdir(dir)
    } else {
        await fs.unlink(dir);
    }
}
myRmdir('a').then(() => {
    console.log('删除成功')
}).catch(err=>{
    console.log('删除失败')
});
// fs.readFile writeFile  fs.existSync 
// statObj 如果不存在会报错  isDirectory  isFile
// rmdir mkdir readdir
// unlink ...

// 流 fs.read fs.write  fs.createReadStream() fs.writeStream()






// 并发 -》 promise =》 (async + await)
// http 开篇

