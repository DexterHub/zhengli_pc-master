<template>
    <div class="bzjzqxj">
        <div class="hoxuxinjian-nav">
            <p class="tit">备用矫治器</p>

            <el-form class ref="form" :model="form" label-width="83px">
                <el-form-item label-width="117px" class="xuanzheyag qqq2" label="选择牙弓">
                    <el-radio-group v-model="form.yag" @change="ygChange">
                        <el-radio label="双颌"></el-radio>
                        <el-radio label="上颌"></el-radio>
                        <el-radio label="下颌"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="huoxbox1 clearfix " v-if="form.yag == '上颌' || form.yag == '双颌' || !form.yag">
                    <div style="margin-top:10px;" class="xiaotit qqq">选择上颌步数</div>
                    <div class="xuanzbusbox1">
                        <el-input class="inputone" oninput="value=value.replace(/[^\d]/g,'')" v-model="input1">
                        </el-input>
                        <span>步</span>
                    </div>
                    <div>
                        <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="input2" @input="numberqvb">
                        </el-input>
                        <span>步</span>
                    </div>
                </div>
                <div class="huoxbox1 clearfix" v-if="form.yag == '下颌' || form.yag == '双颌' || !form.yag"
                    style="margin-top: 20px">
                    <div style="margin-top:10px;" class="xiaotit qqq">选择下颌步数</div>
                    <div class="xuanzbusbox1">
                        <el-input class="inputone" oninput="value=value.replace(/[^\d]/g,'')" v-model="input3">
                        </el-input>
                        <span>步</span>
                    </div>
                    <div>
                        <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="input4" @input="numberqvq">
                        </el-input>
                        <span>步</span>
                    </div>
                </div>
                <el-form-item class="shulian borderbottom qqq3" label="数量">
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" :value="form.name" disabled></el-input>
                </el-form-item>
                <div class="huoxbox2 clearfix borderbottom">
                    <div class="xiaotit yany">原因</div>
                    <el-input type="textarea" :rows="2" v-model="textarea" @input="fibbidface" maxlength="400">
                    </el-input>
                    <div class="tupscbox clearfix">
                        <el-upload class="avatar-uploader" action :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="textbox">
                            <p class="p1">*建议将损坏矫治器拍照上传</p>
                            <p class="p2">支持JPG、PNG格式图片</p>
                        </div>
                    </div>
                </div>

                <el-form-item class="diz qqq5" label="收货地址">
                    <el-select v-model="form.diz" @change="getAddressId">
                        <el-option v-for="(dz, i) in jiaozhiqdizhi" :key="i" :label="dz.address" :value="dz.address">
                        </el-option>
                    </el-select>
                    <el-button @click="newjiaozhiqidizhi" style="font-size:16px;width:110px;color:#1175d2;" type="text">
                        新增地址
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-row>
            <el-button @click.native="tijiao" class="tijbut" type="primary">提交</el-button>
            <el-button @click.native="quxiao" class="quxbut" type="primary">取消</el-button>
        </el-row>

        <newsite @pushdizhishuju="pushdizhishuju" ref="jiaozhiqi"></newsite>
    </div>
