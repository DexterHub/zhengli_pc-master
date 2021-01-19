<template>
    <div class="ykzp clearfix">
        <!-- 口内照 -->
        <div class="zhaopscleft">
            <div class="title lefttitle">
                口内照
            </div>
            <ul class="zhapnav clearfix">
                <!-- 正面像 -->
                <li v-for="(item,i) in photographL" :key="i" :class="i === 3?'marginR':''">
                    <div @mouseover="()=>{index = i}">
                        <el-upload class="avatar-uploader" 
                        :action="baseURL" 
                        :show-file-list="false" 
                        :multiple="false"
                        :on-change="addFile" 
                        :auto-upload="false" 
                        accept="image/jpeg,image/jpg,image/png"
                        :with-credentials="true" 
                        :data="{}">
                            <img v-if="item.imageUrl" :ref="`img${i}`" :src="item.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span v-if="item.add == 'N'" class="bottom">
                            <img class="myCursor" @click="rotate.call(this,i)"
                                style="position:absolute;left: 10px;top:10px" :src='anew2'>
                            <img class="myCursor" @click="delete1.call(this,i)"
                                style="position:absolute;right: 10px;top:10px" :src='anew1'>
                        </span>
                    </div>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <!-- X光片 -->
        <div class="zhaopscright">
            <div class="title righttitle">
                X光片
            </div>
            <ul class="zhapnav clearfix">
                <li v-for="(item,i) in photographR" :key="i">
                    <div @mouseover="()=>{index = i+8}">
                        <el-upload class="avatar-uploader" 
                        :action="baseURL" 
                        :show-file-list="false" 
                        :multiple="false"
                        :on-change="addFile" 
                        :auto-upload="false" 
                        accept="image/jpeg,image/jpg,image/png"
                        :with-credentials="true" 
                        :data="{}">
                            <img v-if="item.imageUrl" :ref="`img${i+8}`" :src="item.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span v-if="item.add == 'N'" class="bottom">
                            <img class="myCursor" @click="rotate.call(this,i+8)"
                                style="position:absolute;left: 10px;top:10px" :src='anew2'>
                            <img class="myCursor" @click="delete1.call(this,i+8)"
                                style="position:absolute;right: 10px;top:10px" :src='anew1'>
                        </span>
                    </div>
                    <p>{{item.name}}</p>
                </li>
            </ul>
            <p class="textp1"><span>*</span>请至少上传一张图片</p>

        </div>
    </div>
