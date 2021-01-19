<template>
    <div class="jbxx main">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <div class="form">
                <h3 class="title">修改医生账户密码</h3>
                <el-form-item label="旧密码"  prop="oldpass">
                    <el-input type="password"  maxlength="11" v-model="ruleForm.oldpass" autocomplete="off" class="width1"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="pass">
                    <el-input type="password" maxlength="11" v-model="ruleForm.pass" autocomplete="off" class="width1"></el-input>
                    <span>6-11数字或字母组合</span>
                </el-form-item>
                <el-form-item label="确认密码：" prop="checkPass">
                    <el-input type="password"  maxlength="11" v-model="ruleForm.checkPass" autocomplete="off" class="width1"></el-input>
                    <span>请重复输入你的密码</span>
                </el-form-item>
                <el-form-item label="手机验证码：" prop="phonecode">
                    <el-input v-model.number="ruleForm.phonecode" class="width2"></el-input>
                    <el-button type="primary" @click="getAuthorization" style="background:#1175d2" class="earn" ref="refCode4">获取验证码</el-button>
                    <span>我们将向您尾号<span style="margin-left:0px;">{{phone | endsi}}</span>的手机号发送验证码，请及时查收</span>
                </el-form-item>
            </div>

            <el-form-item class="elrowone">
                <el-button style="background:#1175d2;font-size:16px" type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button @click="resetForm('ruleForm')" class="quxbut">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
   import {
        jsEncrypt  
    } from '@/util/validate.js'
    import {
        regular
    } from '@/util/validate.js'
    export default {
        
        data() {
            var phonecode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass0 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入旧密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
               if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (this.ruleForm.pass.length < 6 || !regular(this.ruleForm.pass)) {
                    callback(new Error('请设置您的账号密码（6-11数字或字母组合）'));
                }else {

                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                delay: 60,
                jkl:{},
                phone:'',
                ruleForm: {
                    oldpass: '',
                    pass: '',
                    checkPass: '',
                    phonecode: ''
                },
                rules: {
                    oldpass: [{
                        validator: validatePass0,
                        trigger: 'blur'
                    }],
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }],
                    phonecode: [{
                        validator: phonecode,
                        trigger: 'blur'
                    }]
                },
                flag:false,
            };
        },
        created(){
            this.phone=window.localStorage.getItem('phone');
            // console.log(this.$route.params.phone)
        },
        mounted() {
            this.monitor();
        },
        filters:{
            endsi:function(value){
                return value.substring(value.length-4)
            }
        },
        methods: {
            // 修改医生密码接口
            amend(rrr){
                this.$http({
                    url: "/doctor/updatePassword",
                    method: "POST",
                    data: rrr,
                }).then(({
                    data
                }) => {
                    // console.log(data)
                    if (data.code == 200) {
                       this.$message({
                            message: '修改成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        });
                        this.$router.push('/myself')
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
             // 验证码
             
            getAuthorization() {
                if(this.flag){
                    return false
                }
                this.$http({
                    url: "/doctor/getYZM",
                    method: "get",
                    params: {
                        phone: this.phone,
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
                        });
                        this.flag=true;
                        var that = this;
                        setTimeout(function(){
                            that.flag=false;
                        },5000)
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.jkl.phone=this.phone;
                        this.jkl.password=jsEncrypt(this.ruleForm.oldpass);
                        this.jkl.newPassword=jsEncrypt(this.ruleForm.pass);
                        this.jkl.repeatPassword=this.jkl.newPassword;
                        this.jkl.verificationCode=this.ruleForm.phonecode;
                        this.amend(this.jkl);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$router.push('./myself')
                this.$store.commit('myselfRemove', 1);
            },
            monitor() {
                console.log(1);
                let LocalDelay = this.getLocalDelay();
                let timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
                let rescode = this.$refs.refCode4.$el.childNodes[2];
                let but = this.$refs.refCode4.$el;
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
                let rescode = this.$refs.refCode4.$el.childNodes[2];
                let but = this.$refs.refCode4.$el;
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
                localStorage.setItem("delay4_" + location.href, delay);
                localStorage.setItem("time4_" + location.href, new Date().getTime());
            },
            //getLocalDelay()
            getLocalDelay() {
                let LocalDelay = {};
                LocalDelay.delay = localStorage.getItem("delay4_" + location.href);
                LocalDelay.time = localStorage.getItem("time4_" + location.href);
                return LocalDelay;
            }
        }
    }
</script>
<style scoped lang="less">
    .clearfix:before,
    .clearfix:after {
        content: "";
        display: table;
    }

    span {
        margin-left: 18px;
        color: #f99400;
        font-size: 14px;
    }

    .earn {
        // width: 110px !important;
        height: 40px;

    }

    /deep/ .el-form-item__error {
        margin-left: 20px;
    }

    .width1 {
        width: 300px;
        box-sizing: border-box;
        margin-left: 20px;
    }

    .width2 {
        width: 150px;
        box-sizing: border-box;
        margin-right: 40px;
        margin-left: 20px;
    }

    /deep/.elrowone {
        float: left;
        margin-top: 36px;
        margin-bottom: 20px;

        .el-button {
            height: 36px !important; 
            line-height: 36px !important;
            margin-right: 30px;
            font-size: 16px;
        }

        .quxbut {
            background: none;
            border: 1px solid #1175d2;
            color: black;
        }
    }

    .clearfix:after {
        clear: both;
    }

    .clearfix {
        *zoom: 1;
    }

    .title {
        font-size: 16px;
        color: #1175d2;
        margin-top: 40px;
        margin-bottom: 70px;
    }

    .jbxx {

        overflow: hidden;
    }

    /deep/.el-form-item {
        color: black;
        margin-bottom: 32px;
        .el-input input {
            border: 1px solid#1175d2;
            height: 36px;
            line-height: 36px;
        }
    }

    /deep/.el-form-item__label {
        text-align: left;
        color: #333333;
        font-size: 16px;
    }

    /deep/.elrowone {
        .el-form-item__content {
            margin-left: 0 !important;
            width: 400px;
            .el-button{
                width: 140px;
                height: 36px;
                line-height: 40px;
                padding: 0;
            }
        }
    }

    /deep/.huangzname {
        padding-top: 36px;
        box-sizing: border-box;
    }

    /deep/.jiuzyy .el-input--suffix .el-input__inner {
        width: 400px;
    }

    /deep/.shdz .el-input--suffix .el-input__inner {
        width: 800px;
    }

    /deep/.csrq .el-form-item__content .el-input {
        width: auto;
    }

    /deep/.csrq .ipt1 .el-input__inner {
        width: 100px;
        margin-right: 10px;
    }

    /deep/.csrq .ipt2 .el-input__inner {
        width: 80px;
        margin-right: 10px;
        margin-left: 30px;
    }

    /deep/.csrq .ipt3 .el-input__inner {
        width: 80px;
        margin-right: 10px;
        margin-left: 30px;
    }

    /deep/.huodxs .el-textarea__inner {
        width: 800px;
        height: 150px;
        outline: none;
        resize: none;
        font-size: 16px;
        border: 1px solid #1175d2;
    }

    /deep/.form {
        overflow: hidden;
        height: 485px;
        background: #f9f9f9;
        padding-left: 92px;

    }
</style>