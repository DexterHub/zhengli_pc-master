/**
 * 清除登录信息
 */
export function clearLoginInfo () {
    Vue.cookie.delete('token')
    store.commit('resetStore')
    router.options.isAddDynamicMenuRoutes = false
}

/**
 * 格式化日期
 * @param s 时间对象 转年月日 字符串 20190101
 */
export function dateToStr(data) {
    let y = data.getFullYear()
    let m = data.getMonth()+1
    m = m < 10 ? '0' + m : m
    let d = data.getDate()
    d = d < 10 ? '0' + d : d
    let str = y.toString() + m + d
    return str
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
    }
    // console.log(temp)//用id做KEY 导出数组里所有的数据变成json
    for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
            if (!temp[data[k][pid]]['children']) {
                temp[data[k][pid]]['children'] = []
            }
            if (!temp[data[k][pid]]['_level']) {
                temp[data[k][pid]]['_level'] = 1
            }
            data[k]['_level'] = temp[data[k][pid]]._level + 1
            temp[data[k][pid]]['children'].push(data[k])
        } else {
            res.push(data[k])
        }
    }
    return res
}
/**
 * 字符串转hash值
 * @param s 字符串
 */
export function getHashCode(s) {
    var hash=0,c=(typeof s == 'string')?s.length:0,i=0;
    while(i<c) 
    {
        hash = ((hash<<5)-hash)+s.charCodeAt(i++);
        //hash = hash & hash; // Convert to 32bit integer
    }    
    return ( hash < 0 )?((hash*-1)+0xFFFFFFFF):hash; // convert to unsigned
}