const EventEmitter = require('events');
const fs = require('fs')
class WriteStream extends EventEmitter{
    constructor(path,options = {}){
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || 'utf8';
        this.mode = options.mode || 0o666;
        this.emitClose = options.emitClose || true;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 16*1024;

        this.writing = false;// 默认不是正在写入，第一次调用wirte的时候需要执行fs.write方法
        this.len = 0; // 此长度指向写入的个数，写入后需要进行较少
        this.needDrain = false;// 是否触发drain事件
        this.offset = 0;
        this.cache = [];

        this.open();
    }
    destroy(err){
        if(err){
            this.emit('error',err)
        }
    }
    open(){
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            if(err) this.destroy(err);
            this.fd = fd;
            this.emit('open',fd)
        })
    }
    clearBuffer(){
        // 清空缓存
        let data = this.cache.shift();
        if(data){ // 缓存中有内容
            this._write(data.chunk,data.encoding,data.clearBuffer)
        }else{
            this.writing = false;// 后续的第一次操作继续向文件中写入
            if(this.needDrain){
                this.needDrain = false; // 更新needDrain
                this.emit('drain')
            }
        }
    }
    write(chunk,encoding=this.encoding,cb=()=>{}){
        chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk); // 统一成buffer
        this.len += chunk.length;
        let result = this.len <  this.highWaterMark
        this.needDrain = !result; // 超过预期或者达到预期需要触发

        const clearBuffer = ()=>{
            this.clearBuffer();
            cb();
        }
        if(this.writing){
            // 将写入的内容缓存起来
            this.cache.push({
                chunk,
                encoding,
                clearBuffer
            });
        }else{
            this.writing = true; // 正在写入
            this._write(chunk,encoding,clearBuffer);
        }
        return result;
    }
    _write(chunk,encoding,cb){
        // 绑定事件 监听open
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>this._write(chunk,encoding,cb));
        }
        fs.write(this.fd,chunk,0,chunk.length,this.offset,(err,written)=>{
            this.offset+=written; // 每次更改偏移量 减少缓存数量
            this.len-=written;
            cb(); // 当前写入后 要清空缓存
        });        
    }
}

module.exports = WriteStream