</template>
<script>
    import newsite from "@/views/newtangc/newsite";
    export default {
        components: {
            newsite
        },
        data() {
            return {
                jiaozhiqdizhi: [],
                input1: "",
                input2: "",
                input3: "",
                input4: "",
                textarea: '',
                form: {
                    yag: "双颌",
                    shul: "",
                    diz: "",
                    resource: "",
                    amount: "",
                    name: ""
                },
                addressId: '',
                // 照片上传
                imageUrl: require("@/assets/3新建病例/牙况照片/正面咬合-75.png"),
                imgFile: "",
                httpflag:true,
            };
        },

        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                var that = this;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    var base64 = reader.result;
                    that.imageUrl = base64;
                    that.imgFile = file;
                };
                return false;
            },
            // 禁止输入表情
            fibbidface(value) {
                var html = value,
                    oldHtml = "";
                oldHtml = html;
                var reg =
                    /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
                if (html.match(reg)) {
                    html = html.replace(reg, "");
                }

                if (html != oldHtml) {
                    this.textarea = html;
                }
            },
            // 数量填入
            numberqvb(value) {

                if (this.form.yag == '上颌' || this.form.yag == '下颌') {
                    this.form.name = (this.input2 - this.input1) + (this.input4 - this.input3) + 1;
                } else {
                    this.form.name = (this.input2 - this.input1 + 1) + (this.input4 - this.input3 + 1);
                }
            },
            numberqvq(value) {
                if (this.form.yag == '上颌' || this.form.yag == '下颌') {
                    this.form.name = (this.input2 - this.input1) + (this.input4 - this.input3) + 1;
                } else {
                    this.form.name = (this.input2 - this.input1) + (this.input4 - this.input3) + 2;
                }
            },
            tijiao() {
                if(!this.httpflag) return;
                
      			this.httpflag = false;
                //  this.form.name=(this.input2-this.input1)+(this.input4-this.input3)+2;
                //  console.log(Number(this.form.name))
                if (Number(this.form.name) < 0) {
                    this.$message({
                        message: '请输入正确的步数',
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                            this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        }
                    });
                    return false
                }
                if (!this.addressId) {//收获地址没选
                    this.$message({
                        message: '请输入正确的收货地址',
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                            this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        }
                    });
                    return false
                }
                if (this.form.yag == "双颌" && (!this.input1 || !this.input2|| !this.input3|| !this.input4)) {//选择双颌
                    this.$message({
                        message: '请输入牙弓',
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                            this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        }
                    });
                    return false
                }
                if (this.form.yag == "上颌" && (!this.input1 || !this.input2)) {//选择上颌
                    this.$message({
                        message: '请输入上牙弓',
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                            this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        }
                    });
                    return false
                }
                 if (this.form.yag == "下颌" && (!this.input3 || !this.input4)) {//选择下颌
                    this.$message({
                        message: '请输入下牙弓',
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                            this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        }
                    });
                    return false
                }
                var dentalArch,
                    addressId = this.addressId || 0,
                    remark = this.textarea.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;'),
                    count = Number(this.form.name),
                    caseInfoId = this.$store.state.caseId,
                    stageName = this.$store.state.stageNameId,
                    stageCount = this.$store.state.stageCountId,
                    file = this.imgFile,
                    formData = new FormData(),
                    that = this;
                switch (this.form.yag) {
                    case "":
                        dentalArch = 1;
                        break;
                    case "双颌":
                        dentalArch = 1;
                        break;
                    case "上颌":
                        dentalArch = 2;
                        break;
                    case "下颌":
                        dentalArch = 3;
                        break;
                }
                //form表单
                var Obj = {
                    file,
                    caseInfoId,
                    count,
                    stageName,
                    stageCount,
                    dentalArch,
                    upperStart: dentalArch == 1 || dentalArch == 2 ?
                        that.input1 ?
                        parseInt(that.input1) :
                        0 : 0,
                    upperEnd: dentalArch == 1 || dentalArch == 2 ?
                        that.input2 ?
                        parseInt(that.input2) :
                        0 : 0,
                    lowerStart: dentalArch == 1 || dentalArch == 3 ?
                        that.input3 ?
                        parseInt(that.input3) :
                        0 : 0,
                    lowerEnd: dentalArch == 1 || dentalArch == 3 ?
                        that.input4 ?
                        parseInt(that.input4) :
                        0 : 0,
                    addressId,
                    remark
                };

                for (var k in Obj) {
                    formData.append(k, Obj[k]);
                }
                this.LoadingOpen();
                //新建保质矫治器模板
                this.$http({
                        url: "/applianceReplace/createProtectiveAppliance",
                        method: "post",
                        data: formData
                    })
                    .then(({
                        data
                    }) => {
                        this.LoadingClose();
                        if (data.code == 200) {
                            // console.log(123);
                            this.$message({
                                message: '保存成功',
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                }
                            });
                            this.$router.push("./index");
                            this.$store.commit("indexRemove", 3);
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
                        this.httpflag = true;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            quxiao() {
                this.$router.push("./index");
                this.$store.commit("indexRemove", 3);
            },
            //获取地址id
            getAddressId(e) {
                var that = this;
                this.jiaozhiqdizhi.forEach(function (el) {
                    if (el.address == e) {
                        that.addressId = el.id;
                    }
                });
            },
            // 新增地址
            newjiaozhiqidizhi() {
                this.$refs.jiaozhiqi.dialogFormVisibledizhi = true;
            },

            pushdizhishuju() {
                this.form.diz =
                    this.$refs.tanchuangdizhi.country +
                    this.$refs.tanchuangdizhi.province +
                    this.$refs.tanchuangdizhi.city +
                    this.$refs.tanchuangdizhi.area +
                    this.$refs.tanchuangdizhi.form.diz;
                this.dizshuzu.push(this.form.diz);
                console.log(this.$refs.tanchuangdizhi.form.diz);
            },

            //选择颌
            ygChange() {
                this.form.name = "";
                this.input1 = "";
                this.input2 = "";
                this.input3 = "";
                this.input4 = "";
            }
        },

        created() {
            var that = this;
            // 地址列表
            this.$http({
                    url: "/deliveryAddress/getAddressList",
                    method: "get"
                })
                .then(({
                    data
                }) => {
                    if (data.code == 200) {
                        data = JSON.parse(data.data);
                        data.forEach(function (el, idx) {
                            that.jiaozhiqdizhi.push({
                                id: el.id,
                                address: el.country + el.province + el.city + el.area + el.address +
                                    ' - ' + el.deliveryName + ' - ' + el.contactNumber
                            });
                        });
                    } else {}
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
</script>
<style scoped lang="less">
	.qqq{
		position: relative;
		&::after{
			 content: '*';
			font-size: 16px;
			color: #ff0000;
			font-weight: 900;
		}
       
	}
	.qqq2{
		position: relative;
		&::after{
			 content: '*';
			font-size: 16px;
			color: #ff0000;
			font-weight: 900;
			position: absolute;
            left:66px;
            top:-2px;
		}
    }
    .qqq3{
		position: relative;
		&::after{
			 content: '*';
			font-size: 16px;
			color: #ff0000;
			font-weight: 900;
			position: absolute;
            left:56px;
            top:7px;
		}
    }
     .qqq5{
		position: relative;
		&::after{
			 content: '*';
			font-size: 16px;
			color: #ff0000;
			font-weight: 900;
			position: absolute;
            left:64px;
            top:6px;
		}
    }
    /deep/.el-form-item__label,
    .xiaotit {
        font-weight: 600;
        color: black;
    }

    /deep/.yany {
        letter-spacing: 24px;
    }

    /deep/.tijbut {
        font-size: 16px;
    }

    .bzjzqxj {
        .el-row {
            margin-top: 20px;
            margin-bottom: 20px;

            .quxbut {
                background: none !important;
                margin-left: 30px;
                color: #333;
                font-size: 16px;
            }
        }

        /deep/.huoxbox1 {
            >div {
                float: left;

                span {
                    padding-left: 10px;
                    padding-right: 10px;
                }
            }

            .el-input__inner {
                border: 1px solid #1175d2;
                text-align: center;
            }

            .el-input {
                width: 80px;
                height: 40px;
                position: relative;
            }

            .xuanzbusbox1 {
                margin-right: 40px;
            }

            .xuanzbusbox1 .el-input::before {
                content: "";
                position: absolute;
                right: -60px;
                top: 50%;
                transform: translateY(-50%);
                width: 25px;
                height: 2px;
                background: #ccc;
            }
        }

        /deep/.huoxbox2 {
            div,
            .el-input {
                float: left;
            }

            .el-textarea {
                width: 800px;
                height: 150px;

                .el-textarea__inner {
                    width: 100%;
                    height: 100%;
                    resize: none;
                    border: 1px solid #1175d2;
                }
            }
        }

        /deep/.el-radio__inner {
            width: 20px;
            height: 20px;
        }

        .hoxuxinjian-nav {
            padding-left: 95px;
            box-sizing: border-box;
            width: 100%;
            background: #f9f9f9;
        }

        .borderbottom {
            border-bottom: 1px solid #aeaeae;
            margin-bottom: 30px;
            padding-bottom: 30px;
        }

        .tit {
            color: #1175d2;
            width: 117px;
            padding-top: 40px;
            padding-bottom: 70px;
            box-sizing: border-box;
            font-weight: 600;
            font-size: 16px;
        }

        .xiaotit {
            width: 117px;
        }

        /deep/.el-form {
            padding-bottom: 50px;

            .xuanzheyag {
                .el-form-item__label {
                    font-size: 16px;
                    color: black;
                    margin-top: -10px;
                }

                .el-radio-group {
                    .el-radio {
                        font-size: 16px;
                        color: #666666;
                        margin-bottom: 20px;

                        .el-radio__input {
                            span {
                                border: 1px solid #1175d2;
                                border-radius: 50%;
                            }
                        }
                    }
                }
            }

            .shulian {
                margin-top: 20px;
                margin-bottom: 20px;

                .el-form-item__label {
                    font-size: 16px;
                    letter-spacing: 24px;
                    color: black;
                }

                .el-input__inner {
                    width: 80px;
                    height: 40px;
                    border: 1px solid #1175d2;
                }

                .el-form-item__content {
                    .el-input {
                        margin-left: 37px;
                    }
                }
            }

            .el-form-item__label {
                padding: 0px;
                text-align: left;
                // line-height: normal;
            }

            .tupscbox {
                width: 100%;
                padding-left: 116px;
                box-sizing: border-box;
                margin-top: 20px;

                .avatar-uploader {
                    float: left;
                }

                .textbox {
                    margin-left: 30px;
                    float: left;
                    margin-top: 60px;

                    p {
                        text-align: center;
                        color: #999999;
                        font-size: 14px;
                    }
                }
            }

            .el-select {
                margin-left: 37px;
            }

            .diz {
                .el-input__inner {
                    width: 800px;
                    height: 40px;
                    border: 1px solid #1175d2;
                    font-size: 16px;
                }

                .el-form-item__label {
                    font-weight: 600;
                    font-size: 16px;
                }
            }
        }
    }

    // 文件上传css
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
        width: 120px;
        height: 150px;
        display: block;
    }

    /deep/.el-button {
        padding: 0px;
        width: 140px;
        height: 36px;
    }
</style>
// <style lang="less" scoped>
    //     // 适配
    //     @media screen and (min-width: 1660px) {}

    //     @media screen and (max-width: 1660px) {}

    //     @media screen and (max-width: 1360px) {
    //         .bzjzqxj {
    //             .huoxbox2 {
    //                 /deep/.el-textarea {
    //                     width: 750px;
    //                 }
    //             }
    //         }

    //         .bzjzqxj {
    //             /deep/.el-form {
    //                 .diz {
    //                     .el-input {
    //                         .el-input__inner {
    //                             width: 750px;
    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //     }

    @media screen and (max-width: 1200px) {
        .bzjzqxj {
            .huoxbox2 {
                /deep/.el-textarea {
                    width: 700px;
                }
            }
        }

        .bzjzqxj {
            /deep/.el-form {
                .diz {
                    .el-input {
                        .el-input__inner {
                            width: 700px;
                        }
                    }
                }
            }
        }

        .hoxuxinjian-nav {
            padding-left: 35px !important;
        }
    }
</style>