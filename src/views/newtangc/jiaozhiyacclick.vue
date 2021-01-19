<template>

    <div class = "yaciclickBox">
        <el-checkbox-group @change="changezhi" fill="#1175d2" v-model="checkList">
            <el-checkbox label="Ex">拔牙</el-checkbox>
            <el-checkbox label="EXP">扩弓</el-checkbox>
            <el-checkbox label="DM">远移磨牙</el-checkbox>
            <el-checkbox label="IPR">可邻面去釉牙齿</el-checkbox>
        </el-checkbox-group>
    </div>
    
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                checkList: []
            }
        },
        methods: {
            changezhi(a){
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
            }
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
        box-sizing: border-box;
        .el-checkbox-group{
            padding:0 5%;
            box-sizing: border-box;
            width:100%;
            position: absolute;
            left:50%;
            top:50%;
            margin-top:-12px;
            margin-left:-341px;
            /deep/.el-checkbox{
                width:25%;
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