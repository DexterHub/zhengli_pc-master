<template>
  <div class="boltonAnalyse" @mousedown="moveTc">
    <div class="interlayerTop">
      <span>Bolton分析</span>
      <span class="close" @click="close">×</span>
    </div>
    <div class="exceedNumerical">
      <div class="exceed">
        <p>超过</p>
        <ul>
          <li v-for="(item, index) in exceedList" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div class="numerical">
        <p>值</p>
        <ul>
          <li v-for="(item, index) in numericalList" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="maxillary">
      <div class="maxillaryRight">
        <h3>上颌右侧</h3>
        <ul>
          <li>
            <p>牙位识别码</p>
            <p>宽度</p>
          </li>
          <li v-for="(item, index) in maxillaryRightList" :key="index">
            <span>{{ item.recognition }}</span>
            <span>{{ item.breadth }}</span>
          </li>
        </ul>
      </div>
      <div class="maxillaryLeft">
        <h3>上颌左侧</h3>
        <ul>
          <li>
            <p>牙位识别码</p>
            <p>宽度</p>
          </li>
          <li v-for="(item, index) in maxillaryLeftList" :key="index">
            <span>{{ item.recognition }}</span>
            <span>{{ item.breadth }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="mandible maxillary">
      <div class="maxillaryRight">
        <h3>下颌右侧</h3>
        <ul>
          <li>
            <p>牙位识别码</p>
            <p>宽度</p>
          </li>
          <li v-for="(item, index) in mandibleRightList" :key="index">
            <span>{{ item.recognition }}</span>
            <span>{{ item.breadth }}</span>
          </li>
        </ul>
      </div>
      <div class="maxillaryLeft">
        <h3>下颌左侧</h3>
        <ul>
          <li>
            <p>牙位识别码</p>
            <p>宽度</p>
          </li>
          <li v-for="(item, index) in mandibleLeftList" :key="index">
            <span>{{ item.recognition }}</span>
            <span>{{ item.breadth }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// import "../../../assets/css/base.less";
export default {
  data: () => {
    return {
      /* bolton分析数据 开始 */
      exceedList: ["下颌多于3-3", "下颌多于6-6"],
      numericalList: ["0.34毫米", "0.72毫米"],
      /* 上颌数据 开始 */
      maxillaryRightList: [
        {
          recognition: 8,
          breadth: "7.65毫米"
        },
        {
          recognition: 7,
          breadth: "6.15毫米"
        },
        {
          recognition: 6,
          breadth: "9.23毫米"
        },
        {
          recognition: 5,
          breadth: "8.36毫米"
        },
        {
          recognition: 4,
          breadth: "9.14毫米"
        },
        {
          recognition: 3,
          breadth: "6.28毫米"
        }
      ],
      maxillaryLeftList: [
        {
          recognition: 9,
          breadth: "2.65毫米"
        },
        {
          recognition: 10,
          breadth: "6.34毫米"
        },
        {
          recognition: 11,
          breadth: "8.35毫米"
        },
        {
          recognition: 12,
          breadth: "8.74毫米"
        },
        {
          recognition: 13,
          breadth: "9.34毫米"
        },
        {
          recognition: 14,
          breadth: "7.75毫米"
        }
      ],
      /* 上颌数据 结束 */
      /* 下颌数据 开始 */
      mandibleRightList: [
        {
          recognition: 8,
          breadth: "7.65毫米"
        },
        {
          recognition: 7,
          breadth: "6.15毫米"
        },
        {
          recognition: 6,
          breadth: "9.23毫米"
        },
        {
          recognition: 5,
          breadth: "8.36毫米"
        },
        {
          recognition: 4,
          breadth: "9.14毫米"
        },
        {
          recognition: 3,
          breadth: "6.28毫米"
        }
      ],
      mandibleLeftList: [
        {
          recognition: 9,
          breadth: "2.65毫米"
        },
        {
          recognition: 10,
          breadth: "6.34毫米"
        },
        {
          recognition: 11,
          breadth: "8.35毫米"
        },
        {
          recognition: 12,
          breadth: "8.74毫米"
        },
        {
          recognition: 13,
          breadth: "9.34毫米"
        },
        {
          recognition: 14,
          breadth: "7.75毫米"
        }
      ]
      /* 下颌数据 结束 */
      /* bolton分析数据 结束 */
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
.boltonAnalyse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 507 / @rem;
  height: 648 / @rem;
  margin-top: -290 / @rem;
  margin-left: -507 / 2 / @rem;
  background-color: #efefef;
  font-size: 16 / @rem;
  overflow-y: auto;
  > div {
    display: flex;
    font-size: 16 / @rem;
    padding-left: 22 / @rem;
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1 / @rem solid #e0e0e0;
    > div {
      width: 50%;
      p {
        color: #1175d2;
      }
    }
  }
  .exceedNumerical {
    padding-top: 34 / @rem;
    padding-bottom: 16 / @rem;
    p {
      margin-bottom: 10 / @rem;
    }
    li {
      margin-bottom: 8 / @rem;
    }
  }
  .maxillary {
    padding-top: 20 / @rem;
    padding-bottom: 5 / @rem;
    h3 {
      font-size: 16 / @rem;
      font-weight: 400;
    }
    li {
      display: flex;
      span {
        width: 50%;
      }
      margin-bottom: 8 / @rem;
    }
    p {
      margin: 9 / @rem 0 0;
      width: 50%;
    }
  }
  .mandible {
    border: none;
  }
}
</style>
