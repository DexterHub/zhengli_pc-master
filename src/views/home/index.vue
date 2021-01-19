<template>
    <div id="home" style="padding-top:80px">
        <commonHead></commonHead>
        <el-dialog @close="closeDialog" title="当前账户权限" :lock-scroll="false" :visible.sync="dialogFormVisible" >
            <p class="operator" v-for="item in employeeData" :key="item.rightCode">{{item.saleName}}</p>
        </el-dialog>
        <router-view class="main-continer" style=" min-height: calc(100vh - 80px);" />
    </div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                dialogFormVisible: false,
                employeeData:[],
            }
        },
        mounted() {
            this.employee();
            // this.employeeData=JSON.parse(JSON.parse(window.localStorage.getItem('employee')));
            // console.log(this.employeeData)
        },
        methods: {
            closeDialog() {
                this.$store.commit('jurisdiction', false);
            },
            // 账户权限接口
            employee() {
                this.$http({
                    url: "/staff/rights",
                    method: "get",
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.employeeData=JSON.parse(data.data)
                        this.$set(this.employeeData)
                    }


                }).catch(err => {
                    console.log(err)
                })
            },
        },
        computed: {
            jurisdiction() {
                return this.$store.state.jurisdiction
            },
            re(){
                
                return JSON.parse(JSON.parse(window.localStorage.getItem('employee')));
            }

        },

        watch: {
            jurisdiction(newVal) {
                this.dialogFormVisible = newVal;
            },
            re(val){
                this.employeeData=val;
                console.log(3443)
            }
        },
    }
</script>
<style lang="less" scoped>
   @font-face{
        font-family: "SourceHanSans-CN-Regular";
        src:url("../../../public/fonts/Source Han Sans CN Regular.ttf") format("truetype"),
            url("../../../public/fonts/Source Han Sans CN Regular.eot") format("embedded-opentype"),
            url("../../../public/fonts/Source Han Sans CN Regular.svg") format("svg");
        font-weight:normal;
        font-style:normal;
    }
    html,
    body,
    #app,
    #home {
        font-family: "SourceHanSans-CN-Regular", SourceHanSansCn-Medium, "Microsoft Yahei", "Hiragino Sans GB", "Helvetica Neue", Helvetica, tahoma, arial, "WenQuanYi Micro Hei", Verdana, sans-serif, "\5B8B\4F53";
    }
    /deep/.el-dialog__headerbtn .el-dialog__close {
        color: #000;
        font-size: 18px;
    }
    /deep/.el-dialog__title {
        display: inline-block;
        padding-top: 24px;
        font-size: 16px;
        color: #1175d2;
        font-weight: 600;
        padding-bottom: 20px;
    }
    .operator {
        width: 50%;
        float: left;
        padding-bottom: 30px;
    }
    /deep/.el-dialog__header,/deep/.el-dialog__body {
        padding-left: 40px;
        overflow: hidden;
    }
</style>