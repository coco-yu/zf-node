// name=>age => 12

let fs = require('fs').promises;


// 同步的 底层还是异步的


// 异步串行
async function readAge(filePath) {
    let name = await fs.readFile(filePath, 'utf8');
    let age = await fs.readFile(name, 'utf8');
    return age;
}
// async 函数执行完毕后返回的就是一个promoise
readAge('./name.txt').then(data => {
    console.log(data);
})


reject了，就能catch了 
Tony
generator实例上的 
老黑
并行的原理就是  把每次的执行时间覆盖  取最大 
老黑
stage1 stage2 stag3 stage4 
老黑
我说的具体的不是 es版本 
22:10
zhangbige
1 



co主要做了什么，抛出错误？   自动解析yiled方法 自动调用了it.next()
zhangbige
co迭代generator 
176****7638
6666 
Traveller
generator现在还有应用场景吗  redux-saga 
老黑
你写的是 resolve value 它是then(next) 
小小
是在 ast语法层面进行转换为 generator+co 
小叶子
co 递归generator， 取到最后结果 
老黑
这些预设 怎么看差别？ 
老黑
有没有文档地址  给发下 
杰克船长
同步非阻塞是什么意思，不太理解    “异步”“非阻塞”


日常的代码就是 同步非阻塞 遇到promsie 之类的就是 异步非阻塞 
Varandrew
nginx 
开心麻花
await 就是那个yield? 

[ajax1,ajax2,ajax3].foreach((item) => item()) 


foreach呢  

同步阻塞 

