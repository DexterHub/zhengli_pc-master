import Vue from 'vue'

import html2canvas from 'html2canvas';
Vue.prototype.canvas = html2canvas;

export class Slicing {
    constructor() {
        this.width = document.body.clientWidth; //屏幕宽
        this.height = document.body.clientHeight; //屏幕高
        this.downFlag = false;//记录是否按下
        this.ctx = null; //canvas
        this.canvas = null;
        this.iconSrc = require("@/assets/img/screenshot.png");
        // 记录鼠标位置
        this.rectPoint = {
            begin: {
                x: 0,
                y: 0,
            },
            finish: {
                x: 0,
                y: 0,
            }
        }
        // 源图片
        this.source = null;
    }
    // 产生图片并且定位
    drawIcon(img, x, y) {
        const mouseIcon = new Image();
        mouseIcon.onload = () => {
            const iconW = mouseIcon.naturalWidth;
            const iconH = mouseIcon.naturalHeight;
            img == this.iconSrc ?
                this.ctx.drawImage(mouseIcon, x - iconW / 2, y - iconH / 2) :
                this.ctx.drawImage(mouseIcon, x, y);

        }
        mouseIcon.src = img;
    }
    // 画矩形方法
    rectangle(lineWidth, color, x, y, width, height, shade) {
        this.ctx, lineWidth, color, x, y, width, height, shade
        this.ctx.beginPath();
        this.ctx.lineWidth = lineWidth;
        this.ctx.fillStyle = color;
        // this.ctx.globalCompositeOperation = shade || "source-over";
        this.ctx.fillRect(x, y, width - 2, height - 2);
        this.ctx.stroke();
    }
    // 画一个 截图框出来 QAQ
    drawline(lineWidth, color, x, y, width, height) {
        let ctx = this.ctx;
        ctx.beginPath();
        // 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
        // ctx.globalCompositeOperation = 'destination-out';
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.closePath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;

        ctx.clearRect(x, y, width, height);
        ctx.stroke();
    }
    // 记录鼠标落下点的方法
    mousedown(e) {
        // 鼠标按下
        e = e || window.event;
        this.downFlag = true;
        this.rectPoint.begin.x = e.pageX;
        this.rectPoint.begin.y = e.pageY;

    }
    // 记录鼠标移动的方法
    mousemove(e) {
        //鼠标移动
        e = e || window.event;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.rectangle(2, 'rgba(0,0,0,0.5)', 0, 0, this.width, this.height);
        // 记录移动点
        this.rectPoint.finish.x = e.pageX;
        this.rectPoint.finish.y = e.pageY;

        if (this.downFlag) {
            // 记录矩形开始点
            this.myBegin = {
                x: 0,
                y: 0,
            }
            // 记录矩形面积 宽 高
            let area = {
                width: this.rectPoint.finish.x - this.rectPoint.begin.x,
                height: this.rectPoint.finish.y - this.rectPoint.begin.y,
            }
            // 如果矩形宽为负数,则证明移动点在起点后面, 所以取移动点为矩形起始点,反之同理 高亦然
            this.myBegin.x = area.width > 0 ? this.rectPoint.begin.x : this.rectPoint.finish.x;
            this.myBegin.y = area.height > 0 ? this.rectPoint.begin.y : this.rectPoint.finish.y;

            area.width = Math.abs(area.width);
            area.height = Math.abs(area.height);

            this.drawline(2, 'green', this.myBegin.x, this.myBegin.y, area.width, area.height)
        } else {
            //鼠标移动icon跟着动
            this.drawIcon(this.iconSrc, this.rectPoint.finish.x, this.rectPoint.finish.y);
        }

    }
    // 记录鼠标抬起的方法
    async mouseup(res) {
        this.canvas.onmousedown = null
        document.onmousemove = null;
        this.downFlag = false;
        let imgDom = [];
        let yesImg = require('@/assets/img/3dqt.png') //好的呢
        let noImg = require('@/assets/img/sq.png') //不行呀
        imgDom[imgDom.length] = yesImg;
        imgDom[imgDom.length] = noImg;

        if(Math.abs(this.rectPoint.finish.x - this.rectPoint.begin.x) < 5 || Math.abs(this.rectPoint.finish.y - this.rectPoint.begin.y) < 5){
            this.noDom();
        }
      
    
        
        //处理正确错误点的位置
        const endX = this.rectPoint.finish.x > this.rectPoint.begin.x ? this.rectPoint.finish.x : this.rectPoint.begin.x;
        const endY = this.rectPoint.finish.y > this.rectPoint.begin.y ? this.rectPoint.finish.y : this.rectPoint.begin.y;

        // 数组方便增加其他功能
        imgDom.forEach((e, i) => {
            this.drawIcon(e, endX + i * 20, endY);
        })

        this.canvas.onclick = (e) => {
            let x = e.pageX;
            let y = e.pageY;
            let flag = true;
            // 如果Y轴不在范围内,直接return 考虑往上截图会有BUG
            if (y < endY || y > endY + 20) return

            // 循环判断X轴是否在某个图片范围内
            for (let i = 0; i < imgDom.length; i++) {
                // 暂定图片宽20
                if (x > endX + i * 20 && x < endX + i * 20 + 20) {
                    if (i == 0) {
                        this.yesDom();
                    } else {
                        this.noDom();
                    }
                    continue;
                }
            }
        }

    }
    // 红色药丸 一切的真相
    yesDom() {
    
        
        // 结束返回一个base64字符串
        // downFlag = false;
        let img = new Image();
        img.onload = async () => {
            document.body.appendChild(img);
            const canvasRes = await html2canvas(img, {
                //可选参数
                allowTaint: true,
                width: Math.abs(this.rectPoint.finish.x - this.rectPoint.begin.x),
                height: Math.abs(this.rectPoint.finish.y - this.rectPoint.begin.y),
                scrollX: -this.myBegin.x,
                scrollY: -this.myBegin.y,
            });
            let resBase64 = canvasRes.toDataURL('image/png');
            document.body.removeChild(img);
            this.noDom();
            this.fn(resBase64);
        }
        img.src = this.source;
    }
    // 蓝色药丸 回到起点
    noDom() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        document.body.removeChild(this.canvas);
    }
    // 开始
    async init() {
        /* 记录鼠标是否按下 */
        this.canvas = await html2canvas(document.getElementById('app'), {
            allowTaint: true,
            width: this.width,
            height: this.height,
            scrollY: 0,
        });
        this.source = this.canvas.toDataURL();
        this.canvas.id = "canvas";
        this.canvas.style.position = "absolute";
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.canvas.style.zIndex = 99999999;
        document.body.appendChild(this.canvas);
        this.ctx = canvas.getContext("2d");
        this.rectangle(2, 'rgba(0,0,0,0.5)', 0, 0, this.width, this.height);
        this.canvas.onmousedown = this.mousedown.bind(this)
        document.onmousemove = this.mousemove.bind(this);
        return new Promise((res, rej) => {
            this.fn = res;
            this.canvas.onmouseup = this.mouseup.bind(this, res);
        })
    }
    
}

