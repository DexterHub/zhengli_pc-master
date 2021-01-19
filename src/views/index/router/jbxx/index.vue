<template>
    <div class="jbxx">
        <el-form ref="form" :model="form" label-width="108px"
            :class="{'right2':!this.$store.state.rightCode.includes(2)}">
            <el-form-item class="huangzname" label="患者姓名">
                <el-input v-model="form.name" @input="fibbidface2" maxlength="16"></el-input>
            </el-form-item>

            <el-form-item label="性别" class="xingbtit">
                <el-radio-group v-model="form.resource">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item class="jiuzyy" label="就诊医院">
                <el-select v-model="form.yiy">
                    <el-option v-for="(item,i) in yiyshuzu" :key="i"
                        :label="item.country+item.province+item.city+item.area+item.address+item.hospitalName"
                        :value="item.id"></el-option>
                </el-select>
                <el-button @click="xzyybut" style="font-size:16px;width:110px;color:#1175d2;" type="text">新增医院
                </el-button>
            </el-form-item>

            <el-form-item class="csrq" label="出生日期">
                <el-input v-model="input1" class="ipt1" @input="yearxie"></el-input>
                <span>年</span>
                <el-input v-model="input2" class="ipt2" @input="monthxie"></el-input>
                <span>月</span>
                <el-input v-model="input3" class="ipt3" @input="datexie"></el-input>
                <span>日</span>
            </el-form-item>

            <el-form-item class="shdz" label="收货地址">
                <el-select v-model="form.diz">
                    <el-option v-for="(item,i) in dizshuzu" :key="i"
                        :label="item.country+item.province+item.city+item.area+item.address + ' - ' + item.deliveryName"
                        :value="item.id"></el-option>
                </el-select>
                <el-button @click="xzdzbut" style="font-size:16px;width:110px;color:#1175d2;" type="text">新增地址
                </el-button>
            </el-form-item>

            <el-form-item class="shdz" label="口扫文件">
                <div class="wenjscbox">
                    <el-upload class="upload-demo" action="{baseURL}" multiple
                        accept=".zip,.rar" ref="schuanwj" :on-change="handleSuccess" :auto-upload="false"
                        :on-remove="remove" :limit="1" :file-list="fileList" :data="{
                    caseId:this.$store.state.binglId,
                    stageName:this.$store.state.stageName,
                    stageCount:this.$store.state.stageCount,
                    fileNumber:'12',
                    add:this.scwjadd,
                }" :headers='myHeaders'>
                        <img class="scimg" :src="flag?OK:NO">
                        <div class="el-upload__text" v-show="flag">点击上传扫文件</div>
                        <div class="el-upload__tip1" slot="tip">文件限制：最大100M，支持rar.zip格式</div>
                    </el-upload>
                </div>
            </el-form-item>

        </el-form>
        <newhospital @pushyiyshuj="pushyiyshuj" ref="tanchuangyiy"></newhospital>
        <newsite @pushdizhishuju="pushdizhishuju" ref="tanchuangdizhi"></newsite>
        <div class="elrowone">
            <el-button type="primary" :class="{'right2':!this.$store.state.rightCode.includes(2)}"
                style="background:#1175d2;" @click="save">保存</el-button>
            <el-button class="quxbut" type="primary" @click="cancel">取消</el-button>
        </div>
    </div>
