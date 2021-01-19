<template>
  <div class="baozhijiaozhiq">
    <div class="head">
      <p>备用矫治器申请记录</p>
      <el-button @click.native="changeURl" :class="{'right8':!this.$store.state.rightCode.includes(8)}">
        <i class="el-icon-edit"></i>
        备用矫治器申请
      </el-button>
    </div>
    <el-table :data="tableData" stripe @row-click="rowdata" style="width: 100%">
      <el-table-column prop="createTime" label="时间" min-width="15%"></el-table-column>
      <el-table-column prop="dentalArch" label="牙弓" min-width="10%"></el-table-column>
      <el-table-column prop="count" label="数量" min-width="10%"></el-table-column>
      <el-table-column label="状态" min-width="15%">
        <template slot-scope="scope">
          <el-row>
            <el-col class="imgusiti" :span="3">
              <el-image class="iCon" :src="tableData[scope.$index].imageUrl"></el-image>
            </el-col>
            <el-col :span="12">
              <p>{{tableData[scope.$index].zhuant}}</p>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="收货地址" min-width="30%"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    dateToStr
  } from "@/util/validate.js";
  export default {
    data() {
      return {
        tableData: [],
        kkk: 34534,
        rr: "范文芳"
      };
    },
    methods: {
      rowdata(row, column, event) {
        this.$router.push({
          path: './record',
          query: {
            id: row.id
          }
        });
        this.$store.commit("indexAdd", ["发货记录", "/baozhijiaozhiq/record"]);
        const {
          date,
          name,
          address,
          zhuant,
          dizhi,
          imageUrl
        } = row;
      },
      changeURl() {
        this.$router.push("./newbaozhijiaozhiq");
        this.$store.commit("indexAdd", [
          "新建",
          "/baozhijiaozhiq/newbaozhijiaozhiq"
        ]);
      }
    },
    created() {
      // console.log(1)

      var caseInfoId = this.$store.state.caseId,
        stageName = this.$store.state.stageNameId,
        stageCount = this.$store.state.stageCountId,
        that = this;

      this.$http({
          url: "/applianceReplace/protectiveApplianceRecord",
          method: "POST",
          data: {
            caseInfoId,
            stageName,
            stageCount
          }
        })
        .then(({
          data
        }) => {
          if (data.code == 200) {
            data = JSON.parse(data.data);
            data.forEach(el => {
              el.createTime = dateToStr(new Date(el.createTime));
              if (el.address.indexOf('n') !== -1) {
                el.address = '';
              } else {
                el.address += ' - ' + el.deliveryName + ' - ' + el.contactNumber
              }
              switch (el.dentalArch) {
                case 1:
                  el.dentalArch = "双颌";
                  break;
                case 2:
                  el.dentalArch = "上颌";
                  break;
                case 3:
                  el.dentalArch = "下颌";
                  break;
                default:
                  break;
              }

              switch (el.productionState) {
                case 0:
                  el.zhuant = "审批中";
                  el.imageUrl = require("@/assets/2.2病例详情/补充选项-保持器_06.png");
                  break;
                case 1:
                  el.zhuant = "已批准";
                  el.imageUrl = require("@/assets/2.2病例详情/补充选项-保持器_11.png");
                  break;
                case 2:
                  el.zhuant = "未批准";
                  el.imageUrl = require("@/assets/2.2病例详情/补充选项-保持器_15.png");
                  break;
                case 3:
                  el.zhuant = "生产中";
                  el.imageUrl = require("@/assets/2.2病例详情/补充选项-保持器_19.png");
                  break;
                case 4:
                  el.zhuant = "已完成";
                  el.imageUrl = require("@/assets/2.2病例详情/补充选项-保持器_23.png");
                  break;
                case 5:
                  el.zhuant = "订单取消";
                  el.imageUrl = require("@/assets/2.2病例详情/订单取消.png");
                  break;
              }
            });
            console.log(data);
            that.tableData = data;
          } else {
            this.$message({
              message: data.msg,
              type: "error",
              duration: 1500,
              onClose: () => {
                this.visible = false;
                this.$emit("refreshDataList");
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
</script>

<style lang="less" scoped>
  /deep/.iCon {
    img {
      width: 22px;
      height: 22px;
    }
  }

  .right8 {
    pointer-events: none;
    opacity: 0.5;
  }

  /deep/.imgusiti {
    position: absolute;
    left: -30px;
    top: 8px;
  }

  /deep/.cell {
    position: relative;

    .el-row {
      margin-left: 30px;

      p {
        margin-left: 10px;
      }
    }
  }

  .baozhijiaozhiq {
    .head {
      position: relative;
      font-size: 16px;
      height: 100px;
      background: #fff;
      display: flex;
      align-items: center;

      p {
        color: #1175d2;
        font-weight: bold;
        margin-left: 94px;
      }

      .el-button {
        width: 200px;
        height: 50px;
        background-color: #1175d2;
        font-size: 16px;
        color: #fff;
        position: absolute;
        right: 50px;
        top: 25px;
      }
    }

    /deep/ .el-table th {
      background-color: #e8e8e8;
    }

    /deep/ .el-table th>.cell {
      padding-left: 94px;
      font-size: 16px;
      color: #000;
    }

    /deep/ .el-table .cell {
      line-height: 40px;
      padding-left: 94px;
      font-size: 16px;
      color: #666;
    }

    /deep/ .el-table__row {
      background-color: #f9f9f9 !important;
      cursor: pointer;
    }

    /deep/ .el-table__row--striped td {
      background-color: #edeeee !important;
      cursor: pointer;
    }

    // /deep/ .el-table__row:hover>td {
    //     background: #fff !important;
    // }
    /deep/ .el-table--enable-row-hover .el-table__body tr:hover {
      background-color: rgba(0, 0, 0, 0) !important;
    }
  }

  /deep/.el-table tr div {
    white-space: nowrap;
  }
</style>
<style lang="less" scoped>
  @media screen and (max-width: 1660px) {
    .baozhijiaozhiq /deep/.el-table /deep/.cell {
      padding-left: 50px !important;
    }
  }

  .baozhijiaozhiq .head p {
    margin-left: 50px;
  }

  // }
</style>