"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg); // it.next(value)
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function() {
        var self = this,
            args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

function readAge(_x) {
    return _readAge.apply(this, arguments);
} // async 函数执行完毕后返回的就是一个promoise

// async + await=> generator + co 语法糖 

function _readAge() {
    _readAge = _asyncToGenerator( /*#__PURE__*/ regeneratorRuntime.mark(function _callee(filePath) {
        var name, age;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return fs.readFile(filePath, 'utf8');

                    case 2:
                        name = _context.sent;
                        _context.next = 5;
                        return fs.readFile(name, 'utf8');

                    case 5:
                        age = _context.sent;
                        return _context.abrupt("return", age);

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee);
    }));
    return _readAge.apply(this, arguments);
}

readAge('./name.txt').then(function(data) {
    console.log(data);
});

// call的原理可以改变this 并且让函数执行
Function.prototype.myCall = function(context....args) {
    context.fn = toString // 1.fn =this
    const result = context.fn(...args)
    delete context.fn
    return result
}


Function.prototype.call = function(thisArgs, ...args) {
    toString.apply(args);
}

console.log(Function.prototype.call.call(toString,1,2,3))