</template>
<script>
    import {
        dateToStr
    } from "@/util/validate.js";
    import newsite from "@/views/newtangc/newsite";
    import newhospital from "@/views/newtangc/newhospital";
    export default {
        components: {
            newsite,
            newhospital
        },
        data() {
            return {
                input1: "",
                input2: "",
                input3: "",
                form: {
                    name: "",
                    yiy: "",
                    diz: "",
                    resource: ""
                },
                paientinfomation: {},
                kkk: {},
                // 医院
                yiyshuzu: [],
                // 地址
                dizshuzu: [],
                //zip名字
                zipName: '',

                file: '',
                fileList: [],
                flag: true,
                OK: require('@/assets/3新建病例/上传文件.png'),
                NO: require('@/assets/3新建病例/PC-新建病例上传文件.png'),
                type: '',
                myHeaders: {
                    Authorization: this.$cookie.get('token')
                },

                scwjadd: 'Y',
                loadingInstance: null,
                newImg: false,
                baseURL: null, // 默认地址
            };
        },
        created() {
            this.baseURL = this.$http.defaults.baseURL + '/caseInfo/stepEight';
        },
        mounted() {
            this.patientinfo();
            this.getfile();
        },
        methods: {
            // 年份限制
            yearxie(value) {
                this.input1 = value.replace(/[^\d]/g, "");
                if ((Number(value) <= 0 || Number(value) > 2021) && value != "") {
                    this.input1 = "";
                    this.$message({
                        message: "请输入正确的年份",
                        type: "error",
                        duration: 2000,
                        onClose: () => {
                            this.visible = false;
                            this.$emit("refreshDataList");
                        }
                    });
                }
            },
            // 月份限制
            monthxie(value) {
                this.input2 = value.replace(/[^\d]/g, "");
                if ((Number(value) <= 0 || Number(value) > 12) && value != "") {
                    this.input2 = "";
                    this.$message({
                        message: "请输入正确的月份",
                        type: "error",
                        duration: 2000,
                        onClose: () => {
                            this.visible = false;
                            this.$emit("refreshDataList");
                        }
                    });
                }
            },
            // 日期限制
            datexie(value) {
                this.input3 = value.replace(/[^\d]/g, "");
                if ((Number(value) <= 0 || Number(value) > 31) && value != "") {
                    this.input3 = "";
                    this.$message({
                        message: "请输入正确的日期",
                        type: "error",
                        duration: 2000,
                        onClose: () => {
                            this.visible = false;
                            this.$emit("refreshDataList");
                        }
                    });
                }
            },
            // 病人信息
            patientinfo() {
                this.$http({
                        url: "/caseInfo/getStepTwo",
                        method: "get",
                        params: {
                            caseId: this.$store.state.caseId
                        }
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.paientinfomation = JSON.parse(data.data);
                            this.form.name = this.paientinfomation.patientName;
                            if (this.paientinfomation.sex === 1) {
                                this.form.resource = "男";
                            } else if (this.paientinfomation.sex === 2) {
                                this.form.resource = "女";
                            } else {
                                this.form.resource = "";
                            }
                            this.input1 = dateToStr(
                                new Date(this.paientinfomation.birthday)
                            ).substring(0, 4);
                            this.input2 = dateToStr(
                                new Date(this.paientinfomation.birthday)
                            ).substring(5, 7);
                            this.input3 = dateToStr(
                                new Date(this.paientinfomation.birthday)
                            ).substring(8, 10);
                            // this.form.yiy=this.paientinfomation.hospitalId;
                            // this.form.diz=this.paientinfomation.addressId;
                            this.Hospitallist(this.paientinfomation.hospitalId);
                            this.addreslist(this.paientinfomation.addressId);
                        } else {}
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 获取文件信息
            getfile() {
                this.$http({
                    url: "/caseInfo/getStepEight",
                    method: "get",
                    params: {
                        caseId: this.$store.state.caseId
                    }
                }).then(({
                    data
                }) => {
                    data = JSON.parse(data.data);
                    console.log(data);
                    data.forEach(item => {
                        if (item.fileNumber == '12') {
                            console.log(item);
                            this.fileList = [{
                                    name: item.fileName,
                                    url: item.path,
                                }],
                                this.flag = false;
                            this.scwjadd = "N";
                        }
                    })
                }).catch(err => {

                })
            },
            // 上传病人信息接口
            uploadpatientinfo() {
                this.$http({
                        url: "/caseInfo/stepTwo",
                        method: "post",
                        data: this.kkk
                    })
                    .then(({
                        data
                    }) => {
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
            // 医院列表
            Hospitallist(id) {
                this.$http({
                        url: "/hospital/hospitalList",
                        method: "get"
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.yiyshuzu = JSON.parse(data.data);
                            let that = this;
                            this.yiyshuzu.forEach(function (item, idx) {
                                if (item.id === id) {
                                    that.form.yiy =
                                        item.country +
                                        item.province +
                                        item.city +
                                        item.area +
                                        item.address +
                                        item.hospitalName;
                                }
                            });
                        } else {}
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 地址列表
            addreslist(id) {
                this.$http({
                        url: "/deliveryAddress/getAddressList",
                        method: "get"
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.dizshuzu = JSON.parse(data.data);
                            let that = this;
                            this.dizshuzu.forEach(function (item, idx) {
                                if (item.id === id) {
                                    that.form.diz =
                                        item.country +
                                        item.province +
                                        item.city +
                                        item.area +
                                        item.address +
                                        " - " +
                                        item.deliveryName;
                                }
                            });
                        } else {}
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            xzyybut() {
                this.$refs.tanchuangyiy.dialogFormVisibleyiy = true;
            },
            xzdzbut() {
                this.$refs.tanchuangdizhi.dialogFormVisibledizhi = true;
            },

            // 禁止输入表情
            fibbidface2(value) {
                var html = value,
                    oldHtml = "";
                oldHtml = html;
                var reg =
                    /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
                if (html.match(reg)) {
                    html = html.replace(reg, "");
                }

                if (html != oldHtml) {
                    this.form.name = html;
                }
                // if (this.form.name.length < 1) {
                //     this.$message({
                //         message: "请至少输入一位姓名",
                //         type: "error",
                //         duration: 2000,
                //         onClose: () => {
                //             this.visible = false;
                //             this.$emit("refreshDataList");
                //         }
                //     });
                // }
            },

            // emit触发医院列表事件
            pushyiyshuj() {
                this.$http({
                        url: "/hospital/hospitalList",
                        method: "get"
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.yiyshuzu = JSON.parse(data.data);
                        } else {}
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // emit触发地址列表事件
            pushdizhishuju() {
                this.$http({
                        url: "/deliveryAddress/getAddressList",
                        method: "get"
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.dizshuzu = JSON.parse(data.data);
                        } else {}
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 判断文件 是否
            ifType(file) {
                const fileExt = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
                const isJPG = fileExt == '.rar' || fileExt == '.zip'
                const isLt2M = file.raw.size / 1024 / 1024 < 100;
                if (!isJPG) {
                    this.$message.error('上传文件只支持 rar/zip 格式!');
                    return false
                }
                if (!isLt2M) {
                    this.$message.error('上传文件最大100MB !');
                    return false
                }
                return true;
            },
            // 改变事件
            handleSuccess(file, fileList) {
                if (!this.ifType(file)) {
                    return
                }
                this.file = file
                this.fileList = fileList //需要上传的文件
                this.scwjadd = 'N'; //是否新建
                this.flag = false;
            },
            // 删除文件
            remove() {
                this.fileList = [];
                this.flag = true;
            },
            // 取消按钮
            cancel() {
                this.$router.push("/particulars");
                this.$store.commit("indexRemove", 2);
            },
            // 保存按钮
            save() {
                this.loadingInstance = this.Loading.service({
                    text: '正在上传',
                });
                this.kkk.caseId = this.$store.state.caseId;
                this.kkk.patientName = this.form.name;
                if (this.form.resource === "男") {
                    this.kkk.sex = 1;
                } else if (this.form.resource === "女") {
                    this.kkk.sex = 2;
                } else {
                    this.kkk.sex = 0;
                }
                this.kkk.birthday = new Date(
                    this.input1 + "/" + this.input2 + "/" + this.input3
                ).getTime();
                if (typeof this.form.yiy === "string") {
                    this.kkk.hospitalId = this.paientinfomation.hospitalId;
                } else {
                    this.kkk.hospitalId = this.form.yiy;
                }
                if (typeof this.form.diz === "string") {
                    this.kkk.addressId = this.paientinfomation.addressId;
                } else {
                    this.kkk.addressId = this.form.diz;
                }
                this.uploadpatientinfo();
                this.upLoadFile();
                if (!this.flag) return
                this.removeFile();
            },
            // 上传文件
            upLoadFile() {
                if (!this.file) {
                    this.$router.push("/particulars");
                    this.$store.commit("indexRemove", 2);
                    this.loadingInstance.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        this.loadingInstance.close();
                    });
                    return;
                }
                const data = {
                    // 上传文件
                    file: this.file.raw,
                    // 病例 id
                    caseId: this.$store.state.caseId,
                    // 病例阶段
                    stageName: this.$store.state.stageNameId,
                    // 病例次数
                    stageCount: this.$store.state.stageCountId,
                    // 文件序号
                    fileNumber: '12',
                    //是否新增
                    add: 'N'
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
                    this.loadingInstance.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        this.loadingInstance.close();
                    });
                    this.$message({
                        message: "保存成功上传成功",
                        type: "success",
                        duration: 1500,
                        onClose: () => {
                            this.visible = false;
                            this.$emit("refreshDataList");
                        }
                    });
                    this.$router.push("/particulars");
                    this.$store.commit("indexRemove", 2);
                }).catch(err => {
                    console.log(err)
                })
            },
            // 删除文件
            removeFile() {
                this.$http({
                    url: "/caseInfo/delPhoto",
                    method: "POST",
                    data: {
                        caseId: this.$store.state.caseId,
                        stageName: this.$store.state.stageNameId,
                        stageCount: this.$store.state.stageCountId,
                        fileNumber: '12'
                    }

                }).then(({
                    data
                }) => {

                }).catch(err => {
                    console.log(err)
                })
            }
        }
    };
</script>
<style lang="less" scoped>
    @media screen and (max-width: 1660px) {
        /deep/.el-form {
            padding-left: 30px !important;
        }
    }

    @media screen and (max-width: 1200px) {

        /deep/.shdz input,
        /deep/.el-textarea .el-textarea__inner {
            width: 600px !important;
        }

        /deep/.el-checkbox-button__inner {
            width: 80px !important;
        }
    }
</style>
<style scoped lang="less">
    .clearfix:before,
    .clearfix:after {
        content: "";
        display: table;
    }

    .right2 {
        pointer-events: none;
    }

    .clearfix:after {
        clear: both;
    }

    .clearfix {
        *zoom: 1;
    }

    .jbxx {
        min-height: 682px;
        font-size: 16px;
        background: #f9f9f9;
        padding-bottom: 50px;
    }

    // 上传zip文件
    .wenjscbox {
        font-weight: 400;
        width: 500px;
        height: 250px;
        position: relative;

        /deep/.upload-demo .el-upload-list {
            position: absolute;
            left: 50%;
            top: 170px;
            -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);
            width: 200px;

            /deep/.el-icon-close {
                top: -95px;
                right: 59px;
                opacity: 0;
            }

            .el-upload-list__item-status-label {
                top: -100px;
                right: 59px;
                opacity: 0;
                display: block;
            }
        }

        /deep/.el-upload {
            position: relative;
            width: 500px;
            height: 250px;
            border: 2px dashed #d9d9d9;
            border-radius: 6px;

            .el-upload-list__item-name {
                margin: 0;
            }

            &:hover {
                border-color: #1175d2;
            }

            .scimg {
                position: absolute;
                left: 51%;
                top: 46%;
                transform: translate(-50%, -50%);
            }

            .el-upload__text {
                position: absolute;
                left: 50%;
                top: 70%;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                color: #f99400;
                font-size: 16px;

            }
        }

        .el-upload__tip1 {
            width: 500px;
            margin: 0;
            text-align: center;
            font-size: 14px;
            color: #333333;
            margin-top: -14px;
        }
    }

    /deep/.el-button {
        padding: 0px;
        width: 140px;
        height: 36px;
        border: none;
        font-size: 16px;
    }

    // 按钮
    .elrowone {
        // float: left;
        margin-left: 30px;
        margin-top: 130px;
        margin-bottom: 30px;

        .el-button {
            margin-right: 30px;
        }

        .quxbut {
            background: none !important;
            border: 1px solid #1175d2;
            color: black;
        }
    }

    /deep/.el-form-item {
        color: black;
        font-weight: 600;
        margin-bottom: 25px;

        .el-input input {
            border: 1px solid #1175d2;
        }
    }

    /deep/.el-form-item__label {
        text-align: center;
        font-size: 16px;
        padding-right: 0px;
        text-align: left;
        // margin-right:40px;
    }

    /deep/.el-form-item__content {
        // margin-left:40px !important;
    }

    /deep/.huangzname .el-form-item__content {
        width: 400px;
    }

    /deep/.huangzname {
        padding-top: 36px;
        box-sizing: border-box;
    }

    /deep/.jiuzyy .el-input--suffix .el-input__inner {
        width: 400px;
    }

    /deep/.shdz .el-input--suffix .el-input__inner {
        width: 800px;
    }

    /deep/.csrq .el-form-item__content .el-input {
        width: auto;
    }

    /deep/.csrq .ipt1 .el-input__inner {
        font-weight: 400 !important;
        width: 100px;
        margin-right: 10px;
        text-align: center;
    }

    /deep/.csrq .ipt2 .el-input__inner {
        font-weight: 400 !important;
        width: 80px;
        margin-right: 10px;
        margin-left: 30px;
        text-align: center;
    }

    /deep/.csrq .ipt3 .el-input__inner {
        font-weight: 400 !important;
        width: 80px;
        margin-right: 10px;
        margin-left: 30px;
        text-align: center;
    }

    /deep/.csrq span {
        font-weight: 400 !important;
    }

    /deep/.huodxs .el-textarea__inner {
        width: 800px;
        height: 150px;
        outline: none;
        resize: none;
        font-size: 16px;
        border: 1px solid #1175d2;
    }

    /deep/.el-form {
        padding-left: 80px;
    }

    /deep/.asflei .el-radio-button {
        // margin-right:34px;
    }

    /deep/.asflei .el-radio-button__inner {
        padding: 0px;
        line-height: 30px;
        width: 100px;
        height: 30px;
        margin-right: 25px;
        border: 1px solid #1175d2;
        border-radius: 4px;
        box-shadow: none;
    }

    /deep/.duoxuanfl .el-checkbox-button__inner {
        line-height: 30px;
        width: 100px;
        height: 30px;
        padding: 0px;
        margin-right: 25px;
        border: 1px solid #1175d2;
        border-radius: 4px;
        box-shadow: none;
    }

    /deep/.xingbtit .el-form-item__label {
        letter-spacing: 30px;
        padding: 0px;
        text-align: left;
    }

    // 性别
    /deep/.el-radio__inner {
        border: 1px solid #1175d2 !important;
        width: 20px;
        height: 20px;
    }

    // 新增
    /deep/.el-select .el-input .el-select__caret {
        color: #1175d2;
        font-size: 20px;
        font-weight: 1000;
        // el-icon-caret-bottom
    }

    /deep/.el-icon-arrow-up:before {
        content: "\e6e1";
    }

    @media screen and (max-width: 1660px) {
        /deep/.asflei .el-radio-button__inner {
            margin-right: 10px;
        }

        /deep/.duoxuanfl .el-checkbox-button__inner {
            margin-right: 10px;
        }
    }
    /deep/ .el-upload-list__item-name {
       margin-right: 0;
    }
</style>