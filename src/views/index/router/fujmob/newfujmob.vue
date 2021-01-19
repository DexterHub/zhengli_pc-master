<template>
    <div class="hoxuxinjian">
        <div class="hoxuxinjian-nav">
            <p class="tit">新建附件模板</p>

            <el-form class ref="form" :model="form" label-width="117px">
                <el-form-item class="xuanzheyag qqq" label="选择牙弓">
                    <el-radio-group v-model="form.yag" @change="choise">
                        <el-radio :label="1">双颌</el-radio>
                        <el-radio :label="2">上颌</el-radio>
                        <el-radio :label="3">下颌</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :class="[{'qqq':true},{'shulian':true},{'borderbottom':flag3}]" label="上颌数量"
                    v-show="flag1">
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="form.name1"></el-input>
                </el-form-item>
                <el-form-item :class="[{'qqq':true},{'shulian':true},{'borderbottom':flag4}]" label="下颌数量"
                    v-show="flag2">
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="form.name2"></el-input>
                </el-form-item>
                <el-form-item class="shejshuom clearfix borderbottom qqq" label="设计说明">
                    <div class="fl Shejileft" v-show="tophe">
                        <!-- <p class="tips">上颌</p> -->
                        <el-radio-group class="clearfix" v-model="form.design1">
                            <el-radio v-for="(item,i) in shejshuom1" :key="i" class="rdoone" :label="item.id">
                                {{item.explain}}</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="fl Shejiright" v-show="bottomhe">
                        <!-- <p class="tips">下颌</p> -->
                        <el-radio-group class="clearfix" v-model="form.design2">
                            <el-radio v-for="(item,i) in shejshuom2" :key="i" class="rdoone" :label="item.id">
                                {{item.explain}}</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <div class="huoxbox2 clearfix borderbottom">
                    <div class="xiaotit">原因</div>
                    <el-input type="textarea" :rows="2" v-model="textarea" @input="fibbidface" maxlength="400">
                    </el-input>
                </div>
                <el-form-item class="diz qqq" label="收货地址">
                    <el-select v-model="form.diz">
                        <el-option v-for="(item,i) in fujmobdizhi" :key="i"
                            :label="item.country+item.province+item.city+item.area+item.address+'-'+item.deliveryName+' - ' + item.contactNumber"
                            :value="item.id"></el-option>
                    </el-select>
                    <el-button @click="newdizhibut" style="font-size:16px;width:110px;color:#1175d2;" type="text">新增地址
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-row>
            <el-button class="tijbut" type="primary" @click="submit">提交</el-button>
            <el-button @click.native="quxiao" class="quxbut" type="primary">取消</el-button>
        </el-row>

        <newsite @pushdizhishuju="mn" ref="fujsc"></newsite>
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
                fujmobdizhi: [
                    // '地址一'
                ],
                flag1: true,
                flag2: true,
                flag3: false,
                flag4: true,
                tophe: true,
                bottomhe: true,
                shejshuom1: [],
                shejshuom2: [],
                designList: [],
                input1: "",
                input2: "",
                textarea: "",
                form: {
                    yag: 1,
                    diz: "",
                    design1: "",
                    design2: "",
                    name1: "",
                    name2: "",
                },
                httpflag: true,
            };
        },
        created() {
            this.all(1);
            this.addreslist();
        },
        methods: {
            // 路由 tab 切换
            changeURl() {
                this.$router.push("./record");
                this.$store.commit("indexAdd", ["发货记录", "/fujmob/record"]);
            },
            // 新建附件模板接口
            submit() {
               
                if (!this.httpflag) return;
                this.httpflag = false;
                // 判断必填项
                if (
                    this.form.yag === 1 &&
                    (
                        this.form.name1 === "" ||
                        this.form.name2 === "" ||
                        this.form.design1 === "" ||
                        this.form.design2 === ""
                    )
                ) {
                    this.$message({
                        message: "请输入上下颌数量和选择上下颌设计说明",
                        type: "error",
                        duration: 1000,
                        onClose: () => {
                            this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        },
                    });
                    return;
                }
                if (
                    this.form.yag === 2 &&
                    (this.form.name1 === "" || this.form.design1 === "")
                ) {
                    this.$message({
                        message: "请输入上颌数量和选择上颌设计说明",
                        type: "error",
                        duration: 1000,
                        onClose: () => {
                            this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        },
                    });
                    return;
                }
                if (
                    this.form.yag === 3 &&
                    (this.form.name2 === "" || this.form.design2 === "")
                ) {
                    this.$message({
                        message: "请输入下颌数量和选择下颌设计说明",
                        type: "error",
                        duration: 1000,
                        onClose: () => {
                            this.httpflag = true;
                            this.visible = false;
                            this.$emit("refreshDataList");
                        },
                    });
                    return;
                }
                var abc = [];
                if (this.form.design1 !== "") {
                    abc.push({
                        id: this.form.design1
                    });
                }
                if (this.form.design2 !== "") {
                    abc.push({
                        id: this.form.design2
                    });
                }

                if (this.form.name1.length > 5) {
                    this.$message({
                        message: "上颌数量数值过大，请重新输入",
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
                if (this.form.name2.length > 5) {
                    this.$message({
                        message: "下颌数量数值过大，请重新输入",
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
                if (this.form.diz === "") {
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
                    return false;
                }
                this.LoadingOpen();
                this.$http({
                        url: "/attachmentTemplate/createAttachmentTemplate",
                        method: "POST",
                        data: {
                            dentalArch: this.form.yag, //选择类型
                            upper: Number(this.form.name1), //上颌数量
                            lower: Number(this.form.name2), //下颌数量
                            addressId: this.form.diz, //收货地址ID
                            caseInfoId: this.$store.state.caseId, //病例ID
                            stageName: this.$store.state.stageNameId, //病例阶段
                            stageCount: this.$store.state.stageCountId, //阶段次数
                            designExplains: abc,
                            reason: this.textarea
                                .replace(/\r\n/g, "<br/>")
                                .replace(/\n/g, "<br/>")
                                .replace(/\s/g, "&nbsp;"),
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
                                },
                            });
                        }
                        this.httpflag = true;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            // 取消按钮 回退 tab
            quxiao() {
                this.$router.push("./index");
                this.$store.commit("indexRemove", 3);
            },
            // 根据用户选择全颌，上颌，下颌渲染数据
            choise(value) {
                if (value === 1) {
                    this.flag1 = true;
                    this.flag2 = true;
                    this.flag3 = false;
                    this.flag4 = true;
                    this.tophe = true;
                    this.bottomhe = true;
                } else if (value === 2) {
                    this.flag1 = true;
                    this.flag2 = false;
                    this.flag3 = true;
                    this.flag4 = false;
                    this.tophe = true;
                    this.bottomhe = false;
                } else {
                    this.flag1 = false;
                    this.flag2 = true;
                    this.flag3 = false;
                    this.flag4 = true;
                    this.tophe = false;
                    this.bottomhe = true;
                }
                // this.all(value);
                // console.log(this.form.yag)
            },
            // 全颌，上颌，下颌渲染数据接口
            all(num) {
                this.$http({
                        url: "/attachmentTemplate/designExplains",
                        method: "get",
                        params: {
                            dentalArch: num,
                        },
                    })
                    .then(({
                        data
                    }) => {
                        // console.log(data)
                        if (data.code == 200) {
                            console.log(JSON.parse(data.data));
                            data = JSON.parse(data.data);
                            this.shejshuom1 = data.slice(0, 3);
                            this.shejshuom2 = data.slice(3, data.length);
                        } else {}
                    })
                    .catch((err) => {
                        console.log(err);
                    });
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
                this.$refs.fujsc.dialogFormVisibledizhi = true;
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
                            // this.fujmobdizhi =[];
                            this.fujmobdizhi = JSON.parse(data.data);
                            // console.log(JSON.parse(data.data))
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
    /deep/.el-form-item__label {
        font-weight: 600;
        color: black;
        font-size: 16px;
    }

    /deep/.diz .el-form-item__label {
        line-height: 40px !important;
    }

    /deep/.tijbut {
        font-size: 16px;
    }

    .qqq {
        /deep/ .el-form-item__label::after {
            content: "*";
            font-size: 16px;
            color: #ff0000;
            font-weight: 900;
        }
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

        .huoxbox2 {

            div,
            .el-input {
                float: left;
            }

            /deep/.el-textarea {
                width: 800px;
                height: 200px;

                .el-textarea__inner {
                    width: 100%;
                    height: 100%;
                    resize: none;
                    border: 1px solid #1175d2;
                }
            }
        }

        .el-radio-group {
            margin-right: 20px;
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
            font-weight: 600;
            letter-spacing: 30px;
        }

        /deep/.el-form {
            padding-bottom: 50px;

            .shejshuom {
                padding-top: 10px;
                padding-bottom: 30px;

                .Shejileft {
                    width: 45%;
                    margin-right: 5%;
                }

                .Shejiright {
                    width: 45%;
                }

                .tips {
                    font-size: 16px;
                    color: #1175d2;
                    float: left;
                    margin-top: -10px;
                }

                .el-radio-group {
                    float: left;
                    width: 85%;
                    margin-left: 20px;

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

            .xuanzheyag {
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
                vertical-align: middle;

                .el-input__inner {
                    width: 80px;
                    height: 40px;
                    text-align: center;
                }

                .el-form-item__label {
                    line-height: 40px !important;
                    // letter-spacing: 30px;
                }
            }

            .el-form-item__label {
                padding: 0px;
                text-align: left;
                line-height: normal;
            }

            .el-select {
                // margin-left: 37px;
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

        .shejshuom {
            .el-radio-group {
                .el-radio {
                    white-space: normal;
                }
            }
        }
    }
</style>