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
    constructor(mask,canvas){
        /*属性*/
        this.canvas = canvas;
        this.mask = mask;
        this.ctx = this.canvas.getContext('2d');
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;

        this.style = 'stroke';
        this.ctx.strokeStyle = 'aqua';
        this.ctx.fillStyle = 'aqua';
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'butt';
        this.history = [];
        this.temp = null;
    };
    _init(){
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.lineWidth = this.lineWidth;
    };

    draw(type,num){
        let that = this;
        this.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.mask.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                that._init();
                that[type](ox,oy,mx,my,num)
                // that.line(ox,oy,mx,my);
                // that.round();
                // that.rectangle();
                // that.poly();
                // that.polygon();
                // that.curve(ox,oy,mx,my);
            };
            that.mask.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
            }
        }
    };

    line(ox,oy,mx,my){
        let that = this;
                that.ctx.beginPath();
                that.ctx.moveTo(ox,oy);
                that.ctx.lineTo(mx,my);
                that.ctx[that.style]();

    };
    pencil(){
        let that = this;
        this.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.ctx.beginPath();
            that.ctx.moveTo(ox,oy);
            that._init();
            that.mask.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.lineTo(mx,my);
                that.ctx.stroke();
            };
            that.mask.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
            }
        }
    };
    round(ox,oy,mx,my) {
        let that = this;
        let r = Math.abs(ox - mx);
        that.ctx.beginPath();
        that.ctx.arc(ox, oy, r, 0, Math.PI * 2);
        that.ctx[that.style]();

    };
    rectangle(ox,oy,mx,my,num) {
        /* 矩形*/
        let that = this;
        let w = mx - ox, h = my - oy;
        that.ctx.beginPath();
        if(that.style == 'stroke'){
            that.ctx.strokeRect(ox, oy, w, h);
        }else{
            that.ctx.fillRect(ox, oy, w, h);
        }
        that.ctx[that.style]();
    };
    poly(ox,oy,mx,my,num) {
        let that = this;
        let dge = 2 * Math.PI / num;
        let r = Math.abs(ox - mx);
        that.ctx.beginPath();
        that.ctx.moveTo(ox + r, oy);
        for (let i = 0; i < num; i++) {
            let x = ox + r * Math.cos(dge * i),
                y = oy + r * Math.sin(dge * i);
            that.ctx.lineTo(x, y);
        }
        that.ctx.closePath();
        that.ctx[that.style]();

    };
    polygon(ox,oy,mx,my,num) {
        let that = this;
        let dge = Math.PI / num;
        let R = Math.abs(ox - mx), r = R / 3;
        that.ctx.beginPath();
        that.ctx.moveTo(ox + R, oy);
        for (let i = 0; i < num * 2; i++) {
            let x, y;
            if (i % 2 == 0) {
                x = ox + R * Math.cos(dge * i),
                    y = oy + R * Math.sin(dge * i);
                that.ctx.lineTo(x, y);
            } else {
                x = ox + r * Math.cos(dge * i),
                    y = oy + r * Math.sin(dge * i);
                that.ctx.lineTo(x, y);
            }
        }
        that.ctx.closePath();
        that.ctx[that.style]();
    };
    curve(ox,oy,mx,my) {
        /*虚线*/
        let that = this;
        that.ctx.beginPath();
        that.ctx.setLineDash([2, 10]);
        that.ctx.moveTo(ox, oy);
        that.ctx.lineTo(mx, my);
        that.ctx[that.style]();
        // that.ctx.closePath();
        that.ctx.setLineDash([0, 0]);
    };
    eraser(eraser,w){
        let that = this;
        that.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            eraser.style.display = 'block';
            eraser.style.width = w + 'px';
            eraser.style.height = w + 'px';
            eraser.style.left = ox - w + 'px';
            eraser.style.top = oy - w + 'px';

            that.mask.onmousemove = function(e){
                let ox = e.offsetX,oy = e.offsetY;
                let lefts = ox - w / 2, tops = oy - w / 2;
                that.ctx.clearRect(ox-w,tops,w,w);
                eraser.style.left = lefts  + 'px';
                eraser.style.top = tops + 'px';

            }
            that.mask.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                eraser.style.display = 'none';
                that.mask.onmousemove = null;
            }
        }
    };

    /*
    * 添加文字
    * 点击事件
    * 获取文字位置
    * 创建  并  插入表单
    * 表单失去焦点  清除样式
    * */
    font(){
        this.mask.onmousedown = function(e){
            this.mask.onmousedown = null;
            let ox = e.offsetX,oy = e.offsetY;
            let inputs = document.createElement('input');
            console.log(inputs);
            inputs.style.cssText = `
                width:100px;height:30px;padding:3px;
                border-radius:6px;position:absolute;
                top:${oy}px;left:${ox}px;
                border:1px solid #ccc;
                z-index:999;
            `;
            inputs.autofocus = true;
            this.mask.appendChild(inputs);
            inputs.onblur = function(e){
                let ox = e.offsetLeft,oy = e.offsetTop;
                let v = inputs.value;
                this.ctx.font = '20px sans-serif';
                this.ctx.fillText(v,ox,oy);
                this.mask.removeChild(inputs);
                inputs = null;
            }.bind(this);
            inputs.onmousedown = function(e){
                let ox = e.clientX,oy = e.clientY,
                    l = inputs.offsetLeft,t = inputs.offsetTop;
                this.mask.onmousemove = function(e){
                    let mx = e.clientX,my = e.clientY;
                    let lefts = l + mx - ox,tops = t + my - oy;
                    if(lefts <= 0){
                        lefts = 0;
                    }
                    if(lefts >= this.cw - 102){
                        lefts = this.cw - 102;
                    }
                    inputs.style.left = lefts + 'px';
                    inputs.style.top = tops + 'px';

                }.bind(this);
                inputs.onmouseup = function(){
                    this.mask.onmousemove = null;
                }.bind(this)
            }.bind(this);

        }.bind(this);
    }

    /*font(){
        this.mask.ondblclick = function(e){

            let ox = e.offsetX,oy = e.offsetY;
            let inputs = document.createElement('input');
            console.log(inputs);
            inputs.style.cssText = `
                width:100px;height:30px;padding:3px;
                border-radius:6px;position:absolute;
                top:${oy}px;left:${ox}px;
                border:1px solid #ccc;
                z-index:999;
            `;
            inputs.autofocus = true;
            this.mask.appendChild(inputs);
            inputs.onblur = function(){
                let v = inputs.value;
                this.ctx.font="30px Verdana";
                /!*this.ctx.font = '20px sans-serif';*!/
                this.ctx.fillText(v,ox,oy);
                this.mask.removeChild(inputs);
                inputs = null;
            }.bind(this);

        }.bind(this);
    }*/

    clip(clip){
        let that = this;
        this.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY,w,h,minx,miny;
            clip.style.display = 'block';
            clip.style.left = ox + 'px';
            clip.style.top = oy + 'px';
            that.mask.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                minx = ox<mx?ox:mx;
                miny = oy<my?oy:my;
                /**/
                w = Math.abs(mx-ox);
                h = Math.abs(my-oy);
                clip.style.left = minx + 'px';
                clip.style.top = miny + 'px';
                clip.style.width = w + 'px';
                clip.style.height = h + 'px';
            }
            that.mask.onmouseup = function(){
                console.log(1)
                that.mask.onmouseup = null;
                that.mask.onmousemove = null;
                /* 先存   清除   存历史  放
                * */
                that.temp = that.ctx.getImageData(minx,miny,w,h);
                that.ctx.clearRect(minx,miny,w,h);
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.ctx.putImageData(that.temp,minx,miny);
                that.drag(clip,minx,miny);
            }

        }
    }
    drag(obj,minx,miny){
        /* 原来位置 + 变化的距离
        *     minx  + (mx-ox)*/
        let that = this;
        this.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.mask.onmousemove = function(e){
                let mx = e.offsetX,my = e.offsetY;
                let lefts = minx + mx - ox,tops = miny + my - oy;
                obj.style.left = lefts + 'px';
                obj.style.top = tops + 'px';
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.putImageData(that.temp,lefts,tops)
            }
            that.mask.onmouseup = function(){
                that.mask.onmouseup = null;
                that.mask.onmousemove = null;
                that.mask.onmousedown = null;
                obj.style.display = 'none';
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
            }
        }
    };

    back(){
        if(this.history.length){
            this.history.pop();
        }
        if(this.history.length>0){
            this.ctx.putImageData(this.history[this.history.length-1],0,0);
        }

    };


}