</template>
<script>
    /* 

 */
    import {
        compress
    } from '@/util/validate'
    export default {
        data() {
            return {
                // 是否是新建,true不是,false是
                isNew: true,
                index: 0, //确定现在选中的是哪一张图片;
                baseURL: null, // 默认地址
                anew1: require('@/assets/3新建病例/PC-牙况照片-删除.png'),
                anew2: require('@/assets/3新建病例/PC-牙况照片-旋转.png'),
                photographL: [ //左侧图片
                    {
                        name: '正面像',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面像.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面像.png'),
                    },
                    {
                        name: '微笑像',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面像.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面像.png'),
                    },
                    {
                        name: '侧面像',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面像.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面像.png'),
                    },
                    {
                        name: '上牙列面',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面像.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面像.png'),
                    },
                    {
                        name: '下牙列面',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面像.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面像.png'),
                    },
                    {
                        name: '左侧咬合',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面像.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面像.png'),
                    },
                    {
                        name: '正面咬合',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面像.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面像.png'),
                    },
                    {
                        name: '右侧咬合',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面像.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面像.png'),
                    },
                ],
                photographR: [ //右侧图片
                    {
                        txt: '全景照',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面咬合-75.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面咬合-75.png'),
                    },
                    {
                        txt: '头颅正位像',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面咬合-75.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面咬合-75.png'),
                    },
                    {
                        txt: '头颅侧位像',
                        add: 'Y',
                        imageUrl: require('@/assets/3新建病例/牙况照片/正面咬合-75.png'),
                        imageUrl1: require('@/assets/3新建病例/牙况照片/正面咬合-75.png'),
                    },
                ],
                // 存放获取到的图片file
                fileList: [],
                // 至少有一个文件上传成功
                wenj: false,

            }
        },
        created() {
            this.baseURL = this.$http.defaults.baseURL + '/caseInfo/stepEight';
        },
        methods: {
            // 图片转base64
            image2Base64(num, imgDom) {
                this.uploading[num].add = "N"
                let that = this;
                var img = new Image();
                img.src = imgDom;
                img.setAttribute("crossOrigin", 'Anonymous');
                img.onload = function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    that.uploading[num].userImage = canvas.toDataURL("image/png");
                }
            },
            // 判断图片格式和大小是否符合标准
            ifType(file) {
                return new Promise((res, rej) => {
                    file = file.raw.type;
                    const isJPG = (file == 'image/png' || file == 'image/jpg' || file == 'image/jpeg');
                    if (!isJPG) {
                        this.$message.error('上传头像图片只支持 png/jpg/jpeg 格式!');
                        res(false)
                    }
                    res(true);
                })

            },
            // addfileN 代表 改变改变事件，
            async addFile(file, fileList) {
                if (await !this.ifType(file)) return;
                let i = this.index;
                this.fileList[i] = file;
                this.fileList[i].raw = await compress(this.fileList[i].raw);
                this.wenj = true;
                if (i < 8) {
                    this.photographL[i].imageUrl = URL.createObjectURL(file.raw);
                    this.photographL[i].add = 'N'
                } else {
                    this.photographR[i - 8].imageUrl = URL.createObjectURL(file.raw);
                    this.photographR[i - 8].add = 'N'
                }
                if (!this.isNew) return;
                this.LoadingOpen();
                await this.newLodImg(this.fileList[i].raw, i);
                this.LoadingClose();
            },
            // =========旋转功能==============\\
            rotate(i) {
                if (this.$refs[`img${i}`][0].className == 'avatar') {
                    this.$refs[`img${i}`][0].className = "xuanzhuang90"
                } else if (this.$refs[`img${i}`][0].className == 'xuanzhuang90') {
                    this.$refs[`img${i}`][0].className = "xuanzhuang180"
                } else if (this.$refs[`img${i}`][0].className == 'xuanzhuang180') {
                    this.$refs[`img${i}`][0].className = "xuanzhuang270";
                } else if (this.$refs[`img${i}`][0].className == 'xuanzhuang270') {
                    this.$refs[`img${i}`][0].className = "avatar"
                }
            },
            // =========删除功能==============\\
            delete1(i) {
                this.fileList[i] = '';
                if (i < 8) {
                    this.photographL[i].imageUrl = this.photographL[i].imageUrl1;
                    this.photographL[i].add = 'Y'
                } else {
                    this.photographR[i-8].imageUrl = this.photographR[i-8].imageUrl1;
                    this.photographR[i-8].add = 'Y'
                }
                this.$refs[`img${i}`].className = "avatar"
                for (let k of this.fileList) {
                    if (Boolean(k)) {
                        this.wenj = true;
                        break;
                    }
                    this.wenj = false;
                }
                if (!this.isNew) return;
                this.deleteimg(i)
            },
            // 删除 图片 接口
            deleteimg(fileNumber) {
                this.$http({
                    url: "/caseInfo/delPhoto",
                    method: "POST",
                    data: {
                        caseId: this.$store.state.binglId,
                        stageName: this.$store.state.stageName,
                        stageCount: this.$store.state.stageCount,
                        fileNumber: fileNumber
                    }
                }).then(({
                    data
                }) => {

                }).catch(err => {
                    console.log(err)
                })
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
                        caseId: this.$store.state.binglId,
                        // 病例阶段
                        stageName: this.$store.state.stageName,
                        // 病例次数
                        stageCount: this.$store.state.stageCount,
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
                        resolve();
                    }).catch(err => {
                        console.log(err)
                        reject(err);
                    })
                })
            },
        },


    }
