<template>
  <div class="amendBox">
    <div class="remark_box">
      <div class="amendBd">
        <ul>
          <li :class="history ? '' : 'active'" @click="history = false">方案备注</li>
          <li @click="history = true" :class="history ? 'active' : ''">历史记录</li>
        </ul>
        <!-- 方案备注 -->
        <div class="schemeRemark" @click="addition" v-if="!history">
          <div class="remarks">
            <div v-for="(item, idx) in schemeList" :key="idx" @click.stop>
              <img :src="item.src" v-if="item.type == 'img'" />
              <el-input ref="focusTextarea" v-if="item.type == 'text'" type="textarea" autosize v-model="item.subject" resize="none" @blur="inputBlur"> </el-input>
            </div>
          </div>
          <div class="remarkBtn">
            <span @click.stop="screensHot">截图</span>
            <span @click.stop="empty">清空</span>
          </div>
        </div>
        <!-- 历史记录 -->
        <div class="schemeRemark" v-if="history">
          <div class="remarks"></div>
        </div>
      </div>
      <!-- 操作记录 -->
      <div class="record">
        <p>操作记录</p>
        <ul>
          <li v-for="(item, index) in operationList" :key="index">
            <div>
              <span>{{ item }}</span>
              <div>
                <img src="../../../assets/img/closeBlue.png" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="btnBox">
      <div class="resetBtn">重置</div>
      <div class="submitBtn">提交修改意见</div>
    </div>
  </div>
</template>
<script>
// import "swiper/swiper-bundle.css";
import { Slicing } from "../../../util/screenhot.js";
export default {
  data: () => {
    return {
      /* 操作记录 */
      operationList: ["Tooth 17 - 添加 颊侧垂直矩形3毫米 附件", "Tooth 20 - 添加 颊侧垂直矩形4毫米 附件"],
      history: false,
      /* 方案备注模拟数据 */
      schemeList: [
        // {
        //   type: "img",
        //   subject: "",
        // },
        {
          type: "text",
          subject: ""
        }
      ]
    };
  },
  methods: {
    /* 截图 */
    screensHot(e) {
      // cutImage();
      const screensHot = new Slicing();
      screensHot.init().then((res) => {
        this.$set(this.schemeList, this.schemeList.length, {
          type: "img",
          src: res
        });
      });
    },
    /* 添加备注信息 */
    addition(e) {
      this.$set(this.schemeList, this.schemeList.length, {
        type: "text",
        subject: ""
      });
      setTimeout(() => {
        let tas = this.$refs.focusTextarea;
        tas[tas.length - 1].focus();
      }, 100);
      // this.swiperOption.scrollbar.updateSize();
    },
    /* 清空备注信息 */
    empty() {
      this.schemeList = [];
    },
    inputBlur() {
      // console.log(this);
      for (let i = 0; i < this.schemeList.length; i++) {
        if (this.schemeList[i].type == "text") {
          if (!this.schemeList[i].subject) {
            this.schemeList.splice(i, 1);
            i--;
          }
        }
      }
    }
  },
  components: {
    // "swiper": Swiper,
    // "swiper-slide": SwiperSlide
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/base.less";
.amendBox {
  flex: 1;
  box-sizing: border-box;
  padding: 0 40 / @rem;
  width: 580 / @rem;
  height: 100%;
  margin-top: 36 / @rem;
  font-size: 16 / @rem;
  display: flex;
  flex-direction: column;
  .remark_box {
    height: 100%;
    display: flex;
    flex-direction: column;
    .amendBd {
      height: 50%;
      display: flex;
      flex-direction: column;
      padding-bottom: 20 / @rem;
      & > ul {
        display: flex;
        margin-bottom: 7 / @rem;
        li:nth-of-type(1) {
          display: flex;
          align-items: center;
          &::after {
            content: "";
            height: 100%;
            width: 2 / @rem;
            background-color: #1175d2;
            margin: 0 12 / @rem;
          }
        }
        .active {
          color: #1175d2;
        }
      }
      .schemeRemark {
        position: relative;
        height: 100%;
        // box-sizing: border-box;
        // padding: 10 / @rem 5 / @rem;
        border: 1 / @rem solid #1175d2;
        border-radius: 8 / @rem;
        background-color: rgb(249, 249, 249);
        display: flex;
        flex-direction: column-reverse;
        .remarks {
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 0;
          width: 99%;
          height: 84%;
          padding: 10 / @rem 10 / @rem 10 / @rem 20 / @rem;
          overflow-y: auto;
          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 14 / @rem; /*高宽分别对应横竖滚动条的尺寸*/
          }
          &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 14 / @rem;
            border: 3 / @rem solid #ddd;
            background: #fff;
          }
          &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            border-radius: 14 / @rem;
            background: #ddd;
          }
          & > div {
            img {
              max-width: 50%;
              margin: 5 / @rem 0;
            }
            @{deep}.el-textarea {
              .el-textarea__inner {
                padding: 0;
                border: none;
                width: 100%;
                font-size: 16 / @rem;
                height: 28 / @rem;
                background-color: rgb(249, 249, 249);
              }
            }
          }
        }
        .remarkBtn {
          display: flex;
          // width: 100%;
          justify-content: flex-end;
          padding-right: 20 / @rem;
          padding-bottom: 10 / @rem;
          span {
            padding: 2 / @rem;
            color: #1175d2;
            border-bottom: 1 / @rem solid #1175d2;
            margin-left: 15 / @rem;
          }
        }
      }
    }
    .record {
      height: 50%;
      padding-bottom: 20 / @rem;
      display: flex;
      flex-direction: column;

      ul {
        // width: 100%;
        height: 100%;
        background-color: #fff;
        padding-left: 40 / @rem;
        padding-right: 35 / @rem;
        margin-top: 8 / @rem;
        padding-top: 18 / @rem;
        box-sizing: border-box;
        border-radius: 8 / @rem;
        border: 1 / @rem solid #1175d2;
        overflow-y: auto;
        li {
          // position: relative;
          list-style: outside;
          margin-bottom: 14 / @rem;
          > div {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            img {
              .setwh(11, 11);
            }
          }
        }
      }
    }
  }
  .btnBox {
    display: flex;
    div {
      background-color: #1175d2;
      color: #fff;
      height: 36 / @rem;
      line-height: 36 / @rem;
      padding: 0 35 / @rem;
      border-radius: 5 / @rem;
      &:nth-of-type(2) {
        padding: 0 30 / @rem;
        margin-left: 35 / @rem;
      }
    }
  }
}
</style>
