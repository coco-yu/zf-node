Promise.resolve().then(() => {
        // console.log("then1");
         Promise.resolve().then(() => {
            console.log("then1-1");
            // promise A+ ecmaScript 规定了 如果一个promise中的then成功或者失败的回调返回一个promise，会将这个promise进行延迟操作。 这个返回的promise你需要将他看成2个then
            return 1// 一个promise返回一个promise  resolvePromise(x) => x.then
        }).then(() => {
            console.log("then1-2");
        });
    })
    .then(() => {
        console.log("then2");
    })
    .then(() => {
        console.log("then3");
    })
    .then(() => {
        console.log("then4");
    })
    .then(() => {
        console.log("then5");
    })
// 事件环 宏任务执行的时候 产生了微任务（队列）
// then1  then1-1  then2  (空的then) then3 空ten then4 then1-2  then5
// 1 1-1 2 3 4 1-2 5
// 1122345

;
(function light() {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('red');
                resolve()
            }, 3000);
        }).then(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('green');
                    resolve()
                }, 2000);
            })
        })
        .then(() => {
            return light();
        })
})()