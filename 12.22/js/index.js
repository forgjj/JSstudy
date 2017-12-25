window.addEventListener('load',function(){
    let section = document.querySelector('section')
    // let canvas = document.querySelector('canvas');
    let shade = document.querySelectorAll('.shade>li');
    let styleb = document.querySelectorAll('.stylebtn');
    let input = document.querySelectorAll('input[type=color]');
    let linewidth = document.querySelector('input[type=number]');
    let mask = document.querySelector('.mask');
    let eraser = document.querySelector('.eraserc');
    let eraserbtn = document.querySelector('#eraser');
    let back = document.querySelector('.back');

    let fontbtn = document.querySelector('.font');
    let clipbtn = document.querySelector('.clipbtn');
    let clip = document.querySelector('.clip');
    let save = document.querySelector('a');
    let news = document.querySelector('.news');
    let close = document.querySelector('.close');
    /*let palette  = new Palette(mask,canvas);*/
    console.log(news);
    let history = [];
    let flag = false;
    let palette = null;
    let canvas = null;
    news.onclick = function(){
        canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 900;
        section.appendChild(canvas);
        palette  = new Palette(mask,canvas);
        /*flag = true;*/
    }
    save.onclick = function(){
        /*let date = canvas.toDataURL("image/png");*/
        save.href = canvas.toDataURL("image/png");
        save.download = '1.png';
        // return false;
    };
    back.onclick = function(){
        palette.back();
    };
    close.onclick = function(){
        window.close();
    };
    shade.forEach(element => {
        element.onclick = function(e){
            let type = this.id;
            shade.forEach(obj =>obj.classList.remove('active'));
            element.classList.add('active');
            if(type == 'poly'||type == 'polygon'){
                let num = parseInt(prompt('请输入边数或者角的数量'));
                palette.draw(type,num);

            }else{
                palette.draw(type);

            }
            if(type == 'eraser'){
                let w = parseInt(prompt('请输入橡皮的大小'));
                palette.eraser(eraser,w);
            }

        }
    });
    /*shade[0].onclick();*/

    styleb.forEach(element=>{
        element.onclick = function(){
            let type = this.id;
            styleb.forEach(ele=>{
                ele.classList.remove('active');
            })
            element.classList.add('active');
            palette.style = this.id;
            /*样式等于ID*/
        }
    });
    /*styleb[1].onclick();*/
    input.forEach(element=>{
        element.onchange = function(){
            palette[this.id] = this.value;
        }

    });
    linewidth.onchange = function(){
        palette[this.id] = this.value;
    };

    fontbtn.onclick = function(){
        console.log(1);
        fontbtn.classList.add('active');
        palette.font();
    };
    clipbtn.onclick = function(){
        clipbtn.classList.add('active');
        palette.clip(clip);
    }






});