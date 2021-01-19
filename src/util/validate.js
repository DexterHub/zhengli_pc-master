import {
    Number
} from "core-js";
import {
    JSEncrypt
} from 'jsencrypt'
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
    return /^[a-zA-Z0-9_\u4e00-\u9fa5\.]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 格式化数字,不自动补零
 * @param s: 传入的float数字， n: 希望返回小数点几位，不传取2位
 */
export function fixed(s, n) {
    n = n > 0 && n <= 20 ? n : 2
    let pos; //小数点位置
    let float; //小数部分
    if (!isNaN(s)) {
        pos = s.toString().indexOf('.');
        if (!(s.toString().indexOf('.') == -1)) {
            float = s.toString().slice(pos + 1);
            if (float.length > n) {
                s = parseFloat(s).toFixed(n)
                return s
            } else {
                return s
            }
        } else {
            return s
        }
    }
}
/**
 * 格式化日期
 * @param s 当前日期的前一天，并转成字符串
 */
export function getLastDay() {
    let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
    let yesterday = new Date(time);
    let month = yesterday.getMonth();
    let day = yesterday.getDate();
    yesterday = yesterday.getFullYear() + (yesterday.getMonth() >= 9 ? (yesterday.getMonth() + 1).toString() : "0" + (yesterday.getMonth() + 1)) + (yesterday.getDate() > 9 ? (yesterday.getDate()) : "0" + (yesterday.getDate()));
    return yesterday
}

/**
 * 格式化日期
 * @param s 当前日期的左右的日期，并转成字符串正数是之后日期，负数是之前的日期 带-
 */
export function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
}


/**
 * 2N 次方
 * @param s 当前月的左右的月份，并转成字符串正数是之后日期，负数是之前的日期 带-
 */

export function abab(val, str) {
    let arr = ['拥挤', '牙列间隙', '前突', '前牙反𬌗','开𬌗','深覆𬌗', '深覆盖',  '后牙锁𬌗', '后牙反𬌗'];
    let result = [];
    for (let i = 8; i >= 0; i--) {
        let n = Math.pow(2, i);

        if (val >= n) {
            result.push(i);
            val -= n;
        }
    }
    if (str) {
        let str = '';
        result.reverse().forEach(item => {
            str += arr[item ] + ',';
        })
        return str.slice(0, -1);
    } else {
        return result;
    }
}

/**
 * 格式化日期
 * @param s 当前月的左右的月份，并转成字符串正数是之后日期，负数是之前的日期 带-
 */
export function GetMonthStr() {
    var dd = new Date();
    var y = dd.getFullYear();
    var m = dd.getMonth(); //获取当前月份的日期
    return y + "-" + m;
}
/**
 * 格式化日期
 * @param s 当前月上一个月份，并转成字符串正数是之后日期，负数是之前的日期 不带-
 */
export function GetMonthStrWithout() {
    var dd = new Date();
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    m = m < 10 ? '0' + m.toString() : m.toString()
    return y + m
}
/**
 * 格式化日期
 * @param s 当前月上几个月份，并转成字符串正数是之后日期，负数是之前的日期 不带-
 */
export function GetFewMonthStrWithout(n) {
    var dd = new Date();
    var y = dd.getFullYear();
    if (n > 12) {
        y = parseInt(y) + 1
        n = n - 12
    }
    if (n < -12) {
        y = parseInt(y) - 1
        n = n + 12
    }
    var m = dd.getMonth()
    if (n > 0) {
        if (m + n > 12) {
            m = m + 1 + n - 12
            y = y + 1
        } else {
            m = m + n
        }
    } else {
        if (Math.abs(m + 1) < Math.abs(n)) {
            m = 12 - (m + 1 + n)
        } else {
            m = m + 1 + n
        }
    }
    m = m < 10 ? '0' + m.toString() : m.toString()
    return y + m
}
/**
 * 格式化日期
 * @param s 时间对象 转年月日 字符串 2019-01-01
 */
