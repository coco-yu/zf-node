const LinkedList = require('./LinkedList')
class Queue{
    constructor(){
        this.ll = new LinkedList
    }
    add(element){ // 向后添加
        this.ll.add(element)
    }
    offer(){ // 削头 从头部删除
        return this.ll.remove(0); // 此删除不会塌陷 只是移动指针
    }
}
module.exports = Queue;
// let queue = new Queue;
// queue.add(1);
// queue.add(2);
// console.log(queue.offer())
// console.log(queue.offer())