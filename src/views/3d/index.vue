<template>
  <div class="overallBox" @click="navFlag = false">
    <!-- 顶部布局 开始 -->
    <div class="roofBox">
      <!-- logo 开始 -->
      <div>
        <a href="javaScript:;" class="logo">
          <img src="../../assets/img/logo.png" />
        </a>
        <div class="backBox">
          <img src="../../assets/img/back.png" class="back" />
          返回
        </div>
      </div>
      <!-- logo 结束 -->
      <!-- 病例信息 开始 -->
      <div class="messageBox">
        <div class="messageName">患者: <span>李琦</span></div>
        <div class="messageSerial">病例编号: <span>MA2055874</span></div>
      </div>
      <!-- 病例信息 结束 -->
    </div>
    <!-- 顶部布局 结束 -->
    <!-- 导航栏 开始 -->
    <div class="menuBox">
      <!-- 客户端 开始 -->
      <div class="clientBox">
        <img src="../../assets/img/ortho.png" />
        <p>打开客户端</p>
      </div>
      <!-- 客户端 结束 -->
      <!-- 导航栏 开始 -->
      <ul>
        <li v-for="(item, index) in tabList" :key="index" @click="means(index)" :class="tabListActive == index ? 'active' : ''">
          <img :src="item.src" />
          <p>{{ item.name }}</p>
        </li>
      </ul>
      <!-- 导航栏 结束-->
      <!-- 选择方案 开始 -->
      <div class="schemeChoice">
        <span>当前:</span>
        <el-select v-model="schemeValue" placeholder="请选择">
          <el-option v-for="item in schemeList" :key="item" :value="item">
            {{ item }}
          </el-option>
        </el-select>
      </div>
      <!-- 选择方案 结束 -->
      <div class="ratifyBtn">
        <div>批准</div>
        <!-- <div>不批准</div> -->
      </div>
    </div>
    <!-- 导航栏 结束 -->
    <!-- 牙齿图片显示区 开始 -->
    <div class="toothModelBox">
      <!-- 切换旋转平移 开始 -->
      <div class="toothModel">
        <div class="cutAngle">
          <div class="rotateBtn" :class="cutRotate ? 'active' : ''" @click="cutRotate = true">
            旋转
          </div>
          <div class="translationBtn" :class="cutRotate ? '' : 'active'" @click="cutRotate = false">
            平移
          </div>
        </div>
        <div class="toothImg">
          <img src="../../assets/img/yc.png" />
        </div>
      </div>
      <!-- 切换旋转平移 结束 -->
      <!-- 侧边导航栏 开始 -->
      <div class="navMsg" @click.stop>
        <ul>
          <li @click="showNav(0)">
            <img src="../../assets/img/123.png" />
            <p>修改</p>
            <el-button @click="navFlag = true"> </el-button>
          </li>
          <li @click="showNav(1)">
            <img src="../../assets/img/122.png" />
            <p>附件菜单</p>
            <el-button @click="navFlag = true"> </el-button>
          </li>
          <li @click="showNav(2)">
            <img src="../../assets/img/125.png" />
            <p>精密切割菜单</p>
            <el-button @click="navFlag = true"> </el-button>
          </li>
          <li @click="showNav(3)">
            <img src="../../assets/img/126.png" />
            <p>照片</p>
            <el-button @click="navFlag = true"> </el-button>
          </li>
          <li @click="showNav(4)">
            <img src="../../assets/img/124.png" />
            <p>分步</p>
            <el-button @click="navFlag = true"> </el-button>
          </li>
          <li @click="showNav(5)">
            <img src="../../assets/img/121.png" />
            <p>概况</p>
            <el-button @click="navFlag = true"> </el-button>
          </li>
          <li @click="showNav(6)">
            <img src="../../assets/img/feedback.png" />
            <p>反馈</p>
            <el-button @click="navFlag = true"> </el-button>
          </li>
        </ul>
      </div>
      <!-- 侧边导航栏 结束 -->
      <!-- 侧边导航栏内容 开始 -->
      <el-drawer :visible.sync="navFlag" :with-header="false" :show-close="false" :modal="false" :append-to-body="false" @closed="closednav">
        <div class="navBox" @click.stop>
          <ul class="tabBox">
            <li :class="tabActive == 0 ? 'active' : ''" @click="cutTab(0)">
              修改
            </li>
            <li :class="tabActive == 1 ? 'active' : ''" @click="cutTab(1)">
              附件菜单
            </li>
            <li :class="tabActive == 2 ? 'active' : ''" @click="cutTab(2)">
              精密切割菜单
            </li>
            <li :class="tabActive == 3 ? 'active' : ''" @click="cutTab(3)">
              照片
            </li>
            <li :class="tabActive == 4 ? 'active' : ''" @click="cutTab(4)">
              分步
            </li>
            <li :class="tabActive == 5 ? 'active' : ''" @click="cutTab(5)">
              概况
            </li>
            <li :class="tabActive == 6 ? 'active' : ''" @click="cutTab(6)">
              反馈
            </li>
          </ul>
          <amend v-show="tabActive == 0"></amend>
          <photograph v-show="tabActive == 3"></photograph>

          <substep v-show="tabActive == 4"></substep>
          <feedback v-show="tabActive == 6"></feedback>
          <accessory v-show="tabActive == 1"></accessory>
          <precision v-show="tabActive == 2"></precision>
          <survey v-show="tabActive == 5"></survey>
        </div>
      </el-drawer>
      <!-- 侧边导航栏内容 结束 -->
    </div>
    <!-- 牙齿图片显示区 结束 -->
    <!-- 底部信息部分 开始 -->
    <div class="stepBox">
      <!-- 开始暂停按钮 开始 -->
      <div class="suspendBox" @click="stepClick">
        <div class="retreat" @click="stepNum = 0">
          <img src="../../assets/img/retreat.png" />
        </div>
        <div class="retreatOne" @click="stepNum > 0 ? stepNum-- : stepNum">
          <img src="../../assets/img/retreatOne.png" />
        </div>
        <div class="suspend" @click="start_suspend">
          <img :src="startToPause" />
        </div>
        <div class="advanceOne" @click="stepNum < stepList.length ? stepNum++ : stepNum">
          <img src="../../assets/img/advanceOne.png" />
        </div>
        <div class="advance" @click="stepNum = stepList.length">
          <img src="../../assets/img/advance.png" />
        </div>
      </div>
      <!-- 开始暂停按钮 结束 -->
      <!-- 显示步数部分 开始 -->
      <div class="lineBox">
        <div class="topBox">
          <div class="stepImg">
            <span>{{ stepNum }}</span>
            <img src="../../assets/img/progress.png" />
          </div>
          <ul>
            <li v-for="(item, index) in stepList" :key="index" :class="stepNum > index ? 'active' : ''"></li>
          </ul>
          <div class="sumBox">{{ stepNum }}/{{ stepList.length }}</div>
        </div>
        <div class="btmBox">
          <!-- <div class="stepImg">
            <span>10</span>
            <img src="../../assets/img/progress.png">
          </div> -->
          <ul>
            <li v-for="(item, index) in stepList" :key="index" :class="stepNum > index ? 'active' : ''"></li>
          </ul>
          <div class="sumBox">{{ stepNum }}/{{ stepList.length }}</div>
        </div>
      </div>
      <!-- 显示步数部分 结束 -->
    </div>
    <!-- 底部信息部分 结束 -->
    <!-- 偏好部分 开始 -->
    <preference v-show="tabListActive == 10" v-on:closeTc="boltonAnalyseClose" v-on:moveTc="monolayerMove($event)"> </preference>
    <!-- 偏好部分 结束 -->
    <!-- Bolton分析 开始 -->
    <analyse v-show="tabListActive == 9" v-on:closeTc="boltonAnalyseClose" v-on:moveTc="monolayerMove($event)"> </analyse>
    <!-- Bolton分析 结束 -->
    <!-- 移动量 开始 -->
    <amount v-show="tabListActive == 8" v-on:closeTc="boltonAnalyseClose" v-on:moveTc="monolayerMove($event)"></amount>
    <!-- 移动量 结束 -->
  </div>