export function dateToStr(data) {
    let y = data.getFullYear()
    let m = data.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = data.getDate()
    d = d < 10 ? '0' + d : d
    let str = y.toString() + '-' + m + '-' + d
    return str
}
/**
 * 格式化日期
 * @param s 时间对象 转年月日 字符串 01/01/2019
 */
export function dateToStr_(data) {
    let y = data.getFullYear()
    let m = data.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = data.getDate()
    d = d < 10 ? '0' + d : d
    let str = y.toString() + '/' + m + '/' + d;
    return str
}
/**
 * 格式化日期
 * @param  时间对象 转年月日 字符串 =>201904
 */
export function dateMonthToStr(data) {
    let y = data.getFullYear()
    let m = data.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let str = y.toString() + m
    return str
}
/**
 * 格式化日期
 * @param s 201804 => 4月 
 */
export function stringToMonth(str) {
    let month = parseInt(str.slice(-2, ))
    return month + '月'
}
/**
 * 格式化日期
 * @param s 获取上个月的时间对象 
 */
export function getLastMonht() {
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() - 1
    date.setMonth(m)
    return date.setMonth(m)
}
/**
 * 格式化日期
 * @param s 获取昨天的时间对象 
 */
export function getLastDayObject() {
    let date = new Date()
    let m = date.setDate(date.getDate() - 1)
    return date
}
/**
 * 格式化请求数据
 * 填补数据的空白项
 * list: [{
   value: 'mmmm',
   date: '201807'
 }]
 ====>>>>
 { date: 201906}
 { date: 201905}
 { date: 201904}
 { date: 201903}
 { date: 201902}
 { date: 201901}
 { date: 201812}
 { date: 201811}
 {date: 201810 }
 {date: 201809 }
 {date: 201808 }
 {date: "201807",value: "mmmm"}
 
 * date:时间对象
 * arr  需要填补的数组
 * keyWord 需要补全的对象的key值
 */
export function handleData(date, list) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let arr = []
    m = m < 10 ? '0' + m : m
    for (let i = 0; i < 24; i++) {
        if (m - i > 0) {
            arr.push({
                date: y.toString() + m - i
            })
        } else {
            arr.push({
                date: (y - 1).toString() + m - i + 12
            })
        }

    }
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (list[i].date == arr[j].date) {
                arr[j].date = list[i].date
                arr[j].value = list[i].value
            }
        }
    }
    return arr
}
// 手机号码加密处理
export function encryption(tel) {
    var reg = /(\d{3})\d{4}(\d{4})/;
    return tel.replace(reg, "$1****$2")
}
// 加密处理// JSEncrypt
export function jsEncrypt(data) {
    var PUBLIC_KEY =
        'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANNZMYQCOH5AJttvNgzOx77ALG4Z1Juqw62Pa529pY88i6tSi8UnPY+pIY2EAUTGeqZv1UicXGeVkYqAdRh7zisCAwEAAQ==';
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----');
    var encrypted = encrypt.encrypt(data);
    return encrypted;
}
// 判断是否是IE 
export function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return '不是IE'; //不是ie浏览器
    }
}
// 正则只能输入字母 数字 或者字母数字组合不能非法字符
export function regular(data) {
    let res = /^[0-9a-zA-Z]*$/g;
    return res.test(data);
}

// 正则只能字母和数字组合必须有子母和数字组合
export function regular2(data) {
    let res = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/;
    return res.test(data);
}

