<template>
  <div class="fhjl">
    <div class="topbox">
      <div label="联系我们" name="second">
        <p class="titlebt">
          备用矫治器发货记录
          <span class="titlespan">({{state}})</span>
        </p>

        <div class="wenzitem clearfix" v-for="(item,i) in datashuzu" v-if="item.neirotext1" :key="i">
          <div class="title">{{item.title}}</div>
          <div>
            <p class="neirtext1" v-html="item.neirotext1"></p>
            <p class="neirtext2" v-html="item.neirotext2"></p>
            <el-image class="elimage" v-if='item.image' :src="url+item.image" :preview-src-list="srcList">></el-image>
          </div>
        </div>
      </div>
    </div>
    <el-row>
      <el-button @click="fanhui" style="background:#1175d2;" type="primary">返回</el-button>
    </el-row>
  </div>
</template>
<script>
  import {
    dateToStr
  } from "@/util/validate.js";
  export default {
    components: {},
    data() {
      return {
        url: 'http://case.magicalign.com:8605/output',
        srcList: [],
        datashuzu: [{
            title: "时间",
            neirotext1: "2020/07/20"
          },
          {
            title: "选择牙弓",
            neirotext1: "双颌"
          },
          {
            title: "上颌步数",
            neirotext1: "第10步———第11步"
          },
          {
            title: "下颌步数",
            neirotext1: ""
          },
          {
            title: "数量",
            neirotext1: ""
          },
          // {
          //     title: '设计说明',
          //     neirotext1: '上颌使用最近的orthoplus方案里最后一步主动非过矫正矫治步骤',
          //     neirotext2: '下颌使用最近的orthoplus方案里最后一步主动非过矫正矫治步骤',
          // },
          // {
          //     title: '特殊说明',
          //     neirotext1: '在以下牙位上放置假牙空泡',
          //     // baba:true,
          // },
          {
            title: "原因",
            neirotext1: "患者摘下时断裂",
            image: ''
          },
          {
            title: "收货地址",
            neirotext1: "上海市闵兴区申虹路958号富力中心C栋6楼 张女士 19756421876"
          }
        ],
        state: ""
      };
    },
    methods: {
      fanhui() {
        this.$router.push("./index");
        this.$store.commit("indexRemove", 3);
      }
    },
    mounted() {
      var id = this.$route.query.id,
        that = this;
      //保质矫正记录详情
      this.$http({
          url: "/applianceReplace/details",
          method: "get",
          params: {
            id: id
          }
        })
        .then(({
          data
        }) => {
          if (data.code == 200) {
            data = JSON.parse(data.data);
            data.createTime = dateToStr(new Date(data.createTime));
            console.log(data)
            switch (data.dentalArch) {
              case 1:
                data.dentalArch = "双颌";
                break;
              case 2:
                data.dentalArch = "上颌";
                break;
              case 3:
                data.dentalArch = "下颌";
                break;
              default:
                break;
            }

            switch (data.productionState) {
              case 0:
                that.state = "审批中";
                break;
              case 1:
                that.state = "已批准";
                break;
              case 2:
                that.state = "未批准";
                break;
              case 3:
                that.state = "生产中";
                break;
              case 4:
                that.state = "已完成";
                break;
                case 5:
                that.state = "订单取消";
                break;
            }
            console.log(data.count)
            that.datashuzu[0].neirotext1 = data.createTime;
            that.datashuzu[1].neirotext1 = data.dentalArch;
            if(data.upperStart && data.upperEnd){
              that.datashuzu[2].neirotext1 = data.upperStart + "-" + data.upperEnd;
            }else {
              that.datashuzu[2].neirotext1="";
            }
            if(data.lowerStart && data.lowerEnd){
              that.datashuzu[3].neirotext1 = data.lowerStart + "-" + data.lowerEnd;
            }else {
              that.datashuzu[3].neirotext1 = ''
            }
            that.datashuzu[4].neirotext1 = data.count;
            that.datashuzu[5].neirotext1 = data.remark;
            that.datashuzu[5].image = data.path;
            that.srcList[0] = that.url + data.path;
            that.datashuzu[6].neirotext1 =
              data.address + " - " + data.deliveryName + " - " + data.contactNumber;

            console.log(data);
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
<style scoped lang="less">
  .el-row {
    margin-top: 20px;
    margin-bottom: 20px;

    .el-button {
      widows: 140px;
      height: 40px;
      background: none !important;
      color: black;
    }
  }

  /deep/ .elimage{
    width: 400px;
    height: 150px;
    img{
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
  }

  .fhjl {
    width: 100%;
    height: 100%;

    .topbox {
      padding-bottom: 30px;
      padding-left: 95px;
      box-sizing: border-box;
      width: 100%;
      // height: 585px;
      background: #f9f9f9;
    }
  }

  /deep/.titlebt {
    padding-top: 50px;
    margin-bottom: 65px;
    color: #1175d2;
    font-size: 16px;
    font-weight: 600;

    span {
      padding-left: 20px;
      color: #f99400;
    }
  }

  .wenzitem>div {
    margin-bottom: 15px;
    float: left;
    color: #606266;
  }

  /deep/.neirtext1 {
    padding-bottom: 20px;
  }

  /deep/.neirtext1,
  .neirtext2 {
    color: #666666;
  }

  /deep/.title {
    width: 150px;
    color: #333333;
    font-weight: 600;
  }

  /deep/.el-button {
    padding: 0px;
    width: 140px;
    height: 36px;
  }
</style>