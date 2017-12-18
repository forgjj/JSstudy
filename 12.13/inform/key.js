/*
* 获取文本框
* 当键盘抬起时计数
* 表单
*
* 点击13提交
* 文本框清空
* 在下面盒子中显示并且最后提交的永远在前
* */
// window.onload = function(){
//     let contain = document.querySelector('textarea');
//     let incon = document.querySelector('.incon');
//     let title = document.querySelector('.title');
//     console.log(incon,title);
//     window.onkeyup = function(e){
//         // console.log(title,value);
//         let con = contain.value.length;
//         console.log(con)
//         let span = document.getElementsByClassName('numone')[0];
//         let nums = document.getElementsByClassName('numtwo')[0];
//         let num = 0;
//         num+=con;
//         span.innerHTML = num;
//         nums.innerHTML = 200-num;
//     }
//     window.onkeydown = function(e){
//         if(e.keyCode == 13){
//             let newTitle = document
//         }
//     }
//     window.onkeydown=function (e) {
//         if (e.keyCode==13){
//             let DivTitle=document.createElement('div');
//             // document.createElement()是在对象中创建一个对象
//             let DivCon=document.createElement('div');
//             DivTitle.classList.add('con');
//             DivCon.classList.add('con');
//
//             DivTitle.innerHTML=contain.value;
//             DivTitle.innerHTML=title.value;
//             incon.insertBefore(DivTitle,incon.childNodes[0]);
//             incon.insertBefore(DivCon,incon.childNodes[0]);
//         }
//     }
// }

$(function(){
    // let text = $('textarea');
    let text = $('textarea')[0];
    // let text = document.querySelector('textarea');
    console.log(text);
   let spans = $('span');
   let button = $('button')[0];
   let input = $('input')[0];
   let ul = $('ul')[0];
   let maxlength = 200;
   text.addEventListener('keyup',function(){
       //文本域的键盘抬起事件
       let length = this.value.length;
       /*文本内容的长度,value 表单默认的属性*/
       spans[0].innerText=length;
       spans[1].innerText = maxlength-length;
   });
   button.addEventListener('click',function(){
       let textV = text.value;
       let inputV = input.value;
       /*保存文本和标题的内容*/
       spans[0]=0;
       spans[1]=maxlength;
       text.value = '';
       input.value = '';
       ul.innerHTML=`
            <li>
                <img src="../img/mf700-02429099.jpg" alt="">
                <div class="con">
                    <h3>${inputV}</h3>
                    <p>${textV}</p>
                </div>
            </li>    
       `+ul.innerHTML;
       /*添加内容并置顶*/

   })
    text.onkeydown = function(e){
        if(e.keyCode==13){
            let textV = text.value;
            let inputV = input.value;
            spans[0]=0;
            spans[1]=maxlength;
            text.value = '';
            input.value = '';
            ul.innerHTML=`
            <li>
                <img src="../img/mf700-02429099.jpg" alt="">
                <div class="con">
                    <h3>${inputV}</h3>
                    <p>${textV}</p>
                </div>
            </li>    
       `+ul.innerHTML;
        }
    }


})




