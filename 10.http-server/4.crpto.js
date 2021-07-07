// crpto 是node中所有的加密操作都包含到了这个包中


const crytpo = require('crypto');

// md5 (摘要算法)  sha1/sha256（加盐算法）  加密算法表示能解密

// md5 反解 （碰撞）  

// 1.md5不能反解  人 有 身份证
// 2.摘要 不能根据摘要的结果 反推摘要前过  如果内容有一点变化 摘要的结果完全不同(雪崩)
// 3.相同值摘要出的结果相同  
// 4.所有摘要出的结果长度都相同
// 采用三轮以上的md5 就无法破解了

let r = crytpo.createHash('md5').update('123').update('456').digest('base64');
console.log(crytpo.createHash('md5').update('123456').digest('base64'));

// 加盐算法 如果内容是一致的  但是加的盐值不同结果也不相同
// zfpx 就是盐值
let r1 = crytpo.createHmac('sha1','zfpx').update('456').digest('base64');
console.log(r1)
