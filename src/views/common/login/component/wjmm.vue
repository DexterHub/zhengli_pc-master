<template>
    <div style="padding-top: 80px;">
        <el-form v-show="!mima" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
            class="demo-ruleForm">
            <el-form-item prop="phone">
                <el-input  class="yszhipt" maxlength="11" placeholder="请输入注册手机号" v-model="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode">
                <el-input class="ysmmipt" placeholder="请输入验证码" v-model="ruleForm.verificationCode" autocomplete="off">
                </el-input>
                <el-button class="but2" @click.stop="getAuthorization" type="text" ref="refCode3">获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="newPassword">
                <el-input type="password" class="ysmmipt" maxlength="11" placeholder="新密码 （6-11位数字或字母组成）"
                    v-model="ruleForm.newPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="repeatPassword">
                <el-input type="password" class="ysmmipt" maxlength="11" placeholder="确认新密码 （6-11位数字或字母组成）"
                    v-model="ruleForm.repeatPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <router-link class="but1" tag="el-button" type="text" to="/login">去登录账号</router-link>
                <el-button style="background:#1175d2;" type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>

        </el-form>


        <div class="tc" v-show="mima">
            <div class="mmtext">您的新密码是 : <span>{{ruleForm.repeatPassword}}</span></div>
            <el-row>
                <el-button @click="()=>{this.$router.push('./index')}" type="primary">去登录</el-button>
            </el-row>
        </div>
    </div>
