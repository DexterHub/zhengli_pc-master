import home from "@/views/home";
// 在主框架之外显示
const frameOut = [
  // 页面重定向使用 必须保留
  {
    path: "/redirect/:path*",
    meta: {
      title: "重定向"
    },
    component: () => import("@/views/redirect")
  },
  {
    path: "/login",
    name: "登录",
    meta: {
      title: "登录"
    },
    component: () => import("@/views/common/login/login")
  },
  {
    path: "/forget",
    name: "忘记账号密码",
    meta: {
      title: "忘记账号密码"
    },
    component: () => import("@/views/common/login/forget")
  },
  {
    path: "/register",
    name: "医生注册",
    meta: {
      title: "医生注册"
    },
    component: () => import("@/views/common/login/register")
  }
];
// 错误页面
const errorPage = [
  // 404
  {
    path: "*",
    name: "404",
    meta: {
      title: "404"
    },
    component: () => import("@/views/common/404/index")
  }
];

export const frameIn = [
  {
    path: "/",
    name: "home",
    redirect: "/index",
    // redirect: '/3d',
    meta: {
      title: "home"
    },
    component: () => import(`@/views/home`),
    children: [
      {
        path: "/index",
        name: "首页",
        meta: {
          title: "首页"
        },
        component: () => import(`@/views/index`),
        children: [
          {
            path: "/particulars",
            name: "病例详情",
            meta: {
              title: "病例详情"
            },
            component: () => import("@/views/index/router/particulars")
          },
          {
            path: "/hoxuxinjian/index",
            name: "后续生产详情",
            meta: {
              title: "后续生产详情"
            },
            component: () => import("@/views/index/router/hoxuxinjian/index")
          },
          {
            path: "/hoxuxinjian/newhoxu",
            name: "新建后续生产",
            meta: {
              title: "新建后续生产"
            },
            component: () => import("@/views/index/router/hoxuxinjian/newhoxu")
          },
          {
            path: "/hoxuxinjian/record",
            name: "后续生产发货记录",
            meta: {
              title: "后续生产发货记录"
            },
            component: () => import("@/views/index/router/hoxuxinjian/record")
          },
          {
            path: "/baozhijiaozhiq/index",
            name: "保质矫治器详情",
            meta: {
              title: "保质矫治器详情"
            },
            component: () => import("@/views/index/router/baozhijiaozhiq/index")
          },
          {
            path: "/baozhijiaozhiq/newbaozhijiaozhiq",
            name: "新建保质矫治器",
            meta: {
              title: "新建保质矫治器"
            },
            component: () => import("@/views/index/router/baozhijiaozhiq/newbaozhijiaozhiq")
          },
          {
            path: "/baozhijiaozhiq/record",
            name: "保质矫治器发货记录",
            meta: {
              title: "保质矫治器发货记录"
            },
            component: () => import("@/views/index/router/baozhijiaozhiq/record")
          },
          {
            path: "/fujmob/index",
            name: "附件模板详情",
            meta: {
              title: "附件模板详情"
            },
            component: () => import("@/views/index/router/fujmob/index")
          },
          {
            path: "/fujmob/record",
            name: "附件模板发货记录",
            meta: {
              title: "附件模板发货记录"
            },
            component: () => import("@/views/index/router/fujmob/record")
          },
          {
            path: "/fujmob/newfujmob",
            name: "新建附件模板",
            meta: {
              title: "新建附件模板"
            },
            component: () => import("@/views/index/router/fujmob/newfujmob")
          },
          {
            path: "/fahuobcq/index",
            name: "保持器详情",
            meta: {
              title: "保持器详情"
            },
            component: () => import("@/views/index/router/fahuobcq/index")
          },
          {
            path: "/fahuobcq/record",
            name: "保持器发货记录",
            meta: {
              title: "保持器发货记录"
            },
            component: () => import("@/views/index/router/fahuobcq/record")
          },
          {
            path: "/fahuobcq/newbcq",
            name: "新建保持器",
            meta: {
              title: "新建保持器"
            },
            component: () => import("@/views/index/router/fahuobcq/newbcq")
          },
          {
            path: "/weituojiagd",
            name: "委托加工单",
            meta: {
              title: "委托加工单"
            },
            component: () => import("@/views/index/router/weituojiagd")
          },
          {
            path: "/jbxx",
            name: "基本信息",
            meta: {
              title: "委托加工单"
            },
            component: () => import("@/views/index/router/jbxx/index")
          }
        ]
      },
      {
        path: "/myself",
        name: "个人中心",
        meta: {
          title: "个人中心"
        },
        component: () => import(`@/views/myself`),
        children: [
          {
            path: "/xjzh",
            name: "新建账户",
            meta: {
              title: "新建账户"
            },
            component: () => import(`@/views/myself/router/xjzh`)
          },
          {
            path: "/xgmm",
            name: "修改密码",
            meta: {
              title: "修改密码"
            },
            component: () => import(`@/views/myself/router/xgmm`)
          },
          {
            path: "/xgzhxx",
            name: "修改账户信息",
            meta: {
              title: "修改账户信息"
            },
            component: () => import(`@/views/myself/router/xgzhxx`)
          },
          {
            path: "/zhxx",
            name: "账户信息",
            meta: {
              title: "账户信息"
            },
            component: () => import(`@/views/myself/router/zhxx`)
          }
        ]
      },
      {
        path: "/clinic",
        name: "临床偏好",
        meta: {
          title: "临床偏好"
        },
        component: () => import("@/views/clinic")
      },
      {
        path: "/blgl",
        name: "新建病例",
        meta: {
          title: "新建病例"
        },
        component: () => import("@/views/blgl")
      },
      {
        path: "/bzzx",
        name: "帮助中心",
        meta: {
          title: "帮助中心"
        },
        component: () => import("@/views/bzzx")
      }
    ]
  },
  {
    path: "/three",
    name: "3D方案",
    meta: {
      title: "3D方案"
    },
    component: () => import("@/views/three")
  },
  {
    path: "/3d",
    name: "3D",
    meta: {
      title: "3D页面"
    },
    component: () => import("@/views/3d")
  }
];
// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage];
