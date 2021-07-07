// json web token (发给客户端的一个令牌)
// 权限校验


// jwt-simple => jsonwebtoken

const http = require('http');
const url = require('url');
const path = require('path');
const jwt = require('jwt-simple');
const querystring = require('querystring')
const secret = 'zfpx'

let jwt1 = {
    sign(content, secret) {
        return this.base64UrlEscape(require('crypto').createHmac('sha256', secret).update(content).digest('base64'))
    },
    base64UrlEscape(content) {
        return content.replace(/\+/g, '-').replace(/\=/g, '').replace(/\//g, '_');
    },
    base64UrlUnEscape(str) { // 字符转换成base64 有自己的规则， 通过这个规则转码回去
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    },
    toBase64(content) {
        return this.base64UrlEscape(Buffer.from(JSON.stringify(content)).toString('base64')); // + / =
    },
    encode(info, secret) {
        let header = this.toBase64({ typ: 'JWT', alg: 'HS256' });
        let content = this.toBase64(info); // 用户的私密信息不要放在token里，可能放一些用户的唯一标识就可以了

        let sign = this.sign(header + '.' + content, secret)
        return header + '.' + content + '.' + sign;
    },
    decode(token, secret) {
        let [header, content, sign] = token.split('.');
        let newSign = this.sign(header + '.' + content, secret);

        if (sign == newSign) {
            return JSON.parse(Buffer.from(this.base64UrlUnEscape(content), 'base64').toString());
        } else {
            throw new Error('token error')
        }
    }
}
const server = http.createServer((req, res) => {
    // 用户访问login 
    if (req.url === '/login') {
        let arr = [];
        req.on('data', function(chunk) {
            arr.push(chunk);
        });
        req.on('end', function() {
            let result;
            let content = Buffer.concat(arr).toString();
            if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                result = querystring.parse(content); // QS 方式
            } else if (req.headers['content-type'] === 'application/json') {
                result = JSON.parse(content) // json格式 
            }
            // 文本格式 图片格式
            if ('admin' === result.username && 'admin' === result.password) {
                res.end(JSON.stringify({
                    message: '登录成功',

                    // token = 头（固定）.内容（自定义的）.密钥
                    token: jwt.encode({ exp: new Date(Date.now() + 30 * 1000), username: 'admin' }, secret)

                }))
                // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOiIyMDIwLTEyLTIwVDAzOjI1OjQxLjU1NFoiLCJ1c2VybmFtZSI6ImFkbWluIn0.ED_cxLTMRbI9k3hVQW1_yLIb3cnfXonPhbD81xFJeOg

                // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.   eyJleHAiOiIyMDIwLTEyLTIwVDAzOjM0OjI2LjUzMFoiLCJ1c2VybmFtZSI6ImFkbWluIn0.niMpt3vw8sX9fhWjMPLmBTROP8z6SUxW2zjcNf5NHQo
            }
        })
    } else if (req.url == '/validate') { // 校验用户是否登录过
        let auth = req.headers['authorization']; //Bearer xxxx
        if (auth) {
            let [, token] = auth.split(' ');
            try {
                let payload = jwt1.decode(token, secret);
                console.log(payload)
                let exp = new Date(payload.exp).getTime()
                if (exp < new Date().getTime()) {
                    res.end('token exp');
                    // 在返回一个新的token ， 另一种方式让用户重新登录
                } else {
                    res.end('login ok')
                }


            } catch (e) {
                console.log(e)
                res.end('token error')
            }
        }
    } else {
        res.end();
    }


})

server.listen(3000);


// express 实现以下express 原理  express 是一个http服务的框架 ，封装了 node  http服务
// node层面就是咱们之前讲过的api  =》 js 
