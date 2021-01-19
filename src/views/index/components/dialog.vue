<template>
   <div id="idig">
       <el-dialog
        title="新建病例"
        :visible.sync="centerDialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="700px">
        <span>上次新建病例未完成，已帮您保存数据，是否从离开时继续？</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="fg1">是，继续新建</el-button>
            <el-button @click="fg2">否，新建病例</el-button>
           
        </span>
        </el-dialog>
   </div>
</template>

<script>
    export default {
        data() {
            return {
                centerDialogVisible: false
            }
        },
        methods: {
           fg1(){
               this.LoadingOpen();
               this.centerDialogVisible = false;
                this.$emit('continuenew')
           },
           fg2(){
               this.LoadingOpen();
               this.centerDialogVisible = false;
                this.$emit('newxinjbingl')
           }
        },
       
       
    }
</script>
<style lang="less" scoped>
    // 适配
    @media screen and (max-width: 1660px) {
     

    }

    @media screen and (max-width: 1360px) {
        

    }
</style>
<style lang="less" scoped>
   #idig{
       width: 100%;
       height: 100%;
       /deep/ .el-dialog{
           height: 315px;
           margin-top: 28vh !important;
           background: #f9f9f9;
           .el-dialog__header{
               padding: 25px 25px 0 40px;
                .el-dialog__title{
                   font-weight: normal;
                   padding: 0;
               }
                .el-dialog__headerbtn .el-dialog__close{
                   width: 14px;
                   height: 14px;
                   color:#4b4b4b;
               }
           }
            .el-dialog__body{
               padding: 82px 0 81px;
               text-align: center;
               color:#333333;
               font-size: 16px;
           }
            .el-dialog__footer{
               padding: 0;
               text-align: center;
               .el-button{
                   font-size: 16px;
               }
               .el-button--default{
                   color: #666666;
               }
             .el-button+.el-button{
                   background: #f9f9f9;
                   margin-left: 87px;
                   border-color: #1175d2;
               }
           }
       }
   }

</style>