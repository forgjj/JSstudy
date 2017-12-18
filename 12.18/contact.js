/*
*  ID 姓名    电话       拼音
*  1  张三  12345678     zhangsan
*
* localStorage.contact = [{},{},{}]
* */

$(function(){
    let arr = [
    {id:1,name:'郭佳杰',tell:'15203461275',pinyin:'guojiajie'},
    {id:2,name:'邓佳杰',tell:'11103461275',pinyin:'dengjiajie'},
    {id:3,name:'张佳杰',tell:'15103461275',pinyin:'zhangjiajie'},
    {id:4,name:'刘佳杰',tell:'15303461275',pinyin:'liujiajie'},
    {id:5,name:'李佳杰',tell:'15503461275',pinyin:'lijiajie'},
    {id:6,name:'王佳杰',tell:'15603461275',pinyin:'wangjiajie'},
    {id:7,name:'赵佳杰',tell:'15803461275',pinyin:'zhaojiajie'},
    {id:8,name:'崔佳杰',tell:'15403461275',pinyin:'cuijiajie'},
    {id:9,name:'韩佳杰',tell:'15903461275',pinyin:'hanjiajie'},
    {id:10,name:'钱佳杰',tell:'14203461275',pinyin:'qianjiajie'},
    {id:11,name:'孙佳杰',tell:'13203461275',pinyin:'sunjiajie'},
    {id:12,name:'周佳杰',tell:'12203461275',pinyin:'zhoujiajie'},
    {id:13,name:'吴佳杰',tell:'11203461275',pinyin:'wujiajie'},
    {id:14,name:'冯佳杰',tell:'18203461275',pinyin:'fengjiajie'},
    {id:15,name:'陈佳杰',tell:'19203461275',pinyin:'chenjiajie'},
    {id:16,name:'朱佳杰',tell:'17203461275',pinyin:'zhujiajie'},
    {id:17,name:'卫佳杰',tell:'16203461275',pinyin:'weijiajie'},
    {id:18,name:'沈佳杰',tell:'13803461275',pinyin:'shenjiajie'},
    {id:19,name:'爱佳杰',tell:'13803461275',pinyin:'aijiajie'},
    {id:20,name:'宝佳杰',tell:'13803461275',pinyin:'baojiajie'},
    ]
    localStorage.setItem('contact',JSON.stringify(arr));
    localStorage.contact = JSON.stringify(arr);
    let date = JSON.parse(localStorage.getItem('contact'));
    let dl = $('dl')[0];
    let sidebar = $('ul')[0];

    let tip = $('.tip')[0];
    console.log(tip)
    let brr = [],
        /**/
        height = $('header')[0].offsetHeight + $('.tip')[0].offsetHeight,
        search = $('input')[0];
    render(date);
    let dts =$('dt');
    Array.prototype.forEach.call(dts,function(element){
        brr.push(element.offsetTop);
    })
    console.log(dl,sidebar,li,brr);
    window.addEventListener('scroll',function(element){
    /*scrllTop  + height >=brr[i]*/
        let scrollTop = document.documentElement.scrollTop||document.body.scrollTop||window.scrollY||window.pageYOffset;

        brr.forEach((element,index)=>{
            if(scrollTop + height >= element){
                tip.innerText = dts[index].innerText;
            }
        })
    })


    /*数据处理   按首字母分类
    * l [{},]
    * 把数组变成对象，以首字符作为属性
    * */

    function render(date) {
        dl.innerHTML = '';
        sidebar.innerHTML = '';
        let obj = {};
        date.forEach(element =>{
            /* date 分类 遍历date  element arr 中元素*/
            let firstChar = element.pinyin.trim().charAt(0).toUpperCase();
            /*对象pinyin去空 charAt首字母 toUpperCase大写*/
            if(!obj[firstChar]){
                /* 判断obj有没有首字母的属性 */
                obj[firstChar] = [];
                /*返回一个空数组*/

            }
            obj[firstChar].push(element);
            /*如果等于返回对象*/
        })
        console.log(obj);
        let keys = Object.keys(obj).sort();
        tip.innerText = keys[0];
        console.log(keys);

        keys.forEach(element => {
            /*element obj[element]*/
            sidebar.innerHTML += `<li>${element}</li>`;
            dl.innerHTML += `<dt>${element}</dt>`;
            obj[element].forEach(v =>{
                dl.innerHTML += `
                <dd>
                    <a href="tel:${v.tell}">
                        ${v.name}
                    </a>
                </dd>`;
            })
        })
    }
    search.addEventListener('input',function(){
        let v = this.value.trim();
        let obj = date.filter(element=>element.pinyin.includes(v)||element.tell.includes(v)||element.name.includes(v));
        render(obj);
    })
})