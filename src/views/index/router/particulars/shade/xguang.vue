<template>
    <el-dialog :visible.sync="dialogFormVisible" :lock-scroll="false" :append-to-body="true" @open="dia" @close="dia2">
        <div class="chosce">
            <el-checkbox v-model="checked" @change="lmn">原始分辨率</el-checkbox>
        </div>
        <div class="content">
            <!-- 正面 -->
            <div style="width:450px;height:230px;" class="avatar-uploader ">
                <el-upload ref="input1" style="width:450px;height:230px;" 
                    action=""
                    :show-file-list="false" 
                    :file-list="fileList"
                    :on-change="addFile1"
                    :auto-upload="false"
                    :data="{}" 
                    :headers="{}" 
                    :class="{'biao':!zxcv}">
                    <i slot="default" class="el-icon-plus" v-show="!imageUrl1"></i>
                    <p class="descri" v-show="!imageUrl1">全景图</p>
                </el-upload>
                 <el-image style="position:absolute;top:0" v-if="imageUrl1" :src="imageUrl1"
                    :class="[{'original':opq},{'imprimitive':rst}]" :preview-src-list="srcList" @click.stop>
                    <div solt="placeholder">
                        <p style="color:#000">加载中 </p>
                    </div>
                </el-image>
                <div class="bottom" v-show="imageUrl1">
                    <img style="position:absolute;left: 10px;top:10px" :src="anew" :class="{'right2':!zxcv,'myCursor':true}" @click="reuse.call(this,'input1')">
                    <a :href="downImg1" @click="downloadClick.call(this,downImg1,imageUrl1)" :download="downImg1" style="position:absolute;right: 10px;top:10px">
                        <img style="pointer-events: none;" :src="downLoding">
                    </a>
                </div>
            </div>

            <!-- 左下 -->
            <div class="avatar-uploader ">
                <el-upload ref="input2" style="width:215px;height:215px;" 
                     action=""
                    :show-file-list="false" 
                    :file-list="fileList"
                    :on-change="addFile2"
                    :auto-upload="false"
                    :data="{}" 
                    :headers="{}" 
                    :class="{'biao':!zxcv}">
                    <i slot="default" class="el-icon-plus" v-show="!imageUrl2"></i>
                    <p class="descri" v-show="!imageUrl2">头颅正位图</p>
                </el-upload>
                <el-image style="position:absolute;top:0" v-if="imageUrl2" :src="imageUrl2"
                    :class="[{'original':opq},{'imprimitive':rst}]" :preview-src-list="srcList" @click.stop>
                    <div solt="placeholder">
                        <p style="color:#000">加载中 </p>
                    </div>
                </el-image>
                <div class="bottom" v-show="imageUrl2">
                    <img style="position:absolute;left: 10px;top:10px" :src="anew"  :class="{'right2':!zxcv,'myCursor':true}" @click="reuse.call(this,'input2')">
                    <a :href="downImg2" @click="downloadClick.call(this,downImg2,imageUrl2)" :download="downImg2"  style="position:absolute;right: 10px;top:10px" >
                        <img style="pointer-events: none;" :src="downLoding">
                    </a>
                </div>
            </div>

            <!-- 右下 -->
            <div class="avatar-uploader mr">
                <el-upload ref="input3" style="width:215px;height:215px;" 
                    action=""
                    :show-file-list="false" 
                    :file-list="fileList"
                    :on-change="addFile3"
                    :auto-upload="false"
                    :data="{}" 
                    :headers="{}" 
                    :class="{'biao':!zxcv}">
                    <i slot="default" class="el-icon-plus" v-show="!imageUrl3"></i>
                    <p class="descri" v-show="!imageUrl3">头颅侧位图</p>
                </el-upload>
                 <el-image style="position:absolute;top:0" v-if="imageUrl3" :src="imageUrl3"
                    :class="[{'original':opq},{'imprimitive':rst}]" :preview-src-list="srcList" @click.stop>
                    <div solt="placeholder">
                        <p style="color:#000">加载中 </p>
                    </div>
                </el-image>
                <div class="bottom" v-show="imageUrl3">
                    <img style="position:absolute;left: 10px;top:10px" :src="anew"  :class="{'right2':!zxcv,'myCursor':true}"  @click="reuse.call(this,'input3')" >
                    <a :href="downImg3" @click="downloadClick.call(this,downImg3,imageUrl3)" :download="downImg3" style="position:absolute;right: 10px;top:10px">
                        <img style="pointer-events: none;" :src="downLoding">
                    </a>
                </div>
            </div>

        </div>

    </el-dialog>
