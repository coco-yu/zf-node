const http = require('http');
const url = require('url'); // 可以对url路径进行解析
// 监听请求到来，会执行此方法
// ip + 端口

// console.log(url.parse('http://username:password@www.zhufeng.com:80/index.html?a=1#hash',true)); // true 可以让query变成对象


// 服务端代码更改后必须要重新启动才会 重新运行
const server = http.createServer((req,res)=>{
    // 分析请求相关的内容 请求行  请求头 请求体 
    // ---------------------------请求行----------------------------------
    console.log(req.method); // 请求方法默是大写的
    let {pathname,query} = url.parse(req.url,true);
    console.log(pathname,query);
    console.log(req.httpVersion); // http是基于tcp的  在tcp的基础上添加了 内容而已，内容被分割后，放到对应的req和响应上

    // ---------------------------请求头---------------------------------
    console.log(req.headers); //  都是小写的 key - value都是小写的

    // --------------------------请求体---------------------------------
    // req是一个可读流 
    let arr = [];
    req.on('data',function (chunk) {
        arr.push(chunk)
    })
    req.on('end',function () { // end  方法 无论请求体是否有，都会执行（如果请求体没有 它内部会调用push(null)）
        console.log(Buffer.concat(arr).toString());
    });

    //  响应  响应行 响应头 响应体 
    res.statusCode = 200;
    res.statusMessage = 'ok';

    // 响应头
    res.setHeader('Auth','xxx')
    res.setHeader('Content-Type','text/html;charset=utf-8');

    // 响应体
    res.write('hello');
    res.end('你好');

    // res 是一个可写流 write() end()

    
    // if(pathname == '/sum'){ // node适合I/O fs模块里面的
    //     let sum = 0;  // 子进程 进行ipc通信 来实现
    //     for(let i = 0; i < 10000000000;i++){
    //         sum+=i;
    //     }
    //     res.end(sum + '');
    // }else{
    //     res.end('ok')
    // }
});


// server.on('request',function(req,res){ // eventEmitter
//     // req 客户端的请求
//     // res 服务端的响应
// })
let port = 3000;
server.listen(port,()=>{  // 此回调时订阅 当成功后执行
    console.log('server start ' + port)
});
server.on('error',function (err) {
    if(err.errno === 'EADDRINUSE'){
        server.listen(++port)
    }
})

// 开发时 我们可以使用一些工具来监听代码变化 实现自动重启的功能 
// supervisor (nodemon) (pm2)
// npm install nodemon -g
// nodemon 1.js 监控文件变化

// curl -v -d "" -X POST http://www.baidu.com


// 静态服务 （回顾写的所有用法 http-server）
// 掌握header的使用 koa原理 
// express 原理


