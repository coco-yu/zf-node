// 服务端主要的功能是告诉浏览器要不要使用他的缓存

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const crypto = require('crypto');
// last-modified 可能文件没有变 但是修改时间变了
// 时间不精准 
// 可能CDN 放置到别的服务的时间 和 当前的时间不一样

// 读取文件内容 产生一个md5戳，可以用md5 戳来做校验, 但是读取整个文件耗费的时间就长了，一般情况下 会生成一个容易的etag
const server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url);
    // service worker  => no-store
    res.setHeader('Cache-Control', 'no-cache'); // 这是为了每次都像服务器发请求 （因为浏览器有默认强制缓存时间）
    res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toUTCString());
    let filePath = path.join(__dirname, pathname);
    fs.stat(filePath, function(err, statObj) {
        if (err) {
            res.statusCode = 404;
            res.end('Not Found');
        } else {
            if (statObj.isFile()) {
                res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
                let ctime = statObj.ctime.toUTCString();
                // ETAG 生成的策略可以有很多种方式 文件的长度 + 文件的第一行
                
                let etag = crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('base64')
                // 服务端给你一个Last-Modified， 客户端下次请求时会携带一个if-modified-since
                if (req.headers['if-none-match'] == etag) { // 下次请求的时候会携带上
                    res.statusCode = 304;
                    res.end(); // 浏览器会找缓存
                } else {
                    res.setHeader('Etag',etag ); //  这里设置
                    fs.createReadStream(filePath).pipe(res);
                }
            } else {
                res.statusCode = 404;
                res.end('Not Found');
            }

        }
    })
});
server.listen(3000);




