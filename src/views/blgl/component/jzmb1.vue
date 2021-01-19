<template>
    <div class="weituojiagd jzmb1n">
        <div class="boxCenter">
            <el-form ref="formone" label-width="80px">
                <el-form-item class="jiaozhiyalie marginright moyabottom textleft" label="矫治牙列">
                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio5">
                        <el-radio-button label="1">上颌</el-radio-button>
                        <el-radio-button label="2">下颌</el-radio-button>
                        <el-radio-button label="3">全颌</el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label-width="120px" class="fuhe marginright moyabottom textleft" label="覆𬌗">
                    <el-radio-group fill="#1175d2" class="jiaozhilefbut clearfix" v-model="radio6" @change="fuheaio">
                        <el-radio-button label="1">保持</el-radio-button>
                        <el-radio-button label="2">改善</el-radio-button>
                    </el-radio-group>
                    <el-form-item class="jiaozhifuhipt clearfix">
                        <div>
                            <el-radio-group fill="#1175d2" class="asflei">
                                <el-input maxlength="4" @input="fuheipt" v-model="input1" :disabled="lpl1"></el-input>
                            </el-radio-group>
                            <span class="mm">mm</span>
                        </div>
                    </el-form-item>
                </el-form-item>
                <el-form-item label-width="120px" label="覆盖" class="fugai marginright moyabottom textleft">
                    <el-radio-group fill="#1175d2" class="jiaozhilefbut clearfix" v-model="radio7" @change="fugaiaio">
                        <el-radio-button label="1">保持</el-radio-button>
                        <el-radio-button label="2">改善</el-radio-button>
                    </el-radio-group>
                    <el-form-item class="jiaozhifuhipt clearfix">
                        <div>
                            <el-radio-group fill="#1175d2" class="asflei">
                                <el-input maxlength="4" @input="fugaiipt" v-model="input2" :disabled="lpl2"></el-input>
                            </el-radio-group>
                            <span class="mm">mm</span>
                        </div>
                    </el-form-item>
                </el-form-item>

                <div class="moya">
                    <p class="moyabottom" style="color:#333333;font-size:16px;font-weight: 400;margin-top:40px;">
                        磨牙关系<span class="redxingxing">*</span>(上颌第一磨牙相对下颌第一磨牙的位置关系)</p>
                    <el-form-item class="leftmargin danxuanfl" label="">
                        <div>
                            <el-form-item class="danxuanfl moyabottom" label="左侧">
                                <div>
                                    <el-radio-group @change="moyaleft" fill="#1175d2" class="asflei" v-model="radio8">
                                        <el-radio-button label="1">保持</el-radio-button>
                                        <el-radio-button label="2">理想</el-radio-button>
                                        <el-radio-button label="3">改善</el-radio-button>
                                        <el-form-item class="jiaozhifuhipt input3 clearfix" label="远中(-)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="4" @input="moyaleftipt2" v-model="input3"
                                                        :disabled="middle1"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="jiaozhifuhipt input4 clearfix" label="近中(+)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="4" @input="moyaleftipt1" v-model="input4"
                                                        :disabled="middle1"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item class="danxuanfl moyabottom" label="右侧">
                                <div>
                                    <el-radio-group @change="moyaright" fill="#1175d2" class="asflei" v-model="radio9">
                                        <el-radio-button label="1">保持</el-radio-button>
                                        <el-radio-button label="2">理想</el-radio-button>
                                        <el-radio-button label="3">改善</el-radio-button>
                                        <el-form-item class="jiaozhifuhipt input3 clearfix" label="远中(-)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="4" @input="moyarightipt2" v-model="input5"
                                                        :disabled="middle2"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="jiaozhifuhipt input4 clearfix" label="近中(+)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="4" @input="moyarightipt1" v-model="input6"
                                                        :disabled="middle2"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <p class="moyabottom" style="color:#333333; font-size:16px;font-size:16px;font-weight: 400;">
                        尖牙关系<span class="redxingxing">*</span>(上颌尖牙相对下颌尖牙的位置关系)</p>
                    <el-form-item class="leftmargin danxuanfl" label="">
                        <div>
                            <el-form-item class="danxuanfl moyabottom" label="左侧">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" @change="jianyaleft"
                                        v-model="radio10">
                                        <el-radio-button label="1">保持</el-radio-button>
                                        <el-radio-button label="2">理想</el-radio-button>
                                        <el-radio-button label="3">改善</el-radio-button>
                                        <el-form-item class="jiaozhifuhipt input3 clearfix" label="远中(-)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="4" @input="jianyaleftipt2" v-model="input7"
                                                        :disabled="yazuo"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="jiaozhifuhipt input4 clearfix" label="近中(+)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="4" @input="jianyaleftipt1" v-model="input8"
                                                        :disabled="yazuo"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>

                                </div>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item class="danxuanfl moyabottom" label="右侧">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" @change="jianyaright"
                                        v-model="radio11">
                                        <el-radio-button label="1">保持</el-radio-button>
                                        <el-radio-button label="2">理想</el-radio-button>
                                        <el-radio-button label="3">改善</el-radio-button>
                                        <el-form-item class="jiaozhifuhipt input3 clearfix" label="远中(-)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="4" @input="jianyarightipt2" v-model="input9"
                                                        :disabled="yayou"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="jiaozhifuhipt input4 clearfix" label="近中(+)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input maxlength="4" @input="jianyarightipt1" v-model="input10"
                                                        :disabled="yayou"></el-input>
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
                <el-form-item class="marginright moyabottom textleft" label="后牙反𬌗">
                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio12">
                        <el-radio-button @click.native.prevent="clickitem(1)" label="1">保持</el-radio-button>
                        <el-radio-button @click.native.prevent="clickitem(2)" label="2">纠正</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    const cityOptions = ['拥挤', '牙列间隙', '前突', '开𬌗', '前牙反𬌗', '后牙反𬌗', '深覆𬌗', '深覆盖', '后牙锁𬌗'];
    export default {
        components: {

        },
        data() {
            return {
                // 矫治目标 矫治牙列
                radio5: 0,
                // 矫治目标  覆𬌗 
                radio6: 0,
                input1: '',
                lpl1: true,
                // 矫治目标  覆盖
                radio7: 0,
                lpl2: true,
                input2: '',
                // 矫治目标  后牙反𬌗 
                radio12: 0,
                // 磨牙关系 左侧
                radio8: 0,
                middle1: true,
                input3: '',
                input4: '',
                // 磨牙关系 右侧
                radio9: 0,
                middle2: true,
                input5: '',
                input6: '',
                // 尖牙关系 左侧
                yazuo: true,
                radio10: 0,
                input7: '',
                input8: '',
                // 尖牙关系 右侧
                yayou: true,
                radio11: 0,
                input9: '',
                input10: '',
            };
        },
        methods: {
            // 判断输入的内容
            judge(value) {

                if (Number(value) > 100) {
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
             
                // 四舍五入
                //    if(value.includes('.')){
                //    }
            },


            clickitem(e) {
                e === this.radio12 ? this.radio12 = 0 : this.radio12 = e
            },
            fuheaio() {
                if (this.radio6 == 2) {
                    this.lpl1 = false
                } else {
                    this.lpl1 = true;
                    this.input1 = '';
                }
            },

            fuheipt(value) {
                this.input1 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input1 = '';
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
                        this.input1=Number(value).toFixed(1);
                    }
                }
               
                
            },

            fugaiaio() {
                if (this.radio7 == 2) {
                    this.lpl2 = false
                } else {
                    this.lpl2 = true;
                    this.input2 = '';
                }
            },
            fugaiipt(value) {
                 this.input2 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input2 = '';
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
                        this.input2=Number(value).toFixed(1);
                    }
                }
            },
            // 磨牙左侧
            moyaleft() {
                if (this.radio8 == 3) {
                    this.middle1 = false
                } else {
                    this.middle1 = true;
                    this.input3 = '';
                    this.input4 = '';
                }
            },
            moyaleftipt1(value) {
                this.input4 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input4 = '';
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
                this.input3 = '';
                if(value.indexOf('.')>=0){
                    if(value.substr(value.indexOf('.')).length>2){
                        this.input4=Number(value).toFixed(1);
                    }
                }
            },
            moyaleftipt2(value) {
                this.input3 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input3 = '';
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
                        this.input3=Number(value).toFixed(1);
                    }
                }
                this.input4 = '';
            },
            // 磨牙右侧
            moyaright() {
                if (this.radio9 == 3) {
                    this.middle2 = false
                } else {
                    this.middle2 = true;
                    this.input5 = '';
                    this.input6 = '';
                }
            },
            moyarightipt1(value) {
                this.input6 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input6 = '';
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
                        this.input6=Number(value).toFixed(1);
                    }
                }
                this.input5 = '';
            },
            moyarightipt2(value) {
                this.input5 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input5 = '';
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
                        this.input5=Number(value).toFixed(1);
                    }
                }
                this.input6 = '';
            },
            // 尖牙左侧
            jianyaleft() {
                if (this.radio10 == 3) {
                    this.yazuo = false
                } else {
                    this.yazuo = true;
                    this.input7 = '';
                    this.input8 = '';
                }
            },
            jianyaleftipt1(value) {
                this.input8 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input8 = '';
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
                        this.input8=Number(value).toFixed(1);
                    }
                }
                this.input7 = '';
            },
            jianyaleftipt2(value) {
                this.input7 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input7 = '';
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
                        this.input7=Number(value).toFixed(1);
                    }
                }
                this.input8 = '';

            },
            // 尖牙右侧
            jianyaright() {
                if (this.radio11 == 3) {
                    this.yayou = false
                } else {
                    this.yayou = true;
                    this.input9 = '';
                    this.input10 = '';
                }
            },
            jianyarightipt1(value) {
                this.input10 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input10 = '';
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
                        this.input10=Number(value).toFixed(1);
                    }
                }
                this.input9 = '';
            },
            jianyarightipt2(value) {
                this.input9 = value.replace(/[^\d\.]/g, '')
                if (Number(value) > 100) {
                    this.input9 = '';
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
                        this.input9=Number(value).toFixed(1);
                    }
                }
                this.input10 = '';
            }
        }
    }
