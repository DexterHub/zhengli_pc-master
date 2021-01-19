<template>
    <div class="xjbl">
        <ul class="list clearfix">
            <!-- <li class="item">
                <el-radio label="1" v-model="checked1"><img src="../../../assets/3新建病例/1.png"></el-radio>

                <div class="text">正丽科技自主创立品牌</div>
            </li>
            <li class="item">
                <el-radio label="2" v-model="checked1"><img src="../../../assets/3新建病例/2.png"></el-radio>

                <div class="text secaitxt">正丽科技与士卓曼联合打造</div>
            </li> -->
            <li class="item" v-for="(item,i) in binglpingpai" :key="i" @change="rdiogaib">
                <el-radio :label="i+1" v-model="checked1"><img :src="item.logo"></el-radio>
                <div class="text secaitxt">{{item.info}}</div>
            </li>
        </ul>
       
    </div>
</template>
<script>
    export default {
        data() {
            return {
                checked1: 0,
                binglpingpai : [
                    
                ]
            };
        },
        created(){
            // 获取病例品牌列表 
            this.$http({
            url: "/caseInfo/caseBrands",
            method: "POST",
            data: {

            }

            }).then(({data}) => {
                data = JSON.parse(data.data);
                this.binglpingpai = data;
            }).catch(err => {
                console.log(err)
            })

        },
        methods: {
            rdiogaib(){
            },
        }
    }
</script>
<style scoped lang="less">
    /deep/ .el-radio__inner {
        border-color: #1175d2;
    }
    /deep/.list{
        margin:0 3%;
    }
    /deep/.item {
        padding: 0;
        margin: 0;
        list-style: none;
        float: left;
        width: 31%;
        height: 100px;
        text-align: center;
        position: relative;
        margin-top: 82px;
        margin-bottom: 77px;
        margin-left:1%;
        margin-right:1%;

        .el-radio__input {
            margin-top: -25px;
            margin-right: 15px;
            margin-left: -10px;
            border-radius: 50%;

            .el-radio__inner {
                border-radius: 50%;
                width: 20px;
                height: 20px;
            }

            /deep/.el-radio__inner::after {
                // width: 6px;
                // height: 6px;
                // left: 7px;
                // top: 2px;
            }
        }

        .text {
            position: absolute;
            bottom: 20px;
            left: 21%;
            color: #1175d2;
        }

        .secaitxt {
            color: #ff6b00;
        }
    }

    .xjbl {
        height: 682px;
    }

    /deep/.el-radio__input.is-checked .el-radio__inner,
    .el-radio__input.is-indeterminate .el-radio__inner {
        color: #1175d2;
        background: #1175d2;
    }
</style>