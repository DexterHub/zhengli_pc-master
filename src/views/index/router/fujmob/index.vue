<template>
  <div class="baozhijiaozhiq">
    <div class="head">
      <p>附件模板器申请记录</p>
      <el-button
        @click.native="changeURl"
        :class="{'right7':!this.$store.state.rightCode.includes(7)}"
      >
        <i class="el-icon-edit"></i>
        附件模板器申请
      </el-button>
    </div>
    <el-table :data="tableData" stripe @row-click="rowdata" style="width: 100%">
      <el-table-column prop="time" label="时间" min-width="15%"></el-table-column>
      <el-table-column prop="dentalArch" label="牙弓" min-width="10%"></el-table-column>
      <el-table-column prop="lower" label="数量" min-width="10%"></el-table-column>
      <el-table-column label="状态" min-width="15%">
        <template slot-scope="scope">
          <el-row>
            <el-col class="imgusiti" :span="3">
              <el-image class="iCon" :src="tableData[scope.$index].imageUrl"></el-image>
            </el-col>
            <el-col :span="9">
              <p>{{tableData[scope.$index].state}}</p>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="收货地址" min-width="30%"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { dateToStr } from "@/util/validate.js";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  filters: {
    yagongfilter: function (value) {
      console.log(value);
      if (value === "1") {
        return "双颌";
      } else if (value === "2") {
        return "上颌";
      } else if (value === "3") {
        return "下颌";
      } else {
        return "123";
      }
    },
  },
  created() {
    // console.log(this.$store.state.caseId);
    // console.log(this.$store.state.stageNameId)
    // console.log(this.$store.state.stageCountId)
    this.accessoryList();
  },
  methods: {
    rowdata(row, column, event) {
      this.$router.push({
        name: "附件模板发货记录",
        params: {
          id: row.id,
        },
      });
      this.$store.commit("indexAdd", ["发货记录", "/baozhijiaozhiq/record"]);
    },
    changeURl() {
      this.$router.push("./newfujmob");
      this.$store.commit("indexAdd", ["新建", "/fujmob/newfujmob"]);
    },
    // 附件模板列表数据
    accessoryList() {
      this.$http({
        url: "/attachmentTemplate/attachmentTemplateRecord",
        method: "post",
        data: {
          caseInfoId: this.$store.state.caseId,
          stageName: this.$store.state.stageNameId,
          stageCount: this.$store.state.stageCountId,
        },
      })
        .then(({ data }) => {
          // console.log(data)
          if (data.code == 200) {
            console.log(JSON.parse(data.data));
            this.tableData = JSON.parse(data.data);
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].time = dateToStr(
                new Date(this.tableData[i].time)
              );
              // 根据牙颌类型
              switch (this.tableData[i].dentalArch) {
                case 1:
                  this.tableData[i].dentalArch = "双颌";
                  this.tableData[i].lower =
                    this.tableData[i].lower + this.tableData[i].upper;
                  break;
                case 2:
                  this.tableData[i].dentalArch = "上颌";
                  this.tableData[i].lower = this.tableData[i].upper;
                  break;
                case 3:
                  this.tableData[i].dentalArch = "下颌";
                  break;
                default:
                  this.tableData[i].dentalArch = "";
                  this.tableData[i].lower = "";
                  break;
              }
              // 根据状态
              switch (this.tableData[i].state) {
                case 0:
                  this.tableData[i].state = "审批中";
                  this.tableData[
                    i
                  ].imageUrl = require("@/assets/2.2病例详情/补充选项-保持器_06.png");
                  break;
                case 1:
                  this.tableData[i].state = "已批准";
                  this.tableData[
                    i
                  ].imageUrl = require("@/assets/2.2病例详情/补充选项-保持器_11.png");
                  break;
                case 2:
                  this.tableData[i].state = "未批准";
                  this.tableData[
                    i
                  ].imageUrl = require("@/assets/2.2病例详情/补充选项-保持器_15.png");
                  break;
                case 3:
                  this.tableData[i].state = "生产中";
                  this.tableData[
                    i
                  ].imageUrl = require("@/assets/2.2病例详情/补充选项-保持器_19.png");
                  break;
                case 4:
                  this.tableData[i].state = "已完成";
                  this.tableData[
                    i
                  ].imageUrl = require("@/assets/2.2病例详情/补充选项-保持器_23.png");
                  break;
                case 5:
                  this.tableData[i].state = "订单取消";
                  this.tableData[
                    i
                  ].imageUrl = require("@/assets/2.2病例详情/订单取消.png");
                  break;
                default:
                  return "";
              }
              // console.log(this.tableData[i].address)
              if (this.tableData[i].address.indexOf("n") !== -1) {
                this.tableData[i].address = "";
              } else {
                this.tableData[i].address +=
                  " - " +
                  this.tableData[i].deliveryName +
                  " - " +
                  this.tableData[i].contactNumber;
              }
            }
            // console.log(this.tableData)
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.iCon {
  img {
    width: 22px;
    height: 22px;
  }
}

.right7 {
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

  /deep/ .el-table th > .cell {
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