<template>
    <vcade title="员工信息">
        <div slot="content" class="yisheng">
            <el-row class="row">
                <el-col :span="8"><div class="grid-content bg-purple">
                        <p class="name">姓名 :</p>
                        <span >{{name}}</span>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                     <p class="name">账号 :</p>
                     <span >{{account}}</span>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                    <!-- <router-link > -->
                        <el-button class="button1" @click="changeURl">修改账户信息</el-button>
                    <!-- </router-link> -->
                     
                </div></el-col>
            </el-row>
            
             <el-row class="row">
                <el-col :span="16"><div class="grid-content bg-purple">
                        <p class="name">密码 :</p>
                       <span >{{password}}</span>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                     <el-button @click="dialogFormVisible =true" class="button2">注销账户</el-button>
                </div></el-col>
            </el-row>
        <el-dialog title="请输入医生账户密码，验证身份" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item  :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <p class="operator">此操作将会清空该账户信息，收回权限，不影响您的病例库</p>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"  @click="deletet" style="width:100px;height:36px;margin-right:20px;vertical-align:middle;line-height: 13px;">确认</el-button>
                <el-button  class="lll" @click="dialogFormVisible = false" style="width:100px;height:36px;background:none !important;vertical-align:middle;line-height: 13px;">取消</el-button>
                
            </div>
        </el-dialog>
        </div>

        

    </vcade>
</template>

<script>
import {
        jsEncrypt  
    } from '@/util/validate.js'
import vcade from '../../../components/vcadeRouter'
export default {
    components:{
        vcade,
    },
    props:['name','account','password','staffId']
    ,
    data(){
        return {
           input1: '张三',
           input2: '555444',
           input3: '0987@qq.com',
           input4: '134****0987',
           dialogFormVisible:false,
           judge1:false,
           judge2:true,
           form: {
                name: '',
            },
            formLabelWidth: '120px',
        }
    },
    methods:{
        change(){
            this.judge1=true;
            this.judge2=false;
        },
        deletet(){
            this.dialogFormVisible = false;
            this.deleteyg();
        },
        deleteyg(){
            console.log(this.staffId)
             this.$http({
                    url: "/staff/delStaff",
                    method: "get",
                    params:{
                        
                        staffId:Number(this.staffId),
                        doctorPassword:jsEncrypt(this.form.name),
                    }
                }).then(({
                    data
                }) => {
                    // console.log(JSON.parse(data.data))
                    if (data.code == 200) {
                        this.$message({
                            message: data.msg,
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList');
                               
                            }
                        });
                        this.$store.commit('myselfRemove',1);
                        this.$router.push('/myself');
                    } else {
                         this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList');
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
        save(){
            this.judge1=false;
            this.judge2=true;
        },
        changeURl(){
            this.$emit('changeUrl');
            this.$store.commit('myselfRemove',2);
            this.$store.commit('myselfAdd', ['修改账户信息','/xgzhxx']);

           
        }
    }
}
</script>
<style lang="less" scoped>
    @media screen and (max-width: 1360px) {
      

    }
</style>
<style lang="less" scoped>
    .yisheng{
        .row{
            line-height: 45px;
            margin-bottom: 20px;
        }
         .name{
            width: 100px;
            float: left;
            color:#565759;
        }
        .operator{
            color: #ff0000;
            font-size: 14px;
            text-align: center;
        }
        span{
            color:#828282;
        }
        .el-input{
            width: 51%;
        }
        /deep/ .el-dialog{
            width: 700px;
            height: 450px;
            // margin-top: 0 !important;
            // top: 50%;
            // transform: translateY(-50%);
            overflow: hidden;
            background: #f9f9f9;
        }
        /deep/ .el-dialog__title{
            color:#333;
        }
        /deep/ .el-dialog__header{
            padding: 0;
            text-align: center;
            margin-top: 100px;
            margin-bottom: 20px;
            font-size: 16px;
        }
        /deep/ .el-dialog__body{
            padding: 0;
        }
        /deep/ .el-dialog__footer{
            padding: 0;
            margin-top: 60px;
            display: flex;
            justify-content: center;
        }
        /deep/ .el-input__inner{
            width: 500px;
            height: 35px;
            border:1px solid #1a95eb;
            border-radius: 5px;
            box-sizing: border-box;
            margin: 0 auto;
        }
        .el-button--primary{
            background: #1175d2;
            font-size: 16px;
            letter-spacing: 2px;
        }
        .el-button.lll{
            background: none;
            font-size: 16px;
            letter-spacing: 2px;
            border-color: #1175d2;
        }
        .button1{
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
        .button2{
            width: 240px;
            height: 45px;
            line-height: 45px;
            background: #fff;
            color: #000;
            padding: 0;
            border:1px solid #f99400;
            margin-left: 0;
            font-size: 16px;
        }
    }
   
</style>