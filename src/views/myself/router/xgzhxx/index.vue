<template>

    <div class="main">
        <ygxx :name="name" :account="account" :password="password"  ref="diyi"></ygxx>
        <zhqx :rights="rights" ref="dier"></zhqx>
        <div class="io">
            <el-button type="primary" class="xinjian" @click="handleClick1">保存</el-button>
            <el-button class="cancel" @click="handleClick2">取消</el-button>
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
                account:'',
                password:'',
                rights:'',
                ghj:[],
                staffdata:{}
            };
        },
        created(){
            // console.log(this.$route.params)
            this.name=this.$route.params.name;
            this.account=this.$route.params.account;
            this.password=this.$route.params.password;
            this.rights=this.$route.params.rights

        },
        methods: {
            // 保存按钮
             handleClick1(){
                this.staffdata.staffId=this.$store.state.staffId;
                if(this.$refs.diyi.input1.length<1){
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
                 if(this.$refs.diyi.input2.length<4){
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
                 if(this.$refs.diyi.input3.length<6){
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
                this.staffdata.name=this.$refs.diyi.input1;
                this.staffdata.accountNumber=this.$refs.diyi.input2;
                this.staffdata.password=jsEncrypt(this.$refs.diyi.input3);
                if(this.$refs.dier.form.type.length>0){
                    let that =this;
                    this.$refs.dier.form.type.forEach(function(item,idx){
                        // console.log(item)

                      that.ghj.push({rightCode:Number(item)})
                    })
                };
                this.staffdata.rights=this.ghj;
                this.ghj=[];
                // console.log(this.staffdata)
                this.staffinfoamend();
                
            },
            // 取消按钮
            handleClick2() {
                this.$store.commit('myselfRemove',2);
                this.$store.commit('myselfAdd', ['账户信息','/zhxx']);
                this.$router.push('/zhxx')
            },
            //员工信息修改接口
            staffinfoamend(){
                this.$http({
                    url: "/staff/updateStaff",
                    method: "post",
                    data:this.staffdata,
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
                        this.$store.commit('myselfRemove',2);
                        this.$store.commit('myselfAdd', ['账户信息','/zhxx']);
                        this.$router.push('/zhxx')
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
        font-size: 16px;
        border-color:#1175d2;
        background: none !important;
        letter-spacing: 4px;
    }
</style>