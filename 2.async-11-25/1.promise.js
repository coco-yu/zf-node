// 1.promise 中有一个功能没有实现
// const Promise1 = require('./promise');
// promise中resolve一个promise 会有等待效果
// promise中reject一个值 直接就走向了失败

// const Promise = require("./promise");


// const promise = new Promise((resolve,reject)=>{
//     reject(new Promise((resolve,reject)=>{ // 这里只能resolve自己的promise 不能兼容其他人的
//         setTimeout(() => {
//            resolve('ok');
//         }, 1000);
//     }))
// })

// 想产生一个成功的promise

// Promise.resolve('ok').then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log('err',err)
// })


// Promise.protype.finally 最终的 无论如何都执行的函数

Promise.prototype.finally = function (callback) {
    return this.then((data)=>{
        return Promise.resolve(callback()).then(()=>data)
    },(err)=>{
        return Promise.resolve(callback()).then(()=>{throw err})
    })
}
Promise.resolve('200').finally(()=>{
    // 无论成功失败 我都要执行某些逻辑
    return 11; // finally 执行的结果不会影响后续逻辑, finaalu
}).then(data=>{
    console.log('sucess',data)
},err=>{
    console.log('fail',err);
})
