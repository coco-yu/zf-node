const url = require('url');
function Router(){
    this.stack = []
}
Router.prototype.get = function (path,handler) {
    this.stack.push({
        path,
        handler,
        method:'get'
    })
}
Router.prototype.handle = function (req,res,done) {
    let {pathname} = url.parse(req.url);
    let requestMethod = req.method.toLowerCase();
    for(let i = 0; i < this.stack.length;i++){
        let {path,method,handler} = this.stack[i];
        if(path === pathname && requestMethod == method){
            return handler(req,res);
        }
    }
    done();
}
module.exports = Router;