<template>
    <vcade title="员工信息">
        <div slot="content" class="yisheng">
            <el-row class="row">
                <el-col :span="10"><div class="grid-content bg-purple">
                        <p class="name">姓名 :</p>
                        <el-input v-model="input1" :value="input1" placeholder="请输入姓名" maxlength="16"></el-input>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple">
                     <p class="name">账号 :</p>
                     <el-input v-model="input2" :value="input2" maxlength="20" @input="pop1" placeholder="由4-20位数字或字母组成"></el-input>
                     <!-- <p>账号不能为空</p> -->
                </div></el-col>
            </el-row>
            
             <el-row class="row">
                <el-col :span="8"><div class="grid-content bg-purple">
                        <p class="name">密码 :</p>
                        <el-input v-model="input3" :value="input3" maxlength="11" @input="pop2" placeholder="由6-11位数字或字母组成"></el-input>
                          <!-- <p>密码不能为空</p> -->
                </div></el-col>
            </el-row>
        </div>
    </vcade>
</template>

<script>
import vcade from '../../../components/vcadeRouter'
export default {
    components:{
        vcade,
    }
    ,
    data(){
        return {
           input1: '',
           input2: '',
           input3: '',
           judge1:false,
           judge2:true,
        }
    },
    methods:{
    
      pop1(value){
          this.input2=value.replace(/[\W]/g,'');
      },
      pop2(value){
          this.input3=value.replace(/[\W]/g,'');
      }
    }
}
</script>
<style lang="less" scoped>
    @media screen and (max-width: 1360px) {
        .el-col-10{
            width: 45%;
        }
        .yisheng {
            /deep/ .el-input__inner {
                width: 240px !important;
                line-height: normal;
                 vertical-align:middle
            }

        }
        /deep/ .el-input__inner{
            width: 300px;
            height: 35px;
            line-height: 35px;
            border:1px solid #1a95eb;
            border-radius: 5px;
            box-sizing: border-box;
             vertical-align:middle
        }

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
        span{
            color:#828282;
        }
        .el-input{
            width: 51%;
        }
        /deep/ .el-input__inner{
            width: 300px;
            height: 35px;
            border:1px solid #1a95eb;
            border-radius: 5px;
            box-sizing: border-box;
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
        }
    }
   
</style>