export function sendFn(img) {
    // 转换为base4的主要方法
    function getBase64Image(img, width, height) {
        let canvas = document.createElement('canvas');
        canvas.width = width || img.width;
        canvas.height = height || img.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let dataURL = canvas.toDataURL();
        return dataURL;
    }

    //转文件对象
    function convertBase64ToBlob(base64) {
        var base64Arr = base64.split(',');
        var imgtype = '';
        var base64String = '';
        if (base64Arr.length > 1) {
            // 如果是图片base64，去掉头信息
            base64String = base64Arr[1];
            imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'));
        }
        // 将base64解码，atob() 方法用于解码使用 base-64 编码的字符串。
        var bytes = atob(base64String);
        var bytesCode = new ArrayBuffer(bytes.length);
        // 转换为类型化数组
        var byteArray = new Uint8Array(bytesCode);
        // 将base64转换为ascii码
        for (var i = 0; i < bytes.length; i++) {
            byteArray[i] = bytes.charCodeAt(i);
        }
        // 生成Blob对象（文件对象）
        return new Blob([bytesCode], {
            type: imgtype
        });
    };
    // 实现将项目的图片转化成base64
    return new Promise((resolve, reject) => {
        // 传入图片路径，返回base64
        let picImage = new Image();
        picImage.crossOrigin = 'Anonymous'
        if (img) {
            picImage.onload = function () {
                const base64 = getBase64Image(picImage)
                const picFile = new File([convertBase64ToBlob(base64)], img);
                resolve(picFile); // 将base64传给done上传处理
            };
            picImage.src = img;
        } else {
            reject(new Error('图片路径没传'))
        }
    })
}
export function donwloadIE(url, fileName) {
    // 兼容IE
    // var oPop = window.open(imgUrl, "", "");
    // window.open('', '_self');
    // window.close();
    // for (; oPop.document.readyState != "complete";) {
    //     if (oPop.document.readyState == "complete") break;
    // }
    // oPop.document.execCommand("SaveAs");
    // oPop.location.href = url;

    var bstr = atob(url.split(',')[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    var blob = new Blob([u8arr])
    window.navigator.msSaveOrOpenBlob(blob, fileName)
}
//获取url参数
export const getQueryString = (variable) => {
    var query = window.location.href;
    query = query.substring(query.indexOf('?')+1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
function a() {
        
        
        //压缩图片为Base64路径格式
        Base64 = function (img, filename) {
            let originWidth = img.width,
                originHeight = img.height,
                canvas = document.createElement('canvas'),
                drawer = canvas.getContext("2d");
             canvas.width = originWidth;
            canvas.height = originHeight;
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            let base64 = canvas.toDataURL("image/jpg"); // 压缩后的base64图片
            // console.log(base64)
            let file = this.dataURLtoBlob(base64, filename);
            console.log(file)
            return file

        }
}
export const compress = (file)=>{
    // base64 转file
    let dataURLtoBlob = (dataurl,filename) =>{
        var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        var bbq =  new Blob([u8arr], {
            type: mime
        });
        return  new File([bbq], filename,{
            type:"image/jpg"
        });
    };
    // 字节转KB
    let ByteToKb = (num)=>{
        return num / 1024;
    }
    // 压缩
    let imgDom = (base64,percentage)=>{
        return new Promise((res,rej)=>{
            let imgDom = new Image();
            imgDom.onload = ()=>{
                let quality = 1
                let canvas = document.createElement('canvas');
                let drawer = canvas.getContext("2d");
                canvas.width =  imgDom.width / percentage;
                canvas.height =  imgDom.height / percentage;
                drawer.drawImage(imgDom, 0, 0, canvas.width, canvas.height);
                base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
                res(base64);
            }
            imgDom.src = base64;
        })
    }
    return new Promise((res,rej)=>{
            let fileSize = ByteToKb(file.size);
            if(fileSize <= 200 ) {
                res(file);
                return;
            }
            let format = file.name.indexOf(".");
            let length = file.name.length;
            let imgName = file.name.replace(file.name.substring(format + 1,length),"jpg");
            // let imgName = file.name.replace(file.name.substr(-3,3),"jpg");
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () =>{
                const percentage = Math.sqrt(fileSize / 200); //压缩比例
                // const percentage1 = 200 / fileSize//清晰比例
                let base64 = reader.result;//压缩出来的base64字符串
                base64 = await imgDom(base64,percentage);
                file = dataURLtoBlob (base64, imgName);
                res(file)
            };
        }
    )
   
}