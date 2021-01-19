<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="userName">
                <el-input type="input" class="yszhipt huyi" maxlength="20" placeholder="账号（4-20数字和字母组成）" v-model="userName"
                    autocomplete="off">
                </el-input>
            </el-form-item>

            <el-form-item prop="secretKey">
                <el-input type="password" class="ysmmipt huyi" maxlength="11" placeholder="账号密码 （6-11位数字或字母组成）" v-model="secretKey"
                    autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item class="dengld clearfix">
                <!-- <el-checkbox-group v-model="checkList" class="jzzhmm clearfix"> -->
                <el-checkbox @change="jizhuzhanghao" v-model="checkedName">记住账号</el-checkbox>
                <el-checkbox @change="jizhumima" v-model="checkedPass">记住密码</el-checkbox>
                <!-- </el-checkbox-group> -->

                <el-button style="background:#1175d2;" type="primary" @click="submitForm('ruleForm')">登录
                </el-button>

            </el-form-item>
        </el-form>
        <div class="bbq">
            <router-link class="but1" tag="el-button" type="text" to="/forget">忘记账号/密码</router-link>
            <router-link style="width: 200px;" class="but2" tag="el-button" type="text" to="/register">成为正丽科技注册医生
            </router-link>
        </div>
    </div>
</template>
<script>
    import {
        jsEncrypt
    } from '@/util/validate.js'
    export default {
        data() {
            let that = this;
            var zhangh = (rule, value, callback) => {
                if (this.userName === '') {
                    callback(new Error('请输入账号'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (this.secretKey === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                checkedName: '',
                checkedPass: '',
                ruleForm: {
                    userName: '',
                    secretKey: '',
                },
                userName: '',
                secretKey: '',
                rules: {
                    userName: [{
                        validator: zhangh,
                        trigger: 'blur'
                    }],
                    secretKey: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                }
            };
        },
        created() {
            // var lett = this;
            // document.onkeydown = function (e) {
            //     var key = window.event.keyCode;
            //     if (key == 13) {
            //         lett.submitForm('ruleForm');
            //     }
            // }
            let userName = localStorage.getItem("userName");
            let secretKey = localStorage.getItem("secretKey");
            if (userName) {
                this.userName = userName;
                this.checkedName = true;
            } else {
                this.checkedName = false;
            }
            if (secretKey) {
                this.secretKey = secretKey;
                this.checkedPass = true;
            } else {
                this.checkedPass = false;
            }
        },
        methods: {
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
                this.ruleForm.userName = this.userName;
                this.ruleForm.secretKey = jsEncrypt(this.secretKey);
                this.$http({
                    url: "/login",
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
                        if (this.checkedName) {
                            localStorage.setItem('userName', this.userName)
                        } else {
                            localStorage.removeItem("userName")
                        }

                        if (this.checkedPass) {
                            localStorage.setItem('secretKey', this.secretKey)
                        } else {
                            localStorage.removeItem("secretKey")
                        }

                    } else {
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

            // 记住账号 
            jizhuzhanghao() {
                if (this.checkedPass == true) {
                    this.checkedPass = false;
                    this.checkedName = false;
                }
            },
            // 记住密码 事件 
            jizhumima() {
                if (this.checkedPass == true) {
                    this.checkedPass = true;
                    this.checkedName = true;
                } else {
                    // this.checkedPass = false;
                    // this.checkedName = false;
                }

            }
        }
    }
</script>
<style scoped lang="less">
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

    /deep/.dengld {
        margin-top: 30px;
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
    .huyi{
        /deep/ .el-input__inner:hover,
        /deep/ .el-input__inner:focus{
            border-color:#1a95eb !important;
        }
        
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
        width: 100%;
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
    /deep/ .el-button--primary:hover{
        background:#1a95eb !important;
    }
    /deep/.but1:focus,
    .but1:hover,.but2:hover {
        
        color:#1a95eb;
        
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
</style>