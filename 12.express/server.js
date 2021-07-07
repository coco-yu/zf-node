const express = require('./express');
const app = express();

const user  = require('./routes/user');
const article = require('./routes/article');


// 中间件才可能匹配开头，路由是严格匹配
// 进到中间件的时候去掉中间件的路径， 出来的时候在加上


app.use('/user',user)
app.use('/article',article);




app.listen(4000);