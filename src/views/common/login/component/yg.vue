<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="accountNumber">
                <el-input placeholder="医生账号（4-20数字或字母组成）" class="huyi" v-model="ruleForm.accountNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="userName">
                <el-input placeholder="员工账号 （4-20数字或字母组成）" class="huyi" v-model="ruleForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="secretKey">
                <el-input type="password" class="huyi" placeholder="账号密码 （6-11位数字或字母组成）" v-model="ruleForm.secretKey" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style = "background:#1175d2;" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script>
import {
        jsEncrypt  
    } from '@/util/validate.js'
    export default {
        data() {
            // 医生账号
            var zhangh1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入医生账号'));
                } else {
                    callback();
                }
            };
            // 员工账号
            var zhangh2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入员工账号'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    accountNumber: '',
                    userName: '',
                    secretKey: '',
                },
                rules: {
                    accountNumber: [{
                        validator: zhangh1,
                        trigger: 'blur'
                    }],
                    userName: [{
                        validator: zhangh2,
                        trigger: 'blur'
                    }],
                    secretKey: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                }
            };
        },
        created(){
            // var lett = this;
            // document.onkeydown = function (e) {
            //     var key = window.event.keyCode;
            //     if (key == 13) {
            //         lett.submitForm('ruleForm');
            //     }
            // }
        },
        methods: {
            submitForm(formName) {
                console.log(formName)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login();
                    } else {
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
                let data = {};
                for(let i in this.ruleForm) {
                    data[i] = this.ruleForm[i];
                }
                data.secretKey = jsEncrypt(data.secretKey);
                this.$http({
                    url: "/login",
                    method: "POST",
                    data: data
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
                        data = JSON.parse(data.data);
                        console.log(data)
                        this.$cookie.set('token', data.token);
                        localStorage.setItem('authority', data.type);
                        localStorage.setItem('staffName',data.userName)
                        this.employee();
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 1500,
                        })
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            // 账户权限接口
            employee() {
                console.log(1);
                this.$http({
                    url: "/staff/rights",
                    method: "get",
                }).then(({
                    data
                }) => {
                    console.log(data)
                    if (data.code == 200) {
                        let that = this;
                        localStorage.setItem('employeeClone',data.data);
                        this.$store.commit('empty');
                        var employeeClone = JSON.parse(data.data);
                        employeeClone.forEach((item, idx)=> {
                            that.$store.commit('permissionList', item.rightCode);
                        });
                        this.$router.push('index');
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>
<style scoped lang="less">
/deep/ .el-form-item__content {
    margin-left: 120px !important;
}

    /deep/.el-form-item{
        margin-bottom:40px;
    }
    /deep/.el-form-item__content {
        margin-left: 0px;
        margin: 0 120px;
    }
    .huyi{
        /deep/ .el-input__inner:hover,
        /deep/ .el-input__inner:focus{
            border-color:#1a95eb !important;
        }
        
    }
    /deep/.el-button{
        float:right;
        width:150px;
        height:40px;
    }
    /deep/ .el-button--primary:hover{
        background:#1a95eb !important;
    }
    /deep/.el-input__inner {
        font-size: 18px;
        border: none;
        border-bottom: 1px solid #909399;
        border-radius: 0px;
        background: none;
        // color:#606266;
    }
    /deep/.but2:focus, .but2:hover{
        background: none;
    }
    /deep/.but1,.but2{
        background: none;
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