</template>
<script>
import "../../assets/css/base.less";
import $ from "jquery";
/* 引入移动量组件 */
import Amount from "./component/Amount";
/* 引入偏好组件 */
import Preference from "./component/Preference";
/* 引入分析组件 */
import Analyse from "./component/Analyse";
/* 引入修改组件 */
import Amend from "./component/Amend";
/* 引入查看照片组件 */
import Photograph from "./component/Photograph";
/* 引入分步组件 */
import Substep from "./component/Substep";
/* 引入反馈组件 */
import Feedback from "./component/Feedback";
/* 引入附件菜单组件 */
import Accessory from "./component/Accessory";
/* 引入精密切割菜单组件 */
import Precision from "./component/Precision";
/* 引入概况组件 */
import Survey from "./component/Survey";
export default {
  data: function() {
    return {
      schemeValue: "",
      schemeList: ["方案一", "方案二", "方案三"],
      stepNum: 0,

      /* 牙齿编码 */
      codingList: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],

      /* 步数数据 */
      stepList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
      /* 导航栏渲染数据 */
      tabList: [
        { src: require("../../assets/img/1yc.png"), name: "附件" },
        { src: require("../../assets/img/2lb.png"), name: "编号" },
        { src: require("../../assets/img/3IPR.png"), name: "IPR" },
        { src: require("../../assets/img/4sy.png"), name: "牙弓宽度" },
        { src: require("../../assets/img/5bc.png"), name: "测量" },
        { src: require("../../assets/img/6wg.png"), name: "网格" },
        { src: require("../../assets/img/7qy.png"), name: "叠加" },
        { src: require("../../assets/img/8zb.png"), name: "咬合面" },
        {
          src: require("../../assets/img/WEB-OrthoPlus_19.png"),
          name: "移动量"
        },
        {
          src: require("../../assets/img/WEB-OrthoPlus_21.png"),
          name: "Bolton"
        },
        {
          src: require("../../assets/img/WEB-OrthoPlus_23.png"),
          name: "偏好"
        },
        { src: require("../../assets/img/WEB-OrthoPlus_25.png"), name: "上颌" },
        { src: require("../../assets/img/WEB-OrthoPlus_27.png"), name: "下颌" },
        {
          src: require("../../assets/img/WEB-OrthoPlus_29.png"),
          name: "上牙颌面"
        },
        {
          src: require("../../assets/img/WEB-OrthoPlus_31.png"),
          name: "下牙颌面"
        },
        { src: require("../../assets/img/WEB-OrthoPlus_33.png"), name: "右侧" },
        { src: require("../../assets/img/WEB-OrthoPlus_35.png"), name: "正面" },
        { src: require("../../assets/img/WEB-OrthoPlus_37.png"), name: "左侧" }
      ],

      tabListActive: null,

      tabActive: 0,

      navFlag: false,
      cutRotate: true,
      // 跟随鼠标移动的图片是否显示
      flag: false,
      // 跟随鼠标移动的图片是否显示
      // 上牙齿盒子的位置
      top: {},
      // 下牙齿盒子的位置
      bottom: {},
      // 跟随鼠标移动的图片
      posi: {},
      // 屏幕鼠标初次单击的位置;
      mouseP: "",
      // 鼠标跟着那张图片走
      mouseImg: "",
      mouseImgdele: "",
      // 开始和暂停图片
      start_suspendImg: false
    };
  },
  watch: {
    stepNum: function() {
      if (this.stepNum == 0) {
        document.querySelector(".stepImg").style.left = ".25rem";
        return false;
      }
      document.querySelector(".stepImg").style.left = document.querySelectorAll(".topBox li")[this.stepNum - 1].offsetLeft + document.querySelector(".stepImg").clientWidth / 2.4 + "px";
    }
  },
  computed: {
    //点击开始或暂停
    startToPause() {
      if (this.start_suspendImg) {
        return require("../../assets/img/suspend.png");
      } else {
        return require("../../assets/img/suspend1.png");
      }
    }
  },
  methods: {
    /* 导航切换 */
    means(idx) {
      this.tabListActive = idx;
      this.tabActive = null;
      this.navFlag = false;
    },
    /* 侧边栏tab切换 */
    cutTab(idx) {
      this.tabActive = idx;
      // console.log(idx);
      this.$store.commit("wrapperChange", idx);
    },
    /* 点击显示侧边栏 */
    showNav(idx) {
      this.tabActive = idx;
      this.navFlag = true;
      this.tabListActive = null;
      this.$store.commit("wrapperChange", idx);
    },
    // 关闭侧边栏回调函数
    closednav() {
      // console.log(123);
      this.$store.commit("wrapperChange", 0);
    },
    /* 点击关闭弹层 */
    boltonAnalyseClose() {
      this.tabListActive = null;
      this.cutColourFlagList = [false, false, false];
    },
    /* 移动移动量弹层 开始*/
    monolayerMove(e) {
      console.log(e.currentTarget, e, e.target);
      let el = e.currentTarget;
      let startL = el.offsetLeft;
      let startT = el.offsetTop;
      let startY = e.pageY;
      let startX = e.pageX;

      // document.querySelector(".moveAmount").onmousemove = (e) => {
      document.querySelector("body").onmousemove = (e) => {
        let moveX = e.pageX - startX + startL;
        let moveY = e.pageY - startY + startT;
        if (moveX <= 0) {
          moveX = 0;
        } else if (moveX >= document.querySelector(".toothModel").clientWidth - el.clientWidth) {
          moveX = document.querySelector(".toothModel").clientWidth - el.clientWidth;
        }
        if (moveY <= document.querySelector(".roofBox").clientHeight + document.querySelector(".menuBox").clientHeight) {
          moveY = document.querySelector(".roofBox").clientHeight + document.querySelector(".menuBox").clientHeight;
        } else if (moveY >= document.body.clientHeight - document.querySelector(".stepBox").clientHeight - el.clientHeight) {
          moveY = document.body.clientHeight - document.querySelector(".stepBox").clientHeight - el.clientHeight;
        }
        /* 判断是否是偏好及Bolton弹层 */
        if (el == document.querySelector(".preferenceBox") || el == document.querySelector(".boltonAnalyse")) {
          el.style.margin = "0";
        }
        el.style.left = moveX + "px";
        el.style.top = moveY + "px";
      };

      document.querySelector("body").onmouseup = () => {
        document.querySelector("body").onmousemove = null;
      };
    },
    // loosen (e) {
    //   // document.querySelector(".moveAmount").onmousemove = null;
    //   document.querySelector("body").onmousemove = null;
    // }
    /* 移动移动量弹层 结束*/

    /* 图片拖拽 */
    init() {
      let that = this;
      // 确定鼠标初次点击时在页面的位置
      // document.addEventListener('mousedown', event => {
      //     let e = event || window.event;
      //     let w = e.clientX || e.pageX;
      //     let h = e.clientY || e.pageY;
      //     this.mouseP = {
      //         'x': w,
      //         'y': h
      //     };
      // })
      // let _T = this.$refs['index' + i][0].childNodes[0];

      //鼠标抬起事件
      document.addEventListener("mouseup", (e) => {
        e = event || window.event;
        var X = e.clientX;
        var Y = e.clientY;
        if (Y > that.top.Y && Y < that.top.Y + that.top.H) {
          that.daixinclick("t", X);
        } else if (Y > that.bottom.Y && Y < that.bottom.Y + that.bottom.H) {
          that.daixinclick("b", X);
        } else {
          that.daixinclick("n");
        }
        document.onmousemove = null;
        that.flag = false;
        that.flag = false;
      });
    },
    xuanxDown(i) {
      let that = this;
      //上下两个大盒子的位置
      let _T = this.$refs.top;
      let _B = this.$refs.bottom;
      that.top = {
        Y: _T.getBoundingClientRect().top,
        H: _T.offsetHeight
      };
      that.bottom = {
        Y: _B.getBoundingClientRect().top,
        H: _B.offsetHeight
      };

      //跟随鼠标移动的图片位置
      that.flag = true;
      var img = this.$refs.mouseTran;
      img.src = this.xuanx[i];
      let _C = this.$refs["index" + i][0].childNodes[0];
      this.posi = {
        x: _C.getBoundingClientRect().left,
        y: _C.getBoundingClientRect().top,
        w: _C.width,
        h: _C.height
      };
      img.style.left = this.posi.x + "px";
      img.style.top = this.posi.y + "px";

      // 鼠标移动事件
      document.onmousemove = this.move;

      i = i + 1;
      this.fakeyou = i;
    },
    // 鼠标移动事件
    move(e) {
      e = event || window.event;
      var X = e.clientX;
      var Y = e.clientY;
      //设置图片坐标
      this.$refs.mouseTran.style.left = X - this.posi.w / 2 + "px";
      this.$refs.mouseTran.style.top = Y - this.posi.h / 2 + "px";
    },
    daixinclick(p, x) {
      let that = this;
      let dom = null;
      let s = "";
      if (p == "t") {
        dom = this.$refs.top;
        s = "t";
      } else if (p == "b") {
        dom = this.$refs.bottom;
        s = "b";
      } else {
        return;
      }
      dom.childNodes.forEach((item, i) => {
        if (x > item.getBoundingClientRect().left && x < item.getBoundingClientRect().left + item.offsetWidth) {
          that.$refs["I" + s + i][0].click();
        }
      });
    },
    // 点击开始播放按钮
    start_suspend() {
      this.start_suspendImg = !this.start_suspendImg;
    },
    // 点击步骤条传值
    stepClick(e) {
      if (e.target.className != "suspendBox" && e.target.className != "suspend") {
        this.$store.commit("stepNumChange", this.stepNum);
      }
    }
  },
  mounted() {
    this.init();
    document.querySelector(".el-drawer__container").style.height = document.querySelector(".toothModelBox").clientHeight + "px";
    /* 检测屏幕尺寸改变 改变element组件尺寸 */
    window.addEventListener("resize", () => {
      document.querySelector(".el-drawer__container").style.height = document.querySelector(".toothModelBox").clientHeight + "px";
    });
    //底部 copyright 隐藏
    this.$store.commit("changeSCopyRight", false);
  },
  components: {
    amount: Amount,
    preference: Preference,
    analyse: Analyse,
    amend: Amend,
    photograph: Photograph,
    substep: Substep,
    feedback: Feedback,
    accessory: Accessory,
    precision: Precision,
    survey: Survey
  }
};
</script>
<style scoped lang="less">
@import "../../assets/css/base.less";
.el-select-dropdown__item {
  font-size: 16 / @rem;
  padding-left: 26 / @rem;
}
/* 修改element组件样式 开始 */
@{deep}.el-radio__inner {
  border-color: #f99400;
}
@{deep}.el-radio__input.is-checked .el-radio__inner {
  background: #fff;
  border-color: #f99400;
}
@{deep}.el-radio__inner::after {
  background-color: #f99400;
  .setwh(8, 8);
}
@{deep}.el-drawer {
  width: auto !important;
  outline: none;
  box-shadow: none;
}
@{deep}.el-radio__inner:hover {
  border-color: #f99400;
}
@{deep}.el-drawer__container {
  top: 170 / @rem;
  outline: none;
}
@{deep}.el-drawer__body,
.navBox {
  outline: none;
}
@{deep}.el-radio__input.is-checked + .el-radio__label {
  color: #606266;
}
/* 修改element组件样式 结束 */
.interlayerTop {
  width: 100%;
  height: 40 / @rem;
  background-color: #565759;
  font-size: 16 / @rem;
  padding: 0 22 / @rem;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .close {
    font-size: 36 / @rem;
  }
}
.overallBox {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
}
.roofBox {
  display: flex;
  height: 80 / @rem;
  width: 100%;
  min-height: 80 / @rem;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0 40 / @rem 0 32 / @rem;
  background-color: rgb(53, 59, 67);
  color: #fff;
  font-size: 16 / @rem;
  > div {
    display: flex;
    align-items: center;
  }
  .logo {
    display: block;
    .setwh(135, 22);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .backBox {
    display: flex;
    align-items: center;
    margin-left: 75 / @rem;
    .back {
      .setwh(10, 16);
      margin-right: 10 / @rem;
    }
  }
  .messageBox {
    span {
      display: inline-block;
      margin-left: 8 / @rem;
    }
    .messageSerial {
      margin-left: 64 / @rem;
    }
  }
}
.menuBox {
  height: 90 / @rem;
  width: 100%;
  background-color: rgb(86, 87, 89);
  display: flex;
  align-items: center;
  color: #fff;
  .clientBox {
    height: 100%;
    width: 160 / @rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-right: 1 / @rem solid #454648;
    img {
      .setwh(40, 40);
    }
    p {
      height: 20 / @rem;
      padding: 0 10 / @rem;
      font-size: 14 / @rem;
      line-height: 22 / @rem;
      border-radius: 3 / @rem;
      background-color: rgb(17, 117, 210);
    }
  }
  ul {
    display: flex;
    height: 100%;
    li {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      align-items: center;
      min-width: 72 / @rem;
      border-right: 1 / @rem solid #454648;
      padding-top: 1 / @rem;
      p {
        text-align: center;
        font-size: 16 / @rem;
        white-space: nowrap;
        margin-top: 60 / @rem;
      }
      &:hover {
        &::before {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 10 / @rem;
          content: "";
          background-color: rgba(249, 148, 0, 0.5);
        }
      }

      img {
        position: absolute;
        left: 0;
        top: 0;
        .setwh(72, 89);
      }
    }
    .active {
      background-color: rgb(249, 148, 0);
    }
  }
  .schemeChoice {
    display: flex;
    align-items: center;
    font-size: 16 / @rem;
    > span {
      display: inline-block;
      margin-right: 12 / @rem;
      white-space: nowrap;
    }
    margin-left: 75 / @rem;
    @{deep}.el-input__inner {
      .setwh(135, 36);
      border: 1 / @rem solid #1175d2;
      padding: 0;
      font-size: 16 / @rem;
      padding-left: 10 / @rem;
      line-height: 36 / @rem;
      color: #1175d2;
    }
    @{deep}.el-input__suffix {
      .setwh(36, 36);
      border-left: 1 / @rem solid #1175d2;
    }
    @{deep}.el-select__caret {
      position: absolute;
      left: 12 / @rem;
      margin-top: 15 / @rem;

      .setwh(12, 7);
      &::before {
        content: "";
        display: block;
        .setwh(12, 7);
        background: url("../../assets/img/jiantou.png");
        background-size: 100% 100%;
      }
    }
  }
  .ratifyBtn {
    width: 100 / @rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 16 / @rem;
    div {
      .setwh(100, 36);
      color: #fff;
      border-radius: 5 / @rem;
      background-color: rgb(249, 148, 0);

      &:last-of-type {
        background-color: #1175d2;
      }
    }

    margin-left: 48 / @rem;
    font-size: 16 / @rem;
    text-align: center;
    line-height: 36 / @rem;
  }
}
.toothModelBox {
  position: relative;
  flex: 1;
  display: flex;
  background-color: #dfe0e2;
  .toothModel {
    height: 100%;
    flex: 1;
  }
  .cutAngle {
    position: absolute;
    z-index: 1;
    top: 69 / @rem;
    left: 30 / @rem;
    display: flex;
    font-size: 16 / @rem;
    border-radius: 5 / @rem;
    border: 1 / @rem solid #1175d2;
    overflow: hidden;
    width: 160 / @rem;
    div {
      width: 50%;
      text-align: center;
      padding: 8 / @rem 0;
    }
    .active {
      color: #fff;
      background-color: #1175d2;
    }
  }
  .toothImg {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .navMsg {
    width: 100 / @rem;
    height: 100%;
    background-color: #edeeee;
    padding-top: 48 / @rem;
    padding-bottom: 40 / @rem;
    box-sizing: border-box;
    @{deep}.el-button,
    .el-button--default {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
    ul {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      li {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 16 / @rem;
        box-sizing: border-box;
        text-align: center;
        font-size: 16 / @rem;
        p {
          margin-top: 13 / @rem;
          line-height: 23 / @rem;
        }
        img {
          .setwh(34, 34);
        }
        &:nth-of-type(1),
        &:nth-of-type(3) {
          img {
            width: 32 / @rem;
          }
        }
        &:nth-of-type(2) {
          img {
            width: 37 / @rem;
          }
        }
        &:nth-of-type(4) {
          img {
            width: 36 / @rem;
          }
        }
      }
    }
  }
  @{deep}.el-drawer__body {
    max-height: 100%;
  }
  .navBox {
    display: flex;
    height: 100%;
    // width: 578 / @rem;
    background-color: #f9f9f9;
    padding-top: 40 / @rem;
    box-sizing: border-box;
    border: 1 / @rem solid #1175d2;
    flex-direction: column;
    padding-bottom: 30 / @rem;

    > ul {
      display: flex;
      justify-content: space-between;
      font-size: 16 / @rem;
      padding: 0 17 / @rem;
      box-sizing: border-box;
      li {
        border-bottom: 4 / @rem solid transparent;
        padding: 5 / @rem 7 / @rem 5 / @rem 10 / @rem;
      }
      .active {
        color: #1175d2;
        border-color: #1175d2;
      }
    }
  }
}
.stepBox {
  height: 96 / @rem;
  width: 100%;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  padding-left: 31 / @rem;
  box-sizing: border-box;
  .suspendBox {
    display: flex;
    width: 265 / @rem;
    min-width: 265 / @rem;
    justify-content: space-between;
    .retreat,
    .advance {
      img {
        .setwh(30, 24);
      }
    }
    .retreatOne,
    .advanceOne {
      img {
        .setwh(24, 24);
      }
    }
    .suspend {
      img {
        .setwh(18, 24);
      }
    }
  }
  .lineBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    flex: 1;
    padding-top: 1 / @rem;
    width: 100%;
    .btmBox,
    .topBox {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .stepImg {
        position: absolute;
        top: -30 / @rem;
        left: 25 / @rem;
        color: #fff;
        span {
          position: absolute;
          top: 7 / @rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 16 / @rem;
        }
        img {
          .setwh(30, 36);
        }
      }
      ul {
        display: flex;
        margin: 0 20 / @rem 0 40 / @rem;
        flex: 1;
        justify-content: space-between;
        li {
          .setwh(24, 6);
          border: 1 / @rem solid #1175d2;
          margin-right: 1px;
        }
        .active {
          background-color: #1175d2;
        }
      }
      .sumBox {
        font-size: 16 / @rem;
        color: #4b96dc;
        width: 60 / @rem;
        text-align: left;
      }
    }
    .topBox {
      margin-top: 11 / @rem;
    }
    .btmBox {
      margin-top: 10 / @rem;
    }
  }
}
</style>
