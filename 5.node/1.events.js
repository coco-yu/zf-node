// commonjs规范 内置模块  第三方模块 文件模块
// (fs path events) vm
// 发布订阅模式 node内置了这个模块
const EventEmitter = require('events'); // 事件触发器
const util = require('util'); // 内置模块
function Girl(){
   
}
util.inherits(Girl,EventEmitter); 
// "原型"继承的几种方式:
// Girl.prototype.__proto__ = EventEmitter.prototype; // mdn
// Object.setPrototypeof(Girl.prototype,EventEmitter.prototype)
// Girl.prototype = Object.create(EventEmitter.prototype);
// extends
// for in
let girl = new Girl(); // 实例调用的方法  （父类原型的方法）

// [哭，吃]

girl.on('newListener',(type)=>{ // 每次绑定都会触发此函数  (先触发newListener在把结果放到数组中)
    // 只要绑定了事件我就立即触发 // 
    console.log(type);
})
girl.on('newListener',(type)=>{ // 每次绑定都会触发此函数  (先触发newListener在把结果放到数组中)
    // 只要绑定了事件我就立即触发 // 
    console.log(type);
})

girl.on('女生失恋',(...args)=>{
    console.log('哭',...args)
}); 
girl.on('女生失恋',(a,b,c,d)=>{ // 绑定触发完毕后就删除
    console.log('吃',a,b,c,d)
}); 
girl.on('女生失恋',()=>{
    console.log('逛街')
}); 

// on emit
// girl.off('女生失恋',eat);

// girl.emit('女生失恋',1,2,3,4);
// girl.emit('女生失恋',1,2,3,4);

// on / emit / once / off / newListener
// 发布订阅解决了什么问题， 代码解耦 （解耦代码）


// on / emit / once / off / newListener
// vue里面的$on $emit $once 都是一样的实现原理