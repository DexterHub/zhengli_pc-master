<template>
    <div class="weituojiagd">
        <div class="boxCenter">
            <el-form ref="formone" label-width="80px">
                <div class="moya">
                    <!-- <p style="color:#333333; font-size:16px;font-weight:400;">中线</p> -->
                    <el-form-item label-width="120px" class="zhoxianlab danxuanfl moyabottom" label="中线">
                        <div>
                            <el-form-item label-width="40px" style="margin-bottom:20px;" class="danxuanfl" label="上颌">
                                <div>
                                    <el-radio-group @change="zhoxianshanghe" fill="#1175d2" class="asflei"
                                        v-model="radio13">
                                        <el-radio-button :disabled="tophe" label="34">保持</el-radio-button>
                                        <el-form-item label-width="50px" class="jiaozhifuhipt input3 clearfix"
                                            label="右">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="4" :disabled="tophe" @input="shangheright"
                                                        v-model="input12"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label-width="50px" class="jiaozhifuhipt input4 clearfix"
                                            label="左">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="999" :disabled="tophe" @input="shangheleft"
                                                        v-model="input11"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>

                                </div>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label-width="40px" class="danxuanfl" label="下颌">
                                <div>
                                    <el-radio-group @change="zhoxianxiahe" fill="#1175d2" class="asflei"
                                        v-model="radio14">
                                        <el-radio-button :disabled="bottomhe" label="34">保持</el-radio-button>
                                        <el-form-item label-width="50px" class="jiaozhifuhipt input3 clearfix"
                                            label="右">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="4" :disabled="bottomhe" @input="xiaheright"
                                                        v-model="input14"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label-width="50px" class="jiaozhifuhipt input4 clearfix"
                                            label="左">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input :disabled="bottomhe" @input="xiaheleft" v-model="input13">
                                                    </el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                    </el-form-item>
                </div>
                <el-form-item class="shangxiamar marginright moyabottom textleft" label="牙列间隙">
                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio15" @change="r15shij">
                        <el-radio-button @click.native.prevent="clickitem(1)" label="1">全部关闭</el-radio-button>
                        <el-radio-button @click.native.prevent="clickitem(2)" class="baoliujianxi" label="2">保留间隙
                        </el-radio-button>
                    </el-radio-group>
                    <span v-show="bbq" class="baoliujxspan">(请在附加说明中描述)</span>
                </el-form-item>
                <el-form-item class="huodxs marginright textleft" label="附加说明">
                    <el-input type="textarea" v-model="form.fjsm" @input="fibbidface2" maxlength="400"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                bbq: false,
                // 矫治目标  中线 上颌
                radio13: '',
                input11: '',
                input12: '',
                // 矫治目标  中线 下颌
                radio14: '',
                input13: '',
                input14: '',
                // 矫治目标  牙列间隙 
                radio15: 0,
                // 矫治目标  附加说明 
                form: {
                    fjsm: '',
                },


                // 下颌
                bottomhe: false,
                // 上颌
                tophe: false

            };
        },
        methods: {
            // 单选框 再次点击取消
            clickitem(e) {
                e === this.radio15 ? this.radio15 = 0 : this.radio15 = e;
                if (this.radio15 == 2) {
                    this.bbq = true
                } else {
                    this.bbq = false
                }
            },
            r15shij() {

                if (this.radio15 == 2) {
                    this.bbq = true
                } else {
                    this.bbq = false
                }
            },
            onSubmit() {
            },
            fuheaio() {
                this.input1 = '';
            },
            fuheipt() {
                this.radio6 = '';

            },
            // 禁止输入表情
            fibbidface2(value) {
                var html = value,
                    oldHtml = "";
                oldHtml = html;
                var reg =
                    /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
                if (html.match(reg)) {
                    html = html.replace(reg, '');
                }

                if (html != oldHtml) {
                    this.form.fjsm = html
                }
            },
            fugaiaio() {
                this.input2 = '';
            },
            fugaiipt() {
                this.radio7 = '';
            },

            // 中线上
            zhoxianshanghe() {
                this.input11 = '';
                this.input12 = '';
            },
            shangheleft(value) {
                 this.input11 = value.replace(/[^\d\.]/g, '')
                 if (Number(value) > 100) {
                        this.input11 = '';
                        this.$message({
                            message: '请输入0到100之内的数',
                            type: 'error',
                            duration: 2000,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        });
                }
                if(value.indexOf('.')>=0){
                    if(value.substr(value.indexOf('.')).length>2){
                        this.input11=Number(value).toFixed(1);
                    }
                }
                this.radio13 = '';
                this.input12 = '';
            },
            shangheright(value) {
                this.input12 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input12 = '';
                    this.$message({
                        message: '请输入0到100之内的数',
                        type: 'error',
                        duration: 2000,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    });
                }
                if(value.indexOf('.')>=0){
                    if(value.substr(value.indexOf('.')).length>2){
                        this.input12=Number(value).toFixed(1);
                    }
                }
                this.radio13 = '';
                this.input11 = '';
            },
            // 中线下
            zhoxianxiahe() {
                this.input13 = '';
                this.input14 = '';
            },
            xiaheleft(value) {
                this.input13 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input13 = '';
                    this.$message({
                        message: '请输入0到100之内的数',
                        type: 'error',
                        duration: 2000,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    });
                }
               if(value.indexOf('.')>=0){
                    if(value.substr(value.indexOf('.')).length>2){
                        this.input13=Number(value).toFixed(1);
                    }
                }
                this.radio14 = '';
                this.input14 = '';
            },
            xiaheright(value) {
                this.input14 = value.replace(/[^\d\.]/g, '');
                if (Number(value) > 100) {
                    this.input14 = '';
                    this.$message({
                        message: '请输入0到100之内的数',
                        type: 'error',
                        duration: 2000,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    });
                }
                if(value.indexOf('.')>=0){
                    if(value.substr(value.indexOf('.')).length>2){
                        this.input14=Number(value).toFixed(1);
                    }
                }
                this.radio14 = '';
                this.input13 = '';
            }
        }
    }
