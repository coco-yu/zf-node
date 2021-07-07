"use strict";
class Context {
    constructor(){
        this.next = 0;
        this.done = false;
    }
    stop(){
        this.done = true;
    }
}
let regeneratorRuntime = {
    mark(genFunc){
        return genFunc; // 最外层的generator函数
    },
    wrap(innerFn){ // 通过这个原型去构建
        let it = {}
        let context = new Context();
        it.next = function (v){ 
            context.sent = v;
            let value = innerFn(context)
            return {
                value,
                done:context.done
            }
        }
        return it;
    }
}

var _marked = regeneratorRuntime.mark(read); // read就是刚才写的generator
function read() {
  var a, b, c;
  return regeneratorRuntime.wrap(function read$(_context) {
    while (1) { // 表示此方法 不止走一次, while(1) 表示这是一个状态机
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          a = _context.sent;
          console.log(a);
          _context.next = 6;
          return 2;

        case 6:
          b = _context.sent;
          console.log(b);
          _context.next = 10;
          return 3;

        case 10:
          c = _context.sent;
          console.log(c);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

let it = read()


console.log(it.next())
console.log(it.next('a'))
console.log(it.next('b'))
console.log(it.next('c'))