</template>
<script>
    import {donwloadIE} from '@/util/validate.js'
    import {IEVersion} from '@/util/validate.js'
    import {
        compress
    } from '@/util/validate'
    export default {
        components: {

        },
        data() {
            return {
                fileList:[],
                // 员工类名控制
                zxcv:true,
                srcList: [],
                opq:true,
                rst:false,
                add1:'Y',
                add2:'Y',
                add3:'Y',
                downLoding: require('@/assets/2.2病例详情/患者照片&X光片下载.png'),
                anew: require('@/assets/2.2病例详情/患者照片&X光片更换图片.png'),
                dialogFormVisible: false,
                radio: '1',
                checked: true,
                caseId: this.$store.state.caseId, //
                stageName: this.$store.state.stageNameId, //
                stageCount: this.$store.state.stageCountId, //
                imageUrl1: '',
                imageUrl2: '',
                imageUrl3: '',
                downImg1:'',
                downImg2:'',
                downImg3:'',
                num:0,
                headBaseURL: 'http://case.magicalign.com:8605/output',
            }
        },
        mounted() {
             this.zxcv=this.$store.state.rightCode.includes(2);
        },
        methods: {
            async addFile1(file){
                this.fileList[0] = file;
                this.fileList[0].raw = await compress(this.fileList[0].raw);
                this.LoadingOpen();
                await this.newLodImg(this.fileList[0].raw, 0);
                this.LoadingClose();
            },
            async addFile2(file){
                this.fileList[1] = file;
                this.fileList[1].raw = await compress(this.fileList[1].raw);
                this.LoadingOpen();
                await this.newLodImg(this.fileList[1].raw, 1);
                this.LoadingClose();
            },
            async addFile3(file){
                this.fileList[2] = file;
                this.fileList[2].raw = await compress(this.fileList[2].raw);
                this.LoadingOpen();
                await this.newLodImg(this.fileList[2].raw, 2);
                this.LoadingClose();
            },
               // 上传图片
            newLodImg(file, fileNumber) {
                this.num = fileNumber
                return new Promise((resolve, reject) => {
                    if (!file) return resolve();
                    let unLoadFilf
                    if (file.file) {
                        unLoadFilf = file.file.raw;
                    } else {
                        unLoadFilf = file;
                    }
                    const data = {
                        // 上传文件
                        file: unLoadFilf,
                        // 病例 id
                        caseId: this.$store.state.caseId,
                        // 病例阶段
                        stageName: this.$store.state.stageNameId,
                        // 病例次数
                        stageCount: this.$store.state.stageCountId,
                        // 文件序号
                        fileNumber: fileNumber + 9,
                        //是否新增
                        add: 'Y'
                    }
                    var eightFormdata = new FormData();
                    for (var k in data) {
                        eightFormdata.append(k, data[k]);
                    }
                    this.$http({
                        url: "/caseInfo/stepEight",
                        method: "POST",
                        data: eightFormdata,
                    }).then(({
                        data
                    }) => {
                        this['downImg'+ this.num] = this.image2Base64(this.num, URL.createObjectURL(unLoadFilf));
                        this['imageUrl'+ this.num] = URL.createObjectURL(unLoadFilf);
                        this['add'+ this.num] = 'N';
                        this.init();
                        resolve();
                    }).catch(err => {
                        console.log(err)
                        reject(err);
                    })
                })
            },
             // IE下载图片
            downloadClick(url, fileName){
                const edition = IEVersion();
                if(edition =="不是IE" ||  edition=="edge") return;
                donwloadIE(url, fileName);
            },
             reuse(i) {
                this.$refs[i].$children[0].$el.click();
            },
            lmn(){
                this.opq=!this.opq;
                this.rst=!this.rst;
            },
            // 转base64函数
            image2Base64(num, imgDom) {
                let that = this;
                that['add' + num] = "N"
                var img = new Image();
                img.setAttribute("crossOrigin", 'Anonymous');
                img.src = imgDom;
                img.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    that['downImg' + num] = canvas.toDataURL("image/png");
                }
            },
            // 打开弹窗函数
            openDialog() {
                this.dialogFormVisible = true;
                this.init();
            },
            dia() {

            },
            dia2() {

            },
            init() {
                this.srcList = [];
                this.caseId = this.$store.state.caseId;
                this.stageName = this.$store.state.stageNameId;
                this.stageCount = this.$store.state.stageCountId

                this.$http({
                    url: "/caseInfo/getStepEight",
                    method: "get",
                    params: {
                        caseId: this.$store.state.caseId,

                    }
                }).then(({
                    data
                }) => {
                    if (data.code = 200) {
                        let dataImg = JSON.parse(data.data);
                        let that = this;
                        console.log(dataImg);
                        dataImg.sort((x,y)=>{
                            return Number(x.fileNumber) - Number(y.fileNumber)
                        })
                        dataImg.forEach(item => {
                            switch (item.fileNumber) {
                                // 1.正面像 
                                // 2.微笑像 
                                // 3.侧面像 
                                // 4.上牙列面 
                                // 5.下牙列面
                                // 6.左侧咬合 
                                // 7.正面咬合
                                // 8.右侧咬合 
                                // 9.X光片全景片 
                                // 10.X光片头颅正位像 
                                // 11.X光片头颅侧位像 
                                // 12.口扫文件
                                case '9':
                                    that.imageUrl1 = that.headBaseURL + item.path
                                    that.srcList.push(that.headBaseURL + item.path)
                                    that.image2Base64(1, that.headBaseURL + item.path)
                                    break;
                                case '10':
                                    that.imageUrl2 = that.headBaseURL + item.path
                                    that.srcList.push(that.headBaseURL + item.path)
                                    that.image2Base64(2, that.headBaseURL + item.path)
                                    break;
                                case '11':
                                    that.imageUrl3 = that.headBaseURL + item.path
                                    that.srcList.push(that.headBaseURL + item.path)
                                    that.image2Base64(3, that.headBaseURL + item.path)
                                    break;
                            }
                        })
                    }

                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    /deep/.el-dialog__headerbtn .el-dialog__close {
        color: #afafaf;
        font-size: 18px;

        ::after {
            font-size: 20px;
        }
    }
    .biao{
        /deep/ .el-upload{
      
          pointer-events: none;
        
        }
        
    }
    .right2 {
        pointer-events: none;
        filter: grayscale(0.5);
    }
    .original{
        max-width: 100%;
        max-height: 100%;
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // transform: translate(-50%,-50%);
    }
    .imprimitive{
        width: 100%;
        height: 100%;
    }
    /deep/.el-checkbox__input {
        vertical-align: sub !important;
    }

    .descri {
        font-size: 16px;
        color: #333;
        margin-top: 44px;
    }

    /deep/ .el-dialog {
        background: #f9f9f9;
        border-radius: 5px;
        width: 575px;
        height: 615px;
        border:1px solid;
        // overflow: hidden !important;
        
        .chosce {
            width: 450px;
            margin: 40px auto 0;

            .el-checkbox__inner {
                width: 20px;
                height: 20px;
                display: block;
                // background: #f9f9f9;
                // border-color: #333;
                // border-radius: 5px;
            }

            .el-checkbox__inner::after {
                // border-color: #1175d2;
                height: 10px;
                left: 5px;
                width: 6px;
            }

            .el-checkbox__inner::after {
                top: 1px;
            }

            .el-checkbox__label {
                font-size: 16px;
                line-height: 20px;
            }

            .el-checkbox__input.is-checked+.el-checkbox__label {
                font-size: 16px;
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
            margin: 0 auto;
            // position: absolute;
            // left: 50%;
            // top: 85px;
            // transform: translate(-50%);

        }
    }

    .operator {
        padding-bottom: 30px;
    }

    /deep/.el-dialog__header,
    /deep/.el-dialog__body {
        padding: 0;
    }

    // 上传文件样式
    .avatar-uploader {
        width: 215px;
        height: 215px;
        background: #e1ecf5;
        margin-right: 20px;
        margin-bottom: 20px;
        float: left;
        position: relative;
        overflow: hidden;

        >div:nth-child(1) {
            width: 100%;
            height: 100%;
        }

        &:hover {
            .bottom {
                bottom: 0px;
            }
        }

        .bottom {
            position: absolute;
            left: 0;
            bottom: -40px;
            width: 100%;
            height: 40px;
            background: rgba(255, 255, 255, 0.5);
            z-index: 9;
            transition: all 0.5s linear;
        }
    }

    .avatar {
        // width: 100%;
        // height: 100%;
    }

    /deep/ .el-upload {
        width: 100%;
        height: 100%;
        font-size: 30px;
        color: #f99400;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .mr {
        margin-right: 0;
    }

    .avatar-uploader .el-upload {
        width: 33.3%;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    // /deep/.el-image-viewer__canvas {
    //     img {
    //         // max-height:10000% !important;
    //         // max-width:10000% !important;
    //     }
    // }
</style>