const express = require('./express');
const app = express()


app.post('/', function(req, res, next) { // 路由中间件
    console.log(1);
    next();
}, function(req, res, next) {
    console.log(2);
    next();
}, function(req, res, next) {
    console.log(3);
    next(); // 觉得 当前逻辑是否需要向下执行
});

app.get('/', function(req, res) {
    res.end(' ok')
})


app.listen(3000);
