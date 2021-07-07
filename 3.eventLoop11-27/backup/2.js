console.log(1);
async function async () {
    console.log(2);
    await console.log(3)
    console.log(4)
}
setTimeout(() => {
	console.log(5);
}, 0);
const promise = new Promise((resolve, reject) => {
    console.log(6);
    resolve(7)
})
promise.then(res => {
	console.log(res)//7
})
async(); 
console.log(8)