</script>
<style scoped lang="less">
    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
         /deep/.el-radio-button__inner {
            line-height: 38px !important;
        }
    }
    /deep/.baoliujxspan {
        margin-left: -10px;
        color: #333333;
        font-size: 14px;
    }

    /deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background: #1175d2;
    }

    /deep/.baoliujianxi .el-radio-button__inner {
        position: relative;
    }

    .el-form {
        padding-left: 80px;
        padding-top: 36px;
        box-sizing: border-box;
    }

    // 取消单选框盒子阴影
    /deep/.el-radio-button {
        box-shadow: none !important;
    }

    /deep/.is-active {
        box-shadow: none;
    }

    /deep/.el-form-item__label {
        color: #333333 !important;
    }

    /deep/.zhoxianlab {

        .el-form-item__content {
            // margin-left:75px !important;
        }

        >.el-form-item__label {
            text-align: left;
            font-size: 16px;
            font-weight: 400;
            position: relative;
            letter-spacing: 33px;

            &::before {
                content: "*";
                font-weight: 900;
                font-size: 16px;
                color: #ff0000;
                position: absolute;
                right: 44px;
                top: -5px;
                letter-spacing: 0px;
            }
        }
    }

    .weituojiagd {

        /deep/.marginright {
            .el-form-item__label {
                margin-right: 42px;
            }
        }

        /deep/.moyabottom {
            margin-bottom: 50px;
        }

        /deep/.textleft {

            >.el-form-item__label {
                text-align: left;
                font-size: 16px;
                font-weight: 400;
            }
        }

        .boxCenter {
            height: 682px;
            box-sizing: border-box;

            /deep/.asflei .el-radio-button__inner {
                padding: 0px;
                line-height: 30px;
                width: 100px;
                height: 30px;
                margin-right: 25px;
                border: 1px solid #1175d2;
                border-radius: 5px;
                box-shadow: none;
            }

            /deep/.el-radio-button span {
                padding: 0px;
                line-height: 30px;
                width: 100px;
                height: 30px;
                margin-right: 25px;
                border: 1px solid #1175d2;
                border-radius: 5px;
                box-shadow: none;
            }

            /deep/.jiaozhilefbut {
                float: left;
            }

            /deep/.jiaozhifuhipt {
                position: relative;
                margin-left: -37px;
                margin-top: -5px;
                float: left;
                display: table-cell;
                vertical-align: bottom;

                .el-form-item__label {
                    margin-right: 0px;
                }

                .el-input__inner {
                    height: 30px;
                    width: 50px;
                    border: 1px solid #1175d2;
                    padding: 0px;
                    text-align: center;
                    line-height: 30px;
                }

                span {
                    margin-left: 10px;
                    font-weight: 400;
                }

                .mm {
                    position: absolute;
                    top: 8px;
                }

            }

            .input3 {
                float: right;
                margin-left: 45px;
            }

            .input4 {
                float: right;
                margin-left: -20px;
            }

            .moya {
                width: 100%;
            }

            /deep/.yactop {
                /deep/.boxnav {
                    // width: 100%;
                    // margin-top: 300px;
                    margin-left: -240px;
                    margin-top: 30px;
                    transform: scale(0.6);
                    font-size: 20px;

                    .list1 {
                        display: inline-block;
                        margin-left: 148px;

                        .item {
                            // width:60px;
                            height: 1px;
                            position: relative;
                            float: left;
                            margin-right: 5px;

                            .boximg {
                                // width:100%;
                                height: 100%;
                                position: relative;

                                img {
                                    display: block;
                                    position: absolute;
                                    bottom: 0px;
                                }
                            }

                            .boxtext {
                                text-align: center;
                            }
                        }
                    }

                    .zhoxian::before {
                        content: "";
                        width: 2px;
                        height: 75px;
                        background: #333333;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }

                    .zhoxian {
                        position: relative;
                        width: 960px;
                        height: 2px;
                        background: #333333;
                        margin-left: 145px;
                        margin-top: 41px;
                        margin-bottom: 20px;

                        .yacright {
                            position: absolute;
                            left: -35px;
                            top: 50%;
                            transform: translateY(-50%);
                        }

                        .yacleft {
                            position: absolute;
                            right: -35px;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }

                    .list2 {
                        display: inline-block;
                        margin-left: 140px;

                        .item {
                            // width:60px;
                            height: 100px;
                            position: relative;
                            float: left;
                            margin-right: 5px;

                            .boximg {
                                // width:100%;
                                height: 100%;
                                position: relative;

                                img {
                                    display: block;
                                    position: absolute;
                                    top: 0px;
                                }
                            }

                            .boxtext {
                                text-align: center;
                            }
                        }
                    }
                }

                .toptext {
                    p {
                        float: left;
                        margin-right: 20px;

                        span {
                            color: #d85959;
                        }
                    }

                    .title {
                        font-weight: 400;
                        font-size: 16px;
                        margin-right: 40px;
                    }

                }
            }

            /deep/.yacbottom {
                border-bottom: 1px solid #aeaeae;
                margin-bottom: 40px;

                /deep/.boxnav {
                    // width: 100%;
                    // margin-top: 300px;
                    margin-left: -240px;
                    margin-top: 30px;
                    transform: scale(0.6);
                    font-size: 20px;

                    .list1 {
                        display: inline-block;
                        margin-left: 148px;

                        .item {
                            // width:60px;
                            height: 1px;
                            position: relative;
                            float: left;
                            margin-right: 5px;

                            .boximg {
                                // width:100%;
                                height: 100%;
                                position: relative;

                                img {
                                    display: block;
                                    position: absolute;
                                    bottom: 0px;
                                }
                            }

                            .boxtext {
                                text-align: center;
                            }
                        }
                    }

                    .zhoxian::before {
                        content: "";
                        width: 2px;
                        height: 75px;
                        background: #333333;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }

                    .zhoxian {
                        position: relative;
                        width: 960px;
                        height: 2px;
                        background: #333333;
                        margin-left: 145px;
                        margin-top: 41px;
                        margin-bottom: 20px;

                        .yacright {
                            position: absolute;
                            left: -35px;
                            top: 50%;
                            transform: translateY(-50%);
                        }

                        .yacleft {
                            position: absolute;
                            right: -35px;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }

                    .list2 {
                        display: inline-block;
                        margin-left: 140px;

                        .item {
                            // width:60px;
                            height: 100px;
                            position: relative;
                            float: left;
                            margin-right: 5px;

                            .boximg {
                                // width:100%;
                                height: 100%;
                                position: relative;

                                img {
                                    display: block;
                                    position: absolute;
                                    top: 0px;
                                }
                            }

                            .boxtext {
                                text-align: center;
                            }
                        }
                    }
                }

                .toptext {
                    p {
                        float: left;
                        margin-right: 20px;

                        span {
                            color: #d85959;
                        }
                    }

                    .title {
                        font-weight: 400;
                        font-size: 16px;
                        margin-right: 40px;
                    }

                }
            }

            // 活动形式
            /deep/.huodxs .el-textarea__inner {
                width: 800px;
                height: 150px;
                outline: none;
                resize: none;
                font-size: 16px;
                border: 1px solid #1175d2;
                margin-bottom: 80px;
            }

            .el-textarea {
                width: 70%;
            }
        }
    }

    /deep/.borderbottom {
        border-bottom: 1px solid #aeaeae;
        padding-bottom: 40px;
        box-sizing: border-box;
        margin-bottom: 0px;
    }


    @media screen and (max-width: 1300px) {
        /deep/.huodxs .el-textarea__inner {
            width: 600px !important;
        }
    }
</style>