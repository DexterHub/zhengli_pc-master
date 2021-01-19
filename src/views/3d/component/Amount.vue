<template>
  <div class="moveAmount" @mousedown="moveTc">
    <div class="interlayerTop">
      <span>移动量</span>
      <span class="close" @click="close">×</span>
    </div>
    <div class="moveAmountBox">
      <div class="dental">
        <div class="choiceDental">
          <span>牙弓:</span>
          <el-radio-group v-model="jaw">
            <el-radio v-model="jaw" :label="3">上颌</el-radio>
            <el-radio v-model="jaw" :label="6">下颌</el-radio>
          </el-radio-group>
        </div>
        <div class="toothDental">
          <span>牙齿基底部:</span>
          <el-radio-group v-model="toothBom">
            <el-radio v-model="toothBom" :label="3">冠</el-radio>
            <el-radio v-model="toothBom" :label="6">牙根</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="toothData">
        <ul class="codingBox">
          <li v-for="(item, index) in codingList" :key="index">{{ item }}</li>
        </ul>
        <table>
          <tr v-for="(items, index) in movementList[0]" :key="index">
            <th>{{ items.name }}</th>
            <td v-for="(item, idx) in items.numList" :key="idx">
              {{ item }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      /* 移动量数据 */
      movementList: [
        [
          {
            name: "近中（+）/远中（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1]
          },
          {
            name: "颊向（+）/舌向（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1]
          },
          {
            name: "拉伸（+）/压低（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1]
          },
          {
            name: "冠转矩 颊侧（+）/舌侧（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1]
          },
          {
            name: "冠轴倾 近中（+）/远中（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1]
          },
          {
            name: "扭转 近中（+）/远中（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1]
          }
        ],
        [
          {
            name: "近中（+）/远中（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.0]
          },
          {
            name: "颊向（+）/舌向（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.0]
          },
          {
            name: "拉伸（+）/压低（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.0]
          },
          {
            name: "冠转矩 颊侧（+）/舌侧（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.0]
          },
          {
            name: "冠轴倾 近中（+）/远中（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.0]
          },
          {
            name: "扭转 近中（+）/远中（-）mm",
            numList: [0.3, 12.1, 20.2, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.0]
          }
        ]
      ],
      /* 牙齿编码 */
      codingList: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
      jaw: null,
      toothBom: null
    };
  },
  methods: {
    close() {
      this.$emit("closeTc");
    },
    moveTc(e) {
      this.$emit("moveTc", e);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/base.less";
.moveAmount {
  position: absolute;
  left: 0;
  top: 52%;
  height: 360 / @rem;
  z-index: 2;
  background-color: #f9f9f9;
  font-size: 14 / @rem;
  .moveAmountBox {
    padding: 33 / @rem 45 / @rem 20 / @rem 30 / @rem;
    .dental {
      display: flex;
      > div > span {
        display: inline-block;
        margin-right: 24 / @rem;
      }
      @{deep}.el-radio__label {
        font-size: 14 / @rem;
      }
      .choiceDental {
        margin-right: 100 / @rem;
      }
    }
    .toothData {
      display: flex;
      flex-direction: column;
      margin-top: 40 / @rem;
      .codingBox {
        align-self: flex-end;
        display: flex;
        li {
          .setwh(56, 22);
          text-align: center;
          border-left: 1 / @rem solid transparent;
        }
      }
      table {
        border: 1 / @rem solid #999999;
        tr {
          border-bottom: 1 / @rem solid #999999;
          height: 30 / @rem;
          display: flex;
          line-height: 30 / @rem;
          &:last-of-type {
            border: none;
          }
          th,
          td {
            height: 100%;
          }
        }
        th {
          flex: 1;
          min-width: 250 / @rem;
          box-sizing: border-box;
          padding-left: 18 / @rem;
        }
        td {
          text-align: center;
          border-left: 1 / @rem solid #f99400;
          background-color: #fff;
          width: 56 / @rem;
        }
      }
    }
  }
}
</style>
