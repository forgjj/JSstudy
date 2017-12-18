/* 打字游戏
* 面向对象的方式
* 属性（描述）
*  字母表、几个字符、生命值、关卡、分值、速度
* 方法
*   开始、产生字符、下落、消失、进入下一关、重新开始
*
* */


class Code{
    /*类*/
    constructor(){
        this.char = ['Z','X','C','V','B','N','M','L','K','J','H','G','F','D','S','A','Q','W','E','R','T','Y','U','I','O','P'];
        /*字母表*/
        this.length = 5;
        /*页面中存在的数量*/
        this.current  = [];
        this.speed = 10;
    }
    start(){
        this.getChars(this.length);
        this.drop()
    }
    getChars(length){
        /*获取length个字母*/
        for(let i=0;i<length;i++){
            this.getChar();
        }
    }
    getChar(){
        /*获取一个字母*/
        let num = Math.floor(Math.random()*this.char.length);

        let divs = document.createElement('div');
        let tops = Math.floor(Math.random()*100);
        let lefts = Math.floor((window.innerWidth - 400)*Math.random()+200);
        divs.style.cssText = `
            width:100px;height:100px;
            border-radius:50%;background:aqua;
            font-size:60px;color:red;
            text-align:center;line-height:100px;
            position:absolute;top:${tops}px;left:${lefts}px;   
        `;
        this.current.push(divs);
        divs.innerText = this.char[num];
        document.body.appendChild(divs);
    }

    drop(){
        let that = this;
        setInterval(function(){
            for(let i=0;i<that.current.length;i++){
                let tops = that.current[i].offsetTop + that.speed;
                that.current[i].style.top = tops + 'px';
                if(tops>=550){
                    document.body.removeChild(that.current[i]);
                    that.current.splice(i,1);
                    that.getChar();
                }
            }
        },100);
    }


}