const STATUS = { PENDING: 'PENDING', FUFILLED: 'FUFILLED', REJECTED: 'REJECTED' }

function resolvePromise(x, promise2, resolve, reject) {
    if (promise2 == x) {
        return reject(new TypeError('出错了'))
    }
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called = false;
        try {
            let then = x.then; 
            if (typeof then == 'function') {
                then.call(x, function(y) { 
                    if (called) return
                    called = true;
                    resolvePromise(y, promise2, resolve, reject);
                }, function(r) {
                    if (called) return
                    called = true;
                    reject(r);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return
            called = true;
            reject(e); 
        }
    } else {
        resolve(x); 
    }
}
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = []; 
        // js代码 他看的并不是看声明在哪个位置，而是看执行时此代码是否已经执行了
        const resolve = (val) => {
            if(val instanceof Promise){ // 递归解析resolve中的promise
                return val.then(resolve,reject)
            }
            

            if (this.status == STATUS.PENDING) {
                this.status = STATUS.FUFILLED;
                this.value = val;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        const reject = (reason) => {
            if (this.status == STATUS.PENDING) {
                this.status = STATUS.REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : x => x
        onRejected = typeof onRejected === 'function'? onRejected: err=> {throw err}
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === STATUS.FUFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === STATUS.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === STATUS.PENDING) {
                this.onResolvedCallbacks.push(() => { 
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => { 
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);

                })
            }
        });
        return promise2;
    }
    catch(err){ 
        return this.then(null,err)
    }

    static resolve(val){
        return new Promise((resolve,reject)=>{
            resolve(val);
        })
    }
    static reject(reason){
        return new Promise((resolve,reject)=>{
            reject(reason);
        })
    }
}
Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject
    })
    return dfd;
}
module.exports = Promise;