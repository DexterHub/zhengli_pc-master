<template>
    <vcade title="状态提醒">
        <div slot="content" style="margin-top: 26px;">
            <div class="fl left">
                <el-form ref="form" :model="form" label-width="161px" label-position="left">
                    <el-form-item label="激活通知提醒" class="ooo">
                        <el-radio-group  v-show="sign" @change="isDisable" v-model="form.resource">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                        </el-radio-group>
                        <p v-show="!sign">{{form1.resource}}</p>
                    </el-form-item>
                    <el-form-item label="设置通知方式" style="height:46px; margin-bottom: 12px;" class="ooo">
                        <el-checkbox-group :disabled="disable" v-show="sign" v-model="form.type">
                            <el-checkbox label="短信"></el-checkbox>
                            <el-checkbox label="邮箱"></el-checkbox>
                        </el-checkbox-group>
                        <p v-show="!sign">
                            <span style="padding-right: 20px;" v-for="(item,i) in form1.type" :key="i">{{item}}</span>
                        </p>
                    </el-form-item>
                    <el-form-item label="接受通知的邮箱" style="margin-bottom: 14px;" :class="{ppp:classname}">
                        <el-input v-show="sign" :disabled="disable" v-model="form.mailbox"></el-input>
                        <p v-show="!sign">{{form1.mailbox | mosaic}}</p>
                    </el-form-item>
                    <el-form-item label="接受通知的手机号" style="margin-bottom: 40px;" :class="{www:classname}">
                        <el-input v-show="sign" maxlength="11" :disabled="disable" v-model="form.phone"></el-input>
                        <p v-show="!sign">{{form1.phone | mosaic}}</p>
                    </el-form-item>
                    <el-form-item label="需要提醒的病例" class="inform qqq">
                        <el-radio-group style="padding-top:13px;" v-show="sign" :disabled="disable" v-model="form.example">
                            <el-radio label="所有病例"></el-radio>
                            <el-radio label="仅限我选择的病例（病例详情页面可设置）"></el-radio>
                        </el-radio-group>
                        <p v-show="!sign">{{form1.example}}</p>
                    </el-form-item>
                </el-form>
            </div>
            <div class="fl right">
                <p class="font">
                    您希望收到的提醒内容
                </p>
                <div style="overflow:hidden;">
                    <ul class="fl" v-show="!sign" style="width:100%">
                        <li  v-for="(item,i) in checkList" :key="i">{{i+1}}. {{item}}</li>
                    </ul>
                    <el-checkbox-group class="fl"  :disabled="disable" v-show="sign" v-model="checkList">
                        <el-checkbox  class="fl" v-for="(item,idx) in checkList1" :label="item"  :key="idx"></el-checkbox>
                        <!-- <div class="fl mr">
                            <el-checkbox label="3D设计方案更新提醒"></el-checkbox>
                            <el-checkbox label="矫治器/保质器已发货"></el-checkbox>
                            <el-checkbox label="患者资料缺失/错误"></el-checkbox>
                            <el-checkbox label="治疗方案中存在临床问题"></el-checkbox>
                        </div>
                        <div class="fl">
                            <el-checkbox label="保持器换新提醒"></el-checkbox>
                            <el-checkbox label="治疗到期日"></el-checkbox>
                            <el-checkbox label="病例更新进度"></el-checkbox>
                        </div> -->
                    </el-checkbox-group>
                </div>
            </div>

            <div class="fl eee">
                <el-button type="primary" v-show="!sign" class="editor huyi2" @click="change1">编辑</el-button>
                <div class="addressSave" v-show="sign">
                    <el-button type="primary" class="save huyi2" @click="change2">保存</el-button>
                    <el-button type="primary" class="cancel huyi1" @click="quit">取消</el-button>
                </div>
            </div>

        </div>
    </vcade>
</template>

