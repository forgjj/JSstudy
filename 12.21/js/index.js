window.addEventListener('load',function(){

    let canvas = document.querySelector('canvas');
    let shade = document.querySelectorAll('.shade>li');
    let styleb = document.querySelectorAll('.stylebtn');
    let input = document.querySelectorAll('input[type=color]');
    let linewidth = document.querySelector('input[type=number]');
    console.log(input)
    console.log(styleb)
    console.log(canvas,shade);

    let palette  = new Palette(canvas);
    shade.forEach(element => {
        element.onclick = function(e){
            let type = this.id;
            shade.forEach(obj =>obj.classList.remove('active'));
            element.classList.add('active');
            if(type == 'poly'||type == 'polygon'){
                let num = parseInt(prompt('请输入边数或者角的数量'));
                palette[type](num);
            }else{
                palette[type]();
            }

        }
    });
    shade[0].onclick();

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
    styleb[1].onclick();
    input.forEach(element=>{
        element.onchange = function(){
            palette[this.id] = this.value;
        }

    });
    linewidth.onchange = function(){
        palette[this.id] = this.value;
    }







});