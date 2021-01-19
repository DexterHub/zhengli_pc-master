<template>
  <div class="baozhijiaozhiq">
    <div class="head">
      <p>保持器申请记录</p>
      <el-button @click.native="changeURl" :class="{'right9':!this.$store.state.rightCode.includes(9)}">
        <i class="el-icon-edit"></i>
        保持器申请
      </el-button>
    </div>
    <el-table :data="tableData" stripe @row-click="rowdata" style="width: 100%">
      <el-table-column prop="time" label="时间" min-width="15%"></el-table-column>
      <el-table-column prop="dentalArch" label="牙弓" min-width="10%"></el-table-column>
      <el-table-column prop="type" label="类型" min-width="10%"></el-table-column>
      <el-table-column label="状态" min-width="15%">
        <template slot-scope="scope">
          <el-row>
            <el-col class="imgusiti" :span="3">
              <el-image class="iCon" :src="tableData[scope.$index].imageUrl"></el-image>
            </el-col>
            <el-col :span="12">
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
  import {
    dateToStr
  } from '@/util/validate.js'
  export default {
    data() {
      return {
        tableData: [],
      };
    },
    methods: {
      rowdata(row, column, event) {
        this.$router.push({
          name: '保持器发货记录',
          params: {
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
        // this.$router.replace({
        //     name: '账户信息',
        //     params: {
        //         address,
        //         name,
        //         date,
        //         zhuant,
        //         dizhi,
        //     }
        // });
        // console.log(date)
      },
      changeURl() {
        this.$router.push("./newbcq");
        this.$store.commit("indexAdd", ["新建", "/fahuobcq/newbcq"]);
      }
    },
    created() {
      var caseInfoId = this.$store.state.caseId,
        stageName = this.$store.state.stageNameId,
        stageCount = this.$store.state.stageCountId;

      this.$http({
          url: "/zhengLiRetainer/zhengLiRetainerRecord",
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
          // console.log(data);
          if (data.code == 200) {
            this.tableData = JSON.parse(data.data);
            console.log(this.tableData)
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].time = dateToStr(new Date(this.tableData[i].time));
              // 根据牙颌类型
              switch (this.tableData[i].dentalArch) {
                case 1:
                  this.tableData[i].dentalArch = '双颌';
                  break;
                case 2:
                  this.tableData[i].dentalArch = '上颌';
                  break;
                case 3:
                  this.tableData[i].dentalArch = '下颌';
                  break;
                default:
                  this.tableData[i].dentalArch = '';
                  this.tableData[i].lower = '';
                  break;
              };
              if (this.tableData[i].address.indexOf('n') !== -1) {
                this.tableData[i].address = '';
              } else {
                this.tableData[i].address += ' - ' + this.tableData[i].deliveryName + ' - ' + this.tableData[i].contactNumber
              }
              // 根据牙弓类型
              switch (this.tableData[i].type) {
                case 1:
                  this.tableData[i].type = '术前'
                  break;
                case 2:
                  this.tableData[i].type = '术中'
                  break;
                case 3:
                  this.tableData[i].type = '术后'
                  break
                default:
                  return ''

              };
              // 根据状态
              switch (this.tableData[i].state) {
                case 0:
                  this.tableData[i].state = '审批中'
                  this.tableData[i].imageUrl = require('@/assets/2.2病例详情/补充选项-保持器_06.png');
                  break;
                case 1:
                  this.tableData[i].state = '已批准'
                  this.tableData[i].imageUrl = require('@/assets/2.2病例详情/补充选项-保持器_11.png');
                  break;
                case 2:
                  this.tableData[i].state = '未批准';
                  this.tableData[i].imageUrl = require('@/assets/2.2病例详情/补充选项-保持器_15.png');
                  break;
                case 3:
                  this.tableData[i].state = '生产中'
                  this.tableData[i].imageUrl = require('@/assets/2.2病例详情/补充选项-保持器_19.png');
                  break
                case 4:
                  this.tableData[i].state = '已完成'
                  this.tableData[i].imageUrl = require('@/assets/2.2病例详情/补充选项-保持器_23.png');
                  break;
                case 5:
                  this.tableData[i].state = "订单取消";
                  this.tableData[i].imageUrl = require("@/assets/2.2病例详情/订单取消.png");
                  break;
                default:
                  return ''

              };
            }
            // console.log(data)
          } else {
            this.$message({
              message: data.msg,
              type: "success",
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

  .right9 {
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