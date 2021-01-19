<template>

    <div class="main">

        <ygxx ref="ygxx" ></ygxx>
        <zhqx ref="zhqx"></zhqx>    

         <div class="io">
            <el-button type="primary" class="xinjian" @click="handleClick1">新建</el-button>
            <el-button class="cancel" @click="handleClick">取消</el-button>
        </div>  
    </div>

</template>
<script>
    import {
        jsEncrypt  
    } from '@/util/validate.js'
    import ygxx from './components/ygxx'
    import zhqx from './components/zhqx'
    export default {
        data() {
            return {
                name:'',
                accountNumber:'',
                password:'',
                accountdata:{},
                rights:[],
            };
        },
       
        methods: {
             handleClick1() {
                 if(this.$refs.ygxx.input1.length<1){
                    this.$message({
                        message: '请输入至少一位姓名',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList');
                            
                            }
                    });
                    return false
                }
                if(this.$refs.ygxx.input2.length<4){
                    this.$message({
                        message: '请输入至少四位账号',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList');
                            
                            }
                    });
                    return false
                }
                if(this.$refs.ygxx.input3.length<6){
                    this.$message({
                        message: '请输入至少六位密码',
                        type: 'error',
                        duration: 1500,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList');
                            
                            }
                    });
                    return false
                }
                this.name=this.$refs.ygxx.input1;
                this.accountNumber=this.$refs.ygxx.input2;
                this.password=this.$refs.ygxx.input3;
                // console.log(this.$refs.zhqx.form.type)
                if(this.$refs.zhqx.form.type.length>0){
                    let that =this;
                    this.$refs.zhqx.form.type.forEach(function(item,idx){
                        // console.log(item)
                      that.rights.push({rightCode:Number(item)})
                    })
                };
                // console.log(this.rights)
                let dd = jsEncrypt(this.password);
                this.accountdata={
                    name:this.name,
                    accountNumber:this.accountNumber,
                    password:dd,
                    repeatPassword:dd,
                    rights:this.rights
                };
                this.rights=[];
                // console.log( this.accountdata)
                this.NewAccount()
            },
            handleClick() {
                this.$store.commit('myselfRemove',1);
                this.$router.push('/myself');
            },
            NewAccount(){
               
                this.$http({
                    url: "/staff/registerStaff",
                    method: "post",
                    data:this.accountdata,
                }).then(({
                    data
                }) => {
                    // console.log(data)
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
                    } else if(data.code === 500){
                         this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList');
                            }
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        components: {
            ygxx,
            zhqx
        },
    };
</script>
<style scoped lang="less">
    .io{
            padding-bottom: 40px;
        }
        .xinjian{
            width: 140px;
            height: 38px;
            font-size: 16px;
            background: #1175d2 !important;
            letter-spacing: 4px;
        }
        .cancel{
            width: 140px;
            height: 38px;
            color:#333;
            border-color:#1175d2;
            background: none !important;
            letter-spacing: 4px;
             font-size: 16px;
        }
</style>