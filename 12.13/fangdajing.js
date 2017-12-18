
window.onload = function(){
        let imgs = document.querySelector('.opcity');
        let imgb = document.querySelector('.rimg>img');
        let mask = document.querySelector('.mask');
        let mw = mask.offsetWidth,
            mh = mask.offsetHeight;
        let maxW = imgs.offsetWidth ,
            maxH = imgs.offsetHeight;
        let bili = maxW/mw;
        let right = document.querySelector('.rimg');
        imgs.addEventListener('mousemove',function(e){
            let ox = e.offsetX-mw/2, oy = e.offsetY-mh/2;
//            让鼠标在mask的中间
            if(ox>=maxW-mw){
                ox=maxW-mw;
            }
            if(ox<=0){
                ox=0;
            }
            if(oy>=maxH-mh){
                oy=maxH-mh;
            }
            if(oy<=0){
                oy=0;
            }
            mask.style.left = ox + 'px';
            mask.style.top = oy+ 'px';
//          mask mw           imgb bw       ox
//          imgs maxW         imgb>img      x
//           ox     x 比例关系
            imgb.style.width =  maxW * maxW/mw +'px';
            imgb.style.height =  maxH * maxH/mh + 'px';
//          图片大小
            imgb.style.left = -ox*bili +'px';
            imgb.style.top = -oy *bili + 'px';

            right.style.display='block';
            mask.style.opacity = 1;
        })
        imgs.addEventListener('mouseout',function(e){
            mask.style.opacity = 0;
            right.style.display='none';
        })
    }
