const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises; // 获取promise方法
const { createReadStream, createWriteStream, readFileSync } = require('fs');
const chalk = require('chalk');
const crypto = require('crypto');

// ---------------------------------
const mime = require('mime');
const ejs = require('ejs');

// (async function (){
//     let r = await ejs.renderFile(
//         path.resolve(__dirname,'template.html'),
//         {name:'zf',age:11,arr:[1,2,3]}
//     );
//     console.log(r)
// })()

class Server {
    constructor(options) {
        this.port = options.port;
        this.directory = options.directory;
        this.cache = options.cache;
    }
    async handleRequest(req, res) {
        let { pathname } = url.parse(req.url);
        pathname = decodeURIComponent(pathname); // decode 解码
        // 列出所有的文件夹
        let requestUrl = path.join(this.directory, pathname); // 路径带/的不要用resolve会回到根路径
        try {
            const statObj = await fs.stat(requestUrl); // 如果路径不存在会报错
            if (statObj.isDirectory()) {
                // 目录 文件目录 ls -al
                let dirs = await fs.readdir(requestUrl);

                let content = await ejs.renderFile(path.resolve(__dirname, 'template.html'), {
                    dirs: dirs.map(dir => ({
                        name: dir,
                        pathname: path.join(pathname, dir)
                    }))
                });

                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(content);
            } else {
                // 文件 读取文件
                this.sendFile(requestUrl, req, res, statObj)
            }
        } catch (e) {
            console.log(e)
            this.sendError(e, req, res);
        }
    }
    sendError(err, req, res) {
        res.statusCode = 404;
        res.end('Not Found')
    }
    cacheFile(filePath, req, res, stat) { // stat.ctime
        res.setHeader('Cache-Control', 'max-age=10');
        const LastModified = stat.ctime.toUTCString();
        const Etag = crypto.createHash('md5').update(readFileSync(filePath)).digest('base64');
        res.setHeader('Last-Modified', LastModified);
        res.setHeader('Etag', Etag);
        let ifModifiedSince = req.headers['if-modified-since'];
        let ifNoneMatch = req.headers['if-none-match'];
        if (LastModified !== ifModifiedSince) {
            return false
        }
        if (Etag !== ifNoneMatch) {
            return false
        }
        return true;
    }
    sendFile(filePath, req, res, stat) {

        // sendFile中可以设置缓存
        if (this.cacheFile(filePath, req, res, stat)) {
            res.statusCode = 304;
            return res.end();
        }
        // 怎么返回文件？
        res.setHeader('Content-Type', `${mime.getType(filePath)};charset=utf-8`)
        createReadStream(filePath).pipe(res); // res.end / res.write
    }
    start() {
        // async + awai
        // http.createServer(()=>this.handleRequest())
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, () => {
            console.log(`${chalk.yellow('Starting up http-server, serving')}`);
            console.log(`  http://127.0.0.1:${chalk.green(this.port)}`)
        });
    }
}
module.exports = Server;


