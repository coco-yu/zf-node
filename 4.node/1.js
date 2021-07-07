// console.log(global); // 全局上可以直接访问的属性我们叫他全局变量


// 所有模块都可以直接访问到以下5个变量但是他并不是global上的
// __dirname __filename require module exports


// console.log(global); // setTimeout  queueMicrotask  (setImmediate)
// console.log(process); // process 代表进程 可以获得运行时一些环境和参数

// console.log(Object.keys(process)); 
// platform  win32 => window  mac => darwin 每个平台找一些用户文件 位置可能不一样
// 写一个工具 获取用户的目录
// chdir cwd  env argv  nextTick

// 1.cwd current working directory 当前工作目录 运行时产生的一个路径 指向在哪里执行 (可以改变)
// process.chdir('../../../');

// console.log(process.cwd()); 
// console.log(__dirname); // 绝对路径 指代的是当前文件所在的目录
// 相对路径 相对的是工作目录，不是当前文件所在的目录

// 如果是一个确定路径我们都使用绝对路径


// 2.env  默认会读取全局的 （临时设置变量 - > 只针对当前的环境） cross-env 
// set NODE_ENV=development
// export NODE_ENV=development  powershell  mac
// console.log(process.env.a); // npm i cross-env -g 
// 可以根据不同环境设置环境变量


// 3.argv 用户执行时传递的参数
console.log(process.argv); // webpack --port 3000 --config webpack.config.js

// process.argv[0] // node的可执行文件
// process.argv[1] // node执行的文件是谁
// ...other 就是用户传递的参数 =》 进行参数解析

// let program = {}
// process.argv.slice(2).forEach((item,index,array)=>{
//     if(item.startsWith('--')){
//         program[item.slice(2)] = array[index+1];
//     }
// })
// console.log(program);

// commander 命令行管家  git 、 npm
const program = require('commander');
// 脚手架 工程化工具 解析用户的各种参数
program.option('-p,--port <n>', 'set user port')
program.option('-c,--config <n>', 'set user config file')
program.command('rmdir').description('remove dir').action(() => {
    console.log('remove file')
})
program.command('create').description('create project').action(() => {
    console.log('create project')
});
program.on('--help', () => { // 监听--help事件 来输出信息
    console.log('\nSee web site for more information.');
})
// program.parse(process.argv);
// console.log(program)
// console.log(Buffer); // 主要用于文件操作


// 1.process.env process.argv process.platform process.cwd() __dirname
// 2.nextTick

// node事件环 （setTimeout => nextTick => promise）
// 浏览器和node事件环在node10版本（执行结果都一样） 本质上不一样
// 浏览器 宏任务 、 微任务
// node中多多个宏任务队列


// 默认是先从上到下依次执行代码, 依次清空每个队列中的回调方法.每调用一个宏任务后都会清空微任务

// 宏任务 （老版本中 是每清空完毕一个队列后才会去执行微任务）
// timers 存放所有定时器回调的 [fn,fn,fn]
// poll阶段 主要存放的异步的i/o操作 node中基本上所有的异步api的回调都会在这个阶段来处理  []
// check是存放setImmediate的回调s  []

// 主栈 =》 检测时间又没有到达的定时，有就执行 (清空任务)=> 下一个阶段就是poll(i/o操作) =》 也是逐一清空 =》 看setImmediate队列中是否有内容，如果有内容则清空check阶段， 如果没有就在这阻塞 =》 不停的看定时器中有没有到达时间，如果有则回去继续执行



// setTimeout(() => {
//     console.log('timeout');
// }, 0);
// Promise.resolve().then(data=>{
//     console.log('then')
// });
// process.nextTick(()=>{
//     console.log('nextTick')
// }) 
// 优先级高于微任务 

//  console.log('ok')


// setImmediate(() => {
//     console.log('setImmediate');
// });
// setTimeout(() => {
//     console.log('timeout');
// }, 0); // 受性能影响 需要看循环的时候settimeout 是否被放到了队列中 是优先于setImmediate 还是在setImmediate之后




// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => { // io
    console.log(1)
  setTimeout(() => { // timer
    console.log('timeout');
  }, 0);
  console.log(2)
  setImmediate(() => { // check
    console.log('immediate');
  });
  console.log(3)
});


// 其他的执行结果和浏览器是一致的 （浏览器角度想）
