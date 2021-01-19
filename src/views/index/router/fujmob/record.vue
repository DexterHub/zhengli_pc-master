<template>
    <div class="fhjl" >
         
        <div class = "topbox" >
            <div label="联系我们" name="second">
                <p class = "titlebt">附件模板发货记录<span class = "titlespan">({{production}})</span></p>

                <div class = "item clearfix" v-for="(item,i) in datashuzu" v-if="item.neirotext1 || item.neirotext3" :key="i">
                    <div class = "title">{{item.title}}</div>
                    <div style="width:70%">
                        <p class = "neirtext2" v-for="itm in item.neirotext3" :key="itm.id" v-html="itm.explain"></p>
                        <p class = "neirtext1" v-html="item.neirotext1"></p>
                       
                    </div>
                </div>
            </div>
        </div>
        <el-row>
            <el-button @click="fanhui" type="primary">返回</el-button>
        </el-row>

    </div>
</template>
<script>
    import {
        dateToStr
    } from '@/util/validate.js'
    export default {
        components: {

        },
        data() {
            return {
                production:'',
                datashuzu:[
                    {
                        title : '时间',
                        neirotext1 : '',
                    },
                    {
                        title : '选择牙弓',
                        neirotext1 : '',
                    },
                    {
                        title : '上颌数量',
                        neirotext1 : '',
                    },
                    {
                        title : '下颌数量',
                        neirotext1 : '',
                    },
                    {
                        title : '设计说明',
                        neirotext3 : [],
                    },
                    {
                        title : '原因',
                        neirotext1 : '无',
                    },
                    {
                        title : '收货地址',
                        neirotext1 : '上海市闵兴区申虹路958号富力中心C栋6楼 张女士 19756421876',
                    }
                ]
            };
        },
        created(){
            this.mobanDetail();
        },
        methods : {
            fanhui(){
                this.$router.push('./index');
                this.$store.commit('indexRemove',3);
            },
            // 附件模板详情接口
            mobanDetail(){
                this.$http({
                    url: "/attachmentTemplate/details",
                    method: "get",
                    params:{
                        id:this.$route.params.id
                    }
                }).then(({
                    data
                }) => {
                    // console.log(data)
                    if (data.code == 200) {
                        console.log(JSON.parse(data.data))
                        // this.tableData =JSON.parse(data.data)
                        var kk  =JSON.parse(data.data)
                        switch(kk.state){
                            case 0:
                                this.production='审批中';
                                break;
                            case 1:
                                this.production='已批准'
                                break;
                            case 2:
                                this.production='未批准';
                                break;
                            case 3:
                                this.production='生产中'
                                break
                            case 4:
                                this.production='已完成'
                                break;
                            case 5:
                                this.state = '订单取消'
                            break;
                            default:
                                return ''
                        };
                        switch(kk.dentalArch){
                            case 1:
                                this.datashuzu[1].neirotext1='双颌';
                                this.datashuzu[2].neirotext1=kk.upper;
                                this.datashuzu[3].neirotext1=kk.lower;
                                break;
                            case 2:
                                this.datashuzu[1].neirotext1='上颌';
                                this.datashuzu[2].neirotext1=kk.upper;
                                break;
                            case 3:
                                this.datashuzu[1].neirotext1='下颌';
                                this.datashuzu[3].neirotext1=kk.lower;
                                break;
                            default:
                                this.datashuzu[1].neirotext1='';
                                this.datashuzu[2].neirotext1='';
                                this.datashuzu[3].neirotext1='';
                                break;
                        };
                        this.datashuzu[0].neirotext1=dateToStr(new Date(kk.time));
                        this.datashuzu[4].neirotext3= kk.attachmentDesigns;
                        this.datashuzu[5].neirotext1=kk.reason;
                        if(kk.address.indexOf('n') !== -1){
                            this.datashuzu[6].neirotext1='';
                        }else{
                            this.datashuzu[6].neirotext1=kk.address+' - '+kk.deliveryName+' - '+kk.contactNumber;
                        }
                        
                        
                        
                    } else {

                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
<style scoped lang="less">
    .el-row{
        margin-top: 20px;
        margin-bottom: 20px;
        .el-button{
            widows: 140px;
            height:40px;
            background: none !important;
            color:black;
        }
    }
    .fhjl {
        width:100%;
        height:100%;
        .topbox{
        pointer-events: none;
            padding-bottom:30px;
            padding-left:95px;
            box-sizing: border-box;
            width:100%;
            min-height:650px;
            background: #f9f9f9;
        }
    }
    /deep/.titlebt{
        padding-top:50px;
        margin-bottom:65px;
        color:#1175d2;
        font-size: 16px;
        font-weight: 600;
        span{
            padding-left:20px;
            color:#f99400;
        }
    }
    /deep/.item>div{
        margin-bottom:15px;
        float: left;
        color:#606266;
    }
    /deep/.neirtext1{
        padding-bottom:20px;
    }
    /deep/.neirtext1,.neirtext2{
        color:#666666;
    }
    .neirtext2{
        width: 100%;
        margin-bottom: 20px;
        float: left;
    }
    /deep/.title{
        width:150px;
        color:#333333;
        font-weight: 600;
    }
    /deep/.el-button {
        padding: 0px;
        width: 140px;
        height: 36px;
    }
</style>