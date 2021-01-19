<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="phone">
                <el-input class="yszhipt huyi" maxlength="11" placeholder="手机号" v-model="ruleForm.phone"
                    autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item prop="verificationCode">
                <el-input type="password" class="ysmmipt huyi" placeholder="验证码" v-model="ruleForm.verificationCode"
                    autocomplete="off"></el-input>
                <el-button @click.stop="getAuthorization" class="gain" type="text" ref="refCode1">获取验证码</el-button>
            </el-form-item>

            <el-form-item class="dengld clearfix">
                <!-- <el-checkbox-group v-model="checkList" class="jzzhmm clearfix"> -->
                <el-checkbox v-model="checkedName1">记住账号</el-checkbox>
                <!-- </el-checkbox-group> -->

                <el-button style="background:#1175d2;" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
        <div class="bbq">
            <router-link class="but1" tag="el-button" type="text" to="/forget">忘记账号/密码</router-link>
            <router-link class="but2" tag="el-button" style="width:200px" type="text" to="/register">成为正丽科技注册医生
            </router-link>
        </div>
    </div>
</template>
<script>
    import {
        isMobile
    } from '@/util/validate.js'
    export default {
        data() {
            let that = this;
            var phone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输输入正确的联系方式'));
                } else if (!isMobile(value)) {
                    callback(new Error('请输输入正确的联系方式'));
                } {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    if (this.ruleForm.verificationCode !== '') {
                        // this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            return {
                delay: 60,
                yzm: true,
                checkedName1: '',
                checkedPass: '',
                ruleForm: {
                    phone: '',
                    verificationCode: '',
                },
                rules: {
                    phone: [{
                        validator: phone,
                        trigger: 'blur'
                    }],
                    verificationCode: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                }
            };
        },
        mounted() {
            this.init();
            this.monitor();
        },
        filters: {
            number1(v) {
                console.log(v);
                return v;
            },
        },
        methods: {
            init() {
                let phone = localStorage.getItem("phoneName");
                console.log(phone)
                if (phone) {
                    this.ruleForm.phone = localStorage.getItem("phoneName");;
                    this.checkedName1 = true;
                } else {
                    this.checkedName1 = false;
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login();

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 登录接口
            login() {
                this.LoadingOpen();
                this.$http({
                    url: "/loginyzm",
                    method: "POST",
                    data: this.ruleForm
                }).then(({
                    data
                }) => {
                   this.LoadingClose();
                    if (data.code == 200) {
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList');
                            }
                        })
                        data = JSON.parse(data.data)
                        localStorage.setItem('authority', data.type);
                        this.$cookie.set('token', data.token);
                        this.$router.push('/index');

                        if (this.checkedName1) {
                            localStorage.setItem('phoneName', this.ruleForm.phone)
                        } else {
                            localStorage.removeItem("phoneName")
                        }

                    } else {
                        console.log(data)
                        this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 1500,
                        })
                    }
                }).catch(err => {
                    this.LoadingClose();
                    console.log(err);
                })
            },
            // 验证码
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
                            message: data.message,
                            type: 'error',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        })
                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            monitor() {
                console.log(1);
                let LocalDelay = this.getLocalDelay();
                let timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
                let rescode = this.$refs.refCode1.$el.childNodes[2];
                let but = this.$refs.refCode1.$el;
                if (timeLine > LocalDelay.delay) {} else {
                    let _delay = LocalDelay.delay - timeLine;
                    rescode.innerText = _delay + "s后重新获取";
                    but.style.pointerEvents = 'none';
                    let timer = setInterval(() => {
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
            countDown() {
                this.delay = 60;
                let rescode = this.$refs.refCode1.$el.childNodes[2];
                let but = this.$refs.refCode1.$el;
                if (rescode.innerText == "获取验证码") {
                    let delay = this.delay;
                    rescode.innerText = delay + "s后重新获取";
                    but.style.pointerEvents = 'none';
                    let timer = setInterval(() => {
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
                localStorage.setItem("delay1_" + location.href, delay);
                localStorage.setItem("time1_" + location.href, new Date().getTime());
            },
            //getLocalDelay()
            getLocalDelay() {
                let LocalDelay = {};
                LocalDelay.delay = localStorage.getItem("delay1_" + location.href);
                LocalDelay.time = localStorage.getItem("time1_" + location.href);
                return LocalDelay;
            }
        },
        computed: {
            // 限制字数数字
            number() {
                let value = ruleForm.phone;
                value = value.replace(/[^\d]/g, '');
                ruleForm.phone = value;
                return value;
            }
        }
    }
</script>
<style scoped lang="less">
    .gain {
        width: auto;
        position: absolute;
        right: 0px;
        top: 0px;
        font-size: 16px;
        color: #1175d2;
    }

    /deep/ .el-checkbox {
        padding-left: 10px;
    }

    /deep/ .el-form-item__content {
        margin-left: 120px !important;
    }

    /deep/.el-checkbox__label {
        color: #666;
        padding-left: 8px !important;
    }

    .huyi {

        /deep/ .el-input__inner:hover,
        /deep/ .el-input__inner:focus {
            border-color: #1a95eb !important;
        }
    }

    /deep/.dengld {
        margin-top: 30px;
    }

    /deep/ .el-button--primary:hover {
        background: #1a95eb !important;
    }

    /deep/.jzzhmm {
        .el-checkbox {
            margin-top: 0px;
        }
    }

    /deep/.el-form-item {
        margin-bottom: 40px;
    }

    /deep/.el-form-item__content {
        margin-left: 0px;
        margin: 0 120px;
    }

    /deep/.el-checkbox-group {
        float: left;
        margin-left: 40px;
    }

    /deep/.el-checkbox__inner {
        border-radius: 5px;
        border: 1px solid #1175d2;
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
        font-size: 18px;
        border: none;
        border-bottom: 1px solid #909399;
        border-radius: 0px;
        background: none;
        // color:#606266;
    }

    /deep/.bbq {
        display: inline-block;
        margin: 0 auto;
        height: 41px;
    }

    /deep/.but1 {
        border-radius: 0px;
        padding-bottom: 10px;
        font-size: 16px;
        margin-left: 150px;
        margin-right: 60px;
        float: left;
        border: none;
        color: #1175d2;
    }

    /deep/.but1:focus,
    .but1:hover {
        background: none;
    }

    /deep/.but1,
    .but2 {
        background: none;
    }

    /deep/.but1 span {
        border-bottom: 1px solid #1175d2;
        padding-bottom: 5px;
        box-sizing: border-box;
    }

    /deep/.but2 {
        font-size: 16px;
        float: left;
        border: none;
        color: #1175d2;
    }

    /deep/.but2 span {
        border-bottom: 1px solid #1175d2;
        padding-bottom: 5px;
        box-sizing: border-box;
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