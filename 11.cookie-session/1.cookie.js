// cookie  session  localStorage  sessionStorage indexDB的区别
// cookie 用来识别身份的 http是无状态的  服务端，浏览器也可以设置cookie。 每次请求都会携带cookie cookie过大 可能会造成页面白屏，浪费流量 （合理设置cookie，定期删除cookie，根据根据路径合理设置cookie） cookie最终都是存放在客户端上的 （购物车）

// session  为了解决cookie不安全的  session存在服务端 （session 是基于cookie的）
// localStorage 本地存储 可以存放一些资源 关闭网页后 下次访问已经可以使用的

// sessionStorage 用于页面传递值 网页关闭后就销毁了 
