<template>
    <el-dialog :visible.sync="dialogFormVisible" :lock-scroll="false" @open="dia" @close="dia2">
        <div class="content">
            <div class="content-detail">
                <div class="text">
                    <p>如果你想为患者提供所有矫治器的佩戴日期表,请输入佩戴的起始日期/步骤以及 佩戴天数,我们会自动帮你生成表格,可以点击下载至本地查看。</p>
                    <p>请注意,本功能仅为您和你的患者使用。正丽科技提供的实际治疗计划不会改变。</p>
                </div>
                <div class="process">
                    <p>矫治器佩戴日期表</p>
                    <img :src="require('@/assets/1顶部导航/切图_06.png')" alt />
                </div>
                <!-- 表单输入 -->
                <el-form :label-position="labelPosition" label-width="180px" :model="formLabelAlign">
                    <el-form-item label="起始日期">
                        <!-- <el-input v-model="formLabelAlign.name" class="riqi"></el-input> -->
                        <div class="block">
                            <!-- <span class="demonstration">默认</span> -->
                            <el-date-picker v-model="formLabelAlign.name" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="开始矫治器的步骤">
                        <el-input 
                        v-model="formLabelAlign.region" 
                        oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                        <p class="buzhou">(患者即将佩戴的下一步矫治器步数)</p>
                    </el-form-item>
                    <el-form-item label="最后的矫治器步数">
                        <el-input 
                        v-model="formLabelAlign.type"
                        oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item label="每副矫治器佩戴天数">
                        <el-input 
                        v-model="formLabelAlign.day" class="liru"
                        oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                        <p class="buzhou">(例如：14)</p>
                    </el-form-item>
                </el-form>
                <!-- 表格 -->
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="num" label="矫治器副数" min-width="50%" class="left"></el-table-column>
                    <el-table-column prop="date" label="开始佩戴日期" min-width="50%"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="download">
            <el-button @click="donwExcel" type="primary" style="line-height:11px;width:94px;height:42px">
                下载
                <el-image :src="require('@/assets/2.2病例详情/下载按钮图标.png')"></el-image>
            </el-button>
            <el-button @click="tableDataFn" type="primary"
                style="line-height:22px;width:94px;height:42px;margin-right:70px;padding-left: 13px;">
                生成表格
            </el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {
        dateToStr_
    } from '@/util/validate.js'
    export default {
        components: {},
        data() {
            return {
                value1: '',
                dialogFormVisible: false,
                labelPosition: "left",
                formLabelAlign: {
                    name: "",
                    region: "",
                    type: ""
                },
                tableData: [],

            };
        },
        created() {},
        methods: {
            openDialog() {
                if (!this.dialogFormVisible) {
                    console.log(this.dialogFormVisible);
                    this.dialogFormVisible = true;
                }
            },
            dia() {
                //   this.dialogFormVisible = false;
                // document.body.style.overflow='hidden';
                // document.getElementsByTagName('html')[0].style.overflow='hidden';
            },
            dia2() {
                var that = this;

                setTimeout(function () {
                    that.dialogFormVisible = false;
                }, 30);
                //   document.body.style.overflow = "auto";
                //   document.getElementsByTagName("html")[0].style.overflow = "auto";
            },
            disposeDate(date, day) {
                console.log(date);
                let fnDate = new Date(date);
                let nowDate = fnDate.setDate(fnDate.getDate() + day);
                return dateToStr_(new Date(nowDate));
            },
            tableDataFn() {
                this.tableData = [];
                this.$set(this.tableData)
                let date =this.formLabelAlign.name.getTime(); //传入的时间
                let start = this.formLabelAlign.region // 开始
                let end = this.formLabelAlign.type // 结束
                let day = this.formLabelAlign.day // 天数
                let length = end - start + 1; //时间差
                for (let i = start, k = 0; k < length; i++, k++) {
                    this.tableData.push({
                        num: Number(i),
                        date: this.disposeDate(date, k * day),
                    })
                }
            },
            donwExcel() {
                this.$http({
                    url: "/caseInfo/getProces",
                    method: "POST",
                    data: {
                        startTime: this.formLabelAlign.name.getTime(), //起始日期
                        startSteps: this.formLabelAlign.region, //开始矫治器的步骤
                        endSteps: this.formLabelAlign.type, //最后矫治器的步骤
                        days: this.formLabelAlign.day, //每副矫治器的天数
                    }

                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        let _C = data.data
                        let a = document.createElement("a"); // 生成一个a元素
                        let event = new MouseEvent("click"); // 创建一个单击事件
                        a.download = _C; // 设置图片名称
                        a.href = _C; // 将生成的URL设置为a.href属性
                        a.dispatchEvent(event); // 触发a的单击事件
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    };
</script>
<style lang="less" scoped>
    /*滚动条 start*/
    ::-webkit-scrollbar {
        width: 20px;
        height: 1px;
        background-color: #f5f5f5;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border: 1px solid #dcdcdc;
        background: #fff;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #dfe0e2;
    }

    /deep/.el-dialog__headerbtn .el-dialog__close {
        color: #000;
        font-size: 18px;
    }

    .block {
        /deep/ .el-input {
            width: 100%;

            .el-input__inner {
                padding-left: 34px;

                div {
                    line-height: 100%;
                }
            }
        }

        /deep/ .el-input__icon {
            line-height: 33px;
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

    .el-dialog__wrapper {
        height: auto !important;
    }

    /deep/ .el-dialog {
        width: 52%;
        height: 70%;
        // margin-top: 0 !important;
        // top: 50%;
        // transform: translateY(-50%);
        overflow: hidden;

        .content {
            width: 90%;
            height: 75%;
            position: absolute;
            left: 50%;
            top: 40px;
            transform: translate(-50%);
            border: 1px solid #e2e2e2;
            overflow: auto;

            div {
                line-height: 32px;
            }
        }

        .download {
            width: 90%;
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translate(-50%);

            p {
                font-size: 16px;
                line-height: 36px;
                position: absolute;
                left: 50%;
                transform: translate(-50%);
            }

            .el-button {
                font-size: 16px;
                float: right;
            }
        }
    }

    .operator {
        padding-bottom: 30px;
    }

    /deep/.el-dialog__header,
    /deep/.el-dialog__body {
        padding-left: 40px;
    }

    .text p {
        font-size: 14px;
        color: #333333;
        padding: 3px 0;
    }

    .content-detail {
        width: 90%;
        margin: 0 auto;
        padding-top: 10px;
    }

    .process {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        background: rgb(86, 87, 89);
        line-height: 40px;

        p {
            font-size: 16px;
            font-weight: 700;
            color: whitesmoke;
            margin-left: 20px;
        }

        img {
            width: 106px;
            height: 18px;
            margin: 10px 20px 0 0;
        }
    }

    /deep/.el-form-item__label {
        color: #000000;
        font-size: 14px;
        font-weight: 700;
    }

    /deep/.el-input__inner {
        width: 60%;
        height: 30px;
        line-height: 30px;
        border-radius: 0;
        border: 1px #333333 solid;
        padding-left: 8px;
    }

    /deep/.el-form {
        margin-top: 20px;
    }

    .buzhou {
        color: #333333;
        font-size: 14px;
        height: 12px;
        margin-top: -10px;
        margin-bottom: 3px;
    }

    // .riqi::after {
    //     content: "(日日/月月/年年年年)";
    //     font-size: 14px;
    //     color: #333333;
    //     margin-left: 5px;
    // }


    /deep/.is-leaf {
        background: rgb(86, 87, 89);
        text-align: center;
        color: white;
    }

    /deep/.el-table__row {
        color: #333333;
        background: rgb(236, 244, 251);
        height: 100%;
    }

    /deep/.el-table__row .cell {
        color: #333333;
        background: rgb(236, 244, 251);
        height: 100%;
        text-align: center;
    }
</style>