</script>

<style lang="less" scoped>
    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
         /deep/.el-radio-button__inner {
            line-height: 38px !important;
        }
        /deep/.jzmb1 .el-input {
            margin-top: 4px;
        }
    }

    .el-form {
        padding-left: 80px;
        padding-top: 36px;
        box-sizing: border-box;
    }

    /deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background: #1175d2;
    }

    /deep/.fuhe {
        .el-form-item__label {
            letter-spacing: 33px;
            margin-right: 3px !important;
            position: relative;

            &::before {
                content: "*";
                font-weight: 900;
                font-size: 16px;
                color: #ff0000;
                position: absolute;
                right: 46px;
                top: -5px;
                letter-spacing: 0px;
            }
        }
    }

    /deep/.fugai {
        .el-form-item__label {
            letter-spacing: 33px;
            margin-right: 3px !important;
            position: relative;

            &::before {
                content: "*";
                font-weight: 900;
                font-size: 16px;
                color: #ff0000;
                position: absolute;
                right: 46px;
                top: -5px;
                letter-spacing: 0px;
            }
        }
    }

    /deep/.jiaozhiyalie {
        .el-form-item__label {
            position: relative;

            &::before {
                content: "*";
                font-weight: 900;
                font-size: 16px;
                color: #ff0000;
                position: absolute;
                right: 6px;
                top: -5px;
                letter-spacing: 0px;
            }
        }
    }

    /deep/.redxingxing {
        font-weight: 900;
        font-size: 16px;
        color: #ff0000;
        margin: 0 3px;
    }

    /deep/.leftmargin {
        margin-left: -120px;
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

        >.el-form-item__label {
            text-align: left;
            font-size: 16px;
            font-weight: 400;
        }
    }

    .weituojiagd {
        /deep/.marginright {
            .el-form-item__label {
                margin-right: 42px;
            }
        }

        /deep/.moyabottom {
            margin-bottom: 18px;
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
            // padding-left: 80px;
            // padding-top: 36px;
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
                margin-top: -5px;
                float: left;
                display: table-cell;
                vertical-align: bottom;

                .el-form-item__label {
                    margin-right: 0px;
                }

                .el-input__inner {
                    height: 30px;
                    line-height:30px;
                    width: 50px;
                    border: 1px solid #1175d2;
                    padding: 0px;
                    text-align: center;
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
                margin-left: 35px;
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

    @media screen and (max-width: 1300px) {

        /deep/.cuoelx .el-radio-button__inner,
        /deep/.cuoelx .el-checkbox-button__inner {
            width: 75px !important;
            margin-right: 10px !important;
        }
    }
</style>