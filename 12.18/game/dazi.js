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
        this.char = [['A','img/A.png'],['B','img/B.png'],['C','img/C.png'],['D','img/D.png'],['E','img/E.png'],['F','img/F.png'],['G','img/G.png'],['H','img/H.png'],['I','img/I.png'],['J','img/J.png'],['K','img/K.png'],['L','img/L.png'],['M','img/M.png'],['N','img/N.png'],['O','img/O.png'],['P','img/P.png'],['Q','img/Q.png'],['R','img/R.png'],['S','img/S.png'],['T','img/T.png'],['U','img/U.png'],['V','img/V.png'],['W','img/W.png'],['X','img/X.png'],['Y','img/Y.png'],['Z','img/Z.png']];
        /*字母表*/
        this.s = 1;
        this.length = this.s;
        /*页面中存在的数量*/
        this.current  = [];
        /*存的div*/
        this.speed = 10;
        /*速度*/
        this.scoreobj = document.querySelector('.box>div:first-child>span');
        this.score = 0;
        this.gq = 5;
        this.lifeobj = document.querySelector('.box>div:last-child>span');
        this.life = 10;
        this.position = [];
    };
    start(){
        this.getChars(this.length);
        this.drop();
        this.keys();
    };
    getChars(length){
        /*获取length个字母*/
        for(let i=0;i<length;i++){
            this.getChar();
        }
    };
    /*
    *  优化
    *  字母去重 判断  循环  条件
    *  字母重叠
    * */
    checkExist(char){
        return this.current.some(element => element.innerText == char);
    };

    checkPosition(pos){
        return this.position.some(element=>Math.abs(element-pos)<120);
    }

    getChar(){
        /*获取一个字母*/
        let num = Math.floor(Math.random()*this.char.length);
        do{
            num = Math.floor(Math.random()*this.char.length);
        }while(this.checkExist(this.char[num][0]));

        let divs = document.createElement('div');
        let tops = Math.floor(Math.random()*100);
        let lefts = Math.floor((window.innerWidth - 400)*Math.random()+200);
        // let lefts=Math.random()*(window.innerWidth-400)+200;
        do{
            // lefts = Math.floor((window.innerWidth - 400)*Math.random()+200);
            lefts=Math.random()*(window.innerWidth-400)+200;
        }while(this.checkPosition(lefts));

        divs.style.cssText = `
            width:50px;height:50px;
            border-radius:50%;background:aqua;
            font-size:20px;color:rgba(0,0,0,0);
            text-align:center;line-height:50px;
            position:absolute;top:${tops}px;left:${lefts}px;
            background:url(${this.char[num][1]})center/cover;  
        `;
        this.current.push(divs);
        this.position.push(lefts);
        divs.innerText = this.char[num][0];
        document.body.appendChild(divs);
    };

    /*
    * 下落的思路
    * 让字母下落 并在一定的高度消失
    * 先保存下this
    * 声明时间函数让字母在一定时间内按一定的速度下落 speed
    *  当落到一定距离时消失
    *
    *  添加生命
    *  消失时生命值减一
    *  当等于0时重新开始或
    *
    * */
    drop(){
        let that = this;
        that.t = setInterval(function(){
            for(let i=0;i<that.current.length;i++){
                let tops = that.current[i].offsetTop + that.speed;
                that.current[i].style.top = tops + 'px';
                if(tops>=500){
                    document.body.removeChild(that.current[i]);
                    that.position.splice(i,1);
                    that.current.splice(i,1);

                    that.getChar();
                    that.lifeobj.innerText = --that.life;
                    if(that.life <= 0){
                        let flag = confirm('是否重新开始');
                        if(flag){
                            that.restart();
                        }else{
                           close();
                        }
                    }
                }
            }
        },100);
    };
    /*
    *  初始化
    *
    * */
    restart(){
        let that =this;
        clearInterval(that.t);
        for(let i=0;i<that.current.length;i++){
            document.body.removeChild(that.current[i]);
        }
        that.current = [];
        that.position = [];
        that.length = that.s;
        that.gq = 5;
        that.getChars(that.length);
        that.life = 10;
        that.lifeobj.innerText = that.life;
        that.score = 0;
        that.scoreobj.innerText = that.score;
        that.drop();
    };

    /*下落过程中按键盘对应字母消失  keys 事件  keydown
    * 先获取this
    * 键盘的点击事件
    * 获取键盘
    * e.key   e.keyCode
    *  先遍历获取单个元素
    * 和页面内容比较
    * this.current[i].innerText  比
    * 从页面中删掉removeChild
    * 本地数据删掉 splice
    * 添加新元素
    * */
    keys(){
        let that = this;
        document.onkeydown = function(e){
            let code = String.fromCharCode(e.keyCode);
            // console.log(code)
            for(let i=0;i<that.current.length;i++){
                if(code == that.current[i].innerText){
                    document.body.removeChild(that.current[i]);
                    that.current.splice(i,1);
                    that.position.splice(i,1);
                    that.getChar();
                    that.scoreobj.innerText = ++that.score;
                    if(that.score >= that.gq){
                        that.next();
                    }
                }
            }
        }
    };
    /*分值  生命
    * 先获取元素  设默认值
    * 消掉时分加
    *
    * 关卡 分值
    *
    * 先清空以前的数据
    * 停止时间函数
    * 先删页面  在删数据
    *   把内容置空
    *   添加数量
    *   添加关卡
    * 变量 暂时用一下时用
    * 属性 各个方法都能访问到
    *
    * */
    next(){
        let that = this;
        clearInterval(that.t);
        for(let i=0;i<that.current.length;i++){
            document.body.removeChild(that.current[i]);
        }
        that.current = [];
        that.position = [];
        that.length+=1;
        that.gq += 10;
        that.getChars(that.length);
        that.drop()
    };

}