<template>
  <div class="login">
    <!-- 头部 -->
    <div class="options">
      <div class="main">
        <img class="lgimg" :src="require(`@/assets/1顶部导航/切图_06.png`)" />
        <div class="main">
          <ul class="clearfix">
            <li v-for="(item, i) in options" :key="i">
              <div class="image">
                <img @click="choice.call(this, i, item.visible)" :src="item.url" />
              </div>
              <p>{{ item.font }}</p>
            </li>
          </ul>
          <div class="dropdown">
            <span style="color: #fff; margin-right: 20px">当前：</span>
            <el-dropdown split-button type="primary" @command="handleCommand">
              {{ designate }}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, i) in schemeArray" :key="i" :command="{ url: item.url, font: `${item.planNo}. ${schemeType[item.status]}` }">
                  {{ `${item.planNo}. ${schemeType[item.status]}` }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间的选项按钮 -->
    <div class="content">
      <p id="loading" style="position: fixed; top:50%; left:50%; margin: -50px 0 0 -50px;text-align:center"></p>
      <canvas class="scene"></canvas>
      <ul class="clearfix">
        <li @click="retreat">
          <img :src="require(`@/assets/#病例详情#3D方案切图9.9/PC/后退.png`)" />
        </li>
        <li @click="last">
          <img :src="require(`@/assets/#病例详情#3D方案切图9.9/PC/上一步.png`)" />
        </li>
        <li @click="autoAdvance">
          <img :src="[isPlay ? require(`@/assets/#病例详情#3D方案切图9.9/PC/暂停.png`) : require(`@/assets/#病例详情#3D方案切图9.9/PC/开始.png`)]" />
        </li>
        <li @click="next">
          <img :src="require(`@/assets/#病例详情#3D方案切图9.9/PC/下一步.png`)" />
        </li>
        <li @click="advance">
          <img :src="require(`@/assets/#病例详情#3D方案切图9.9/PC/前进.png`)" />
        </li>
      </ul>
    </div>

    <!-- 下面的进度条 -->
    <div class="foot">
      <div class="main">
        <ul class="curTop" v-show="panTop" ref="curTop">
          <div v-show="planIndext == 0" class="planOne plan" :style="`background-image:url(${require('@/assets/#病例详情#3D方案切图9.9/PC/进度.png')})`">
            <span v-show="planIndext == 0" class="num">0</span>
          </div>
          <span class="bottomOne" v-show="!panBottom && panTop">0</span>
          <li v-for="(item, i) in planArrayT" :key="i" :class="planIndext > i ? (item.type == 1 ? 'hscur' : 'cur') : ''" @click="planClick.call(this, i)" :style="{ width: topwidth + 'px' }">
            <div class="plan" v-show="planIndext == i + 1" :style="`background-image:url(${require('@/assets/#病例详情#3D方案切图9.9/PC/进度.png')})`">
              <span class="num" v-show="planIndext == i + 1">{{ i + 1 }}</span>
            </div>
            <span class="bottomIndex" v-if="(i + 1) % 5 === 0" v-show="!panBottom && panTop">{{ i + 1 }}</span>
          </li>
          <li class="foot_sz">{{ `${planIndext}/${planArrayT.length}` }}</li>
        </ul>
        <!-- 下进度条 -->
        <ul class="curBottom" v-show="panBottom" ref="curBottom">
          <div v-show="planIndext == 0 && !panTop && panBottom" class="planOne plan" :style="`background-image:url(${require('@/assets/#病例详情#3D方案切图9.9/PC/进度.png')})`">
            <span v-show="planIndext == 0" class="num">0</span>
          </div>
          <span class="bottomOne">0</span>
          <li v-for="(item, i) in planArrayB" :key="i" :class="planIndext > i ? (item.type == 1 ? 'hscur' : 'cur') : ''" @click="planClick.call(this, i)" :style="{ width: bottomwidth + 'px' }">
            <div class="plan" v-show="planIndext == i + 1 && !panTop && panBottom" :style="`background-image:url(${require('@/assets/#病例详情#3D方案切图9.9/PC/进度.png')})`">
              <span class="num" v-show="planIndext == i + 1">{{ i + 1 }}</span>
            </div>
            <span class="bottomIndex" v-if="(i + 1) % 5 === 0">{{ i + 1 }}</span>
          </li>
          <li class="foot_sz">{{ `${planIndext}/${planArrayB.length}` }}</li>
        </ul>
      </div>
      <!-- 上进度条 -->

      <!-- <img :src="require(`@/assets/#病例详情#3D方案切图9.9/PC/未标题-1.png`)" /> -->
    </div>
  </div>
</template>
<script>
import { getQueryString } from "@/util/validate";
import { getHashCode } from "@/util/index";
import { render } from "../../render/render";
import { initStl } from "../../render/render";
import { pointModel } from "../../render/render";
import { playModel } from "../../render/render";
let TIMERSTEP = null;
export default {
  data() {
    return {
      caseId: "",
      designate: `方案1`,
      options: [
        {
          url: require(`@/assets/#病例详情#3D方案切图9.9/PC/视角切换图标/双颌.png`), //显示的图片
          font: "双颌", //显示的文字
          visible: 0 //0显示双颌，1显示上颌，2显示下颌
        },
        {
          url: require(`@/assets/#病例详情#3D方案切图9.9/PC/视角切换图标/单颌.png`),
          font: "单颌",
          visible: 1
        },
        {
          url: require(`@/assets/#病例详情#3D方案切图9.9/PC/视角切换图标/左侧.png`),
          font: "左侧",
          visible: 0
        },
        {
          url: require(`@/assets/#病例详情#3D方案切图9.9/PC/视角切换图标/正面.png`),
          font: "正面",
          visible: 0
        },
        {
          url: require(`@/assets/#病例详情#3D方案切图9.9/PC/视角切换图标/右侧.png`),
          font: "右侧",
          visible: 0
        },
        {
          url: require(`@/assets/#病例详情#3D方案切图9.9/PC/视角切换图标/下颌.png`),
          font: "下颌",
          visible: 2
        },
        {
          url: require(`@/assets/#病例详情#3D方案切图9.9/PC/视角切换图标/上颌.png`),
          font: "上颌",
          visible: 1
        }
      ],
      //上进度进度
      planArrayT: [],
      //下进度进度
      planArrayB: [],
      //上进度索引
      planIndext: 0,
      // 上进度是否显示
      panTop: true,
      // 下进度是否显示
      panBottom: true,
      // 是否自动前进
      autoFlag: {
        flag: false,
        interval: null
      },
      // 方案数组集合
      schemeArray: [],
      schemeType: ["方案修改中", "方案需修改", "方案待确认", "方案已确认"],
      istop: true,
      topwidth: 0,
      bottomwidth: 0,
      curstep: 0,
      totalstep: [],
      isPlay: false,
      caseUid: ""
    };
  },
  created() {
    this.caseId = getQueryString("caseId");
    if (!this.caseId) {
      this.$router.replace("/index");
    }
    this.plans();
  },
  mounted() {},
  components: {},
  methods: {
    //初始话
    init() {
      // this.plans();
      //   异步请求数据,用延时器来代替
      setTimeout(() => {
        //控制进度条灰色 1 代表灰色 0代表蓝色
        if (this.totalstep != undefined && this.totalstep.length > 0) {
          this.planArrayT = new Array(this.totalstep.length - 1);
          this.planArrayB = new Array(this.totalstep.length - 1);
          for (var j = 0; j < this.totalstep.length - 1; j++) {
            this.planArrayT[j] = { type: this.totalstep[j][0] };
            this.planArrayB[j] = { type: this.totalstep[j][1] };
          }
        } else {
          this.planArrayT = [];
          this.planArrayB = [];
        }
        this.planIndext = 0;
        this.topwidth = this.$refs.curTop.clientWidth / (this.planArrayT.length + 1);
        this.bottomwidth = this.$refs.curBottom.clientWidth / (this.planArrayB.length + 1);
      }, 200);
    },
    //方案列表
    plans() {
      this.$http({
        url: "/caseInfo/plans",
        method: "get",
        params: {
          caseId: Number(this.caseId)
        }
      }).then(({ data }) => {
        // 接口不通，暂时不用200
        if (data.code == 200) {
          data = JSON.parse(data.data);
          console.log(data);
          this.designate = `${data[0].planNo}. ${this.schemeType[data[0].status]}`;
          this.schemeArray = data;
          this.getData(data[0].url);
        }
        // 模拟的假数据-------------------
        // data.data = [];
        // for(let i = 0; i < 10; i++){
        //     let num = Math.floor(Math.random() * 4 + 1)
        //     console.log(num);
        //      data.data.push({
        //         url: 'www.baidu.com',
        //         status: num,
        //         planNo: num,
        //     })
        // }
        // 模拟的假数据----------------------
      });
    },
    // 双颌，单颌，左侧，右侧选项按钮点击函数,参数"i"是点中的那张图,从0开始;
    choice(i, visible) {
      console.log(i, visible);
      pointModel(i);
      if (i === 0) {
        //双颌显示
        this.panTop = true;
        this.panBottom = true;
      } else if (i === 1) {
        //上颌显示
        if (this.istop) {
          this.panTop = true;
          this.panBottom = false;
          this.istop = false;
        } else {
          this.panTop = false;
          this.panBottom = true;
          this.istop = true;
        }
      } else if (i === 5) {
        //下颌显示
        this.panTop = false;
        this.panBottom = true;
      } else if (i === 6) {
        //上颌显示
        this.panTop = true;
        this.panBottom = false;
      }
    },
    // 方案1，方案2，方案3，选项按钮点击函数,参数"command"是选中的选项。;
    handleCommand(command) {
      this.designate = command.font;
      this.totalstep = [];
      this.init();
      this.getData(command.url);
    },
    //上进度条点击
    planClick(i) {
      this.curstep = i + 1;
      this.gotocurstep();
    },
    // 后退
    retreat() {
      this.curstep = 0;
      this.gotocurstep();
    },
    // 上一步
    last() {
      this.curstep--;
      this.gotocurstep();
    },
    // 自动前进
    autoAdvance() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        if (this.curstep == this.totalstep.length - 1) {
          this.curstep = -1;
          TIMERSTEP = setInterval(() => {
            if (this.curstep >= this.totalstep.length - 1) {
              this.isPlay = false;
              this.curstep = this.totalstep.length - 1;
              this.planIndext = this.curstep;
              clearInterval(TIMERSTEP);
              TIMERSTEP = null;
              return;
            }
            this.curstep++;
            this.planIndext = this.curstep;
            playModel(this.curstep);
            render();
          }, 500);
        } else {
          TIMERSTEP = setInterval(() => {
            if (this.curstep >= this.totalstep.length - 1 || this.curstep < 0) {
              this.isPlay = false;
              this.curstep = this.totalstep.length - 1;
              this.planIndext = this.curstep;
              clearInterval(TIMERSTEP);
              TIMERSTEP = null;
              return;
            }
            this.curstep++;
            this.planIndext = this.curstep;
            playModel(this.curstep);
            render();
          }, 500);
        }
      } else {
        clearInterval(TIMERSTEP);
        TIMERSTEP = null;
      }
    },
    // 下一步
    next() {
      this.curstep++;
      this.gotocurstep();
    },
    // 前进
    advance() {
      this.curstep = this.totalstep.length - 1;
      this.gotocurstep();
    },
    async getData(url) {
      let loadingdom = document.getElementById("loading");
      loadingdom.innerText = "方案加载中……";
      this.caseUid = getHashCode(url).toString(36);
      console.log(url);
    },
    gotocurstep() {
      if (this.curstep < 0) {
        this.curstep = 0;
      } else if (this.curstep >= this.totalstep.length) {
        this.curstep = this.totalstep.length - 1;
      }
      this.planIndext = this.curstep;
      playModel(this.curstep);
    }
  }
};
</script>
<style scoped lang="less">
.login {
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  background: #dfe0e2;

  /deep/.dlbgimg {
    height: 100%;
    display: block;
    margin-top: -80px;
  }

  .topdhlg {
    width: 100%;
    height: 80px;
    background: #353b43;
    position: relative;
    box-shadow: 0px 5px 20px #353b43;
  }
}

