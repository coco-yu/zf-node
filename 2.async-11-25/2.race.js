// 赛跑 就是用第一个的返回结果


let p1 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(1)
    }, 1000);
})

let p2= new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject('fail')
    }, 500);
})
// 谁先执行完毕就用谁的结果
// Promise.race([p1,p2]).then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err);
// })

// 原理自己思考一下 Promise.race 方法能解决什么问题，不要这个promise的返回结果了, 超时

let promise= new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('ok')
    }, 3000);
})
function wrap(p){
    let abort;
    let p2 = new Promise((resolve,reject)=>{
        abort = reject;
    })
    let p3 = Promise.race([p,p2]); // 为了能控制p的状态 主要是利用p2的reject
    p3.abort = abort
    return p3
}
let p = wrap(promise)
setTimeout(() => {
    p.abort('超时');
}, 500);
p.then((data)=>{
    console.log(data)
}).catch(err=>{
    console.log(err);
})

// allSettled   =》 成功态
Promise.allSettled([p1,p2]).then(data=>{ // Promise.all 处理了失败的情况 allSettled 失败了也会保留结果
    console.log(data);
})


