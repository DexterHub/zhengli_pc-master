import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import httpRequest from "@/util/http.js";
//
//公共组件
import vcomponents from "@/components";
//工具
import Cookies from "js-cookie";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import html2canvas from "html2canvas";

const phone = "http://case.magicalign.com/wap/";
const pc = "http://case.magicalign.com";

import {
  Loading
} from "element-ui";

/* 使用swiper插件 */
import VueAwesomeSwiper from "vue-awesome-swiper";
// import "swiper/swiper-bundle.css";
Vue.use(VueAwesomeSwiper);
Vue.use(ElementUI);

//公共样式
require("../public/base.css");

// 自定义指令
import Directives from './directives/index'
Vue.use(Directives)

Vue.config.productionTip = false;
Vue.use(vcomponents);
Vue.prototype.$cookie = Cookies;
Vue.prototype.Loading = Loading;
let loading = null;

Vue.prototype.LoadingOpen = () => {
  loading = Loading.service({
    text: '请稍后',
  })
};
Vue.prototype.LoadingClose = () => {
  loading.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    loading.close();
  })
};
Vue.prototype.$http = httpRequest; // ajax请求方法
Vue.prototype.canvas = html2canvas;
new Vue({
  store,
  router,
  render: (h) => h(App),
  beforeCreate: () => {
    //加载页面时执行一次
    changeMargin();
    //监听浏览器宽度的改变
    window.onresize = function () {
      changeMargin();
    };

    function changeMargin() {
      /* 计算html的字体大小 开始 */
      var html = document.documentElement;
      // document.documentElement.style.fontSize = 100 * (window.innerWidth / 1920) + 'px';
      // window.addEventListener("resize", () => {
      if (window.innerWidth == 1360) {
        html.style.fontSize = "70px";
      } else if (window.innerWidth > 1360) {
        html.style.fontSize = (window.innerWidth - 1360) / 20 + 70 + "px";
      } else {
        html.style.fontSize = 70 + (window.innerWidth - 1360) / 20 + "px";
      }
      // })
      /* 计算html的字体大小 结束 */
      //获取网页可见区域宽度
      var docWidth = document.body.clientWidth;
      var docHeight = document.body.clientHeight;
      if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        // console.log(navigator.userAgent);
        // if (navigator.userAgent.match(/(pad|pod|iPod|iPad)/i)) {
        //     // console.log(2222);
        //     //移除提示监控
        //     screenOrientationTip.removeEventListenerHandle();
        //     $("#orientationTipBox").hide();
        // } else {
        //     // console.log(3333);

        //     if(navigator.userAgent.match(/(Android|phone|Mobile|Windows Phone)/i) && winW > winH){
        //         $("#orientationTipBox").show();
        //         // 也可以再次加上监控
        //         screenOrientationTip.addEventListenerHandle();
        //     }
        //     //
        // }
        window.location.replace(phone);
      } else {
        //pc
        // window.location.replace("http://magicalign.h5.yscase.com")
      }
    }
  }
}).$mount("#app");