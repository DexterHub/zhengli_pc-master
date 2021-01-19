<template>
    <el-dialog id="huanzhe" :visible.sync="dialogFormVisible" :lock-scroll="false" :append-to-body="true" @open="dia"
        @close="dia2">
        <div class="downP myCursor" @click="downImage" v-show="allImg && radio == 2">
            <el-image :src="downLoding"></el-image>
            <p>下载合成照</p>
        </div>
        <div class="chosce myCursor">
            <el-radio v-model="radio" label="1">单张照片</el-radio>
            <el-radio v-model="radio" label="2">合成照</el-radio>
            <el-checkbox v-model="checked" @change="lmn">原始大小</el-checkbox>
        </div>
        <div class="content clearfix" ref="eight">
            <div v-for="(item,i) in uploading" @click="userImg.call(this,i)" :key="i" class="avatar-uploader"
                :style="i==3?'margin-right:275px':''+i==1?'margin:0 30px':''+i==6?'margin:0 30px':''"
                :class="item.userImage?'forbid':''">
                <el-upload :ref="'input'+i" 
                    :action="baseURL" 
                    :show-file-list="false" 
                    :file-list="fileList"
                    :on-change="addFile" 
                    :auto-upload="false" 
                    :data="{
                    }" 
                    :headers="{}" :class="{'biao':!zxcv}">
                    <!-- 默认头像 -->
                    <el-image :src="item.default" v-show="!item.userImage"></el-image>
                    <p class="photo" v-show="!item.userImage">{{item.nameI}}</p>
                </el-upload>
                <!-- 用户头像 -->
                <el-image style="position:absolute;top:0" v-show="item.userImage" :src="item.userImage"
                    :class="[{'original':opq},{'imprimitive':rst}]" :preview-src-list="srcList" @click.stop>
                    <div solt="placeholder">
                        <p style="color:#000">加载中 </p>
                    </div>
                </el-image>
                <!-- 下面的弹出框 -->
                <div class="bottom" v-show="item.userImage && radio == 1">
                    <img class="myCursor" style="position:absolute;left: 10px;top:10px" :src="anew"
                        @click="reuse.call(this,i)" :class="{'right2':!zxcv}">
                    <a :href="item.downImg" @click="downloadClick.call(this,item.downImg,item.userImage)"
                        :download="item.downImg" style="position:absolute;right: 10px;top:10px">
                        <img style="pointer-events: none;" :src="downLoding">
                    </a>
                </div>
            </div>
        </div>

    </el-dialog>
