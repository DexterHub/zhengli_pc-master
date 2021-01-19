<template>
  <div id="particulars-info">
    <div class="top">
      <!-- 头像 -->
      <div class="avatar">
        <el-image
          @click="changeImgs"
          class="star myCursor"
          style="top: -8px;left: -20px;"
          :src="changeImg?unselected:checked"
        ></el-image>
        <el-avatar :size="145" :src="theadUrl(sonData.headUrl)"></el-avatar>
        <el-button @click="EditData" class="redact fr">
          <i class="el-icon-document"></i>
          编辑资料
        </el-button>
      </div>

      <!-- 名字 -->
      <h4>{{sonData.patientName}}</h4>
      <!-- 性别 -->
      <div class="sex clearfix">
        <div class="fl">
          <el-image :src="sonData.sex==1?man:woMan"></el-image>
        </div>
        <div class="fl">{{sonData.age}}</div>
      </div>
      <ul class="Iinfo">
        <!-- <li class="clearfix">
          <h5 class="fl">
            <span>病</span>
            <span>例</span>
            <span>号：</span>
          </h5>
          <p class="fl" style="word-wrap: break-word; word-break: normal;">{{sonData.outerNo}}</p>
        </li> -->
        <li class="clearfix">
          <h5 class="fl">
            <span>诊</span>
            <span></span>
            <span>所：</span>
          </h5>
          <p class="fl">{{sonData.hospitalName}}</p>
        </li>
        <li class="clearfix" style="padding-top: 18px;">
          <h5 class="fl">
            <span>备</span>
            <span></span>
            <span>注：</span>
          </h5>
          <p v-show="pFlag" class="fl" v-html="remarkHtml"></p>
          <el-image
            @click="changeInfo"
            class="fr myCursor"
            :src="require('@/assets/2.2病例详情/备注.png')"
            style="position: relative; z-index: 99"
            :style="{'margin-top': remarkHtml == '未填写' &&  pFlag ? '-18px' : '0'}"
          ></el-image>
          <el-input
            type="textarea"
            :rows="3"
            class="beizhuipt"
            maxlength="400"
            v-show="!pFlag"
            v-model="remarkInput"
          ></el-input>
        </li>
        <li>
          <el-button type="primary" v-show="!pFlag" @click="confirm">确认</el-button>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <ul class="Iinfo">
        <li class="clearfix">
          <h5 class="fl">
            <span>品</span>
            <span></span>
            <span>牌：</span>
          </h5>
          <p class="fl">
            <el-image v-if="sonData.caseBrand" :src="sonData.caseBrand"></el-image>
            <!-- <el-image :src="require('@/assets/3新建病例/1.png')"></el-image> -->
          </p>
        </li>
        <!-- <li class="clearfix">
          <h5 class="fl">
            <span>到</span>
            <span>期</span>
            <span>日：</span>
          </h5>
          <p class="fl">{{sonData.endDay|date}}</p>
        </li> -->
        <li class="clearfix" style="padding-top: 18px;">
          <h5 class="fl unique">
            <span>临</span>
            <span>床</span>
            <span>分</span>
            <span>类:</span>
          </h5>
          <p class="fl">{{sonData.caseType | classify}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { abab } from "@/util/validate.js";
import { dateToStr } from "@/util/validate.js";
export default {
  data() {
    return {
      remarkHtml:'',
      remarkInput:'',
      sonData: {},
      man: require("@/assets/2.2病例详情/男.png"),
      woMan: require("@/assets/2.2病例详情/女.png"),
      pFlag: true,
      changeImg: false,
      comment: "备注内容备注内容备注",
      checked: require("@/assets/2.1病例管理首页/切图_15.png"),
      unselected: require("@/assets/2.1病例管理首页/切图_17.png")
    };
  },
  filters: {
    date(test) {
      return dateToStr(new Date(test));
    },
    classify(test) {
      return abab(test, "Str");
    }
  },
  mounted() {},
  methods: {
    //头像处理函数
    theadUrl(str) {
      if (str && str.indexOf("http") >= 0) {
        return str;
      } else {
        return require("@/assets//1顶部导航/切图_03.png");
      }
    },
    init(data) {

      if(data.caseBrand=="正丽科技自主创立品牌"){
          data.caseBrand = require("@/assets/3新建病例/1.png");
      }else if(data.caseBrand=="正丽科技与士卓曼联合打造"){
        
          data.caseBrand = require("@/assets/3新建病例/2.png");
      }else{
          data.caseBrand = require("@/assets/3新建病例/weitianxie.png");
      }
      this.sonData = data;
      this.remarkHtml = data.remark;
      this.remarkInput = data.remark.replace(/<br\/>/g, '\n').replace(/&nbsp;/g, '\s');
      this.changeImg = data.follow;
    },
    // 切换备注
    changeInfo() {
      this.pFlag = false;
    },
    // 修改备注
    confirm() {
      this.remarkHtml = this.remarkInput.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
      this.pFlag = true;
      this.$http({
        url: "/caseInfo/modifyRemark",
        method: "POST",
        data: {
          caseId: this.$store.state.caseId,
          remark: this.remarkHtml,
        }
      })
        .then(({ data }) => {
          if (data.code == 200) {
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
    },
    EditData() {
      this.$store.commit("indexAdd", ["基本信息"]);
      this.$router.push("/jbxx");
    },
    changeImgs() {
      this.changeImg = !this.changeImg;
      this.follow(this.changeImg);
    },
    //关注取消病例
    follow(follow) {
      this.$http({
        url: "/caseInfo/follow",
        method: "POST",
        data: {
          caseId: this.$store.state.caseId,
          follow: follow
        }
      })
        .then(({ data }) => {
          if (data.code == 200) {
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
  }
};
</script>
<style lang="less" scoped>
// 适配

@media screen and (max-width: 1660px) {
  /deep/.el-avatar {
    width: 117.5px !important;
    height: 117.5px !important;
  }

  .star {
    width: 21.5px !important;
  }
}

@media screen and (max-width: 1360px) {
  .redact {
    width: 108.5px !important;
    height: 27.5px !important;
    padding: 0 !important;
  }
}
</style>
<style scoped lang="less">
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  //针对ie
  #particulars-info .top .sex .fl {
    line-height: 23px !important;
  }

  #particulars-info .top .Iinfo li p {
    line-height: 23px !important;
  }
}

#particulars-info {
  .top {
    padding: 0 0 50px 10px;
    border-bottom: 1px solid #dfe0e2;

    .avatar {
      position: relative;

      .el-image {
        position: absolute;
        top: auto !important;
        right: auto;
        left: 0 !important;
        bottom: 0;
      }

      .el-button {
        width: 134px;
        height: 34px;
        border: 1px solid #1175d2;
        color: #1175d2;
        font-weight: 600;
        padding: 0;
        margin-top: 20px;
      }

      /deep/.el-avatar {
        img {
          max-width: 100%;
          max-height: 100%;
          margin: 0 auto;
        }
      }
    }

    h4 {
      font-size: 16px;
      font-weight: 400;
      margin-top: 28px;
      color: #353b43;
    }

    .sex {
      .fl {
        height: 16px;
        padding: 3px 15px;
        line-height: 18px;
        border-radius: 24px;
        background: #e9e9e9;
        margin: 12px 10px 0 0;

        div {
          padding-top: 2px;
        }
      }
    }

    .Iinfo {
      li {
        padding-top: 12px;

        h5 {
          padding-right: 3%;
          width: 18%;

          span {
            display: inline-block;
            width: 33%;
            min-height: 1px;
            font-size: 14px;
            font-weight: 600;
          }
        }

        p {
          color: #565759;
          width: 79%;
          line-height: 19px;
          overflow: hidden;
        }

        .el-button {
          width: 25%;
          height: 34px;
          border: 1px solid #1175d2;
          color: #fff;
          font-weight: 600;
          padding: 0;
          font-size: 16px;
          margin-left: 20%;
          font-weight: normal;
        }

        .el-textarea {
          width: 80%;
          float: right;
          margin-top: -28px;

          /deep/.el-input__inner {
            height: 100% !important;
          }
        }
      }
    }
  }

  .right2 {
    pointer-events: none;
    filter: grayscale(0.5);
  }

  .bottom {
    margin-top: 24px;

    .Iinfo {
      li {
        padding-top: 12px;

        h5 {
          padding-right: 3%;
          width: 18%;

          span {
            display: inline-block;
            width: 33%;
            min-height: 1px;
            font-size: 14px;
            font-weight: 600;
          }
        }

        /deep/.el-image__inner {
          width: 150px !important;
        }

        .unique {
          span {
            display: inline-block;
            width: 25%;
            font-size: 14px;
            font-weight: 600;
          }
        }

        p {
          color: #565759;
          width: 79%;
          line-height: 19px;
        }
      }
    }
  }
}
</style>