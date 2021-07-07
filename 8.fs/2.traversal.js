// 树的遍历方式 有四种 
// 深度 （先遍历儿子）  广度 (先遍历兄弟)

// 前序 (先访问节点)、中序 （按照递增 降序来处理节点）、后序 （最后处理根节点） (循环)、层序
// 访问根元素的顺序



class Node {
    constructor(element, parent) { // 设置节点元素和父亲是谁
        this.element = element;
        this.parent = parent;
        this.left = null; // 左
        this.right = null; // 右
    }
}
class Tree {
    constructor(compare) {
        this.root = null;
        this.compare = compare || this.compare
    }
    compare(e1, e2) {
        return e1 > e2
    }
    add(element) {
        if (this.root == null) {
            this.root = new Node(element, null);
            return;
        }
        // 和根节点进行比较
        let currentNode = this.root; // 获取以谁为参照物
        let parent;
        let compare;
        while (currentNode) {
            compare = this.compare(currentNode.element, element);
            parent = currentNode; // 保存父亲节点
            if (compare) { // 如果大于说明放左边
                currentNode = currentNode.left; // 当.left 或.right时 可能就是null
            } else {
                currentNode = currentNode.right
            }
        }
        let node = new Node(element, parent);
        if (compare) {
            parent.left = node
        } else {
            parent.right = node
        }
    }
    // prevoderTraversal(callback){
    //     function traversal(node){
    //         // 1.递归必须要有结束条件
    //         if(node== null) return;
    //         callback(node);
    //         traversal(node.left);
    //         traversal(node.right);
    //     }
    //     traversal(this.root);
    // }
    // inoderTraversal(callback){
    //     function traversal(node){
    //         // 1.递归必须要有结束条件
    //         if(node== null) return;
    //         traversal(node.left);
    //         callback(node);
    //         traversal(node.right);
    //     }
    //     traversal(this.root);
    // }
    // postOrderTraversal(callback){ // 后续
    //     function traversal(node){
    //         // 1.递归必须要有结束条件
    //         if(node== null) return;
    //         traversal(node.left);
    //         traversal(node.right);
    //         callback(node);
    //     }
    //     traversal(this.root);
    // }
    // prevoderTraversal(callback) { // 通过栈结构 来遍历树 
    //     // 栈
    //     let stack = []
    //     stack.push(this.root);
    //     while (stack.length) { 
    //         let node = stack.pop();
    //         callback(node);
    //         //10   [19,8]
    //         if (node.right !== null) {
    //             stack.push(node.right);
    //         }
    //         if (node.left !== null) {
    //             stack.push(node.left);
    //         }
    //     }
    // }
    // 递归的调用可以栈和队列进行优化
    // leveloderTraversal(callback) { // 通过栈结构 来遍历树
    //     let queue = [];
    //     queue.push(this.root); // 放入根元素  
    //     while (queue.length) { // 如果栈中有就一直循环
    //         let node = queue.shift(); //10  8 19 6 15 22 20[,,,,,20]
    //         callback(node);
    //         // 获取节点的左边后右边 
    //         if (node.left !== null) {
    //             queue.push(node.left);
    //         }
    //         if (node.right !== null) {
    //             queue.push(node.right);
    //         }
    //     }
    // }

    // 树的反转怎么实现?
    reverseTree() { // 中序 后续 也可以非递归 通过存储的时候的顺序来改变
        let queue = [];
        queue.push(this.root); // 放入根元素  
        while (queue.length) { // 如果栈中有就一直循环
            let node = queue.shift(); //10  8 19 6 15 22 20[,,,,,20]
            let temp =  node.left;
            node.left = node.right;
            node.right = temp;
            // 获取节点的左边后右边 
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
        return this.root;
    }
}
// 添加， 遍历树 ，反转  二叉搜索树 必须数据要具备可比较性
let tree = new Tree((e1, e2) => { // 自定义比较器
    return e1.id > e2.id
});
tree.add({ id: 10, element: { name: 'zf1' } });
tree.add({ id: 8, element: { name: 'zf2' } });
tree.add({ id: 19, element: { name: 'zf3' } });
tree.add({ id: 6, element: { name: 'zf4' } });
tree.add({ id: 15, element: { name: 'zf5' } });
tree.add({ id: 22, element: { name: 'zf6' } });
tree.add({ id: 20, element: { name: 'zf7' } });

// webpack + ast语法树解析  
// tree.prevoderTraversal((node) => {
//     console.log(node.element)
// })

console.dir(tree.reverseTree(),{depth:100});

// 文件夹操作