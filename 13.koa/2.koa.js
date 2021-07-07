const Koa = require('./koa');
const app = new Koa();

// 异步处理  koa的next方法 前面必须加一个awiat，koa中所有的异步方法必须是promise 
// 我希望的是等待所有都执行完毕 在返回结果

const sleep = function(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    })
}
// koa中间件原理是将多个中间件 整合成一个promise， 当最外层的promise执行完毕后就结束了
app.use( async function(ctx, next) { // 1 3 2 =》 hello  5 6 4  
    console.log(1);
    await next();
    await next(); // 函数调用， 不会等下面函数调用完
    console.log(2)
}); // res.end()
app.use(async function(ctx, next) {
    console.log(3);
    ctx.body = 'hello';
    await sleep(3000); // 1 3000 
    await next();
    console.log(4)
})
// app.use(function(ctx, next) { // 如果没有加await 也会被包装成promise
//     console.log(5);
//     next();
//     console.log(6)
// })
app.on('error',function (err) {
    console.log(err);
})
app.listen(3000);