.options {
  height: 100px;
  width: 100%;
  background: #565759;

  .main {
    position: relative;
    height: 100%;

    /deep/ .el-row {
      width: 70%;
      margin: 0 auto;
      margin-left: auto !important;
      margin-right: auto !important;
    }

    .lgimg {
      display: block;
      width: 136px;
      position: absolute;
      z-index: 99;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }

    ul {
      width: 62.5%;
      margin: 0 auto;
      height: 100%;

      li {
        float: left;
        width: 7.8%;
        height: 100%;
        margin-right: 7%;
        position: relative;

        .image {
          width: 100%;
          height: 75%;

          position: relative;
          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 80%;
            border-radius: 10px;
            &:hover {
              background: #8e8e90;
              cursor: pointer;
            }
          }
        }

        &:last-child {
          margin-right: 0;
        }

        p {
          height: 25%;
          line-height: 25%;
          margin-top: 0px;
          width: 100%;
          text-align: center;
          color: #fff;
        }
      }
    }

    /deep/.dropdown {
      position: absolute;
      z-index: 99;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 42px;

      .el-button-group {
        height: 42px;
      }

      .el-button--primary {
        height: 100%;
        padding: 15px 10px 12px 26px;
        background-color: #fff !important;
        background: #fff !important;
        border: none !important;
        color: #333;
      }

      .el-dropdown__caret-button {
        padding: 15px 15px 12px 0px;
      }
    }
  }
}

