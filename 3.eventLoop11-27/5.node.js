// 默认node中的this是谁？

// 系统和用户区别是 一个系统有多个用户，用户中的path只针对当前的用户 系统里配置的支持所有的用户

// node默认安装会送一个npm node package manage   nvm 可以切换node版本 （brew install nvm）   nvm-window 

// node + 文件名的方式来执行

// node中的this  , 在文件中this指向的是module.exports 默认是{}
// commonjs 规范 表示所有的代码写到文件中，文件内部会自带一个函数，这个函数执行的时候改变了this

 // 在浏览器中不能直接访问global 都是通过window来代理

// setImmediate node中的
// setInterval setTimeout queueMicrotask

// 可以直接访问当的就是全局属性
console.log(process); // process.nextTick

console.log(Buffer);

// 模块化 fs 手写commonjs规范 npm的使用 内置的其他模块

// 流 http tcp



