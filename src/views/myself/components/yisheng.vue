<template>
    <vcade title="医生信息">
        <div slot="content" class="yisheng">
            <el-form ref="ruleForm" :rules="rules"  :model="form" label-width="80px">
                <el-row class="row">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p class="name">姓名 :</p>
                            <span v-show="judge2">{{form.realname}}</span>
                            <el-form-item prop="realname">
                                <el-input v-model="form.realname" :value="form.realname" v-show="judge1"></el-input>

                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <p class="name">账号 :</p>
                            <span v-show="judge2">{{form.accountNumber}}</span>
                            <el-form-item prop="accountNumber">
                                <el-input v-model="form.accountNumber" :value="form.accountNumber" :disabled="true" v-show="judge1">
                                </el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-form-item>
                                <el-button v-show="judge2" class="button1 huyi2" @click="change">修改医生信息</el-button>
                                <el-button v-show="judge1" class="button1 huyi2" @click="save('ruleForm')">保存修改</el-button>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <p class="name">邮箱 :</p>
                            <span v-show="judge2">{{form.email}}</span>
                            <el-form-item prop="email">
                                <el-input v-model="form.email" :value="form.email" v-show="judge1"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <p class="name">手机号 :</p>
                            <span v-show="judge2">{{form.phone | phonesrreat}}</span>
                            <el-form-item prop="phone">
                                <el-input v-model="form.phone" :value="form.phone" :disabled="true" v-show="judge1"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <!-- <router-link to="/xgmm"> -->
                                <el-button class="button2 huyi" @click="changeURl" v-show="judge2">修改密码</el-button>
                            <!-- </router-link> -->
                            <el-button class="button2 huyi" v-show="judge1" @click="cancel">取消</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </vcade>
</template>

<script>
    import vcade from './vcade'
    import {
        isMobile
    } from '@/util/validate.js'
    import {
        isEmail
    } from '@/util/validate.js'
    import {
        encryption
    } from '@/util/validate.js'
    export default {
        components: {
            vcade,
        },
        data() {
            var realname = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else {
                    callback();
                }
            };
            var accountNumber = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    callback();
                }
            };
            var email = (rule, value, callback) => {
                if (value === '' || !isEmail(value)) {
                    callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            };
            var phone = (rule, value, callback) => {
                // console.log(isMobile(value))
                if (value === '' || !isMobile(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    realname: '',
                    accountNumber: '',
                    email: '',
                    phone: '',
                },
                rules: {
                    realname: [{
                        validator: realname,
                        trigger: 'blur'
                    }],
                    accountNumber: [{
                        validator: accountNumber,
                        trigger: 'blur'
                    }],
                    email: [{
                        validator: email,
                        trigger: 'blur'
                    }],
                    phone: [{
                        validator: phone,
                        trigger: 'blur'
                    }]
                },
                judge1: false,
                judge2: true,
            }
        },
        created(){
            this.form.realname=window.localStorage.getItem('realname');
            this.form.accountNumber=window.localStorage.getItem('accountNumber');
            this.form.email=window.localStorage.getItem('email');
            this.form.phone=window.localStorage.getItem('phone');
        },
        methods: {
            change() {
                this.judge1 = true;
                this.judge2 = false;
            },
            cancel(){
                  this.judge1 = false;
                  this.judge2 = true;
            },
            // 修改医生信息接口
            amend() {
                this.$http({
                    url: "/doctor/updateInfo",
                    method: "POST",
                    data: this.form,
                }).then(({
                    data
                }) => {
                    // console.log(data)
                    if (data.code == 200) {
                        this.judge1 = false;
                        this.judge2 = true;
                    } else {

                    }
                }).catch(err => {
                    console.log(err);
                })

            },
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                            window.localStorage.setItem('realname',this.form.realname);
                            window.localStorage.setItem('accountNumber',this.form.accountNumber);
                            window.localStorage.setItem('email',this.form.email);
                            window.localStorage.setItem('phone',this.form.phone);
                            this.amend();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            changeURl() {
                this.$store.commit('myselfAdd', ['修改密码', '/xgmm']);
                this.$router.push('/xgmm');
            }
        },
         filters:{
            phonesrreat: function (value){
                return encryption(value)
            }
        },
    }
</script>

<style lang="less" scoped>
/deep/.el-form-item__error {
    left: 100px;
}
    /deep/ .el-form-item {
        margin-bottom: 0px;

        .el-form-item__content {
            margin-left: 0 !important;
        }
    }
    .huyi:hover{
        color:#f99400 !important;
    }
    .huyi2:hover{
        background:#ec8d03 !important;
    }
    .yisheng {
        margin-top: 48px;

        .row {
            line-height: 45px;
            margin-bottom: 20px;
        }

        .name {
            width: 100px;
            float: left;
            color: #333333;
        }

        span {
            color: #666666;
        }

        .el-input {
            width: 51%;
        }

        /deep/ .el-input__inner {
            width: 300px;
            height: 36px;
            border: 1px solid #1a95eb;
            border-radius: 5px;
            font-size: 14px;
            box-sizing: border-box;
            color: #333;
        }

        .button1 {
            width: 240px;
            height: 45px;
            line-height: 45px;
            background: #f99400;
            color: #fff;
            padding: 0;
            border: none;
            margin-left: 0;
            font-size: 16px;
        }

        .button2 {
            width: 240px;
            height: 45px;
            line-height: 45px;
            background: none;
            color: #000;
            padding: 0;
            border: 1px solid #f99400;
            margin-left: 0;
            font-size: 16px;
        }
    }
</style>
<style lang="less" scoped>
    @media screen and (max-width: 1660px) {
        .yisheng {
            /deep/ .el-input__inner {
                width: 240px;
            }

            .button1,
            .button2 {
                width: 200px;
            }

        }
    }

    @media screen and (max-width: 1360px) {
         .yisheng {
            /deep/ .el-input__inner {
                width: 180px;
            }

            .button1,
            .button2 {
                width: 180px;
            }

        }
    }
</style>