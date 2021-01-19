<template>
  <el-dialog
    :visible.sync="dialogFormVisible"
    :opened="opensync"
    class="tancBox"
    @open="dia"
    @close="dia2"
  >
    <div class="headertit">
      <p :class="chengyi == 1?'secaicls':''" @click="heade1">旋转</p>
      <p :class="chengyi == 2?'secaicls':''" @click="heade2">保持</p>
      <p :class="chengyi == 3?'secaicls':''" @click="heade3">伸长</p>
      <img @click="dialogFormVisible = false" class="xxx" src="@/assets/临床偏好/切图/xxx.png" />
    </div>

    <div class="zhutineir clearfix">
      <div class="texttop clearfix">
        <p :class="daixin == 1?'botbor': '' " @click="xiace">颊侧</p>
        <p :class="daixin == 2?'botbor': '' " @click="sece">舌侧</p>
      </div>
      <div class="boxnav">
        <div class="list1 clearfix" ref="top">
          <div v-for="(item,i) in yacitop" :key="i" class="item">
            <div :style="item.kuang" class="boximg">
              <div :style="item.gao" class="boximghez">
                <img
                  @click.stop="list1fun.call(this,i)"
                  v-show="!item.alter"
                  :src="item.imageUrl"
                  :ref="'It'+i"
                />
                <!-- <div :class="flag==!false?'xians':'yingc'" class="sekuaibox" v-show="item.shijimg"></div> -->
                <!-- <img @click.stop="list1fun.call(this,i)" v-show="item.alter" :src="item.imageUrlactive"> -->
                <img class="juzhoimg" :src="item.shijimg" />
              </div>
            </div>
            <div class="boxtext">{{item.shuzhi}}</div>
          </div>
        </div>
        <div class="zhoxian">
          <span class="yacright">右</span>
          <span class="yacleft">左</span>
        </div>
        <div class="list2 clearfix" ref="bottom">
          <div v-for="(item,i) in yacibottom" :key="i" class="item">
            <div class="boxtext">{{item.shuzhi}}</div>
            <div :style="item.kuang" class="boximg">
              <div :style="item.gao" class="boximghez">
                <img
                  @click.stop="list2fun.call(this,i)"
                  v-show="!item.alter"
                  :src="item.imageUrl"
                  :ref="'Ib'+i"
                />
                <!-- <div :class="flag==!false?'xians':'yingc'" class="sekuaibox" v-show="item.shijimg"></div> -->
                <!-- <img @click.stop="list2fun.call(this,i)" v-show="item.alter" :src="item.imageUrlactive"> -->
                <img class="juzhoimg" :src="item.shijimg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="youhuafuj">
        <span class="youhuatit">优化附件</span>
      </div>
      <ul class="ullist clearfix">
        <li ref="shawuse" @mousedown.stop="shanchuclick" class="item">
          <img src="@/assets/临床偏好/切图/shanc.png" style="pointer-events: none;" />
        </li>

        <li
          v-for="(item,i) in xuanx"
          :key="i"
          class="item"
          @mousedown.stop="xuanxDown.call(this,i)"
          :ref="'index'+i"
        >
          <img :src="item" style="pointer-events: none;" />
        </li>
      </ul>
    </div>

    <div slot="footer" class="dialog-footer clearfix">
      <el-button @click="fanhuibut" class="fanhui">返 回</el-button>
      <el-button @click="chozhi" class="chozhi">重 置</el-button>
      <el-button type="primary" @click="quedin">确 定</el-button>
    </div>
    <img
      ref="mouseTran"
      v-show="flag"
      style="position:fixed;left:0;top:0;pointer-events: none;"
      :src="mouseImg"
    />
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
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
      // 弹窗
      dialogFormVisible: false,
      arr: [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
      //tab
      yacitop: [
        {
          kuang: "width:60px",
          gao: "height:46px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/18.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/18-.png"),
          shuzhi: 18,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:65px",
          gao: "height:51px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/17.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/17-.png"),
          shuzhi: 17,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:80px",
          gao: "height:53px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/16.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/16-.png"),
          shuzhi: 16,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:42px",
          gao: "height:56px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/15.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/15-.png"),
          shuzhi: 15,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:42px",
          gao: "height:61px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/14.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/14-.png"),
          shuzhi: 14,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:58px",
          gao: "height:81px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/13.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/13-.png"),
          shuzhi: 13,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:40px",
          gao: "height:66px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/12.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/12-.png"),
          shuzhi: 12,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:58px",
          gao: "height:80px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/11.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/11-.png"),
          shuzhi: 11,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:58px",
          gao: "height:78px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/21.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/21-.png"),
          shuzhi: 21,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:40px",
          gao: "height:65px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/22.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/22-.png"),
          shuzhi: 22,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:61px",
          gao: "height:81px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/23.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/23-.png"),
          shuzhi: 23,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:43px",
          gao: "height:63px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/24.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/24-.png"),
          shuzhi: 24,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:44px",
          gao: "height:55px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/25.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/25-.png"),
          shuzhi: 25,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:80px",
          gao: "height:53px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/26.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/26-.png"),
          shuzhi: 26,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:67px",
          gao: "height:50px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/27.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/27-.png"),
          shuzhi: 27,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:60px",
          gao: "height:46px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/28.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/28-.png"),
          shuzhi: 28,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
      ],
      yacibottom: [
        {
          kuang: "width:73px",
          gao: "height:57px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/48.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/48-.png"),
          shuzhi: 48,
          alter: false,
          zujkozhi: false,
          shijimg: "", //选中之后展示的图片
        },
        {
          kuang: "width:70px",
          gao: "height:60px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/47.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/47-.png"),
          shuzhi: 47,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:80px",
          gao: "height:58px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/46.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/46-.png"),
          shuzhi: 46,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:51px",
          gao: "height:62px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/45.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/45-.png"),
          shuzhi: 45,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:49px",
          gao: "height:62px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/44.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/44-.png"),
          shuzhi: 44,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:52px",
          gao: "height:78px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/43.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/43-.png"),
          shuzhi: 43,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:39px",
          gao: "height:62px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/42.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/42-.png"),
          shuzhi: 42,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:38px",
          gao: "height:59px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/41.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/41-.png"),
          shuzhi: 41,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:41px",
          gao: "height:59px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/31.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/31-.png"),
          shuzhi: 31,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:40px",
          gao: "height:61px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/32.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/32-.png"),
          shuzhi: 32,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:55px",
          gao: "height:77px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/33.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/33-.png"),
          shuzhi: 33,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:50px",
          gao: "height:62px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/34.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/34-.png"),
          shuzhi: 34,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:53px",
          gao: "height:62px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/35.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/35-.png"),
          shuzhi: 35,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:80px",
          gao: "height:59px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/36.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/36-.png"),
          shuzhi: 36,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:70px",
          gao: "height:59px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/37.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/37-.png"),
          shuzhi: 37,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
        {
          kuang: "width:69px",
          gao: "height:56px",
          imageUrl: require("@/assets/3新建病例/矫治要求-牙位/38.png"),
          imageUrlactive: require("@/assets/3新建病例/矫治要求-牙位/38-.png"),
          shuzhi: 38,
          alter: false,
          zujkozhi: false,
          shijimg: "",
        },
      ],
      xuanx: [
        require("@/assets/临床偏好/切图/x1.png"),
        require("@/assets/临床偏好/切图/x2.png"),
        require("@/assets/临床偏好/切图/x3.png"),
        require("@/assets/临床偏好/切图/x4.png"),
        require("@/assets/临床偏好/切图/x5.png"),
        require("@/assets/临床偏好/切图/x6.png"),
        require("@/assets/临床偏好/切图/fuj.png"),
      ],
      shanchu: [require("@/assets/临床偏好/切图/shanc.png")],
      // 牙位编号
      yaweibianhao: "",

      // 当前选中的 是什么  旋转1  保持2  伸长3
      chengyi: 1,

      // 当前选中的 颊侧 1  舌侧 2
      daixin: 1,

      // 当前选中的图片选项 垃圾桶 为 0
      fakeyou: "",

      // 传给后端的 数组
      cnmdhoduan: [],

      // 6个子数组
      daixin1: [],
      daixin2: [],
      daixin3: [],
      daixin4: [],
      daixin5: [],
      daixin6: [],
    };
  },
  mounted() {
    this.init();
    this.huoquxx();
  },
  methods: {
    opensync() {
      console.log(123);
    },
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
    // 上牙点击事件
    list1fun(i) {
      console.log(i);
      this.yaweibianhao = i + 1;
      if (this.fakeyou != "") {
        switch (this.fakeyou) {
          case 999:
            this.shangyashij(i, 0, 9);
            break;
          case 1:
            this.shangyashij(i, 0);
            break;
          case 2:
            this.shangyashij(i, 1);
            break;
          case 3:
            this.shangyashij(i, 2);
            break;
          case 4:
            this.shangyashij(i, 3);
            break;
          case 5:
            this.shangyashij(i, 4);
            break;
          case 6:
            this.shangyashij(i, 5);
            break;
          case 7:
            this.shangyashij(i, 6);
            break;
        }
      }
    },
    // 下牙点击事件
    list2fun(i) {
      this.yaweibianhao = i + 17;
      if (this.fakeyou != "") {
        switch (this.fakeyou) {
          case 999:
            this.xiayashij(i, 0, 9);
            break;
          case 1:
            this.xiayashij(i, 0);
            break;
          case 2:
            this.xiayashij(i, 1);
            break;
          case 3:
            this.xiayashij(i, 2);
            break;
          case 4:
            this.xiayashij(i, 3);
            break;
          case 5:
            this.xiayashij(i, 4);
            break;
          case 6:
            this.xiayashij(i, 5);
            break;
          case 7:
            this.xiayashij(i, 6);
            break;
        }
      }
    },
    // 上牙
    shangyashij(i, abab, cnm) {
      if (cnm) {
        // 点击了垃圾桶 后的事件
        this.yacitop[i].shijimg = "";

        let index = i + 1;
        let that = this;
        switch (this.chengyi) {
          case 1:
            if (this.daixin == 1) {
              let arr = [];
              this.daixin1.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin1 = arr;
            } else {
              let arr = [];
              this.daixin2.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin2 = arr;
            }
            break;
          case 2:
            if (this.daixin == 1) {
              let arr = [];
              this.daixin3.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin3 = arr;
            } else {
              let arr = [];
              this.daixin4.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin4 = arr;
            }
            break;
          case 3:
            if (this.daixin == 1) {
              let arr = [];
              this.daixin5.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin5 = arr;
            } else {
              let arr = [];
              this.daixin6.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin6 = arr;
            }
            break;
        }
        let bbq = [];
        this.cnmdhoduan = bbq.concat(
          this.daixin1,
          this.daixin2,
          this.daixin3,
          this.daixin4,
          this.daixin5,
          this.daixin6
        );
        // let arr = [];
        // this.daixin1.forEach(function (a, b) {
        //     if (a.teethIndex != index) {
        //         arr.push(a)
        //     }
        // })
        // that.daixin1 = arr;
      } else {
        if (this.yacitop[i].shijimg == "") {
          switch (this.chengyi) {
            case 1:
              if (this.daixin == 1) {
                this.chuancanshu(this.yacitop[i], this.daixin1, abab);
              } else {
                this.chuancanshu(this.yacitop[i], this.daixin2, abab);
              }
              break;
            case 2:
              if (this.daixin == 1) {
                this.chuancanshu(this.yacitop[i], this.daixin3, abab);
              } else {
                this.chuancanshu(this.yacitop[i], this.daixin4, abab);
              }
              break;
            case 3:
              if (this.daixin == 1) {
                this.chuancanshu(this.yacitop[i], this.daixin5, abab);
              } else {
                this.chuancanshu(this.yacitop[i], this.daixin6, abab);
              }
              break;
          }
          let bbq = [];
          this.cnmdhoduan = bbq.concat(
            this.daixin1,
            this.daixin2,
            this.daixin3,
            this.daixin4,
            this.daixin5,
            this.daixin6
          );
          // // 正常
          // this.yacitop[i].shijimg = this.xuanx[abab]
          // this.cnmdhoduan.push({
          //     // 第几颗牙齿
          //     teethIndex: this.yaweibianhao,
          //     // 类别 1 旋转 2 保持 3 伸长
          //     type: this.chengyi,
          //     // 类型 1 颊侧 2 舌侧
          //     category: this.daixin,
          //     // 附件种类 自行定义编号
          //     annxType: this.fakeyou
          // })
        }
      }
    },
    // 下牙
    xiayashij(i, abab, cnm) {
      if (cnm) {
        this.yacibottom[i].shijimg = "";
        let index = i + 17;
        let that = this;
        switch (this.chengyi) {
          case 1:
            if (this.daixin == 1) {
              let arr = [];
              this.daixin1.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin1 = arr;
            } else {
              let arr = [];
              this.daixin2.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin2 = arr;
            }
            break;
          case 2:
            if (this.daixin == 1) {
              let arr = [];
              this.daixin3.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin3 = arr;
            } else {
              let arr = [];
              this.daixin4.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin4 = arr;
            }
            break;
          case 3:
            if (this.daixin == 1) {
              let arr = [];
              this.daixin5.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin5 = arr;
            } else {
              let arr = [];
              this.daixin6.forEach(function (a, b) {
                if (a.teethIndex != index) {
                  arr.push(a);
                }
              });
              that.daixin6 = arr;
            }
            break;
        }
        let bbq = [];
        this.cnmdhoduan = bbq.concat(
          this.daixin1,
          this.daixin2,
          this.daixin3,
          this.daixin4,
          this.daixin5,
          this.daixin6
        );

        // let arr = [];
        // this.cnmdhoduan.forEach(function (a, b) {
        //     if (a.teethIndex != index) {
        //         arr.push(a)
        //     }
        // })
        // that.cnmdhoduan = arr;
        // console.log(this.cnmdhoduan)
      } else {
        if (this.yacibottom[i].shijimg == "") {
          switch (this.chengyi) {
            case 1:
              if (this.daixin == 1) {
                this.chuancanshu(this.yacibottom[i], this.daixin1, abab);
              } else {
                this.chuancanshu(this.yacibottom[i], this.daixin2, abab);
              }
              break;
            case 2:
              if (this.daixin == 1) {
                this.chuancanshu(this.yacibottom[i], this.daixin3, abab);
              } else {
                this.chuancanshu(this.yacibottom[i], this.daixin4, abab);
              }
              break;
            case 3:
              if (this.daixin == 1) {
                this.chuancanshu(this.yacibottom[i], this.daixin5, abab);
              } else {
                this.chuancanshu(this.yacibottom[i], this.daixin6, abab);
              }
              break;
          }
          let bbq = [];
          this.cnmdhoduan = bbq.concat(
            this.daixin1,
            this.daixin2,
            this.daixin3,
            this.daixin4,
            this.daixin5,
            this.daixin6
          );

          // this.yacibottom[i].shijimg = this.xuanx[abab]
          // this.cnmdhoduan.push({
          //     // 第几颗牙齿
          //     teethIndex: this.yaweibianhao,
          //     // 类别 1 旋转 2 保持 3 伸长
          //     type: this.chengyi,
          //     // 类型 1 颊侧 2 舌侧
          //     category: this.daixin,
          //     // 附件种类 自行定义编号
          //     annxType: this.fakeyou
          // })
          // console.log(this.cnmdhoduan)
        }
      }
    },
    // 鼠标按下事件
    xuanxDown(i) {
      let that = this;
      //上下两个大盒子的位置
      let _T = this.$refs.top;
      let _B = this.$refs.bottom;
      that.top = {
        Y: _T.getBoundingClientRect().top,
        H: _T.offsetHeight,
      };
      that.bottom = {
        Y: _B.getBoundingClientRect().top,
        H: _B.offsetHeight,
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
        h: _C.height,
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
        if (
          x > item.getBoundingClientRect().left &&
          x < item.getBoundingClientRect().left + item.offsetWidth
        ) {
          that.$refs["I" + s + i][0].click();
        }
      });
    },
    // 垃圾桶
    shanchuclick() {
      let that = this;
      //上下两个大盒子的位置
      let _T = this.$refs.top;
      let _B = this.$refs.bottom;
      that.top = {
        Y: _T.getBoundingClientRect().top,
        H: _T.offsetHeight,
      };
      that.bottom = {
        Y: _B.getBoundingClientRect().top,
        H: _B.offsetHeight,
      };

      //跟随鼠标移动的图片位置
      that.flag = true;
      var img = this.$refs.mouseTran;
      img.src = this.shanchu[0];
      let _C = this.$refs.shawuse.childNodes[0];
      this.posi = {
        x: _C.getBoundingClientRect().left,
        y: _C.getBoundingClientRect().top,
        w: _C.width,
        h: _C.height,
      };
      img.style.left = this.posi.x + "px";
      img.style.top = this.posi.y + "px";

      // 鼠标移动事件
      document.onmousemove = this.move;

      this.fakeyou = 999;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 确定
    quedin() {
      this.dialogFormVisible = false;
      this.jiekoe1();
    },
    // 重置
    chozhi() {
      switch (this.chengyi) {
        case 1:
          // 判断 类型 1 颊侧 2 舌侧
          if (this.daixin == 1) {
            this.daixin1 = [];
          } else {
            this.daixin2 = [];
          }
          break;
        case 2:
          // 判断 类型 1 颊侧 2 舌侧
          if (this.daixin == 1) {
            this.daixin3 = [];
          } else {
            this.daixin4 = [];
          }
          break;
        case 3:
          // 判断 类型 1 颊侧 2 舌侧
          if (this.daixin == 1) {
            this.daixin5 = [];
          } else {
            this.daixin6 = [];
          }
          break;
      }
      this.yacitop.forEach(function (a, b) {
        a.shijimg = "";
      });
      this.yacibottom.forEach(function (a, b) {
        a.shijimg = "";
      });
      // 清空数组
      // this.cnmdhoduan = []
      let bbq = [];
      this.cnmdhoduan = bbq.concat(
        this.daixin1,
        this.daixin2,
        this.daixin3,
        this.daixin4,
        this.daixin5,
        this.daixin6
      );
    },
    // 返回
    fanhuibut() {
      this.dialogFormVisible = false;
    },
    // 旋转
    heade1() {
      this.chengyi = 1;
      // 下面子 导航回到1
      this.daixin = 1;
      // 回溯数组 1
      this.huisuyaci(this.daixin1);
    },
    // 保持
    heade2() {
      this.chengyi = 2;
      // 下面子 导航回到1
      this.daixin = 1;
      // 回溯 数组 3
      this.huisuyaci(this.daixin3);
    },
    // 伸长
    heade3() {
      this.chengyi = 3;
      // 下面子 导航回到1
      this.daixin = 1;
      // 回溯 数组 5
      this.huisuyaci(this.daixin5);
    },
    // 颊侧
    xiace() {
      this.daixin = 1;
      switch (this.chengyi) {
        case 1:
          this.huisuyaci(this.daixin1);
          break;
        case 2:
          this.huisuyaci(this.daixin3);
          break;
        case 3:
          this.huisuyaci(this.daixin5);
          break;
      }
    },
    // 舌侧
    sece() {
      this.daixin = 2;
      switch (this.chengyi) {
        case 1:
          this.huisuyaci(this.daixin2);
          break;
        case 2:
          this.huisuyaci(this.daixin4);
          break;
        case 3:
          this.huisuyaci(this.daixin6);
          break;
      }
    },
    // 接口
    jiekoe1() {
      this.cnmdhoduan.forEach((item, index) => {
          item.teethIndex = this.arr[item.teethIndex-1];
      });
      console.log(this.cnmdhoduan)
      this.$http({
        url: "/clinical/saveAnnx",
        method: "POST",
        data: this.cnmdhoduan,
      })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取临床偏好中附件信息
    huoquxx() {
        console.log(1);
      // this.chozhi()
      this.daixin1 = [];
      this.daixin2 = [];
      this.daixin3 = [];
      this.daixin4 = [];
      this.daixin5 = [];
      this.daixin6 = [];
      this.$http({
        url: "/clinical/annx",
        method: "get",
      })
        .then(({ data }) => {
          let that = this;
          data = JSON.parse(data.data);
          data.forEach((a, b) => {
            // that.cnmdhoduan.push(a);
            // console.log(a)
            // 判断 类别  1 旋转 2 保持 3 伸长
            // a.teethIndex = arr[b]chanAt
            a.teethIndex = this.arr.indexOf(a.teethIndex)+1;
            switch (a.type) {
              case 1:
                // 判断 类型 1 颊侧 2 舌侧
                if (a.category == 1) {
                  that.daixin1.push(a);
                } else {
                  that.daixin2.push(a);
                }
                break;
              case 2:
                // 判断 类型 1 颊侧 2 舌侧
                if (a.category == 1) {
                  that.daixin3.push(a);
                } else {
                  that.daixin4.push(a);
                }
                break;
              case 3:
                // 判断 类型 1 颊侧 2 舌侧
                if (a.category == 1) {
                  that.daixin5.push(a);
                } else {
                  that.daixin6.push(a);
                }
                break;
            }
          });

          let bbq = [];
          this.cnmdhoduan = bbq.concat(
            this.daixin1,
            this.daixin2,
            this.daixin3,
            this.daixin4,
            this.daixin5,
            this.daixin6
          );
          // 初始化 渲染 回溯
          this.huisuyaci(this.daixin1);
        })
        .catch((err) => {});
    },
    // 循环数组 回溯渲染 牙齿
    huisuyaci(daix) {
      // 清空 牙齿数据
      this.yacitop.forEach(function (a, b) {
        a.shijimg = "";
      });
      this.yacibottom.forEach(function (a, b) {
        a.shijimg = "";
      });
      let that = this;
      daix.forEach(function (a, b) {
        if (a.teethIndex > 16) {
          // 下排牙齿
          switch (a.annxType) {
            case 1:
              that.yacibottom[a.teethIndex - 17].shijimg = that.xuanx[0];
              break;
            case 2:
              that.yacibottom[a.teethIndex - 17].shijimg = that.xuanx[1];
              break;
            case 3:
              that.yacibottom[a.teethIndex - 17].shijimg = that.xuanx[2];
              break;
            case 4:
              that.yacibottom[a.teethIndex - 17].shijimg = that.xuanx[3];
              break;
            case 5:
              that.yacibottom[a.teethIndex - 17].shijimg = that.xuanx[4];
              break;
            case 6:
              that.yacibottom[a.teethIndex - 17].shijimg = that.xuanx[5];
              break;
            case 7:
              that.yacibottom[a.teethIndex - 17].shijimg = that.xuanx[6];
              break;
          }
        } else {
          //上排牙齿
          switch (a.annxType) {
            case 1:
              that.yacitop[a.teethIndex - 1].shijimg = that.xuanx[0];
              break;
            case 2:
              that.yacitop[a.teethIndex - 1].shijimg = that.xuanx[1];
              break;
            case 3:
              that.yacitop[a.teethIndex - 1].shijimg = that.xuanx[2];
              break;
            case 4:
              that.yacitop[a.teethIndex - 1].shijimg = that.xuanx[3];
              break;
            case 5:
              that.yacitop[a.teethIndex - 1].shijimg = that.xuanx[4];
              break;
            case 6:
              that.yacitop[a.teethIndex - 1].shijimg = that.xuanx[5];
              break;
            case 7:
              that.yacitop[a.teethIndex - 1].shijimg = that.xuanx[6];
              break;
          }
        }
      });
    },
    // 传参 方法
    chuancanshu(shangxiayaci, shuzu, abab) {
      // 正常
      shangxiayaci.shijimg = this.xuanx[abab];
      shuzu.push({
        // 第几颗牙齿
        teethIndex: this.yaweibianhao,
        // 类别 1 旋转 2 保持 3 伸长
        type: this.chengyi,
        // 类型 1 颊侧 2 舌侧
        category: this.daixin,
        // 附件种类 自行定义编号
        annxType: this.fakeyou,
      });
    },
    // 打开
    dia() {},
    // 关闭
    dia2() {},
  },
};
</script>
<style scoped lang="less">
/deep/.sekuaibox {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 13px;
  height: 20px;
  background: #999999;
  opacity: 0;
}
/deep/.xians {
  opacity: 1 !important;
}
/deep/.yingc {
  opacity: 0;
}
.tancBox {
  user-select: none;

  overflow: hidden !important;
  /deep/.el-dialog {
    width: 950px !important;
    border-radius: 15px !important;
    // margin-top: 0vh !important;
  }

  // 右上角 X
  /deep/.el-dialog__header {
    display: none;
  }

  /deep/.el-dialog__footer {
    background: #f9f9f9 !important;
    padding: 0 30px;
    border-radius: 0 0 150px 150px !important;
  }

  /deep/.el-dialog__body {
    padding: 0px;
    border-radius: 15px 15px 0 0 !important;
  }

  .xxx {
    position: absolute;
    right: 3%;
    top: 22px;
    z-index: 9;
    cursor: pointer;
  }

  // 头部
  .headertit {
    height: 60px;
    background: #e0e0e0;

    p {
      font-size: 16px;
      cursor: pointer;
      line-height: 60px;
      display: inline-block;
      padding-left: 30px;
    }

    .secaicls {
      color: #1175d2;
    }
  }

  // 身体
  .zhutineir {
    padding: 0 30px;
    // height: 600px;

    background: #f9f9f9 !important;

    // 忘记了
    .texttop {
      text-align: center;
      margin: 20px 0;

      p {
        width: 45px;
        cursor: pointer;
        font-size: 16px;
        text-align: center;
        display: inline-block;
        margin: 0 10px;
        // float: left;
        padding-bottom: 5px;
      }

      .botbor {
        color: #1175d2;
        border-bottom: 3px solid #1175d2;
      }
    }

    // 牙齿
    .boxnav {
      width: 1200px;
      // margin-left: 10px;
      margin-left: -65px;
      transform: scale(0.8);
      font-size: 16px !important;

      .list1 {
        display: inline-block;
        margin-left: 7px;
        margin-bottom: 20px;

        .item {
          // width:60px;
          height: 100px;
          position: relative;
          float: left;
          margin-right: 5px;

          .boximg {
            // width:100%;
            height: 100%;
            position: relative;

            img {
              //    display: block;
              position: absolute;
              left: 0;
              bottom: 0;
              cursor: pointer;
            }
          }

          .boximghez {
            width: 100%;
            display: block;
            position: absolute;
            bottom: 0px;

            .juzhoimg {
              pointer-events: none;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }

            .clickzujiantop {
              position: absolute;
              left: 50%;
              bottom: 110px;
              margin-left: -320px;
            }

            .p1 {
              pointer-events: none;
              width: 100%;
              text-align: center;
              font-size: 12px;
              line-height: 15px;
              color: #ff0000;
            }

            .p2 {
              pointer-events: none;
              width: 100%;
              text-align: center;
              font-size: 12px;
              line-height: 15px;
              color: #ff0000;
            }

            .p3 {
              pointer-events: none;
              width: 100%;
              text-align: center;
              font-size: 12px;
              line-height: 15px;
              color: #ff0000;
            }

            .p4 {
              pointer-events: none;
              width: 100%;
              text-align: center;
              font-size: 12px;
              line-height: 15px;
              color: #ff0000;
            }
          }

          .boxtext {
            text-align: center;
            margin-top: 20px;
          }
        }
      }

      .zhoxian::before {
        content: "";
        width: 2px;
        height: 75px;
        background: #aeaeae;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .zhoxian {
        position: relative;
        width: 80%;
        height: 2px;
        background: #aeaeae;

        // margin:0 auto;
        margin-left: 10px;
        margin-top: 41px;
        margin-bottom: 20px;

        .yacright {
          position: absolute;
          left: -35px;
          top: 50%;
          transform: translateY(-50%);
        }

        .yacleft {
          position: absolute;
          right: -35px;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .list2 {
        display: inline-block;
        // margin-left: 140px;

        .item {
          // width:60px;
          height: 100px;
          position: relative;
          float: left;
          margin-right: 5px;
          // pointer-events: auto !important;

          .boximg {
            // width:100%;
            height: 100%;
            position: relative;

            img {
              position: absolute;
              left: 0;
              top: 0;
              cursor: pointer;
            }
          }

          /deep/.boximghez {
            width: 100%;
            display: block;
            position: absolute;
            top: 0px;

            .juzhoimg {
              pointer-events: none;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }

            .clickzujianbottom {
              position: absolute;
              left: 50%;
              top: 110px;
              margin-left: -320px;
            }

            .p1 {
              pointer-events: none;
              width: 100%;
              text-align: center;
              font-size: 12px;
              line-height: 15px;
              color: #ff0000;
            }

            .p2 {
              pointer-events: none;
              width: 100%;
              text-align: center;
              font-size: 12px;
              line-height: 15px;
              color: #ff0000;
            }

            .p3 {
              pointer-events: none;
              width: 100%;
              text-align: center;
              font-size: 12px;
              line-height: 15px;
              color: #ff0000;
            }

            .p4 {
              pointer-events: none;
              width: 100%;
              text-align: center;
              font-size: 12px;
              line-height: 15px;
              color: #ff0000;
            }
          }

          .boxtext {
            text-align: center;
            margin-bottom: 20px;
          }
        }
      }
    }

    // 优化附件
    .youhuafuj {
      border-bottom: 1px solid #999999;
      text-align: right;
      padding-bottom: 20px;
      margin-top: 40px;

      .youhuatit {
        position: relative;

        // &::before {
        //     content: "";
        //     position: absolute;
        //     left: -30px;
        //     top: 50%;
        //     transform: translateY(-50%);
        //     width: 13px;
        //     height: 20px;
        //     background: #999999;
        // }
      }
    }

    // 选项
    .ullist {
      margin-top: 50px;
      margin-bottom: 40px;

      .item:nth-child(1) {
        margin-left: 0px;
        margin-right: 20px;
      }
      .item:nth-child(8) {
        position: absolute;
        right: 9%;
        bottom: 215px;
      }

      .item {
        cursor: pointer;
        width: 30px;
        height: 40px;
        float: left;
        margin-left: 30px;
        position: relative;

        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  // 按钮
  /deep/.dialog-footer {
    .el-button {
      padding: 0px;
      font-size: 16px;
      line-height: 36px;
      width: 140px;
      height: 36px;
      border: 1px solid #1175d2;
      margin-left: 20px;
      margin-bottom: 37px;
    }

    .fanhui {
      float: left;
      margin-left: 0px;
    }

    .chozhi {
      float: left;
    }
  }
}

// @media screen and (max-width: 1300px) {
//     /deep/.el-dialog {
//         transform: scale(0.8);
//     }

// }

// @media screen and (max-width: 1100px) {
//     /deep/.el-dialog {
//         transform: scale(0.6);
//     }

// }
@media screen and (max-height: 930px) {
  /deep/.el-dialog {
    margin-top: 1vh !important;
  }
}
</style>