</template>
<script>
    import {
        isMobile
    } from '@/util/validate.js'
    import {
        jsEncrypt  
    } from '@/util/validate.js'
    import {
        regular
    } from '@/util/validate.js'
    export default {
        data() {
            var dhyz = (rule, value, callback) => {
                if (value === '' || !isMobile(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            var yzmyz = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    callback();
                }
            };
            var validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (this.ruleForm.newPassword.length < 6 || !regular(this.ruleForm.newPassword)) {
                    callback(new Error('请设置您的账号密码（6-11数字或字母组合）'));
                }else {

                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.ruleForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                delay: 60,
                yzm:true,
                mima: false,
                mimaform: true,
                ruleForm: {
                    phone: '',
                    verificationCode: '',
                    newPassword: '',
                    repeatPassword: '',
                },
                rules: {
                    phone: [{
                        validator: dhyz,
                        trigger: 'blur'
                    }],
                    verificationCode: [{
                        validator: yzmyz,
                        trigger: 'blur'
                    }],
                    newPassword: [{
                        validator: validatePass1,
                        trigger: 'blur'
                    }],
                    repeatPassword: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                }
            };
        },
        mounted () {
            this.monitor();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.confirm();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 获取验证码
            getAuthorization() {
                 if (this.yzm) {

                } else {
                    return;
                }
                this.yzm = false;
                let that = this;
                setTimeout(item => {
                    that.yzm = true;
                }, 2000)
                if (!this.ruleForm.phone) {
                    this.$message({
                        message: '请输入手机号码',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    })
                    return
                }
                this.$http({
                    url: "/doctor/getYZM",
                    method: "get",
                    params: {
                        'phone': this.ruleForm.phone,
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.countDown();
                        this.$message({
                            message: '验证码发送成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        })
                    } else {
                        this.$message({
                            message: '验证码发送失败',
                            type: 'error',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        })
                    }

                }).catch(err => {
                    this.$message({
                        message: '验证码发送失败',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    })
                })
            },
            //确定
            confirm() {
                this.LoadingOpen();
                let data = {};
                for(let i in this.ruleForm) {
                    data[i] =  this.ruleForm[i];
                }
                data.newPassword =  jsEncrypt(data.newPassword);
                data.repeatPassword =  data.newPassword;
              this.$http({
                    url: "/doctor/findPassword",
                    method: "POST",
                    data: data,
                }).then(({
                    data
                }) => {
                    this.LoadingClose();
                    if (data.code == 200) {
                        this.mima = !this.mima;
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 1500,
                        })
                    }
                })
            },
            monitor() {
                let LocalDelay = this.getLocalDelay();
                let timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
                let rescode = this.$refs.refCode3.$el.childNodes[2];
                let but = this.$refs.refCode3.$el;
                if (timeLine > LocalDelay.delay) {
                } else {
                    let _delay = LocalDelay.delay - timeLine;
                    rescode.innerText = _delay + "s后重新获取";
                    but.style.pointerEvents = 'none';
                    let timer = setInterval(()=> {
                        if (_delay > 1) {
                            _delay--;
                            rescode.innerText = _delay + "s后重新获取";
                            this.setLocalDelay(_delay);
                        } else {
                            clearInterval(timer);
                            rescode.innerText = "获取验证码";
                            but.style.pointerEvents = 'auto';
                        }
                    }, 1000);
                }
            },
            countDown () {
                this.delay = 60;
                let rescode = this.$refs.refCode3.$el.childNodes[2];
                let but = this.$refs.refCode3.$el;
                if (rescode.innerText == "获取验证码") {
                    let delay = this.delay;
                    rescode.innerText = delay + "s后重新获取";
                    but.style.pointerEvents = 'none';
                    let timer = setInterval(()=> {
                        if (delay > 1) {
                            delay--;
                            rescode.innerText = delay + "s后重新获取";
                            this.setLocalDelay(delay);
                        } else {
                            clearInterval(timer);
                            rescode.innerText = "获取验证码";
                            but.style.pointerEvents = 'auto';
                        }
                    }, 1000);
                } else {
                    return false;
                }
            },
            //设置setLocalDelay
            setLocalDelay(delay) {
                //location.href作为页面的唯一标识，可能一个项目中会有很多页面需要获取验证码。
                localStorage.setItem("delay3_" + location.href, delay);
                localStorage.setItem("time3_" + location.href, new Date().getTime());
            },
            //getLocalDelay()
            getLocalDelay() {
                let LocalDelay = {};
                LocalDelay.delay = localStorage.getItem("delay3_" + location.href);
                LocalDelay.time = localStorage.getItem("time3_" + location.href);
                return LocalDelay;
            }
        }
    }
</script>
<style scoped lang="less">
    /deep/.tc {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0px;

        .mmtext {
            font-size: 16px;
            text-align: center;
            margin-top: 25%;
            color: #666666;

            span {
                padding-left: 5px;
                color: #f99400;
            }
        }

        .el-row {
            position: absolute;
            left: 50%;
            top: 55%;
            transform: translate(-50%, -50%);

            .el-button {
                width: 140px;
                height: 40px;
            }
        }
    }

    /deep/.el-form-item__content {
        margin-left: 0px;
        margin: 0 120px;
        position: relative;
    }

    /deep/.el-checkbox-group {
        float: left;
    }

    /deep/.el-checkbox__inner {
        border-radius: 5px;
        border: 1px solid black;
        width: 20px;
        height: 20px;
    }

    /deep/.el-checkbox__inner::after {
        width: 4px;
        height: 10px;
        left: 7px;
    }

    /deep/.el-button {
        float: right;
        width: 150px;
        height: 40px;
    }

    /deep/.el-input__inner {
        font-size: 16px;
        border: none;
        border-bottom: 1px solid #909399;
        border-radius: 0px;
        background: none;
        // color:#606266;
    }

    /deep/.but1:focus,
    .but1:hover {
        background: none;
    }

    /deep/.but1 {
        margin-left: -26px;
        border-radius: 0px;
        padding-bottom: 10px;
        font-size: 16px;
        float: left;
        background: none;
        border: none;
        color: #1175d2;
    }

    /deep/.but1 span {
        border-bottom: 1px solid #1175d2;
        padding-bottom: 5px;
        box-sizing: border-box;
    }

    /deep/.but2 {
        width: auto;
        position: absolute;
        right: 30px;
        top: 0px;
        font-size: 16px;
        color: #1175d2;
    }

    /deep/.el-form-item {
        margin-bottom: 0px !important;
        height: 80px !important;
    }

    /deep/.el-input__inner {
        height: 50px !important;
        line-height: 50px !important;
        padding-left: 10px !important;

        &::placeholder {
            color: #999999 !important;
            font-size: 16px !important;
        }

        // &::-moz-placeholder{
        //     color: #999999 !important;
        //     font-size: 16px !important;
        // }
    }
      #spin {
        display: none;
    }
</style>