<template>
    <div class="yczk">
        <el-form ref="form" label-width="90px">
            <div class="jiaozy clearfix">
                <div class="jiaoleft">
                    <el-form-item label-width="68px" class="danxuanfl" label="磨牙关系">
                        <div class="moyabox">
                            <el-form-item class="" label="左侧">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio1">
                                        <el-radio-button label="1">|类</el-radio-button>
                                        <el-radio-button label="2">||类</el-radio-button>
                                        <el-radio-button label="3">|||类</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                        <div class="moyabox">
                            <el-form-item class="" label="右侧">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio2">
                                        <el-radio-button label="1">|类</el-radio-button>
                                        <el-radio-button label="2">||类</el-radio-button>
                                        <el-radio-button label="3">|||类</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                    </el-form-item>
                </div>
                <div class="jiaoleft">
                    <el-form-item label-width="68px" class="danxuanfl" label="尖牙关系">
                        <div class="moyabox">
                            <el-form-item class="" label="左侧">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio3">
                                        <el-radio-button label="1">中性</el-radio-button>
                                        <el-radio-button label="2">近中</el-radio-button>
                                        <el-radio-button label="3">远中</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                        <div class="moyabox">
                            <el-form-item class="" label="右侧">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio4">
                                        <el-radio-button label="1">中性</el-radio-button>
                                        <el-radio-button label="2">近中</el-radio-button>
                                        <el-radio-button label="3">远中</el-radio-button>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                    </el-form-item>
                </div>
            </div>

            <el-form-item style="margin-bottom:68px;" class="duoxuanfl lingtolabel" label="病例分类">
                <div>
                    <el-checkbox-group fill="#1175d2" v-model="checkboxGroup1" @change="bbq">
                        <el-checkbox-button v-for="(city,i) in cities" :label="Math.pow(2,i)" :key="i">{{city}}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    const cityOptions = ['拥挤', '牙列间隙', '前突', '前牙反𬌗','开𬌗','深覆𬌗', '深覆盖',  '后牙锁𬌗', '后牙反𬌗'  ];
    export default {
        data() {
            return {
                // 多选数据
                checkboxGroup1: [],
                cities: cityOptions,
                radio1 : 0,
                radio2 : 0,
                radio3 : 0,
                radio4 : 0,
                // 病例分类 数据

                binglfenl : 0,
            };
        },
        methods: {
            bbq(){
                let sha = 0;
                this.checkboxGroup1.forEach((a,b) =>{
                    sha = sha + a;
                })
                this.binglfenl = sha;
            },
            shanghez(){
                this.topiptright = '';
                this.radio7 = '';
          
            },
            shangher(){
                this.topiptleft = '';
                this.radio7 = '';
              
            },
            shangheaio(){
                this.topiptleft = '';
                this.topiptright = '';
            },

            
            xiahez(){
                this.botiptright = '';
                this.radio8 = '';
          
            },
            xiaher(){
                this.botiptleft = '';
                this.radio8 = '';
              
            },
            xiaheraio(){
                this.botiptleft = '';
                this.botiptright = '';
            },
        }
    }
</script>
<style scoped lang="less">
    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
         /deep/.el-radio-button__inner {
            line-height: 38px !important;
        }
        /deep/.el-checkbox-button__inner {
            line-height: 36px !important;
        }
    }
    .yczk {
        height: 682px;
    }
    /deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner{
        background: #1175d2 !important;
    }
    /deep/.lingtolabel{
        
        .el-form-item__label{
            margin-right:16px;
            font-weight: 400;
            padding-right:0px;
            text-align: left;
            color: #333333;
            position: relative;
            &::before{
                content: "*";
                font-weight: 900;
                font-size: 16px;
                color:#ff0000;
                position: absolute;
                right:14px;
                top:-5px;
                letter-spacing: 0px;
            }
        }
    }
    /deep/.inputbox{
        
        .el-input__inner{
            width:auto;
            margin-right:9px;
        }
    }
    /deep/.el-form-item {
        color: #333333;
        font-weight: 400;
        margin-bottom: 25px;
    }

    /deep/.el-form {
        padding-left: 80px;
        padding-top: 36px;
        height: 682px;
        box-sizing: border-box;
    }
    /deep/.el-form-item__label {
        text-align: center;
        font-size: 16px;
    }

    /deep/.duoxuanfl .el-form-item__content{
        margin-left: 90px;
    }
    /deep/.duoxuanfl .el-checkbox-button__inner {
        line-height:30px;
        width: 100px;
        height: 30px;
        padding: 0px;
        margin-right: 25px;
        border: 1px solid #1175d2;
        border-radius: 5px;
        box-shadow: none;
    }
    /deep/.jiaoleft{
        .danxuanfl{
            
            >.el-form-item__label{
                padding-right:0px;
                font-weight: 400;
                color:#333333;
                position: relative;
                &::before{
                    content: "*";
                    font-weight: 900;
                    font-size: 16px;
                    color:#ff0000;
                    position: absolute;
                    right:-10px;
                    top:-5px;
                    letter-spacing: 0px;
                }
            }
        }
    }

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
    /deep/.moyabox{
       margin-left:16px;
        .el-form-item__label{
            font-size: 14px !important;
            font-weight: 400 !important;
        }
        .el-form-item {
            margin-bottom:6px;
        }
    }
    /deep/.danxuanfl .el-input__inner {
        height: 30px;
        width: 50px;
        border: 1px solid #1175d2;
        padding: 0px;
        text-align: center;
    }

    /deep/.danxuanfl span {
        // margin-left: 10px;
        font-weight: 400;
    }

    @media screen and (max-width: 1660px) {
        /deep/.duoxuanfl .el-checkbox-button__inner {
            width: 80px;
            height: 30px;
            padding: 0px;
            margin-right: 25px;
            border: 1px solid #1175d2;
            border-radius: 5px;
            box-shadow: none;
        }
        /deep/.asflei .el-radio-button__inner {
            padding: 0px;
            line-height: 30px;
            width: 80px !important;
            height: 30px;
            margin-right: 25px;
            border: 1px solid #1175d2;
            border-radius: 5px;
            box-shadow: none;
        }
        /deep/.jiaoleft{
            width:42% !important;
        }
        /deep/.el-form {
            padding-left: 30px !important;
        }
    }
    @media screen and (max-width: 1300px) {
        /deep/.jiaoleft{
            width:100% !important;
        }
        /deep/.jiaoright{
            width:100% !important;
        }
        /deep/.el-form{
            // height:auto !important;
        }
        .yczk{
            // height:auto !important;
        }

        /deep/.duoxuanfl .el-checkbox-button__inner{
            margin-right:10px !important;
        }
    }
</style>