</script>
<style scoped lang="less">
    // 兼容垃圾IE
    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
        .ykzp /deep/.title {
            padding-top: 0px !important;
            line-height: 70px;
            display: inline-block;
        }


    }

    .ykzp {
        min-height: 682px;
    }

    .xuanzhuang0 {
        display: block;
        // width: 120px;
        // height: 150px;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transition: all .5s;
        transform: translate(-50%, -50%) rotate(0deg);
    }

    .xuanzhuang90 {
        display: block;
        // width: 120px;
        // height: 150px;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transition: all .5s;
        transform: translate(-50%, -50%) rotate(90deg);
    }

    .xuanzhuang180 {
        display: block;
        // width: 120px;
        // height: 150px;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transition: all .5s;
        transform: translate(-50%, -50%) rotate(180deg);
    }

    .xuanzhuang270 {
        display: block;
        // width: 120px;
        // height: 150px;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transition: all .5s;
        transform: translate(-50%, -50%) rotate(270deg);
    }

    .xuanzhuang360 {
        display: block;
        // width: 120px;
        // height: 150px;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transition: all .5s;
        transform: translate(-50%, -50%) rotate(360deg);
    }

    /deep/.tup1 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    /deep/.textp1 {
        position: absolute;
        right: 10%;
        bottom: 13%;
        font-size: 16px;
        color: #ff0000;

        span {
            font-weight: 900;
        }
    }

    /deep/.zhaopscleft {
        float: left;
        width: 48%;
        height: 100%;
    }

    /deep/.zhaopscright {
        float: right;
        width: 40%;
        height: 100%;
        margin-right: 8%;
    }

    /deep/.title {
        width: 100%;
        height: 70px;
        text-align: center;
        line-height: 70px;
        color: #1175d2;
        font-weight: 600;
    }

    /deep/.zhapnav {
        width: 100%;
        // background: #ccc;
        position: relative;
        margin-bottom: 8px;

        .shade {
            position: absolute;
        }

        // li:nth-child(-n+3){
        //     margin-bottom:0px;
        // }
        li {
            width: 33%;
            float: left;
            margin-bottom: 13px;

            i {
                display: none;
            }

            >div {
                overflow: hidden;

                &:hover {
                    .bottom {
                        bottom: 0px;
                    }
                }
            }

            div {
                width: 120px;
                height: 150px;
                margin: 0 auto;
                background: #fff;
                position: relative;
                box-sizing: border-box;
            }

            p {
                text-align: center;
                margin-top: 10px;
                margin-bottom: 10px;
            }

        }

        .marginR {
            margin-right: 33%;
        }
    }

    /deep/.butbox1 {
        width: 100px;
        margin: none;
        position: absolute;
        right: 170px;
        bottom: 100px;

        .el-checkbox__label {
            color: #333333;
            font-weight: 400;
        }

        .el-checkbox__inner {
            width: 20px;
            height: 20px;
            border-radius: 4px;
        }

        /deep/.el-checkbox__inner::after {
            width: 4px;
            height: 10px;
            left: 7px;
        }
    }

    /deep/.butbox2 {
        width: 100px;
        margin: none;
        position: absolute;
        right: 170px;
        bottom: 50px;

        .el-checkbox__label {
            color: #333333;
            font-weight: 400;
        }

        .el-checkbox__inner {
            width: 20px;
            height: 20px;
            border-radius: 4px;
        }

        /deep/.el-checkbox__inner::after {
            width: 4px;
            height: 10px;
            left: 7px;
        }
    }



    // 上传照片element样式
    /deep/.avatar-uploader .el-upload {
        border: 1px solid #1175d2;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    /deep/.avatar-uploader .el-upload:hover {
        border-color: #1175d2;
    }

    /deep/.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    /deep/.avatar {
        display: block;
        // width: 120px;
        // height: 150px;
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: all .5s;
    }

    /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background: #1175d2;
    }

    .bottom {
        position: absolute;
        left: 0;
        bottom: -30px;
        width: 100%;
        height: 30px;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9;
        transition: all 0.25s linear;
    }
</style>