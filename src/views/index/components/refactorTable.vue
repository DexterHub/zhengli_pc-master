<template>
  <div class="main" style="position: relative">
    <!-- 表单 -->
    <el-table
      :row-class-name="tableRowClassName"
      @row-click="particulars"
      ref="table"
      :data="tableData1"
      align="left"
      header-align="left"
      style="width: 100%"
    >
      <!-- 患者 -->
      <el-table-column
        v-for="(item,i) in tableData"
        :key="i"
        line-height="90px;"
        :width="widthList[i]"
        align="left"
        class-name="huanzhe"
        :prop="item"
        :label="item"
        :fixed="item=='患者'?'left':false"
      >
        <template slot-scope="scope">
          <div v-if="item=='患者'">
            <el-image
              v-show="scope.row[item].avatar"
              @click.stop="changImg.call(this,scope.$index)"
              class="star myCursor"
              style="top: 35px;left: 38px;position: absolute;"
              :src="scope.row['患者'].mask?unselected:checked"
            ></el-image>
            <el-avatar ref="avatar11" class="fl" :src="scope.row[item].avatar"></el-avatar>
            <div class="fl first" style="text-align: left;">
              <p style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;width: 90px;">{{scope.row[item].name}}</p>
              <!-- <p>{{scope.row[item].remark}}</p> -->
            </div>
          </div>
          <div v-else-if="item=='病例状态'">
            <el-row>
              <el-col :span="3">
                <el-image
                  class="iCon"
                  :class="scope.row[item].font?'':'dn'"
                  :src="scope.row[item].type"
                ></el-image>
              </el-col>
              <el-col :span="12">
                <p>{{scope.row[item].font}}</p>
              </el-col>
            </el-row>
          </div>
          <div v-else-if="item=='品牌'">
            <el-image v-show="scope.row[item]" :src="scope.row[item]"></el-image>
          </div>
          <div v-else>
            <span>{{scope.row[item]}}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 筛选按钮 -->
      <el-table-column label class="blzt" width="100" fixed="right">
        <template slot="header">
          <el-button style="position:relative" slot="reference" @click="signFn">
            <div class="blurshade myCursor" type="text"></div>
            <el-image :src="require('@/assets/2.1病例管理首页/切图_55.png')"></el-image>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="list" v-show="sign" @click="signFn">
      <h1>自定义列表显示项</h1>

      <el-checkbox-group v-model="checkList" @change="dynamicTable1">
        <el-checkbox label="头像"></el-checkbox>
        <el-checkbox label="创建日期"></el-checkbox>
        <el-checkbox label="病例状态"></el-checkbox>
        <el-checkbox label="备注"></el-checkbox>
        <el-checkbox label="品牌"></el-checkbox>
        <el-checkbox label="临床分类"></el-checkbox>
        <el-checkbox label="诊所/医院"></el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  props: ["tableData2"],
  data() {
    return {
      caseData: [], //请求到的数据
      widthList: [280, 154, 250, 210, 210, 220, 170],
      order: [
        "头像",
        "创建日期",
        "病例状态",
        "备注",
        "品牌",
        "临床分类",
        "诊所/医院"
      ],
      tableData: ["患者", "创建日期", "病例状态", "备注"],
      checked: require("@/assets/2.1病例管理首页/切图_15.png"),
      unselected: require("@/assets/2.1病例管理首页/切图_17.png"),
      avatar: true,
      tableData1: [],
      sign: false,
      checkList: ["头像", "创建日期", "病例状态", "备注"],
      checked: require("@/assets/2.1病例管理首页/切图_15.png"), //选中状态
      unselected: require("@/assets/2.1病例管理首页/切图_17.png") //未选中状态
    };
  },
  mounted() {
    this.init();
    let _T = document.getElementsByClassName("el-table__header-wrapper")[0];
    _T.addEventListener("scroll", this.handleScroll, true); //监听滚动事件

    var that = this;
    document.addEventListener("click", function(e) {
      that.sign = false;
    });
  },
  methods: {
    // 初次 获取父组件的值
    init() {
      this.tableData1 = this.tableData2;
    },
    // 监听滚动
    handleScroll() {
      let _T = document.getElementsByClassName("el-table__header-wrapper")[0];
      let _B = document.getElementsByClassName("el-table__body-wrapper")[0];
      let _w = _B.childNodes[0].offsetWidth - _B.offsetWidth;
      const left = _T.pageXOffset || _T.scrollLeft;
      if (left == 0) {
        _B.classList.add("is-scrolling-left");
        _B.classList.remove("is-scrolling-middle");
      } else if (left == _w) {
        _B.classList.remove("is-scrolling-middle");
        _B.classList.add("is-scrolling-right");
      } else {
        _B.classList.remove("is-scrolling-right");
        _B.classList.remove("is-scrolling-left");
        _B.classList.add("is-scrolling-middle");
      }
      _B.scrollLeft = left;
      _B.pageXOffset = left;
    },
    // 按星星换图片
    changImg(num) {
      this.tableData1[num]["患者"].mask = !this.tableData1[num]["患者"].mask;
      this.$emit(
        "follow",
        this.tableData1[num].caseId,
        this.tableData1[num]["患者"].mask
      );
    },
    // 跳转
    particulars(data) {
      if (!data.caseId) return;
      this.$store.commit("changeCaseId", data.caseId);
      this.$store.commit("indexAdd", ["病例详情", "/particulars"]);
      this.$router.push("/particulars");
    },
    // 隔行换色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    signFn() {
      event.stopPropagation();
      this.sign = true;
    },
    signFn1() {
      // this.sign = false;
    },
    // 点击右边的表格
    dynamicTable1(data) {
      this.tableData = ["患者"];
      this.avatar = data.some(item => {
        return item == "头像";
      });
      this.$refs.avatar11.forEach(item => {
        if (this.avatar) {
          item.$el.classList.remove("dn");
        } else {
          item.$el.classList.add("dn");
        }
      });

      this.order.forEach(item => {
        data.forEach(data => {
          if (item == data && data != "头像") {
            this.tableData.push(data);
          }
        });
      });
      // let screenWidth = document.getElementsByClassName("main")[0].scrollWidth - 100;
      // let dom = document.getElementsByClassName("el-table__fixed-body-wrapper")

      // let len = this.tableData.length;
      // if( len < 5){
      //     dom.forEach(item=>{
      //         item.classList.add('marginTop1');
      //         item.classList.remove('marginTop');
      //     })
      // }else if(len >=5){
      //     dom.forEach(item=>{
      //         item.classList.add('marginTop');
      //         item.classList.remove('marginTop1');
      //     })
      // }

      // if (len >= 4) {
      //     this.width = screenWidth / 5;
      // } else if (len == 3) {
      //     this.width = screenWidth / 3;
      // } else if (len == 2) {
      //     this.width = screenWidth / 2;
      // } else {
      //     this.width = screenWidth;
      // }
    }
  },
  computed: {
    routerChange() {
      return this.$route.fullPath;
    }
  },
  watch: {
    tableData2(val) {
      this.tableData1 = val;
    },
    routerChange(newVal) {
      if (this.$route.fullPath != "/index") {
        this.sign = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
// 解决错位
/deep/.marginTop {
  top: 97px !important;
}

/deep/.marginTop1 {
  top: 80px !important;
}

/deep/ .el-table th.gutter {
  display: block !important;
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  /deep/ .el-table th.gutter {
    display: none !important;
  }
}

/deep/.el-table--scrollable-x .el-table__body-wrapper {
  // overflow-x: hidden;
}

/deep/.el-table__header-wrapper {
  overflow-x: auto;
}

.el-avatar {
  background: transparent;
}

/deep/.el-table tr {
  background-color: #f9f9f9;
}

/deep/ .el-table thead {
  font-size: 18px;
  color: #333;
}

/deep/th {
  height: 80px !important;
}

/deep/td {
  height: 92px !important;
}

/deep/.el-table td {
  padding: 0;

  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 20px;
    width: 120px;
    display: inline-block;
  }
}

/deep/.el-table {
  th {
    padding: 0;

    .cell {
      position: relative;
    }

    &:nth-child(1) {
      .cell {
        padding-left: 100px;
      }
    }
  }

  td {
    &:nth-child(1) {
      .cell {
        padding-left: 70px;
      }
    }
  }
}

.iCon {
  /deep/ img {
    width: 22px;
    height: 22px;
  }
}

/deep/.list {
  width: 180px;
  position: absolute;
  z-index: 7;
  right: 24px;
  top: 77px;
  padding: 28px 0 0 22px;
  background: #fff;
  border: 1px solid #2883d6;
  border-radius: 5px;
  color: #333333;
  box-sizing: border-box;

  h1 {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 34px;
  }

  .el-checkbox {
    margin-bottom: 30px;
    color: #333333;
  }

  .el-checkbox__label {
    font-size: 16px;
  }

  .el-checkbox__input {
    margin-right: 18px;
  }

  .el-checkbox__inner {
    width: 22px;
    height: 22px;
    border-radius: 4px;
  }

  .el-checkbox__inner::after {
    height: 10px;
    left: 8px;
    position: absolute;
    top: 3px;
  }
}

.blurshade {
  position: absolute;
  opacity: 0;
  width: 26px;
  height: 26px;
  box-sizing: border-box;
  z-index: 9;
}

.mark {
  width: 24px !important;
  height: 22px !important;
  position: absolute;
  display: inline-block;
  overflow: hidden;
  top: 32px;
  left: 32px;
}

.el-button {
  border: none;
  // padding: 0 !important;
  border-color: transparent;
  background-color: transparent;
  border: none;

  &:active {
    border-color: transparent;
    background-color: transparent;
  }

  &focus {
    border-color: transparent;
    background-color: transparent;
  }
}

.first {
  height: 66px;
  p {
    margin-left: 22px;
    line-height: 66px;
  }
}

/deep/.el-table__fixed-right {
  box-shadow: none;
}

/deep/.el-table__fixed {
  box-shadow: none;

  .el-avatar {
    width: 66px;
    height: 66px;
    overflow: visible;
    margin-left: 22px;
    float: left;

    img {
      width: 100%;
    }
  }
}
</style>

// // white-space: nowrap;
// text-overflow: ellipsis;
// overflow: hidden;
<style lang="less" scoped>
// 适配
@media screen and (min-width: 1660px) {
  .el-icon-search {
    // left: 86px !important;
  }
}

@media screen and (max-width: 1660px) {
  .el-icon-search {
    left: 109px !important;
  }

  .el-search {
    padding-left: 35px !important;
  }
}

@media screen and (max-width: 1360px) {
  .line {
    display: block !important;
  }

  .time {
    padding-left: 6px !important;
  }

  /deep/.el-menu-item {
    width: 130px !important;
  }

  .el-icon-search {
    left: 100px !important;
  }

  .el-search {
    padding-left: 27px !important;
  }

  /deep/ .el-table__body-wrapper {
    /deep/.el-avatar {
      margin-left: 34px;
    }
  }

  .mark {
    // left: -200px;
  }
}

@media screen and (max-width: 1200px) {
  /deep/.el-menu-item {
    width: 130px !important;
  }

  .el-icon-search {
    left: 78px !important;
  }

  .el-search {
    padding-left: 30px !important;
  }

  /deep/.el-table {
    td {
      &:nth-child(1) {
        .cell {
          // padding-left: 25px;
        }
      }
    }
  }

  .mark {
    left: 15px;
  }
}
</style>