// 代表的是内存， 不能随便调整大小
let buf1 = Buffer.alloc(10); // 根据具体的长度来声明buffer
let buf2 = Buffer.from([16, 17, 18]);
let buf3 = Buffer.from('珠峰');

// 需要对内存进行拼接处理，可以声明一个更大的buffer 将多个buffer拷贝上去
let buf4 = Buffer.from('珠峰');
let buf5 = Buffer.from('架构');


// ---------------copy-------------
let buf = Buffer.alloc(12);
Buffer.prototype.copy = function(targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[targetStart++] = this[i]; // 将自身的buffer中的内容拷贝到了目标buffer上
    }
}
buf4.copy(buf, 0); // 目标buffer，拷贝到新buffer的位置，源的开始和结束
buf5.copy(buf, 6, 0, 6);
// console.log(buf.toString());

// -------------concat----------- 静态方法
Buffer.concat = function(bufferList, length) {
    if (typeof length == 'undefined') {
        length = 0;
        bufferList.forEach(buffer => {
            length += buffer.length;
        });
    }
    let newBuffer = Buffer.alloc(length);
    let offset = 0;
    bufferList.forEach(buffer => {
        buffer.copy(newBuffer, offset);
        offset += buffer.length
    });
    return newBuffer;
}
let concatBuffer = Buffer.concat([buf4, buf5],9);
console.log(concatBuffer);

console.log(Buffer.isBuffer(123));


// indexOf 字符串中的indexOf同理 ，返回的索引是字节的索引
let buf8 = Buffer.from('珠峰我爱你爱1');

// let index = buf8.indexOf('爱',10);
// console.log(index);
Buffer.prototype.split = function (sep) {
    let arr = [];
    let offset = 0; // 偏移位置
    let current = 0; // 找到的索引
    let len = Buffer.from(sep).length; // 分隔符真实的长度 字节长度
    while (-1!=(current = this.indexOf(sep,offset))) { // 查找到位置（字节）的索引
        arr.push(this.slice(offset,current));
        offset = current +len
    }
    arr.push(this.slice(offset));// 后面没有爱字 就直接将剩下的全部放进去
    return arr;
}
let result = buf8.split('爱'); // 拆分成一个数组 [buffer（'我爱你'）,buffer（你)，buffer（1）]
console.log(result)
// 直接字符串拼接可能会有乱码问题 （如果传输的是图片（二进制））


// buffer是内存 


// buffer 索引 长度 （类比数组）

// let buf6 = Buffer.from([1,2,3]); // 内存
// let buf7 = buf6.slice(0,1); // 在内存地址上截出某一位置
// buf7[0] = 100;
// console.log(buf6);


// let arr = [[1,2,3],1,2,3];
// let r = arr.slice(0,1);
// r[0][0] = 100;
// console.log(arr);


// buffer.slice() 
// buffer.length 字节数
// concat方法(copy) 
// Buffer.isBuffer() 判断是不是buffer类型
// 基于indexof封装了个 spit方法