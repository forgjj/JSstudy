class Code {
    constructor(length, speed) {
        this.char = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        this.length = length;
        this.current = [];
        this.position = [];
        this.speed = speed;
        this.scoreObj = document.querySelector('.box>div:first-child>span');
        this.score = 0;
        this.level = 10;
        this.HPobj = document.querySelector('.box>div:last-child>span');
        this.HP = 10;
        this.restart = function () {
            clearInterval(this.t);
            this.current.forEach(element => {
                document.body.removeChild(element);
            });
            this.current = [];
            this.position = [];
            this.length = length;
            this.score = 0;
            this.scoreObj.innerText = this.score;
            this.HP = 10;
            this.HPobj.innerText = this.HP;
            this.getChars(this.length);
            this.drop();
        }
    }

    start() {
        this.getChars(this.length);
        this.drop();
        this.keys();
    }

    getChars(length) {
        for (let i = 0; i < length; i++) {
            this.getChar();
        }
    }

    randomBgColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let a = Math.random();
        return `rgb(${r},${g},${b})`;
    }

    /*产生字符*/
    checkExist(char) {
        return this.current.some(element => element.innerText == char);
    }

    checkPosition(pos) {
        return this.position.some(element => Math.abs(element - pos) < 60);
    }

    getChar() {
        let num = Math.floor(Math.random() * this.char.length);
        do {
            num = Math.floor(Math.random() * this.char.length);
        } while (this.checkExist(this.char[num]));
        let divs = document.createElement('div');
        let tops = Math.random() * 100;
        let lefts = Math.random() * (window.innerWidth - 400) + 200;

        do {
            lefts = Math.random() * (window.innerWidth - 400) + 200;
        } while (this.checkPosition(lefts));

        divs.style.cssText = `width:50px;height:50px;background:${this.randomBgColor()};color:#fff;border-radius:50%;font-size:20px;position:absolute;top:${tops}px;left:${lefts}px;line-height:50px;text-align:center;font-weight:600;`;
        divs.innerText = this.char[num];
        document.body.appendChild(divs);
        this.current.push(divs);
        this.position.push(lefts);
    }

    drop() {
        let that = this;
        that.t = setInterval(function () {
            for (let i = 0; i < that.current.length; i++) {
                let tops = that.current[i].offsetTop + that.speed;
                that.current[i].style.top = tops + 'px';
                if (tops >= 600) {
                    document.body.removeChild(that.current[i]);
                    that.current.splice(i, 1);
                    that.position.splice(i, 1);
                    that.getChar();
                    if (that.HP == 0) {
                        let flag = confirm('是否重新开始？');
                        if (flag) {
                            that.restart();
                        } else {
                            close();
                        }
                    }
                    that.HP--;
                    that.HPobj.innerText = that.HP;

                }
            }
        }, 10)
    }

    keys() {
        let that = this;
        document.onkeydown = function (e) {
            let keyscode = e.key.toUpperCase();
            for (let i = 0; i < that.current.length; i++) {
                let code = that.current[i].innerText.toUpperCase();
                if (keyscode == code) {
                    let val = that.current[i];
                    let cur = that.current.indexOf(val);
                    document.body.removeChild(that.current[cur]);
                    that.current.splice(i, 1);
                    that.position.splice(i, 1);
                    that.getChar();
                    that.scoreObj.innerText = ++that.score;
                    if (that.score >= that.level) {
                        that.next();
                    }
                }
            }
        }
        next()
        {
            clearInterval(this.t);
            this.current.forEach(element => {
                document.body.removeChild(element);
            });
            this.current = [];
            this.position = [];
            this.length += 2;
            this.level += 10;
            this.getChars(this.length);
            this.drop();
            console.log(document.body.children);
        }


    }
}