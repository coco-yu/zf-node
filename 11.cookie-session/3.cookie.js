const http = require('http');
const querystring = require('querystring');
const crypto = require('crypto')
const key = 'zf'; // openssl 生成一个1024字节的秘钥  https openssl 先生成 配置到nginx
function signed(value){ // 比md5 多了一个盐值
    return crypto.createHmac('sha256',key).update(value.toString()).digest('base64');
}
// console.log(querystring.parse('name*f; age*1','; ','*'));
const server = http.createServer((req, res) => {
    req.getCookie = function(key,options = {}) {
        //  key=value;  key=value;  key=value  .split(; ) line.split('=')
        let cookieObj = querystring.parse(req.headers['cookie'], '; ');
        
        if(options.signed){ // 需要校验签名
            let [value,sign] = cookieObj[key].split('.');
            if( signed(value) == sign){ // jwt 也是这个原理
                return value;
            }else{
                return ''; // 校验失败 说明cookie失效，可能用户被修改了
            }
        }else{
            if(cookieObj[key]){
                return cookieObj[key].split('.')[0]
            }else{
                return ''
            }
        }
    }
    let cookies = []
    res.setCookie = function(key, value, options = {}) {
        // {age:1,name:2} => age=1&name=2
        let optArgs = [];
       
        if (options.maxAge) {
            optArgs.push(`max-age=${options.maxAge}`)
        }
        if (options.path) {
            optArgs.push(`path=${options.path}`)
        }
        if (options.httpOnly) {
            optArgs.push(`httpOnly=${options.httpOnly}`)
        }
        if (options.signed) {
            value = value + '.' +  signed(value);
        }
        let cookieValue = `${key}=${value}`
        // cookie的分隔符是; name=zf; max-age=10; expires= ; 
        cookies.push(`${cookieValue}; ${optArgs.join('; ')}`)
        res.setHeader('Set-Cookie', cookies);
    }

    if (req.url === '/read') {
        let value = req.getCookie('age',{signed:true});
        res.end(value);
    } else if (req.url === '/write') {

        // 不将cookie加密 （加密后的结果 会比原来的长， 就算加密了，是存在客户端的也不安全）
        // cookie 不存敏感信息 cookie的内容增加一个签名，保证cookie篡改后失效
        // 加盐算法
        res.setCookie('name', 'zf', { maxAge: 10 });
        res.setCookie('age', 10, { httpOnly: true, signed: true })
        res.end('write ok');
    } else {
        res.end('not found')
    }
});

server.listen(3000);