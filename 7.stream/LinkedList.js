class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}
class LinkedList {
    constructor() {
        this.head = null;// 默认创建一个空链表 头指向null
        this.size = 0; // 维护链表的传毒
    }
    // ts 有函数重载
    // 参数可能是2 个可能是一个
    _node(index) { // 给我个索引帮你获取到这个节点
        // 越界判断 你的索引不能大于size ，应该抛出异常
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next; // 这里多取了一次next
        }   
        return current;
    }
    add(index, element) { // 直接向后追加，根据索引增加
        if (arguments.length == 1) {
            element = index;
            index = this.size
        }
        if (index == 0) {
            let head = this.head; // 获取老的头部 
            this.head = new Node(element, head);
        } else {
            // 找到当前位置对应的节点，将这个节点替换成新的节点，并且让新的节点指向原来的节点即可
            // 找到索引位置 添加一个
           let prevNode =  this._node(index - 1);
           // 创建一个节点 节点里的内容，和对应的下一个系欸但是谁
           prevNode.next = new Node(element,prevNode.next);
        }
        this.size++;
    }
    remove(index) { // 删除
        let removeNode;
        if(index == 0){ // 移除头部节点
            removeNode = this.head;
            this.head = this.head.next; // 自动垃圾回收
        }else{
            let prevNode = this._node(index - 1); // 删除时看似性能很高 但是需要查找
            if(!prevNode) return;
            removeNode =  prevNode.next;
            prevNode.next = prevNode.next.next;
        }
        this.size--;
        return removeNode.element;
    }
    set(index, element) { // 修改
       let node =  this._node(index); // 修改也需要循环
       node.element = element;
       return node;// 返回修改的节点
    }
    get(index) { // 获取
        return this._node(index); // 返回获取到的节点 
    }
}
module.exports = LinkedList
// [10,1,2,3]
// let ll = new LinkedList();
// ll.add(0, 1);
// ll.add(0, 2);
// ll.add(0, 3);
// ll.add(0, 10);
// ll.add(3, 100); // 直接添加
// console.dir(ll, { depth: 1000 });



// 务必数据结构中 要有增删改查
// add(element) remove(index) set(index,element) get(index)


