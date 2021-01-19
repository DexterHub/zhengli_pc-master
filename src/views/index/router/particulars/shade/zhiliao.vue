<template>
    <el-dialog :visible.sync="dialogFormVisible" :lock-scroll="false" @open="dia" @close="dia2" :append-to-body="true">
        <!-- 后台传过来的 -->
        <div class="content">
            <div class="content-detail" :style="{height: imgUrl.url ? 'auto' : '100%'}">
                <!-- <el-image src="imgUrl.url">
         
                </el-image> -->
                <iframe class="pdf"
                    :src="imgUrl"
                    type="" width="100%" height="100%">
                </iframe>
                    
                <!-- <object ></object> -->
                

            </div>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                imgUrl: '',
                dialogFormVisible: false,
            }
        },
        created() {

        },
        methods: {
            openDialog() {
                this.dialogFormVisible = true;
                this.init();
            },
            dia() {
                // document.body.style.overflow='hidden';
                // document.getElementsByTagName('html')[0].style.overflow='hidden';
            },
            dia2() {
                // document.body.style.overflow='auto';
                // document.getElementsByTagName('html')[0].style.overflow='auto';
            },
            init() {
                this.$http({
                    url: "/caseInfo/getSurvey",
                    method: "get",
                    params: {
                        caseId: this.$store.state.caseId,
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.imgUrl = 'http://case.magicalign.com:8605/output'+JSON.parse(data.data).url;
                    }

                }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    /*滚动条 start*/
    ::-webkit-scrollbar {
        width: 20px;
        height: 100px;
        background-color: #F5F5F5;
        display: none;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
        // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
        border: 1px solid #dcdcdc;
        background: #fff;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #dfe0e2;
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

    /deep/ .el-dialog {
        width: 52%;
        height: 70%;
        // margin-top: 0 !important;
        // top: 50%;
        // transform: translateY(-50%);
        overflow: hidden;

        .content {
            width: 90%;
            height: 83%;
            position: absolute;
            left: 50%;
            top: 40px;
            transform: translate(-50%);
            border: 1px solid #e2e2e2;
            overflow: auto;

            .content-detail {
                width: 100%;

                // height: 1900px;
                .el-image {
                    width: 100%;
                    height: 100%;

                    .el-image__error {
                        height: 100%
                    }
                }
            }
        }

        .download {
            width: 90%;
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translate(-50%);

            p {
                font-size: 16px;
                line-height: 36px;
                position: absolute;
                left: 50%;
                transform: translate(-50%);
            }

            .el-button {
                font-size: 16px;
                float: right;
            }
        }
    }

    .operator {
        padding-bottom: 30px;
    }

    /deep/.el-dialog__header,
    /deep/.el-dialog__body {
        padding-left: 40px;
    }
</style>