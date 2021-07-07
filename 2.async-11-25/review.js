// 反柯里化 (让范围变大) 柯里化(isType => isString/isNumber) 方法的范围变小了


// let toString = Object.prototype.toString;
// console.log(toString.call(123))

Function.prototype.unCurrying = function () {
    return  (...args) => { // 将所有的参数组成一个数组
        // 这样调用call方法 可能并不是原型上的call方法 可能是用户

        // 防止用户自定了call方法，我这里就应该调用原型的call方法
        
        // 借用原型上的call方法  apply 主要就是改变this 并且传入数组参数

        // toString.call(...args)

        // call apply js课程里有讲到 call和 apply的原理

        // 是让call方法中的this变成了toString(...args)
        // call的原理是改变this
        return Function.prototype.call.apply(this,args)
    }
}
let toString = Object.prototype.toString.unCurrying();

console.log(toString(123));
