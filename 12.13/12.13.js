/*
* 属性
* 谁
* 速度
* 最大偏移量
* 自身的尺寸
* 方法
* start
*
* */

class Float{
    constructor(obj){
        this.obj = obj;
        this.speedy=10;
        this.speedx=15;
        this.maxH = window.innerHeight-this.obj.offsetHeight;
        this.maxW = window.innerWidth-this.obj.offsetWidth;
    }
    start(){
        this.move();
    }
    move(){
        let _this = this;
        _this.t = setInterval(function(){
            let tops = _this.obj.offsetTop + _this.speedy;
            let lefts = _this.obj.offsetLeft + _this.speedx;
            if(tops>=_this.maxH){
                tops=_this.maxH;
                _this.speedy*=-1;
            }
            if(tops<=0){
                tops=0;
                _this.speedy*=-1;
            }
            if(lefts>=_this.maxW){
                lefts=_this.maxW;
                _this.speedx*=-1;
            }
            if(lefts<=0){
                lefts=0;
                _this.speedx*=-1;
            }
            _this.obj.style.top=tops+'px';
            _this.obj.style.left=lefts + 'px';
        },100);
    }
    stop(){
        clearInterval(this.t);
    }
    resize(){
        this.maxH = innerHeight-this.obj.offsetHeight;

    }

}
