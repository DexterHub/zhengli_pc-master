<template>
    <div class="scwj ">
        <div class="wenjscbox">
            <el-upload class="upload-demo" 
                :action="baseURL" 
                multiple
                accept=".zip,.rar"
                ref="schuanwj"
                :on-change="handleSuccess" 
                :on-remove="remove" 
                :limit="1" 
                :file-list="fileList"
                :auto-upload="false" 
                :data="{
                }">
                <img class="scimg" :src="flag?OK:NO">
                <div class="el-upload__text" v-show="flag">点击上传口扫文件</div>
                <div class="el-upload__tip" slot="tip">文件限制：最大100M，支持rar.zip格式</div>
            </el-upload>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // 是否是新建,true不是,false是
                isNew: true,
                fileList:[],
                // 是否上传成功
                flag: true,
                OK: require('@/assets/3新建病例/上传文件.png'),//已上传
                NO: require('@/assets/3新建病例/PC-新建病例上传文件.png'),//未上传
                type: '',
                scwjadd: 'Y',
                baseURL:'',// 上传文件路径默认地址
            };
        },
        methods: {
            // =======================\\
            schuawj(){
                this.$refs.schuanwj.submit();
            },
            // 判断文件格式
            ifType(file){
                const fileExt=file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
                const isJPG = fileExt == '.rar' || fileExt =='.zip' 
                const isLt2M = file.raw.size / 1024 / 1024 < 100;
                if (!isJPG) {
                    this.$message.error('上传文件只支持 rar/zip 格式!');
                    return false
                }
                if (!isLt2M) {
                    this.$message.error('上传文件最大100MB !');
                    return false
                }
                return true;
            },
            // 改变事件
            handleSuccess(file,fileList) {
                console.log(fileList)
                if(!this.ifType(file)){
                    return
                }
                this.fileList = fileList//需要上传的文件
                this.scwjadd = 'N';//是否新建
                this.flag = false;
                if (!this.isNew) return;
                this.newLodImg();
            },
            remove() {
                this.fileList = [];
                this.flag = true;
            }, 
            newLodImg() {
                    const data = {
                        // 上传文件
                        file: this.fileList[0].raw,
                        // 病例 id
                        caseId: this.$store.state.binglId,
                        // 病例阶段
                        stageName: this.$store.state.stageName,
                        // 病例次数
                        stageCount: this.$store.state.stageCount,
                        // 文件序号
                        fileNumber:12,
                        //是否新增
                        add: 'Y'
                    }
                    var eightFormdata = new FormData();
                    for (var k in data) {
                        eightFormdata.append(k, data[k]);
                    }
                    this.$http({
                        url: "/caseInfo/stepEight",
                        method: "POST",
                        data: eightFormdata,
                    }).then(({
                        data
                    }) => {

                    }).catch(err => {
                        console.log(err)
                    })
            
            },
        }
    }
</script>
<style scoped lang="less">
    /deep/.upload-demo {
        .el-upload-list {
            position: absolute;
            left: 50%;
            top: 225px;
            transform: translateX(-50%);
            width: 200px;
            .el-upload-list__item-status-label,
            .el-icon-close {
                top: -120px;
                right: 59px;
                opacity: 0;
                display: block;
            }

            .el-icon-close {
                top: -116px;
                right: 59px;
                opacity: 0;

            }
        }
    }

    .scwj {
        height: 682px;
        position: relative;
    }

    /deep/.wenjscbox {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);

        .el-upload__tip {
            text-align: center;
            font-size: 16px;
            color: #333333;
        }
    }
    /deep/ .el-upload-list__item{
        text-align:center;
    }
    /deep/ .el-upload-list__item-name{
        margin-right:0;
    }
    /deep/.el-upload {
        position: relative;
        width: 600px;
        height: 300px;
        border: 2px dashed #d9d9d9;
        border-radius: 6px;

        &:hover {
            border-color: #1175d2;
        }

        .el-upload-dragger {
            width: 100%;
            height: 100%;
            border: none;
        }

        .scimg {
            position: absolute;
            left: 51%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .el-upload__text {
            position: absolute;
            left: 50%;
            top: 70%;
            transform: translate(-50%, -50%);

            color: #f99400;
            font-size: 16px;

        }

    }
</style>