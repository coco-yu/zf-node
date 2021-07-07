const express = require('./express');

const app = express(); // 最终是一个函数  http.createServer(app)


// 当请求访问时 我希望对这个路径进行一些预处理操作，我们可以使用路由的中间件
// app.get('/',function(req,res,next){
//     // 提前处理好一些内容 处理后可以调用next方法，走到下一个逻辑中
// },function (req,res,next) {
    
// })

// use函数 中间件函数 可以做拦截操作， 可以做扩展操作, 决定是否要向下执行. 中间件函数一般写在路由前面
// use的参数可以不写默认就是/
// AJAX => responseText    xhr.responseType = 'json'  xhr.response
// app.use(function(req,res,next){ // /favicon.ico , 所有的访问都进行拦截
//     req.path = require('url').parse(req.url).pathname;
//     req.query = require('url').parse(req.url,true).query;
//     res.send = function (data) {
//         if(typeof data === 'object'){
//             res.setHeader('Content-Type','application/json')
//             res.end(JSON.stringify(data));
//         }
//     }
//     next();
// })

// promise 可以直接catch  但是异步回调处理错误就不太容易了
// 对于回调而言，我们永远将回调的第一个参数作为错误参数
app.use(function(req,res,next){
    let arr = [];
    req.on('data',function (chunk) {
        arr.push(chunk);
    })
    req.on('end',function () {
        req.body = Buffer.concat(arr).toString();
       // next('出错');
      next();
    })
})
app.use('/user',function(req,res,next){
    req.a = 1;
    next();
})
app.post('/',function (req,res) {
    res.end(req.body)
})
app.get('/user/add',function(req,res,next) {
    // 我在读取数据库的时候出错了 =》 mysql 
    next('路由出错了')
    //res.send({a:1,b:2}); // end 方法只能返回一个buffer或者string
})

app.get('/user/remove',function(req,res) {
    res.end('user-remove')
})

// 错误处理中间件  （统一的处理）
app.use(function(err,req,res,next){ // 参数4个  function.length
    res.setHeader('Content-Type','text/plain;charset=utf8')
    res.end(err)
})

app.listen(3000);



