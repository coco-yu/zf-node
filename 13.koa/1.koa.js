const Koa = require('./koa'); // koa 是一个类
const app = new Koa(); // express();
// express.use
app.use(function(ctx) { // ctx 上下文 帮我们提高req和res的功能
    // ctx.body = 'hello'; // res.end();
    // ctx 是koa中封装的上下文 （req,res 原生http的）  (request,response 是koa封装的)
    console.log(ctx.req.url);
    console.log(ctx.request.req.url);
    // req代表的都是原生的req、res
    console.log(ctx.request.path); // 直接访问request的属性都是koa封装的
    console.log(ctx.path); // ctx.path 就是代理 当取值时 会去 ctx.request.path 
});
app.listen(3000);
// 以上用法就是koa 90%的功能  -  底层源码就500多行


