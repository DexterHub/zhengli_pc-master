<template>
  <div class="stepInformation">
    <div class="substepBox">
      <!-- 牙齿编号 -->
      <div class="tooth_number">
        <template v-for="j in 2">
          <div v-for="i in 17" class="col_num">{{ i == 1 ? "" : 20 - i >= 11 ? 20 - i : i + 11 }}</div>
        </template>
      </div>
      <div class="step_table">
        <!-- 黄色指示条 -->
        <div class="step_num" :style="'transform:translateX(' + px + 'px)'">
          <div class="num_icon">
            <span>{{ $store.state.stepNum }}</span>
          </div>
          <div class="yellow"></div>
        </div>
        <!-- 步数表格 -->
        <div class="tooth_step">
          <div class="tooth_step_col" v-for="(col, idx1) of tooth_data">
            <div class="row_num" :ref="[idx1 == 1 ? 'rowel' : '']" v-for="(row, idx2) of col">{{ idx1 == 0 ? row : "" }}<img :src="row.src" v-if="row.src" /></div>
          </div>
        </div>
      </div>
    </div>
    <div class="fnOptionBox">
      <ul>
        <li>
          <img src="../../../assets/img/scfx.png" />
          主动矫治器
        </li>
        <li>
          <img src="../../../assets/img/dcfx.png" />
          被动矫治器
        </li>
        <li>
          <img src="../../../assets/img/3dqt.png" />
          片切
        </li>
        <li>
          <img src="../../../assets/img/xiajiantou.png" />
          粘结附件
        </li>
        <li>
          <img src="../../../assets/img/shangjiantou.png" />
          去除附件
        </li>
        <li>
          <img src="../../../assets/img/sq.png" />
          缺失牙齿
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tooth_data: [],
      px: 0, //设分步黄色指标偏移量
      width: 0 //获取元素宽，用来计算指标偏移量
    };
  },
  watch: {
    //监听侧边栏变化
    "$store.state.wrapper"() {
      if (this.$store.state.wrapper === 4) {
        this.$nextTick(() => {
          // setTimeout(() => {
          this.width = this.$refs.rowel[0].getBoundingClientRect().width;
          this.px = this.$store.state.stepNum * this.width;
          console.log(this.px);
          // }, 200);
        });
        // this.width = this.$refs.rowel[0].getBoundingClientRect().width;

        // this.px = this.$store.state.stepNum * this.width;
      }
    }
  },
  created() {
    for (let i = 0; i < 34; i++) {
      this.tooth_data[i] = [];
      for (let j = 0; j < 53; j++) {
        if (i == 0) {
          this.tooth_data[i][j] = j % 5 == 0 ? j : "";
        } else {
          if (j == 0 && i != 17) {
            this.tooth_data[i][j] = { src: require("../../../assets/img/sq.png") };
          } else {
            this.tooth_data[i][j] = {};
          }
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.width = this.$refs.rowel[0].getBoundingClientRect().width;
        this.px = this.$store.state.stepNum * this.width;
        // console.log(this.px);
      }, 200);
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/base.less";
.stepInformation {
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
}
.substepBox {
  position: relative;
  width: 580 / @rem;
  margin: 0 30 / @rem;
  padding-bottom: 8 / @rem;
  font-size: 16 / @rem;
  display: flex;
  .step_table {
    position: relative;
    overflow-x: auto;
    // overflow: hidden;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      height: 14 / @rem; /*高宽分别对应横竖滚动条的尺寸*/
      border-radius: 14 / @rem;
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
    .tooth_step {
      padding-top: 30 / @rem;
      margin-left: 15 / @rem;
      // transform: translateX(15 / @rem);
      .tooth_step_col {
        position: relative;
        display: flex;
        .row_num {
          flex-grow: 0;
          flex-shrink: 0;
          width: 18 / @rem;
          height: 18 / @rem;
          border-top: 4 / @rem solid #bbb;
          box-sizing: border-box;
          img {
            // width: 100%;
            height: 100%;
            transform: translate(-50%, -60%);
          }
          &:first-child {
            border-left: 1 / @rem solid #bbb;
          }
          &:nth-child(5n) {
            border-right: 1 / @rem solid #bbb;
          }
          &:last-child {
            border-right: 1 / @rem solid #bbb;
          }
        }
        &:first-child {
          margin-bottom: 10 / @rem;
          .row_num {
            text-align: center;
            border: none;
            transform: translateX(-10 / @rem);
          }
        }
        &:nth-child(n + 18) {
          .row_num {
            border-top: none;
            border-bottom: 4 / @rem solid #bbb;
          }
        }
        &:last-child {
          .row_num {
            border-color: transparent;
          }
        }
      }
    }
    .step_num {
      position: absolute;
      left: 0;
      top: 26 / @rem;
      z-index: 1;
      margin-left: 15 / @rem;
      .num_icon {
        position: relative;
        width: 30 / @rem;
        height: 36 / @rem;
        background: url("../../../assets/img/progress.png") no-repeat top/100% 100%;
        text-align: center;
        line-height: 30 / @rem;
        z-index: 1;
        transform: translateX(-50%);
        span {
          font-size: 16 / @rem;
          color: #eee;
        }
      }
      .yellow {
        transform: translateX(-50%);
        margin-top: -8 / @rem;
        width: 12 / @rem;
        height: 582 / @rem;
        background-color: rgba(255, 166, 0, 0.5);
      }
    }
  }
  .tooth_number {
    padding-top: 30 / @rem;
    // padding-right: 15 / @rem;
    div {
      width: 18 / @rem;
      height: 18 / @rem;
      box-sizing: border-box;
      border-top: 4 / @rem solid #bbb;
      border-color: transparent;
      &:first-child {
        border: none;
        margin-bottom: 4 / @rem;
      }
      &:nth-child(n + 18) {
        border-top: none;
        border-bottom: 4 / @rem solid #bbb;
        border-color: transparent;
      }
    }
  }
}
.fnOptionBox {
  box-sizing: border-box;
  padding-left: 22 / @rem;
  font-size: 16 / @rem;
  margin-top: 20 / @rem;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  li {
    width: 33.3%;
    display: flex;
    align-items: center;
    margin-bottom: 18 / @rem;
    img {
      margin-right: 15 / @rem;
    }
    &:nth-of-type(-n + 2) {
      img {
        .setwh(30, 6);
      }
    }
    &:nth-of-type(3),
    &:nth-of-type(4),
    &:nth-of-type(5) {
      img {
        .setwh(14, 16);
      }
    }
    &:nth-of-type(6) {
      img {
        .setwh(18, 16);
      }
    }
  }
}
</style>
