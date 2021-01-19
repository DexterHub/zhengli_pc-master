import { Number } from "core-js";



// 直接获取当前年月    201910格式
 export function getCurrMonth(){
	let yyyyMM ="";
	let yyyy = new Date().getFullYear();
	
	let mm = new Date().getMonth();
	mm=mm+1;
	if(mm<10){
		mm="0"+mm.toString();
	}
	yyyyMM=yyyy.toString()+mm;
	return yyyyMM;
}
/**
 * 计算两个日期之间相差的月份
 * @param {Date} minDate 最小日期
 * @param {Date} maxDate 最大日期
 */
export function getMonthRange(minDate,maxDate){
  if (minDate && maxDate) {
    let minYear = minDate.getFullYear();
    let minMonth = minDate.getMonth()+1;
    let maxYear = maxDate.getFullYear();
    let maxMonth = maxDate.getMonth()+1;
    return (maxYear*12+maxMonth) - (minYear*12+minMonth)
  } else {
    return ''
  }
}

// 直接获取上个月    201910格式
 export function  getLastMonth() {
   let year = new Date().getFullYear();
   let month = new Date().getMonth()
   if (month == 0) {
     year = year - 1
     month = 12
   }
   if(month>0&&month<10) {
     month = '0' + month
   }
   return year.toString() + month
}

//获取当前日期的上一个月
//参数201910
//结果201909
 export function   getPreMonth(date) {
	    var year = date.substring(0,4); //获取当前日期的年份
	    var month = date.substring(4,6); //获取当前日期的月份
	    var year2 = year;
	    var month2 = parseInt(month) - 1;
	    if (month2 == 0) {
	        year2 = parseInt(year2) - 1;
	        month2 = 12;
	    }
	    if (month2 < 10) {
	        month2 = '0' + month2;
	    }
	    var t2 = year2 +''+ month2;
	    return t2;
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
  yesterday = yesterday.getFullYear()  + (yesterday.getMonth() >= 9 ? (yesterday.getMonth() + 1).toString() : "0" + (yesterday.getMonth() + 1)) + (yesterday.getDate() > 9 ? (yesterday.getDate()) : "0" + (yesterday.getDate()));
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
 * 格式化日期
 * @param s 当前月的左右的月份，并转成字符串正数是之后日期，负数是之前的日期 带-
 */
export function GetMonthStr() {
  var dd = new Date();
  var y = dd.getFullYear();
  var m = dd.getMonth(); //获取当前月份的日期
  return y + "-" + m ;
}
/**
 * 格式化日期
 * @param s 当前月上一个月份，并转成字符串正数是之后日期，负数是之前的日期 不带-
 */
export function GetMonthStrWithout() {
  var dd = new Date();
  var y = dd.getFullYear();
  var m = dd.getMonth()+1; //获取当前月份的日期
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
  if(n > 12){
    y = parseInt(y) + 1
    n = n - 12
  }
  if(n< -12) {
    y = parseInt(y) - 1
    n = n + 12
  }
  var m = dd.getMonth()
  if(n>0) {
    if(m + n > 12) {
     m = m+1 + n - 12
     y = y + 1
    } else {
      m = m + n
    }
  } else {
    if (Math.abs(m+1) < Math.abs(n)) {
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
 * @param s 时间对象 转年月日 字符串 20190101
 */
export function dateToStr(data) {
  if('string'==typeof(data)){
  	return data;
  }
  let y = data.getFullYear()
  let m = data.getMonth()+1 
  m = m < 10 ? '0' + m : m
  let d = data.getDate()
  d = d < 10 ? '0' + d : d
  let str = y.toString() + m + d
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
  return  month+'月'
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
 *  根据时间对象获取当前周数 
 */
export function getWeekOfYear(dateTime){
        let temptTime = dateTime
        //周几
        let weekday = temptTime.getDay() || 7
        //周1+5天=周六
        temptTime.setDate(temptTime.getDate() - weekday + 1 + 5)
        let firstDay = new Date(temptTime.getFullYear(), 0, 1)
        let dayOfWeek = firstDay.getDay()
        let spendDay = 1
        if (dayOfWeek != 0) {
          spendDay = 7 - dayOfWeek + 1
        }
        firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
        let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000)
        let result = Math.ceil(d / 7)
        return result + 1
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
export function handleData(date,list) {
  let y = date.getFullYear();
  let m = date.getMonth()+1;
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
export function getLastMonthDay() {
  var now = new Date();
  var year = now.getFullYear();//getYear()+1900=getFullYear()
  var month = now.getMonth() + 1;//0-11表示1-12月
  var day = now.getDate();
  var dateObj = {};
  if (parseInt(month) < 10) {
    month = "0" + month;
  }
  if (parseInt(day) < 10) {
    day = "0" + day;
  }

  dateObj.now = year + month + '-' + day;

  if (parseInt(month) == 1) {//如果是1月份，则取上一年的12月份
    dateObj.last = (parseInt(year) - 1) + '12' + day;
    return dateObj;
  }

  var preSize = new Date(year, parseInt(month) - 1, 0).getDate();//上月总天数
  if (preSize < parseInt(day)) {//上月总天数<本月日期，比如3月的30日，在2月中没有30
    dateObj.last = year  + month + '01';
    return dateObj;
  }

  if (parseInt(month) <= 10) {
    dateObj.last = year + '0' + (parseInt(month) - 1)  + day;
    return dateObj;
  } else {
    dateObj.last = year  + (parseInt(month) - 1)  + day;
    return dateObj;
  }

}
/*
  20190202 =>2019-02-02
*/
export function  strToDatestr(val) {
  let str = val.slice(0, 4) + '-' + val.slice(4,6)+'-'+val.slice(6,8)
  return str
}