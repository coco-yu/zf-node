```
curl -v www.baidu.com
```

> 请求行 请求头 请求体 


> 响应行  响应头  响应体体


## 状态码和请求方法  （可以自定义）
- 1 ws
- 2 200 成功 204 成功了没有请求体 206部份请求
- 3 301 302 （重定向） 304缓存 （服务端缓存策略） 307
- 4 400 401 用户没登录权限 403 用户登录了没权限 404 没找到 405 方法不存在
- 5 服务端异常 502 503


## 请求方法
- restful API 根据不同的请求方法来做响应  (风格， 根据相同的路径 不同的请求方式来作区分)
- get post delete put (options)
- options 跨域用的 (默认先访问一次 预检请求，能访问在发送真正的请求)
- 简单请求（不会发送options）和复杂请求 （浏览器发起的）

> 简单请求只有get和post 如果在这个两个请求的基础上增加自定义header，会变成复杂请求。其他方法都是复杂请求


## uri  url  urn
- uri 唯一的标识出来
- url 定位到某个人

> http://username:password@www.baidu.com:80/index.html?line=9#hash
> 协议://用户的权限@域名:端口号/资源?查询参数


// http://www.javascriptpeixun.cn/goods/show/12?targetId=42&preview=0