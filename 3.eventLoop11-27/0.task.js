setTimeout(() => { // 宏任务
    console.log('ok1')
}, 1000);
setTimeout(() => { // 宏任务
    console.log('ok2')
}, 500);
Promise.resolve().then(()=>{ // 微任务
    console.log('then')
})
function a(){
    function b(){
        function c(){
            console.log('c')
        }
        c();
    }
    b();
}
a()

// 宏任务 [ok1，🆗2]  宏任务要求时间到了 才能执行
// 微任务 [then]

// 宏任务 script 脚本 =》 清空所有微任务 => 取出一个宏任务