.content {
  > img {
    display: block;
    margin: 0 auto;
  }

  position: relative;

  ul {
    width: 380px;
    position: fixed;
    bottom: 110px;
    left: 50%;
    margin-left: -190px;

    li {
      float: left;
      margin: 0 20px;
    }
  }
}

.foot {
  position: fixed;
  bottom: 0;
  background: #f9f9f9;
  border-top: 1px solid #e6e6e8;
  width: 100%;
  height: 100px;
  padding-top: 28px;
  box-sizing: border-box;

  .hide {
    display: none;
  }

  ul {
    // width: 90%;
    margin-bottom: 10px;
    // height: 50px;
    position: relative;
    display: flex;
    justify-content: space-between;

    .plan {
      position: absolute;
      height: 30px;
      width: auto;
      top: -30px;
      right: -12.44px;
      // transition: all 0.1s linear;
      width: 25px;
      height: 30px;
      background-size: cover;
    }

    .planOne {
      left: -12.44px;
    }

    .num {
      position: absolute;
      // top: -30px;
      width: 100%;
      text-align: center;
      color: #fff;
      // transition: all 0.1s linear;
    }

    .bottomOne {
      position: absolute;
      bottom: -40px;
      left: 0;
    }

    .bottomIndex {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
    }

    li {
      width: 50px;
      height: 10px;
      border: 1px solid #1175d2;
      border-radius: 3px;
      position: relative;
      cursor: pointer;
      box-sizing: border-box;
    }

    .foot_sz {
      position: absolute;
      right: -55px;
      top: -5px;
      width: 40px;
      border: none;
      font-size: 14px;
      color: #1175d2;
    }

    .cur {
      background: #1175d2;
      // transition: all 0.1s linear;
    }

    .hscur {
      background: #ccc;
      border: 1px solid #ccc;
    }
  }

  img {
    width: 100%;
  }
}
</style>