<script>
    import vcade from './vcade'
    import {
        isEmail
    } from '@/util/validate.js'
    import {
        isMobile
    } from '@/util/validate.js'
    export default {
        components: {
            vcade,

        },
        data() {
            return {
                checkList: [],
                checkList1:[],
                sign: false,//一套展示，一套修改
                classname: true,
                disable:false,
                form: {
                    mailbox: '',
                    phone: '',
                    type: [],
                    resource: '',
                    example: ''
                },
                form1: {
                    mailbox: '',
                    phone: '',
                    type: [],
                    resource: '',
                    example: ''
                }
            }
        },
        filters: {
            mosaic(data) {

                return data
            }
        },
        created() {
            this.tixingData1();
            this.tixingdata2();
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            // 编辑
            change1() {
                this.sign = !this.sign;
            },
            // 保存
            change2() {
                if(!isEmail(this.form.mailbox) && this.form.mailbox != ''){
                    this.$message({
                        message: '请输入正确的邮箱',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList');
                        }
                    })
                    return false
                }
            
                 if(!isMobile(this.form.phone) && this.form.phone != ''){
                    this.$message({
                        message: '请输入正确的手机号',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList');
                        }
                    })
                    return false
                }
                this.sign = !this.sign;
                // 短信 shortMessage 
                // 状态提醒更新 
                var activation = this.form.resource === '是' ? true : false;
                var alertType ,shortMessage;
                switch (this.form.type.length){
                    case 0:
                        alertType=false;
                        shortMessage=false;
                        break;
                    case 2:
                        alertType=true;
                        shortMessage=true;
                        break;
                    case 1:
                        if(this.form.type[0] == '短信') {
                            alertType=false;
                            shortMessage=true;
                        }else{
                            alertType=true;
                            shortMessage=false;
                        }
                }
               
                var alertCaseType = 0;
                if (this.form.example === '所有病例') {
                    alertCaseType = 1;
                } else if(this.form.example === '仅限我选择的病例（病例详情页面可设置）'){
                    alertCaseType = 2;
                }
                // console.log(this.checkList)
                var b = [];
                this.checkList.forEach((item,idx) => {
                    switch (item) {
                            case '3D设计方案更新提醒':
                                b.push({id:1});
                                break;
                            case '保持器换新提醒':
                                b.push({id:2});
                                break;
                            case '矫治器发货':
                                b.push({id:3});
                                break;
                            case '治疗到期日':
                                b.push({id:4});
                                break;
                            case '患者资料缺失/错误':
                                b.push({id:5});
                                break;
                            case '病例更新进度':
                                b.push({id:6});
                                break;
                            case '治疗方案中存在临床问题':
                                b.push({id:7});
                                break;
                            default:
                                return '';
                                break;
                        }
                })
                // console.log(b)
                // console.log(this.form.mailbox)
                const er = {
                    activation,
                    alertType,
                    shortMessage,
                    phone: this.form.phone,
                    email: this.form.mailbox,
                    alertCaseType,
                    alertContents:b,
                }
                console.log(er);
                this.$http({
                    url: "/statusAlert/saveAlert",
                    method: "post",
                    data: er,
                }).then(({
                    data
                }) => {
                    console.log(data)
                }).catch(err=>{
                    console.log(err)
                })

                for (let k in this.form) {
                    this.form1[k] = this.form[k]
                }
            },
            // 取消
            quit() {
                this.sign = !this.sign;
            },
            // 状态提醒列表 
            tixingData1() {
                this.$http({
                    url: "/statusAlert/alerts",
                    method: "get",
                }).then(({
                    data
                }) => {
                    // console.log(data)
                    if (data.code == 200) {
                        var tixindata = JSON.parse(data.data);
                        // console.log(tixindata)
                        let that = this;
                        tixindata.forEach(function (item, idx) {
                            that.checkList1.push(item.content)
                        //    console.log(item.content)
                        })
                    } else {

                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            // 状态提醒数据 初始化
            tixingdata2() {
                this.$http({
                    url: "/statusAlert/alertInfo",
                    method: "get",
                }).then(({
                    data
                }) => {
                    // console.log(data)
                    if (data.code == 200) {
                        var tixindata = JSON.parse(data.data);
                        console.log(tixindata)
                        // console.log(tixindata)
                        // 这里要改 判断是否是多选还是单选
                        if (tixindata.alertType === true) {
                            this.form1.type .push('邮箱');
                        }  
                        if (tixindata.shortMessage === true) {
                            this.form1.type.push('短信');
                        }
                        this.form1.phone = tixindata.phone
                        this.form1.mailbox = tixindata.email;
                        if(tixindata.activation) {
                            this.form1.resource = '是'
                        }else {
                            this.form1.resource = '否'
                            this.disable = true;
                        }
                        if(tixindata.alertCaseType === 1){
                            this.form1.example = '所有病例'
                        }else if(tixindata.alertCaseType === 2){
                            this.form1.example = '仅限我选择的病例（病例详情页面可设置）'
                        }else {
                            this.form1.example ='';
                        }
                        let that = this;
                        if(tixindata.alertContents){
                           tixindata.alertContents.forEach(function (item, idx) {
                            switch (item.id) {
                                    case 1:
                                        that.checkList.push('3D设计方案更新提醒');
                                        break;
                                    case 2:
                                        that.checkList.push('保持器换新提醒');
                                        break;
                                    case 3:
                                        that.checkList.push('矫治器已发货');
                                        break;
                                    case 4:
                                        that.checkList.push('治疗到期日');
                                        break;
                                    case 5:
                                        that.checkList.push('患者资料缺失/错误');
                                        break;
                                    case 6:
                                        that.checkList.push('病例更新进度');
                                        break;
                                    case 7:
                                        that.checkList.push('治疗方案中存在临床问题');
                                        break;
                                    default:
                                        return '';
                                }
                            })
                        }
                        for (let k in this.form1) {
                            this.form[k] = this.form1[k]
                        }
                    } else {

                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            //是否禁用
            isDisable(){
                this.disable = !this.disable;
                if(this.disable){
                    this.checkList = [];
                     this.form = {
                        mailbox: '',
                        phone: '',
                        type: [],
                        resource: '否',
                        example: ''
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @media screen and (max-width: 1360px) {
        .mr {
            margin-right: 10px !important;
        }

        .left /deep/ .el-input__inner {
            width: 265px !important;
        }
    }
     @media screen and (max-width: 1120px) {
        .left {
            width: 50% !important;
            margin-right: 1% !important;
        }
    }
</style>
<style lang="less" scoped>

    /deep/ .el-radio-group {
        .el-radio {
            color: #555;
        }

    }
     .huyi1:hover{
        border-color:#1a95eb !important;
    }
    .huyi2:hover{
        background:#1a95eb !important;
    }
    .mr {
        margin-right: 160px;
    }

    /deep/.el-form-item {
        position: relative;

        /deep/.el-form-item__content {
            /deep/ p {
                color: #555;
                font-size: 16px;
            }
        }
    }

    /deep/ .el-radio__input.is-checked .el-radio__inner {
        background: #1175d2;
    }

    /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: #1175d2;

    }

    /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #1175d2;
    }

    /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #0a64b8;
        border-color:#666;
    }

    /deep/.el-checkbox__inner {
        border: 1px solid #666;
        height: 20px;
        width: 20px;
    }
    /deep/.el-checkbox__inner:hover {
        border-color: #1a95eb;
    }
    /deep/.el-checkbox__inner::after {
        left: 7px;
        top: 1px;
    }

    /deep/ .el-checkbox {
        color: #555;
    }

    /deep/ .card-content[data-v-623faa29] {
        overflow: hidden;
    }

    .left {
        width: 45%;
        margin-right: 5%;

        /deep/.el-input__inner {
            width: 300px;
            height: 36px;
            line-height: 36px;

        }

        /deep/ .el-radio__inner,
        /deep/.el-checkbox__inner {
            width: 20px;
            height: 20px;
            border-color: #1175d2;

        }

        /deep/ .el-checkbox__inner::after {
            width: 6px;
            height: 10px;
            left: 5px;
        }

        .el-checkbox {
            height: 25px;
            margin-top: 0px;
        }

        .inform {
            /deep/.el-radio {
                display: block;
                margin-bottom: 15px;
            }
        }

    }

    /deep/ .el-checkbox {
        margin-top: 0;
    }

    .card {
        padding-bottom: 50px;
    }

    /deep/ .el-form-item__label {
        font-size: 16px;
    }

    /deep/ .el-radio__label {
        font-size: 16px;
    }

    /deep/ .el-form-item.ooo::after {
        content: '*';
        font-size: 16px;
        color: #ff0000;
        font-weight: 900;
        position: absolute;
        left: 100px;
        top: 9px;
    }

    /deep/ .el-form-item.ppp::after {
        content: ':';
        font-size: 16px;
        color: #333333;
        font-weight: 900;
        position: absolute;
        left: 116px;
        top: 9px;
    }

    /deep/ .el-form-item.www::after {
        content: ':';
        font-size: 16px;
        color: #333333;
        font-weight: 900;
        position: absolute;
        left: 130px;
        top: 9px;
    }

    /deep/ .el-form-item.qqq::after {
        content: '*';
        font-size: 16px;
        color: #ff0000;
        font-weight: 900;
        position: absolute;
        left: 116px;
        top: 9px;
    }

    /deep/ .el-checkbox__label {
        font-size: 16px;
        padding-left: 16px !important;

    }

    /deep/ .el-form-item__label {
        color: #181818;
        font-size: 16px;
    }

    .right {
        width: 45%;

        .el-checkbox {
            display: block;
        }

        /deep/ .el-radio__inner,
        /deep/.el-checkbox__inner {
            width: 20px;
            height: 20px;
        }

        /deep/ .el-checkbox__inner::after {
            width: 6px;
            height: 10px;
            left: 6px;
        }

        .font {
            vertical-align: middle;
            font-size: 16px;
            color: #181818;
            padding: 0px 12px 4px 0px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin-bottom: 28px;
        }

        .font::after {
            content: '*';
            font-size: 16px;
            color: #ff0000;
            font-weight: 900;
        }

        li {
            width: 45%;
           &:nth-child(2n-1){
               margin-right: 5%;
           }
            float: left;
            vertical-align: middle;
            font-size: 16px;
            color: #747474;
            line-height: 50px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        .el-checkbox {
            width: 40%;
            margin-bottom: 24px;
            
        }
    }

    .editor {
        width: 140px;
        height: 42px;
        line-height: 42px;
        font-size: 16px;
        border: none;
        background-color: #1175d2;
        padding: 0;
        position: relative;
        left: 50%;
        transform: translate(-50%);
    }

    .eee {
        width: 100%;
        margin-top: 30px;
    }

    .addressSave {
        display: flex;
        justify-content: center;
        margin-left: -20px;

        .save {
            width: 140px;
            height: 42px;
            line-height: 42px;
            font-size: 16px;
            border: none;
            background-color: #1175d2;
            padding: 0;
            margin-right: 40px;
        }

        .cancel {
            width: 140px;
            height: 42px;
            line-height: 42px;
            font-size: 16px;
            border: 1px solid #1175d2;
            background-color: #f4f4f4 !important;
            color: #000;
            padding: 0;
        }
    }
</style>