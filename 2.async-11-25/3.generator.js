
// 浏览器最早解决异步 回调 =》 promise =》 generator =》 async + await
// react saga  开发时用的不多了 


function * read() { // * => yield 产出 中断功能 碰到yeild就停止执行
   let a =  yield 1;
   console.log(a);
   let b = yield 2;
   console.log(b);
   return 100;
}

let it = read(); // iterator 迭代器 迭代器中有next方法
let {value,done} = it.next(); // {此时已经结束了，此时没有产出结果}
// 第一次next函数中传递参数是没有意义的
// next中传递参数会把结果传递给上一次yield的返回值
 value = it.next(value).value;
console.log(it.next(value));


