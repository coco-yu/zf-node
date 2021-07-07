// 服务端主要的功能是告诉浏览器要不要使用他的缓存

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime')

// 浏览器会将访问过的资源存起来
// 我希望引用的资源没有变化的情况 就使用默认的浏览器的缓存就好了

// 我希望超过强制缓存的时间后， “文件没有变化” 对比、协商 继续走缓存
const server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url);
    // 30s 只能直接访问服务器就好了
    // 整个都会缓存  （强制缓存只对我们的引用的资源生效）
    // 直接访问的资源不会走强制缓存
    console.log(pathname)
    // no-cache 表示每次都发送请求到服务器 
    // no-store 不缓存 浏览器不去缓存文件
    res.setHeader('Cache-Control','no-cache');
    res.setHeader('Expires',new Date(Date.now() + 30*1000).toUTCString()); // 访问后 到几点别找我了

    // 风险就是 服务端更改文件了 客户端用的还是老的文件， 服务器根据文件类型来设置缓存时间



    
    // c:10.http-server/public/index.html
    let filePath = path.join(__dirname, pathname);
    fs.stat(filePath, function(err,statObj) {
        if (err) {
            res.statusCode = 404;
            res.end('Not Found');
        } else {
            if(statObj.isFile()){
                res.setHeader('Content-Type', mime.getType(filePath)+';charset=utf-8')
                fs.createReadStream(filePath).pipe(res);
            }else{
                res.statusCode = 404;
                res.end('Not Found');
            }
          
        }
    })
});
server.listen(3000);