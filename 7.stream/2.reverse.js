class Node {
    constructor(element, next) {
        this.element = element;
        this.next = next;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    _node(index) {
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
    add(index, element) {
        if (arguments.length == 1) {
            element = index;
            index = this.size
        }
        if (index == 0) {
            let head = this.head;
            this.head = new Node(element, head);
        } else {
            let prevNode = this._node(index - 1);
            prevNode.next = new Node(element, prevNode.next);
        }
        this.size++;
    }
    remove(index) {
        let removeNode;
        if (index == 0) {
            removeNode = this.head;
            this.head = this.head.next;
        } else {
            let prevNode = this._node(index - 1);
            if (!prevNode) return;
            removeNode = prevNode.next;
            prevNode.next = prevNode.next.next;
        }
        this.size--;
        return removeNode.element;
    }
    set(index, element) {
        let node = this._node(index);
        node.element = element;
        return node;
    }
    get(index) {
        return this._node(index);
    }
    reverseList() {
        function reverse(head) { 
            // 先遍历底层节点
            if (head == null || head.next == null) {
                return head; // 没有下一个节点说明就到头
            }
            let newHead = reverse(head.next); //head倒数第二个，newHead是最后一个
            head.next.next = head; // 两两交换
            head.next = null;
            return newHead
        }
        this.head = reverse(this.head);
        return this.head;
    }
    // 边循环边将老的节点向下移动，移动到新的链表上
}
let ll = new LinkedList();
ll.add(0);
ll.add(1);
ll.add(2);
ll.add(3);
ll.reverseList();

// 周日有课， 树（树的遍历 文件夹的操作 =》 http 用法 http+tcp） koa  express mongo redis
// vue2  + vue3 （用法+原理） + react

// 递归 考虑2个节点的情况 就可以实现所有的