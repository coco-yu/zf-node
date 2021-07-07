// name=>age => 12

let fs = require('fs').promises;


// 同步的 底层还是异步的


// 异步串行
function* readAge(filePath) {
    let name = yield fs.readFile(filePath, 'utf8');
    let age = yield fs.readFile(name, 'utf8');
    return age;
}
// co => tj
// let co = require('co');

// vue-router=> beforeEach() next=>next=>next=>
function co(it) {
    return new Promise((resolve, reject) => {
        // 递归 异步迭代 （函数来迭代）  同步就是forEach while  Promise.all
        function next(val) {
            let { value, done } = it.next(val); // val 是上一次产出的结果 value 是yield产出的结果
            if (done) { // 如果完成了就返回最终结果
                resolve(value);
            }else{
                Promise.resolve(value).then(data=>{
                    next(data);
                },reject); // 链 有一个失败了就失败了
            }
        }
        next();
    });
}
co(readAge('./name.txt')).then(data => {
    console.log(data);
})
// let {value,done} = it.next();
// Promise.resolve(value).then(data=>{
//     let {value,done} = it.next(data);
//     Promise.resolve(value).then(data=>{
//         let {value,done} = it.next(data);
//         console.log(value,done);
//     })
// })