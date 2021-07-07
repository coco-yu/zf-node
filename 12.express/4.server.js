const express = require('./express');
const pathToRegExp = require('path-to-regexp');
const app = express();
app.use(function(req,res,next){ // /favicon.ico , 所有的访问都进行拦截
    req.path = require('url').parse(req.url).pathname;
    req.query = require('url').parse(req.url,true).query;
    res.send = function (data) {
        if(typeof data === 'object'){
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify(data));
        }
    }
    next();
})


// 路径 必须以/user/随意/随意/zf    /user/1/2/zf  => {id:1,age:2}  => req.paramss
app.get('/user/:id/:age/zf',function (req,res) {
    res.send(req.params);
})

// 将路径转化成这则来匹配  /user/:id/:age/zf  => [id,age]
// /user/(^\/+)/(^\/+)/zf  => [1,2]

// let str = '/user/:id/:age/zf';
let keys = [];
// let regStr = str.replace(/:([^\/]+)/g,function () {
//     keys.push(arguments[1])
//     return '([^\/]+)';
// });
// console.log(keys)
// console.log('/user/1/2/zf'.match(new RegExp(regStr)))
// /^\/user\/(?:([^\/]+?))\/(?:([^\/]+?))\/zf\/?$/i
const reg = pathToRegExp('/user/:id/:age/zf',keys);
console.log(reg,keys)

// https://jex.im/regulex
console.log(reg)
app.listen(4000);