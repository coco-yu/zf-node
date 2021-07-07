let r = require('./a');

// let r = (function(module,exports,require,__dirname,__filename){
//     module.exports = 'hello'
//     return  module.exports
// })(module,exports,require,__dirname,__filename)

// commonjs规范里：三种模块
// 自定义模块、文件模块  / 第三方模块 / 内置模块和核心模块


//  内置模块和核心模块 node中自带的不需要安装，引用的时候不需要添加路径
const fs = require('fs');  // 处理文件
// let r1 = fs.readFileSync('./1.js','utf8'); // 同步读取
// let r2 = fs.existsSync('./1.js'); // 同步判断是否存在的方法

const path = require('path'); // 处理路径

// 此时可以传入解析的路径来查找到  path.resolve 不要碰到/ 否则会回到根路径下
console.log(path.resolve(__dirname,'1.js','2.js','/q')); // 解析出一个绝对路径 默认以process.cwd()解析
console.log(path.join(__dirname,'a','b','/')); // join和resolve可以互换使用但是有/的话不能使用resolve 会跑到根路径下

console.log(path.extname('a.min.js')); // .js
console.log(path.relative('a/b/1.js','a')); // 相减取 差异的部分
console.log(path.dirname('a/b.js')) // 取目录名 __dirname


const vm = require('vm'); // 很少用，就是可以执行字符串代码

let a = 1;
eval(`console.log(a)`); // eval执行时不会产生沙箱机制 会依赖外层的变量

// let fn = new Function(`console.log(a)`);
// fn();

vm.runInThisContext(`console.log(a)`); // 运行方式同 new Function 不需要把字符串包装成函数



