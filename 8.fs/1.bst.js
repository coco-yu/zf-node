// binary search tree
class Node{
    constructor(element,parent){ // 设置节点元素和父亲是谁
        this.element = element;
        this.parent = parent;
        this.left = null; // 左
        this.right = null;// 右
    }
}
class Tree {
    constructor(){
        this.root = null;
    }
    compare(e1,e2){
        return e1 > e2
    }
    add(element){
        if(this.root == null){
            this.root = new Node(element,null);
            return;
        }
        // 和根节点进行比较
        let currentNode = this.root; // 获取以谁为参照物
        let parent;
        let compare;
        while (currentNode) {
            compare = this.compare(currentNode.element,element);
            parent = currentNode; // 保存父亲节点
            if(compare){ // 如果大于说明放左边
                currentNode =  currentNode.left; // 当.left 或.right时 可能就是null
            }else{
                currentNode = currentNode.right
            }
        }
        let node = new Node(element,parent);
        if(compare){
            parent.left = node
        }else{
            parent.right = node
        }
    }
}   
// 添加， 遍历树 ，反转
let tree = new Tree();
tree.add(10);
tree.add(8); // 我的逻辑就认为 不能存放相同的节点
tree.add(19);
tree.add(6);
tree.add(15);
tree.add(22);
tree.add(20);
console.dir(tree,{depth:1000})