</template>
<script>
    import html2canvas from 'html2canvas';
    import {
        donwloadIE
    } from '@/util/validate.js'
    import {
        IEVersion
    } from '@/util/validate.js'
    import {
        compress
    } from '@/util/validate'
    export default {
        components: {

        },
        data() {
            return {
                fileList: [], //上传文件列表
                leng: 0,
                // 员工类名控制
                zxcv: true,
                srcList: [], //大图列表
                allImg: true,
                // 控制原始大小和非原始大小
                opq: true,
                rst: false,
                num: 0, //用户点击的是哪一张图片
                downLoding: require('@/assets/2.2病例详情/患者照片&X光片下载.png'),
                anew: require('@/assets/2.2病例详情/患者照片&X光片更换图片.png'),
                caseId: '', //
                stageName: '', //
                stageCount: '', //
                upImage: '',
                url: 'http://case.magicalign.com:8605/web/caseInfo/stepEight',
                headBaseURL: 'http://case.magicalign.com:8605/output',
                dialogFormVisible: false,
                radio: '1',
                checked: true,
                uploading: [{
                    default: require('@/assets/2.2病例详情/患者照片/切图pic_05.png'), //系统默认图片
                    downImg: '', //下载图片
                    userImage: '', //用户图片
                    add: 'Y', //是否新增
                    nameI: '正面像', //显示的名字
                }, {
                    default: require('@/assets/2.2病例详情/患者照片/切图pic_07.png'),
                    downImg: '', //下载图片
                    userImage: '',
                    add: 'Y',
                    nameI: '微笑像'
                }, {
                    default: require('@/assets/2.2病例详情/患者照片/切图pic_03.png'),
                    downImg: '', //下载图片
                    userImage: '',
                    add: 'Y',
                    nameI: '侧面像'
                }, {
                    default: require('@/assets/2.2病例详情/患者照片/切图pic_13.png'),
                    downImg: '', //下载图片
                    userImage: '',
                    add: 'Y',
                    nameI: '上牙列面 '
                }, {
                    default: require('@/assets/2.2病例详情/患者照片/切图pic_15.png'),
                    downImg: '', //下载图片
                    userImage: '',
                    add: 'Y',
                    nameI: '下牙列面'
                }, {
                    default: require('@/assets/2.2病例详情/患者照片/切图pic_18.png'),
                    downImg: '', //下载图片
                    userImage: '',
                    add: 'Y',
                    nameI: '左侧咬合'
                }, {
                    default: require('@/assets/2.2病例详情/患者照片/切图pic_20.png'),
                    downImg: '', //下载图片
                    userImage: '',
                    add: 'Y',
                    nameI: '正面咬合'
                }, {
                    default: require('@/assets/2.2病例详情/患者照片/切图pic_22.png'),
                    downImg: '', //下载图片
                    userImage: '',
                    add: 'Y',
                    nameI: '右侧咬合'
                }],
                dataImg: [],
                baseURL: null, // 默认地址
            }
        },
        created() {
            this.baseURL = this.$http.defaults.baseURL + '/caseInfo/stepEight';
        },
        mounted() {
            this.zxcv = this.$store.state.rightCode.includes(2);
            console.log(this.zxcv)
        },
        methods: {
            async addFile(file) {
                let i = this.num;
                this.fileList[i] = file;
                this.fileList[i].raw = await compress(this.fileList[i].raw);
                this.uploading[i].userImage = URL.createObjectURL(file.raw);
                this.uploading[i].add = 'N'
                this.LoadingOpen();
                await this.newLodImg(this.fileList[i].raw, i);
                this.LoadingClose();
            },
            // 上传图片
            newLodImg(file, fileNumber) {
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
                        fileNumber: fileNumber + 1,
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
                        this.uploading[this.num].userImage = URL.createObjectURL(unLoadFilf)
                        this.uploading[this.num].downImg = this.image2Base64(this.num, URL.createObjectURL(unLoadFilf));
                        this.uploading[this.num].add = "N"
                        this.init();
                        resolve();
                    }).catch(err => {
                        console.log(err)
                        reject(err);
                    })
                })
            },
            // IE下载图片
            downloadClick(url, fileName) {
                const edition = IEVersion();
                if (edition == "不是IE" || edition == "edge") return;
                donwloadIE(url, fileName);
            },
            // 转base64函数
            image2Base64(num, imgDom) {
                this.uploading[num].add = "N"
                let that = this;
                var img = new Image();
                img.setAttribute("crossOrigin", 'Anonymous');
                img.src = imgDom;
                img.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    that.uploading[num].downImg = canvas.toDataURL("image/png");
                    return that.uploading[num].downImg
                }
            },
            // 确定用户点击哪一个图片
            userImg(i) {
                this.num = i;
            },
            reuse(i) {
                this.$refs['input' + i][0].$children[0].$el.click();
            },
            dia() {
                console.log(111)

            },
            dia2() {
                this.$emit('info')
            },
            lmn() {
                this.opq = !this.opq;
                this.rst = !this.rst;
            },
            // 打开弹窗函数
            openDialog() {
                this.dialogFormVisible = true;

                this.init();
            },
            // 初始化
            init() {
                this.srcList = [];
                this.caseId = this.$store.state.caseId;
                this.stageName = this.$store.state.stageNameId;
                this.stageCount = this.$store.state.stageCountId;
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
                        this.dataImg = JSON.parse(data.data);
                        this.dataImg.sort((x, y) => {
                            return Number(x.fileNumber) - Number(y.fileNumber)
                        })
                        let that = this;
                        this.leng = this.dataImg.length;
                        this.dataImg.forEach(item => {
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
                                case '1':
                                    that.uploading[0].userImage = that.headBaseURL + item.path
                                    that.image2Base64(0, that.headBaseURL + item.path);
                                    that.srcList.push(that.headBaseURL + item.path)
                                    break;
                                case '2':
                                    that.uploading[1].userImage = that.headBaseURL + item.path
                                    that.image2Base64(1, that.headBaseURL + item.path)
                                    that.srcList.push(that.headBaseURL + item.path)
                                    break;
                                case '3':
                                    that.uploading[2].userImage = that.headBaseURL + item.path
                                    that.image2Base64(2, that.headBaseURL + item.path)
                                    that.srcList.push(that.headBaseURL + item.path)
                                    break;
                                case '4':
                                    that.uploading[3].userImage = that.headBaseURL + item.path
                                    that.image2Base64(3, that.headBaseURL + item.path)
                                    that.srcList.push(that.headBaseURL + item.path)
                                    break;
                                case '5':
                                    that.uploading[4].userImage = that.headBaseURL + item.path
                                    that.image2Base64(4, that.headBaseURL + item.path)
                                    that.srcList.push(that.headBaseURL + item.path)
                                    break;
                                case '6':
                                    that.uploading[5].userImage = that.headBaseURL + item.path
                                    that.image2Base64(5, that.headBaseURL + item.path)
                                    that.srcList.push(that.headBaseURL + item.path)
                                    break;
                                case '7':
                                    that.uploading[6].userImage = that.headBaseURL + item.path
                                    that.image2Base64(6, that.headBaseURL + item.path)
                                    that.srcList.push(that.headBaseURL + item.path)
                                    break;
                                case '8':
                                    that.uploading[7].userImage = that.headBaseURL + item.path
                                    that.image2Base64(7, that.headBaseURL + item.path)
                                    that.srcList.push(that.headBaseURL + item.path)
                                    break;
                            }
                        })
                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            downImage() {
                this.allImg = false;
                let that = this;
                html2canvas(this.$refs.eight, {
                    // taintTest: false,
                    // logging: false,
                    // scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    width: 710,
                    height: 665,
                    scrollY: 0,
                }).then(canvas => {
                    that.allImg = true;
                    let _C = canvas.toDataURL()
                    let a = document.createElement("a"); // 生成一个a元素
                    let event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = _C; // 设置图片名称
                    a.href = _C; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    // 兼容垃圾IE
    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {

        /deep/.downP {
            // top: 50% !important;
        }
    }

    /deep/.el-dialog__body {
        position: relative;
    }

    .biao {
        /deep/ .el-upload {

            pointer-events: none;

        }

    }

    .right2 {
        pointer-events: none;
        filter: grayscale(0.5);
    }

    .downP {
        position: absolute;
        left: 50%;
        top: 49%;
        transform: translate(-51%, 0%);
        width: 172px;
        height: 166px;
        box-sizing: border-box;
        z-index: 10;

        >div {
            margin-left: 77px;
            margin-bottom: 20px;
        }

        >p {
            text-align: center;
        }
    }

    .clearMargin {
        margin: 0 !important;
    }

    .margin_right {
        margin-right: 255px !important;
    }

    /deep/.el-dialog__headerbtn {
        position: static;
        margin: 20px;
        float: right;

        .el-dialog__close {
            color: #afafaf;
            margin-top: -5px;

            // font-size: 18px;
            &::before {
                font-size: 20px;
            }
        }
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
        margin-top: 0 !important;
        border-radius: 6px;
        width: 805px;
        padding-bottom: 30px;
        margin: 0 auto;
        // top: 50%;
        // transform: translateY(-50%);
        position: static;

        // height: 784px;
        .chosce {
            width: 685px;
            margin: 15px auto;


            /deep/ .el-radio__input {
                width: 21px;
                height: 21px;
                margin-top: -10px;
            }

            .el-radio__label {
                font-size: 18px;
                color: #333 !important;
                font-weight: bold;
            }

            .el-radio__inner {
                width: 24px;
                height: 24px;
                border-color: #1175d2;
                background: #f9f9f9;
            }

            .el-radio__input.is-checked .el-radio__inner {
                background: #f9f9f9 !important;

                &::after {
                    width: 4px;
                    height: 4px;
                    background: #f9f9f9;
                    border: 10px solid #1175d2;
                    border-radius: 50%;

                }
            }

            .el-radio__inner::after {
                // background: #1175d2;
            }

            .el-checkbox__inner {
                width: 20px;
                height: 20px;

            }

            .el-checkbox__inner::after {
                width: 6px;
                height: 10px;
                left: 5px;
            }

            .el-checkbox__input.is-checked+.el-checkbox__label {
                font-size: 16px;
            }

            .el-checkbox {
                width: 20px;
                height: 20px;
                float: right;
                margin-top: -5px;
                font-size: 16px;
                color: #333333;
                padding-right: 67px;
            }
        }

        .content {
            width: 710px;
            height: 665px;
            margin: 0 auto;
            position: relative;

            .photo {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 36px;
                font-size: 16px;
                color: #333;
            }
        }
    }

    .operator {
        padding-bottom: 30px;
    }

    /deep/.el-dialog__header,
    /deep/.el-dialog__body {
        padding: 0;
    }

    /deep/.el-dialog__header {
        height: 34px;
    }

    /deep/ .el-checkbox__label {
        font-size: 16px !important;
    }

    // /deep/ .avatar {
    //     width: auto;
    //     height: 100%;
    // }
    .original {
        max-width: 100% !important;
        max-height: 100% !important;
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // transform: translate(-50%, -50%);
    }

    .imprimitive {
        width: 100%;
        height: 100%;
    }

    // 上传文件样式
    .avatar-uploader {
        width: 215px;
        height: 209px;
        background: #e1ecf5;
        // margin-right: 30px;
        margin-bottom: 20px;
        float: left;
        position: relative;
    }

    .mr {
        margin-right: 0;
    }

    .avatar-uploader {
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

    /deep/ .el-upload {
        position: relative;
        width: 100%;
        height: 100%;
    }

    /deep/ .el-image__inner {
        // width: 215px;
        // height: 209px;
        display: block;
    }
</style>
<style lang="less" scoped>
    @media screen and (max-width: 1660px) {
        /deep/.el-dialog {
            // transform: translateY(-50%) scale(0.8);
            // width: 705px;
            // height:669px;
        }
    }

    @media screen and (max-width: 1360px) {
        .el-dialog {
            // transform: translateY(-50%) scale(0.6);
        }
    }
</style>
<style>
    .el-image-viewer__btn .el-icon-circle-close {
        color: #fff;
    }
</style>