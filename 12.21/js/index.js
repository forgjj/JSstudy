window.addEventListener('load',function(){

    let canvas = document.querySelector('canvas');
    let shade = document.querySelectorAll('.shade>li');
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
    // style.forEach(element =>{
    //     element.onclick = function(){
    //         let type = this.id;
    //         style.forEach(obj=>{obj.classList.remove('active')});
    //         this.classList.add('active');
    //         if(type == 'fill'){
    //             palette.style = 'fill';
    //         }else if(type == 'stroke'){
    //             palette.style = 'stroke';
    //         }
    //     }
    // })




})