const EventEmitter = require('events');
const fs = require('fs');
class ReadStream extends EventEmitter {
    constructor(path, options = {}) {
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || null;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.end = options.end || undefined;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.offset= 0 ;
        this.flowing = false; // 表示默认不是流动模式
        // 1. 对默认值进行操作
        // 2. 打开文件
        this.open(); // fs.open() 异步没法立即获取fd
        this.on('newListener', (type) => { // 当绑定的事件不是newListener 会触发回调方法
            if (type === 'data') {
                this.flowing = true; // 流动模式
                this._read(); // 真正读取的方法
            }
        })
    }
    pause(){
        this.flowing = false;
    }
    resume(){
        if(!this.flowing){ // 不是流动模式在恢复成流动模式
            this.flowing = true;
            this._read();// 继续重新读取
        }
    }
    destroy(err) {
        if (err) {
            this.emit('error', err)
        }
        if(typeof this.fd === "number" && this.autoClose){
            fs.close(this.fd,()=>{
                this.emit('close');
            })
        }
    }
    _read(){ 
        // fs.read调用
        if(typeof this.fd !=='number'){ 
            return this.once('open',()=>this._read())
        }
        // this.fd
        // 1234567890
        // 123 456 789 0  没有传递end
        // 123 45   如果传递end了 end=4
        // 每次读3个 直到读取完毕即可，但是如果传入end了 
        let howMouchToRead = this.end? Math.min(this.highWaterMark,this.end - this.offset + 1):this.highWaterMark;
        let buffer = Buffer.alloc(howMouchToRead); // 每次读取的个数

        fs.read(this.fd,buffer,0,howMouchToRead,this.offset,(err,byteRead)=>{
            if(err) return this.destroy(err);
            //真实的读取到的个数
            if(byteRead > 0){
                this.emit('data',buffer.slice(0,byteRead));
                this.offset +=  byteRead; 
                if(this.flowing){ // 如果是流动模式就继续下一轮的读取
                    this._read();
                }
            }else{
                this.emit('end');// 文件读取完毕后才触发
                this.destroy();// 触发close事件
            }
        });
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                return this.destroy(err);
            }
            this.fd = fd;
            this.emit('open', fd);
        })
    }
}

module.exports = ReadStream