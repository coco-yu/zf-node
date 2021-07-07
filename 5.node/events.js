function EventEmitter() {
    this._events = {}; // 实例属性
}

// {'女生失恋':[fn1,fn2,fn3]}
EventEmitter.prototype.on = function(eventName, callback) {
    //  如果调用on的时候没有 _events属性，就动态增加一个
    if (!this._events) this._events = {};

    // 如果绑定的事件不是newListerner 就要触发事件
    if(eventName !== 'newListener'){
        this.emit('newListener',eventName);
    }
    if (!this._events[eventName]) {
        this._events[eventName] = [callback]
    } else {
        this._events[eventName].push(callback);
    }
}
EventEmitter.prototype.emit = function(eventName, ...args) {
    if (!this._events) this._events = {};
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => fn.call(this, ...args))
    }
}
// && 都  || 有一个就结束了
EventEmitter.prototype.off = function(eventName, callback) { // eat
    if (!this._events) this._events = {};
    if (this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter( fn=>fn.l !== callback && fn !== callback ); // 都不一样我才要留下
    }
}
EventEmitter.prototype.once = function(eventName, callback) {
    const once = (...args) => {
        callback(...args);
        this.off(eventName, once);
    }
    // {女生失恋:[once.eat]}
    once.l = callback
    this.on(eventName, once);
}
module.exports = EventEmitter