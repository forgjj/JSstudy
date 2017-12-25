/*
* Palette
*  属性
*  线宽  样式   端点  几边角
*  方法
*  画线  画圆
*
*
* */

class Palette{
    constructor(canvas){
        /*属性*/
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;

        this.style = 'stroke';
        this.ctx.strokeStyle = 'aqua';
        this.ctx.fillStyle = 'aqua';
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'butt';
        this.history = [];
    };
    _init(){
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.lineWidth = this.lineWidth;
    }
    line(){
        let that = this;
        this.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                that._init();
                that.ctx.beginPath();
                that.ctx.moveTo(ox,oy);
                that.ctx.lineTo(mx,my);
                that.ctx[that.style]();
            };
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    };
    pencil(){
        let that = this;
        this.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;

            that.ctx.beginPath();
            that.ctx.moveTo(ox,oy);
            that._init();
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                that.ctx.lineTo(mx,my);
                that.ctx.stroke();
            };
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    };
    round(){
        let that = this;
        this.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                let r = Math.abs(ox-mx);
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                that._init();
                that.ctx.beginPath();
                that.ctx.arc(ox,oy,r,0,Math.PI*2);
                that.ctx[that.style]();
            };
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    };
    rectangle(){
        /* 矩形*/
        let that = this;
        this.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                let w = mx - ox,h = my - oy;

                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                that._init();
                that.ctx.beginPath();
                that.ctx.strokeRect(ox,oy,w,h)
                that.ctx[that.style]();
            };
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    };
    poly(num){
        let that = this;
        this.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                let dge = 2*Math.PI/num;
                let r = Math.abs(ox-mx);
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                that._init();
                that.ctx.beginPath();
                that.ctx.moveTo(ox+r,oy);
                for(let i=0;i<num;i++){
                    let x = ox+r*Math.cos(dge*i),
                        y = oy+r*Math.sin(dge*i);
                    that.ctx.lineTo(x,y);
                }
                that.ctx.closePath();
                that.ctx[that.style]();
            };
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    };
    polygon(num){
        let that = this;
        this.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                let dge = Math.PI/num;
                let R = Math.abs(ox-mx),r = R/3;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                that._init();
                that.ctx.beginPath();
                that.ctx.moveTo(ox+R,oy);
                for(let i=0;i<num*2;i++){
                    let x,y;
                    if(i%2==0){
                        x = ox+R*Math.cos(dge*i),
                            y = oy+R*Math.sin(dge*i);
                        that.ctx.lineTo(x,y);
                    }else{
                        x = ox+r*Math.cos(dge*i),
                            y = oy+r*Math.sin(dge*i);
                        that.ctx.lineTo(x,y);
                    }
                }
                that.ctx.closePath();
                that.ctx[that.style]();
            };
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    };
    curve(){
        /*虚线*/
        let that = this;
        this.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                that._init();
                that.ctx.beginPath();
                that.ctx.setLineDash([2,10]);
                that.ctx.moveTo(ox,oy);
                that.ctx.lineTo(mx,my);
                that.ctx[that.style]();
                // that.ctx.closePath();
                that.ctx.setLineDash([0,0]);
            };
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    };
}
