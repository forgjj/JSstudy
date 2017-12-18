

let box = document.querySelectorAll('.box');
let spans = document.querySelectorAll('.box>span');
// console.dir(box);
// console.dir(spans);



function childNode(element){
    let arr = [];
    let childnodes = element.childNodes;
    childnodes.forEach(function(ele){
        if(ele.nodeType == 1){
            // 判断获取元素的类型
            arr.push(ele);
        }
    });
    arr = Array.prototype.filter.call(childnodes,function(element){
        return element.nodeType == 1;
    })
    return arr;
    console.log(arr);
    // for(let i=0;i<childnodes.length;i++){
    //     if(childnodes[i].nodeType == 1){
    //         arr.push(childnodes[i]);
    //     }
    // }
    // return arr;

}

function $(select){
    if(typeof select == 'string'){
        let selector = select.trim();
//        两端去空
        let firstChar = selector.charAt(0);
        if(firstChar == '#'){
            return document.getElementById(selector.substring(1));
        }else if(firstChar == '.'){
            return document.getElementsByClassName(selector.substring(1));
        }else if(/^[a-zA-Z][A-Za-z1-6]{0-6}.text(selector)/){
            return document.getElementsByTagName(selector);
        }else if(/^<[a-zA-Z][A-Za-z1-6]{0-6}.text(selector)>/){
            return document.createElement(selector.substring(1,-1));
        }
    }else if(typeof select == 'function'){
        window.onload = function(){
            select();
        }
    }
}
$(function(){
    let box = $('.box');
    let divs = $('div');


})
//    在第一个插入
function prepend(parentNode,child){
    let firstChild = parentNode.firstElementChild;
    if(firstChild){
        parentNode.insertBefore(child,firstChild)
    }else {
        parentNode. appendChild(child);
    }
}
//    扩展方法
HTMLElement.prototype.append = function(child){
    this.appendChild(child);
}
HTMLElement.prototype.appendTo = function(parentNode){
   // parentNode.appendTo(this);
    parentNode.appendChild(this);
}


HTMLElement.prototype.prepend = function(child){
    let firstChild = this.firstElementChild;
    if(firstChild){
        this.insertBefore(child,firstChild);
        // 在前面插入
    }else{
        this.appendChild(child);
    }
}
HTMLElement.prototype.prependTo = function(parentNode){
    parentNode.prepend(this);
}

/*
* box.insert(div)
* 把div添加到box之前
* div.insertTo(box)
* 添加div到box之前
* insert 插入
* */
HTMLElement.prototype.insert = function(node){
//    this node
    let parent = this.parentNode;
    parent.insertBefore(node,this);
//    this,位置
}













