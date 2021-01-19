<template>
    <div style="padding-top: 50px;">
        <el-form v-if="zhanghform" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
            class="demo-ruleForm">
            <el-form-item prop="phone">
                <el-input class="yszhipt" maxlength="11" placeholder="请输入注册手机号" v-model="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item prop="verificationCode">
                <el-input class="ysmmipt" placeholder="请输入验证码" v-model="ruleForm.verificationCode" autocomplete="off">
                </el-input>
                <el-button class="but2" @click.stop="getAuthorization" type="text" ref="refCode2">获取验证码</el-button>
            </el-form-item>
            <el-form-item class="xihuann">
                <router-link class="but1" tag="el-button" type="text" to="/login">去登录账号</router-link>
                <el-button style="background:#1175d2;" type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
        </el-form>


        <div class="tc" v-if="zhanghtc">
            <div class="mmtext">您的账号名 : <span>{{newAccount}}</span></div>
            <el-row>
                <el-button type="primary" @click="submit">去登录</el-button>
            </el-row>
        </div>

    </div>
</template>
<script>
    import {
        isMobile
    } from '@/util/validate.js'
    export default {
        data() {
            var dhyz = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输输入正确的手机号'));
                } else if (!isMobile(value)) {
                    callback(new Error('请输输入正确的手机号'));
                } {
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
            return {
                delay: 60,
                yzm:true,
                newAccount: '',
                zhanghform: true,
                zhanghtc: false,
                ruleForm: {
                    phone: '',
                    verificationCode: '',
                    checkPass1: '',
                    checkPass2: '',
                },
                rules: {
                    phone: [{
                        validator: dhyz,
                        trigger: 'blur'
                    }],
                    verificationCode: [{
                        validator: yzmyz,
                        trigger: 'blur'
                    }]
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
            submit() {
                this.$router.push('/login');
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
                this.$http({
                    url: "/doctor/findAccountNumber",
                    method: "POST",
                    data: this.ruleForm
                }).then(({
                    data
                }) => {
                    this.LoadingClose();
                    if (data.code == 200) {
                        this.$message({
                            message: data.msg,
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        })
                        this.newAccount = data.data;
                        this.zhanghtc = true;
                        this.zhanghform = false;
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        })
                    }
                }).catch(err => {
                    this.LoadingClose();
                    console.log(err);
                })
            },
            monitor() {
                let LocalDelay = this.getLocalDelay();
                let timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
                let rescode = this.$refs.refCode2.$el.childNodes[2];
                console.log(rescode)
                let but = this.$refs.refCode2.$el;
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
                console.log(1);
                this.delay = 60;
                let rescode = this.$refs.refCode2.$el.childNodes[2];
                let but = this.$refs.refCode2.$el;
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
                localStorage.setItem("delay2_" + location.href, delay);
                localStorage.setItem("time2_" + location.href, new Date().getTime());
            },
            //getLocalDelay()
            getLocalDelay() {
                let LocalDelay = {};
                LocalDelay.delay = localStorage.getItem("delay2_" + location.href);
                LocalDelay.time = localStorage.getItem("time2_" + location.href);
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
        margin-top: 30px;
    }

    // /deep/.xihuann .el-form-item__content{
    //     margin-top:50px;
    // }

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

    /deep/.but1 {
        margin-left: -26px;
        border-radius: 0px;
        padding-bottom: 10px;
        font-size: 16px;
        float: left;
        border: none;
        color: #1175d2;
        background: none;
    }

    /deep/.but1:focus,
    .but1:hover {
        background: none;
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