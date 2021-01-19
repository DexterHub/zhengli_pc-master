<template>
    <div class="vard clearfix">
        <slot name="title">
            <div :class="[{'head':true},{'clearfix':true},{'mediahead':jkl==3?true:false},{'mediahead':jkl==13?true:false},{'mediahead':jkl==14?true:false}]">
                <p class="vard-head">{{title}}</p>
                <div class="dashed"></div>
                <div style="float:right;">
                    <a href="javaScript:;" :class="typeof(jkl) == 'undefined'?'gary':''" @click="showmessage">
                        了解详情
                    </a>
                </div>
            </div>
        </slot>

        <div class="vard-content">
            <slot name="content">
                
            </slot>
            <div class="dialog" v-show="asd">
                {{detailData[jkl]}}
            </div>
        </div>
        

    </div>
    
</template>
<script>
    export default {
        name: "vcard",
        props: {
            title: {
                require: false,
                type: String
            },
            contentTitle: {
                require: false,
                type: String
            },
            jkl:{
                type:Number,
            },
            asd:{
                type: Boolean  
            }
        },
        components: {

        },
        data() {
            return {
                detailData:[
                    '三种常用的牙位表示法中可选择一种应用于治疗过程中。',//1
                    
                    '这个选项确定上下颌治疗步骤该如何安排。',//2

                    '这个选项确认您是否需要单颌保持矫治器。',//3

                    '这个选项确认您是否接受方案中使用片切。',//4

                    '系统默认片切最早可以在第一步，这个选项确认需要推迟片切的阶段。',//5

                    '系统默认附件最早可以在第一步，这个选项确认需要推迟附件添加的阶段。',//6

                    '系统默认拔牙最早可以在第一步，这个选项确认需要推迟拔牙的阶段。',//7

                    '这个选项应用于拔牙病例以及牙体缺失的病例。',//8

                    '这个选项确定需要扩弓的区域。',//9

                    '这个选项确定需要扩弓量的大小。',//10

                    '这个选项确定需要如何处理过小牙的问题。',//11

                    '这个选项确定需要的上切牙排齐方式。',//12

                    '患者牙周情况不好时，矫治器边缘如何切割。',//13

                    '新病例中模型及口扫若有末端变形的情况，医生希望正丽科技如何处理。',//14

                    '新病例中模型及口扫若有末端变形的情况，医生希望正丽科技如何处理。',//15

                    '可以根据医生喜好选择需要使用的附件。',//16

                    '正丽科技默认使用常规尺寸附件，您可以选择更大尺寸附件。',//17

                    '有牵引钩、开窗时您可选择是否放置附件。正丽科技默认空间足够时会同时放置牵引钩、开窗和附件。',//18
                    '这个选项确定您需要使用牵引的步骤。正丽科技默认从第1步开始。'//19
                ],
               
            }
        },
        created() {
            // console.log(this.asd)
            Boolean
        },
        methods: {
            showmessage(){
                this.$emit('vb',this.jkl)
                // this.$set(this.asd);
                // var middle = this.jkl;
                // console.log( this.jkl)
                // this.judge[this.jkl]=!this.judge[this.jkl];
            }
        }
    }
</script>
<style lang="less" scoped>
    @media screen and (max-width: 1660px) {
        
    }

    @media screen and (max-width: 1360px) {
        .mediahead{
            margin-bottom: 20px;
            .vard-head{
                width: 200px;
            }
        }
    }
</style>
<style lang="less" scoped>
.gary {
    color: #999;
}
    .vard {
        font-size: 14px;
        padding: 5px;
        min-height:162px;
        position:relative;
    }
    .head{
        position: relative;
    }
    .dialog{
        max-width:300px;
        min-height:55px;
        background:#fff;
        position:absolute;
        top:40px;
        right:10px;
        padding:30px 20px;
        border:1px solid #f99400;
        text-align:center;
        font-size:14px;
        color:#333;
        z-index:10;
    }
    .vard-head {
        // float: left;
        position: absolute;
        font-weight: bold;
        font-size: 16px;
        color:#333;
        background: #f9f9f9;
        z-index: 2;
        padding-right: 15px;
    }

    .vard-content {
        padding: 18px;
    }

    .content-title {
        text-align: center;
    }

    .content-title span {
        background: #ebeffe;
        color: #5d72c2;
        padding: 2px 6px;
        border-radius: 3px;
    }
    .dashed {
        width: 100%;
        float: left;
        border-top: 1px dashed #c1c1c1;
        position: absolute;
        top: 11px;
    }
    a{
        position: relative;
        z-index: 2;
        text-decoration: none;
        font-size: 14px;
        color:#1175d2;
        font-weight: 600;
        background: #f9f9f9;
        padding-left: 35px;
    }
    
</style>