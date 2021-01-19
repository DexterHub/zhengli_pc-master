<template>

    <div class = "yaciclickBox">
        <el-checkbox-group @change="changezhi" fill="#1175d2" v-model="checkList">
            <el-checkbox class="bukeyidoyac" label="NM">不可移动牙齿</el-checkbox>
            <el-checkbox label="NA">无附件</el-checkbox>
            <!-- <el-checkbox label="M">缺失牙</el-checkbox> -->
        </el-checkbox-group>
        <el-checkbox-group @change="changezhitwo" fill="#1175d2" v-model="checkListtwo">
            <el-checkbox label="M">缺失牙</el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                checkList: [],
                checkListtwo: [],
            }
        },
        methods: {
            changezhi(a){
                if(this.checkList != []){
                    this.checkListtwo = []
                }
                this.$emit('yachishijtop');
                this.$emit('yachishijbottom');  
            },
            changezhitwo(a){
                if(this.checkListtwo != []){
                    this.checkList = []
                }
                // console.log(a)
                this.$emit('yachishijtop');
                this.$emit('yachishijbottom');
            },
            fanfa(a){
                this.checkList.push(a)
                let arr = []
                for (var i = 0; i < this.checkList.length; i++){
                    if(arr.indexOf(this.checkList[i]) == -1){
                        arr.push(this.checkList[i]);
                    }
                }
                this.checkList = arr
            },
            fanfam(a){
                this.checkListtwo.push(a)
                let arr = []
                for (var i = 0; i < this.checkListtwo.length; i++){
                    if(arr.indexOf(this.checkListtwo[i]) == -1){
                        arr.push(this.checkListtwo[i]);
                    }
                }
                this.checkListtwo = arr
            },
        },
    
    };
</script>
<style scoped lang="less">
    .yaciclickBox{
        width:685px;
        height:47px;
        border:1px solid #1175d2;
        border-radius: 4px;
        position: relative;
        // padding:0 50px;
        box-sizing: border-box;
        // 不可移动牙齿
        .bukeyidoyac{
            // margin-left:33%;
        }
        .el-checkbox-group{
            // padding:0 5%;
            // box-sizing: border-box;
            // width:100%;
            // position: absolute;
            // left:50%;
            // top:50%;
            // margin-top:-12px;
            // margin-left:-341px;
            /deep/.el-checkbox{
                width:33%;
                float: left;
                line-height: 47px;
                text-align: center;
                margin-right:0 !important;
                /deep/.el-checkbox__input{
                    width:20px;
                    height:20px;
                   
                }
                /deep/.el-checkbox__input.is-checked .el-checkbox__inner{
                        background: #1175d2 !important;
                }
                /deep/.el-checkbox__inner{
                    width:20px;
                    height:20px;
                    border-radius: 4px;
                    border:1px solid #1175d2;
                    box-sizing: border-box;
                }
                /deep/.el-checkbox__inner::after{
                    width: 4px;
                    height: 10px;
                    left: 7px;
                }
            }
        }
    }
   
</style>