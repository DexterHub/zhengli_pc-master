import Vue from "vue";
import VueRouter from "vue-router";
import Cookies from "js-cookie";
import { clearLoginInfo } from "@/util/index.js";
import routers from "./routers.js";
import httpRequest from "@/util/http.js";
import ElementUI from "element-ui";
Vue.use(VueRouter);

//解决冗余导航  只解决push 和replace方法
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

Vue.prototype.$http = httpRequest; // ajax请求方法
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: routers,
  scrollBehavior(to, from, savedPosition) {
    //页面跳转后网页在最上面
    return {
      x: 0,
      y: 0
    };
  }
});

/**
 * 路由拦截
 *
 */
router.beforeEach((to, from, next) => {
  if (to.path == "/login" || to.path == "") {
    Cookies.remove("token");
  }
  let token = Cookies.get("token");
  // console.log(to,from)

  if (!navigator.onLine && from.name) {
    ElementUI.Message({
      message: "网络错误",
      type: "error",
      duration: 2000
    });
    // next();
  } else if (!token && to.path != "/login" && to.path != "/forget" && to.path != "/register") {
    next({
      path: "/login"
    });
  } else {
    // 如果是刷新或者网址跳转进入的直接让他进入三个主页面
    if (!from.name && to.matched.length > 2) {
      next({
        path: to.matched[1].path
      });
    } else if (!from.name && to.name == "新建病例") {
      next({
        path: "/index"
      });
    } else {
      next();
    }
  }
  // sessionStorage.setItem('documentTitle', to.meta.title)
});

router.afterEach((to) => {});

export default router;
