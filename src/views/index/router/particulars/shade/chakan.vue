<template>
  <el-dialog :visible.sync="dialogFormVisible" :lock-scroll="false" @open="dia" @close="dia2" :append-to-body="true">
    <div class="chosce">
      <el-checkbox v-model="checked" @change="lmn">原始分辨率</el-checkbox>
    </div>
    <div class="content">
      <img v-if="imageUrl1" :class="[{'original':opq},{'imprimitive':rst}]" :src="imageUrl1" class="avatar"
        style="width: 100%" />
      <a :href="imageUrl1" @click="downloadClick.call(this,imageUrl1,imgName)" v-if="imageUrl1" :download="imageUrl1">
        <el-image :src="require('@/assets/2.2病例详情/患者照片&X光片下载.png')" class="downicon"></el-image>
      </a>
    </div>
    <el-button class="left" @click="prev">上一页</el-button>
    <div class="center">{{`${active+1}/${total}`}}</div>
    <el-button class="right" @click="next">下一页</el-button>
  </el-dialog>
</template>
<script>
    import {donwloadIE} from '@/util/validate.js'
    import {IEVersion} from '@/util/validate.js'
  export default {
    components: {},
    data() {
      return {
        total:1,
        active: 0,
        opq: true,
        rst: false,
        dialogFormVisible: false,
        radio: "1",
        checked: true,
        imgArr: [],
        imageUrl1: null,
        imgName:null,
      };
    },
    created() {},
    methods: {
      // IE下载图片
      downloadClick(url, fileName){
          const edition = IEVersion();
          if(edition =="不是IE" ||  edition=="edge") return;
          donwloadIE(url, fileName);
      },
      lmn() {
        this.opq = !this.opq;
        this.rst = !this.rst;
      },
      openDialog() {
        this.dialogFormVisible = true;
        this.init();
      },
      handleAvatarSuccess1(res, file) {
        this.imageUrl1 = URL.createObjectURL(file.raw);
      },
      // 上一页
      prev() {
        if (this.active > 0) {
          this.active--;
          this.imageUrl1 = this.imgArr[this.active];
        }
      },
      // 下一页
      next() {
        if (this.active < this.imgArr.length - 1) {
          this.active++;
          this.imageUrl1 = this.imgArr[this.active];
        }
      },
      dia() {
        // document.body.style.overflow='hidden';
        // document.getElementsByTagName('html')[0].style.overflow='hidden';
      },
      dia2() {
        // document.body.style.overflow='auto';
        // document.getElementsByTagName('html')[0].style.overflow='auto';
      },
      init() {
        var caseInfoId = this.$store.state.caseId,
          stageName = this.$store.state.stageNameId,
          stageCount = this.$store.state.stageCountId,
          that = this;
        this.$http({
            url: "/applianceReplace/getImpression",
            method: "POST",
            data: {
              caseInfoId,
              stageName,
              stageCount,
            }
          })
          .then(({
            data
          }) => {
            if ((data.code == 200)) {
              this.active = 0;
              data = JSON.parse(data.data);
              this.total = data.length;
              data.forEach((item, i) => {
                this.imgName = 'http://case.magicalign.com:8605/output' + item.path;
                that.image2Base64(this.imgName).then((res) => {
                  this.imgArr[i] = res
                  if (i == 0) {
                    this.imageUrl1 = this.imgArr[0];
                  }
                })
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 转base64函数
      image2Base64(imgDom) {
        return new Promise((res, rej) => {
          var img = new Image();
          img.setAttribute("crossOrigin", 'Anonymous');
          img.src = imgDom;
          img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            res(canvas.toDataURL("image/png"));
          }
        })
      },
    }
  };
</script>
<style lang="less" scoped>
  .left {
    position: absolute;
    left: 60px;
    bottom: 24px;
    border: none;

  }
  .center {
    position: absolute;
    right: 275px;
    bottom: 30px;
    user-select: none;
  }
  .right {
    position: absolute;
    right: 60px;
    bottom: 24px;
    border: none;
  }

  .original {
    max-width: 100%;
    max-height: 100%;
  }

  .imprimitive {
    width: 100%;
    height: 100%;
  }

  /deep/.el-dialog__headerbtn .el-dialog__close {
    color: #000;
    font-size: 18px;
  }

  /deep/.el-dialog__title {
    display: inline-block;
    padding-top: 24px;
    font-size: 16px;
    color: #1175d2;
    font-weight: 600;
    padding-bottom: 20px;
  }

  /deep/ .el-dialog {
    width: 570px;
    height: 615px;
    background: #f9f9f9;
    // margin-top: 0 !important;
    // top: 50%;
    // transform: translateY(-50%);
    overflow: hidden;
    padding-bottom: 25px;
    box-sizing: content-box;

    .chosce {
      width: 450px;
      margin: 0 auto;

      .el-checkbox__inner {
        width: 20px;
        height: 20px;
        border-color: #1175d2;
        border-radius: 5px;
      }

      .el-checkbox__inner::after {
        width: 8px;
        height: 11px;
      }

      .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #1175d2;
      }

      /deep/ .el-checkbox {
        margin-top: 0;
        font-size: 16px;
        color: #333333;
      }
    }

    .content {
      width: 450px;
      height: 480px;
      background: #d6d6d6;
      position: absolute;
      left: 50%;
      top: 85px;
      transform: translate(-50%);
      overflow: hidden;

      &:hover {
        .downicon {
          bottom: 0px
        }
      }
    }
  }

  /deep/.el-dialog__header,
  /deep/.el-dialog__body {
    padding: 0;
  }

  // 上传文件样式
  .avatar-uploader {
    background: #999;
    float: left;
    position: relative;
  }

  .downicon {
    width: 100%;
    height: 18px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: -40px;
    background: rgba(255, 255, 255, 0.5);
    padding: 10px 0;
    transition: all 0.5s;

    /deep/img {
      width: 18px;
      display: block;
      margin: 0 auto;
      height: auto;
    }
  }
</style>