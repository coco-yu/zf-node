const http = require('http');
// 设置cookie  参数
// key/value/domain/path/maxAge/expires/httpOnly
// domain 限制域名 默认是当前的域名
// path 限制设置cookie的路径 (基本用不到) 减少cookie的传入
// maxAge  （多少秒）/ expires 确切的时间点（）cache
// cookie 可以设置 httpOnly 不能通过代码去更改cookie
const server = http.createServer((req,res)=>{
    // cookie就是一个header , 默认cookie 会话结束时销毁 ， 如果增加失效时间，可以延迟
    if(req.url === '/read'){
        // a=b; c=d  => {}
        res.end(req.headers['cookie'])
    }else if(req.url === '/write'){
        res.setHeader('Set-Cookie',['name=zf; max-age=10','age=10; path="/"; httpOnly=true']);
        res.end('write ok');
    }else{
        res.end('not found')
    }
});

// cookie封装 =》 session =》 jwt实现原理 =》 express 

server.listen(3000);


