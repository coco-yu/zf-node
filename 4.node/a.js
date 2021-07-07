// 不算全局属性的 全局属性

// __dirname __filename require module exports

// node的模块化机制? (seajs (cmd) requirejs (amd 依赖前置))
// 单例模式 (无法保证命名冲突,变量名字过长调用就不方便) iife 来解决模块化  

// 为什么需要模块化？ (解决冲突 实现高内聚低耦合)
// commonjs规范 esModule规范   umd规范 （统一规范）  systemjs

// 依赖于node的特性 可以按需依赖  无法实现tree-shaking
// es6模块 只能静态依赖 可以实现tree-shaking 分析需要的依赖
 
// commonjs 规范
// 1.每一个文件都是一个模块
// 2.需要通过module.exports 导出需要给别人使用的值
// 3.通过require 拿到需要的结果

module.exports = 'hello'