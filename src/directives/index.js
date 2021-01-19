import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// 自定义指令
const directives = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /\.js/
)

export default {
  install(Vue) {
    directives.keys().forEach(e => {
      const directiveConfig = directives(e);
      const componentName = upperFirst(
        camelCase(
          e
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
        )
      )
      // console.log(componentName)
      if(componentName == 'Index')return;
      Vue.directive(componentName, directiveConfig.default || directiveConfig)
    })
  },
}
