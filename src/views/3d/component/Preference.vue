<template>
  <div class="preferenceBox" @mousedown="moveTc">
    <div class="interlayerTop">
      <span>偏好</span>
      <span class="close" @click="close">×</span>
    </div>
    <div class="colorPreference">
      <p>颜色设置</p>
      <div class="choice">
        <div class="backdropColor">
          <span class="cutColorName">背景色:</span>
          <div class="examine" @click="cutColour(0)" :class="pickActive == 0 ? 'active' : ''">
            <span :style="{ backgroundColor: pickColorList[0] }"></span>
            <img :src="pickActive != 0 ? require('../../../assets/img/jiantougray.png') : require('../../../assets/img/jiantouorg.png')" />
            <div class="colorBox" v-show="cutColourFlagList[0]">
              <ul @click.stop>
                <li v-for="(item, index) in colorList" :key="index" :style="{ backgroundColor: item }" @click.stop="changeColor(0, item)"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="accessoryColor">
          <span class="cutColorName">附件色:</span>
          <div class="examine" @click="cutColour(1)" :class="pickActive == 1 ? 'active' : ''">
            <span :style="{ backgroundColor: pickColorList[1] }"></span>
            <img :src="pickActive != 1 ? require('../../../assets/img/jiantougray.png') : require('../../../assets/img/jiantouorg.png')" />
            <div class="colorBox" v-show="cutColourFlagList[1]">
              <ul @click.stop>
                <li v-for="(item, index) in colorList" :key="index" :style="{ backgroundColor: item }" @click.stop="changeColor(1, item)"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="occlusionColor">
          <span class="cutColorName">咬合色:</span>
          <div class="examine" @click="cutColour(2)" :class="pickActive == 2 ? 'active' : ''">
            <span :style="{ backgroundColor: pickColorList[2] }"></span>
            <img :src="pickActive != 2 ? require('../../../assets/img/jiantougray.png') : require('../../../assets/img/jiantouorg.png')" />
            <div class="colorBox" v-show="cutColourFlagList[2]">
              <ul @click.stop>
                <li v-for="(item, index) in colorList" :key="index" :style="{ backgroundColor: item }" @click.stop="changeColor(2, item)"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="interface">
        <p>界面设置</p>
        <div class="pattern">
          <span>旋转模式:</span>
          <el-radio-group v-model="pattern">
            <el-radio v-model="pattern" :label="3">自由模式</el-radio>
            <el-radio v-model="pattern" :label="6">简洁</el-radio>
            <el-radio v-model="pattern" :label="9">精确</el-radio>
          </el-radio-group>
        </div>
        <div class="patientMsg pattern">
          <span>患者信息:</span>
          <el-radio-group v-model="patientMsg">
            <el-radio v-model="patientMsg" :label="3">显示</el-radio>
            <el-radio v-model="patientMsg" :label="6">不显示</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="occlusionNum">
        <el-checkbox v-model="occlusionNum">牙齿移动时包含咬合矫正数值</el-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      /* 颜色选择 */
      colorList: ["#dfe0e2", "#000", "#ffffff", "#eaf7fe", "#666158", "#251e18", "#e76f6f", "#ecdecd", "#e7976f", "#d3e76f", "#6fe7e7", "#6fabe7"],
      cutColourFlagList: [false, false, false],
      occlusionNum: false,
      pattern: null, //旋转模式选择
      patientMsg: null,

      pickActive: null,
      pickColorList: [" #dfe0e2", " #dfe0e2", " #dfe0e2"]
    };
  },
  methods: {
    close() {
      this.$emit("closeTc");
    },
    moveTc(e) {
      this.$emit("moveTc", e);
    },
    /* 点击选择颜色 开始 */
    cutColour(idx) {
      if (!this.cutColourFlagList[idx]) {
        this.cutColourFlagList.forEach((item, index) => {
          this.$set(this.cutColourFlagList, index, false);
        });
      }
      this.pickActive = idx;
      this.$set(this.cutColourFlagList, idx, !this.cutColourFlagList[idx]);
    },
    /* 点击选择颜色 结束 */
    /* 点击改变颜色 开始 */
    changeColor(idx, color) {
      console.log(color);
      console.log(this.pickActive);
      this.$set(this.pickColorList, idx, color);
      this.pickActive = null;
      this.cutColourFlagList[idx] = false;
    }
    /* 点击改变颜色 结束 */
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/base.less";
.preferenceBox {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 507 / @rem;
  height: 648 / @rem;
  margin-top: -290 / @rem;
  margin-left: -507 / 2 / @rem;
  background-color: #efefef;
  font-size: 16 / @rem;
  @{deep}.el-radio__label {
    font-size: 16 / @rem;
    padding-left: 10 / @rem;
  }
  .colorPreference {
    width: 100%;
    box-sizing: border-box;
    padding: 30 / @rem 15 / @rem 0 21 / @rem;
    font-size: 16 / @rem;
    p {
      margin-bottom: 25 / @rem;
    }
    .choice {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > div {
        width: 50%;
        color: #ababab;
        height: 40 / @rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25 / @rem;
        &:nth-of-type(odd) {
          padding-right: 20 / @rem;
        }
        &:nth-of-type(even) {
          padding-left: 20 / @rem;
        }
      }
      .cutColorName {
        display: inline-block;
        margin-right: 18 / @rem;
      }
      .examine {
        position: relative;
        border: 1px solid #666666;
        border-radius: 5 / @rem;
        display: flex;
        align-items: center;
        padding: 5 / @rem 10 / @rem 5 / @rem 7 / @rem;
        box-sizing: border-box;
        height: 42 / @rem;
        flex: 1;
        // .setwh(148,42);
        // margin-left:
        > span {
          display: block;
          flex: 1;
          height: 100%;
          margin-right: 26 / @rem;
        }
        img {
          .setwh(15, 7);
        }
      }
      .active {
        border-color: #f99400;
      }
      .colorBox {
        position: absolute;
        z-index: 1;
        left: -0.01rem;
        top: 0.41rem;
        .setwh(216, 84);
        ul {
          .setwh(216, 84);
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          align-items: center;
          padding: 16 / @rem 0 13 / @rem 15 / @rem;
          box-sizing: border-box;
          border: 1 / @rem solid #f99400;
          background-color: #fff;

          border-radius: 5 / @rem;
          li {
            margin-right: 7 / @rem;
            .setwh(23, 23);
            border: 1 / @rem solid transparent;
            &:nth-of-type(6n) {
              margin-right: 0;
            }
            &:nth-of-type(n + 7) {
              margin-top: 6 / @rem;
            }
          }
          .active {
            border-color: #f99400;
          }
        }
      }
      .accessoryColor {
        position: relative;
        .examine {
          position: static;
        }
        .colorBox {
          margin-left: 20 / @rem;
          left: 0;
        }
      }
    }
  }
  .interface {
    margin-top: 95 / @rem;
  }

  .pattern {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    > span {
      display: block;
      margin-right: 43 / @rem;
      white-space: nowrap;
    }
  }
  .patientMsg {
    margin-top: 34 / @rem;
  }
  .occlusionNum {
    font-size: 16 / @rem;
    color: #000;
    margin-top: 35 / @rem;
    @{deep}.el-checkbox__input.is-checked + .el-checkbox__label,
    @{deep}.el-checkbox {
      color: #000;
    }
    @{deep}.el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #f99400;
      border-color: #f99400;
    }
    @{deep}.el-checkbox__inner:hover,
    @{deep}.el-checkbox__inner {
      border-color: #f99400;
    }
  }
}
</style>
