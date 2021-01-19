<template>
    <div class="hoxuxinjian">
        <div class="hoxuxinjian-nav">
            <p class="tit">后续生产</p>
            <div class="huoxbox1 clearfix">
                <div class="xiaotit qqq">上颌选择步数</div>
                <div class="xuanzbusbox1">
                    <el-input class="inputone" oninput="value=value.replace(/[^\d]/g,'')" v-model="input1"></el-input>
                    <span>步</span>
                </div>
                <div>
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="input2"></el-input>
                    <span>步</span>
                </div>
            </div>
            <div class="huoxbox1 clearfix borderbottom" style="margin-top:50px">
                <div class="xiaotit qqq">下颌选择步数</div>
                <div class="xuanzbusbox1">
                    <el-input class="inputone" oninput="value=value.replace(/[^\d]/g,'')" v-model="input3"></el-input>
                    <span>步</span>
                </div>
                <div>
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="input4"></el-input>
                    <span>步</span>
                </div>
            </div>
            <div class="huoxbox2 clearfix borderbottom">
                <div class="xiaotit beizhu">备注</div>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" @input="fibbidface"
                    maxlength="400"></el-input>
            </div>

            <el-form class ref="form" :model="form" label-width="80px">
                <el-form-item class="diz qqq3" label="收货地址">
                    <el-select v-model="form.diz" placeholder="请选择活动区域">
                        <el-option v-for="(item,i) in hoxudizhi" :key="i"
                            :label="item.country+item.province+item.city+item.area+item.address+' - '+item.deliveryName + ' - ' + item.contactNumber"
                            :value="item.id"></el-option>
                    </el-select>
                    <el-button @click="newdizhibut" style="font-size:16px;width:110px;color:#1175d2;" type="text">新增地址
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-row>
            <el-button @click="submit" class="tijbut" type="primary">提交</el-button>
            <el-button @click.native="quxiao" class="quxbut" type="primary">取消</el-button>
        </el-row>

        <newsite @pushdizhishuju="mn" ref="hoxusc"></newsite>
    </div>
</template>
<script>
    import newsite from "@/views/newtangc/newsite";
    export default {
        components: {
            newsite,
        },
        data() {
            return {
                hoxudizhi: [],
                input1: "",
                input2: "",
                input3: "",
                input4: "",
                textarea: "",
                form: {
                    diz: "",
                },
                httpflag: true,
            };
        },
        created() {
            this.addreslist();
        },
        methods: {
            submit() {
               
                if (!this.httpflag) return;
                this.httpflag = false;
                if (Number(this.input2) - Number(this.input1) < 0) {
                    this.$message({
                        message: "请输入正确的上颌步数",
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                             this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        },
                    });
                    return false;
                }
                if (Number(this.input4) - Number(this.input3) < 0) {
                    this.$message({
                        message: "请输入正确的下颌步数",
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                             this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        },
                    });
                    return false;
                }
                if (!this.form.diz) {
                    this.$message({
                        message: "请选择收货地址",
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                            this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        },
                    });
                    return;
                }
                if (!this.input1 || !this.input2) {
                    this.$message({
                        message: "请选择上牙步数",
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                             this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        },
                    });
                    return;
                }
                if (!this.input3 || !this.input4) {
                    this.$message({
                        message: "请选择下牙步数",
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                             this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        },
                    });
                    return;
                }
                this.LoadingOpen();
                this.$http({
                        url: "/production/deliverGoodsApply",
                        method: "POST",
                        data: {
                            caseInfoId: this.$store.state.caseId, //病例ID
                            stageName: this.$store.state.stageNameId, //病例阶段
                            stageCount: this.$store.state.stageCountId, //阶段次数
                            upperStart: Number(this.input1),
                            upperEnd: Number(this.input2),
                            lowerStart: Number(this.input3),
                            lowerEnd: Number(this.input4),
                            remark: this.textarea
                                .replace(/\r\n/g, "<br/>")
                                .replace(/\n/g, "<br/>")
                                .replace(/\s/g, "&nbsp;"),
                            addressId: this.form.diz,
                        },
                    })
                    .then(({
                        data
                    }) => {
                        this.LoadingClose();
                        if (data.code == 200) {
                            this.$message({
                                message: "保存成功",
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                },
                            });
                            this.$store.commit("indexRemove", 3);
                            this.$router.push("./index");
                        } else {
                            this.$message({
                                message: data.msg,
                                type: "error",
                                duration: 1500,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                },
                            });
                        }
                        this.httpflag = true;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            quxiao() {
                this.$router.push("./index");
                this.$store.commit("indexRemove", 3);
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
            // 新增地址
            newdizhibut() {
                this.$refs.hoxusc.dialogFormVisibledizhi = true;
            },
            // 地址列表
            addreslist() {
                this.$http({
                        url: "/deliveryAddress/getAddressList",
                        method: "get",
                    })
                    .then(({
                        data
                    }) => {
                        // console.log(data)
                        if (data.code == 200) {
                            // this.hoxudizhi =[];
                            this.hoxudizhi = JSON.parse(data.data);
                        } else {}
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            mn() {
                this.addreslist();
            },
        },
    };
</script>
<style scoped lang="less">
    .qqq {
        position: relative;

        &::after {
            content: "*";
            font-size: 16px;
            color: #ff0000;
            font-weight: 900;
            margin-left: 2px;
        }
    }

    .qqq3 {
        position: relative;

        &::after {
            content: "*";
            font-size: 16px;
            color: #ff0000;
            font-weight: 900;
            position: absolute;
            left: 65px;
            top: 8px;
        }
    }

    /deep/.el-form-item__label {
        font-weight: 600;
        color: black;
    }

    /deep/.diz .el-form-item__label {
        font-weight: 600;
        font-size: 16px;
    }

    /deep/.tijbut {
        font-size: 16px;
    }

    /deep/.beizhu {
        letter-spacing: 30px;
    }

    .hoxuxinjian {
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
            font-weight: 600;
            font-size: 16px;
            line-height: 40px;
        }

        .huoxbox1 {
            >div {
                float: left;

                span {
                    padding-left: 10px;
                    padding-right: 10px;
                }
            }

            /deep/.el-input__inner {
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

        .huoxbox2 {

            div,
            .el-input {
                float: left;
            }

            /deep/.el-textarea {
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

        /deep/.el-form {
            padding-bottom: 50px;

            .el-form-item__label {
                padding: 0px;
                text-align: left;
            }

            .el-select {
                margin-left: 37px;
            }

            .el-input__inner {
                width: 800px;
                height: 40px;
                border: 1px solid #1175d2;
            }
        }
    }

    /deep/.el-button {
        padding: 0px;
        width: 140px;
        height: 36px;
    }
</style>
<style lang="less" scoped>
    // 适配
    @media screen and (min-width: 1660px) {}

    @media screen and (max-width: 1660px) {}

    @media screen and (max-width: 1360px) {
        .hoxuxinjian {
            .huoxbox2 {
                /deep/.el-textarea {
                    width: 750px;
                }
            }
        }

        /deep/.el-form {
            .el-input {
                .el-input__inner {
                    width: 750px;
                }
            }
        }
    }

    @media screen and (max-width: 1200px) {
        .hoxuxinjian {
            .huoxbox2 {
                /deep/.el-textarea {
                    width: 600px;
                }
            }
        }

        /deep/.el-form {
            .el-input {
                .el-input__inner {
                    width: 600px;
                }
            }
        }

        .hoxuxinjian-nav {
            padding-left: 35px !important;
        }
    }
</style>