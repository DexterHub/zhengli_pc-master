<template>
    <div class="componentsModule">
        <p class="card-head title">{{content.title}}</p>
        <div class="card-content cantent">
            <div v-for="(val,index) in content.arrayDate" :key="index" @click="shadow(val.title,val.router)"
                :class="{'right2':val.flag && !$store.state.rightCode.includes(val.flag)}">
                {{val.title}}
                <zhiliao v-if="val.router == 0" ref="0"></zhiliao>
                <huanzhe @info="info" v-if="val.router == 1" ref="1"></huanzhe>
                <xguang v-if="val.router == 2" ref="2"></xguang>
                <shengchai v-if="val.router == 3" ref="3"></shengchai>
                <chakan v-if="val.router == 4" ref="4"></chakan>
            </div>
        </div>
        <div></div>
    </div>
</template>
<script>
    import zhiliao from "../shade/zhiliao";
    import huanzhe from "../shade/huanzhe";
    import xguang from "../shade/xguang";
    import shengchai from "../shade/shengchai";
    import chakan from "../shade/chakan";
    export default {
        name: "componentsModule",
        components: {
            zhiliao,
            huanzhe,
            xguang,
            shengchai,
            chakan
        },
        props: {
            title: {
                require: false,
                type: String
            },
            content: {
                require: true,
                type: Object
            }
        },
        methods: {
            info() {
                this.$emit('info')
            },
            shadow(a, b) {
                if (
                    a == "后续生产" ||
                    a == "附件模板" ||
                    a == "备用矫治器" ||
                    a == "保持器" ||
                    a == "委托加工单"
                ) {
                    this.$store.commit("indexAdd", [a, b]);
                    this.$router.push(this.$router.replace("/particulars"));

                }
                if (!b) return;
                if (b.startsWith("/")) {
                    if (b.startsWith("/blgl")) {
                        // this.resetbingl();
                        this.$router.push({
                            name: "新建病例",
                            params: {
                                nameid: "0"
                            }
                        });
                    } else if (b.startsWith("/three")) {
                        // window.open(window.location.href.replace('particulars', `three?caseId=${this.$store.state.caseId}`))
                        this.$http({
                            url: '/caseInfo/plans',
                            method: 'get',
                            params: {
                                caseId: this.$store.state.caseId,
                            }
                        }).then(({
                            data
                        }) => {
                            // 接口不通，暂时不用200
                            if(data.code === 200) {
                                window.open(window.location.href.replace('particulars', `three?caseId=${this.$store.state.caseId}`))
                            }else{
                                this.$message({
                                    message: data.msg,
                                    type: 'error',
                                    duration: 2000
                                });
                            }
                        })

                    } else {
                        this.$router.push(b);
                    }
                } else {
                    (async () => {
                        if (b == 0) {
                            const flag = await this.message(0);
                            if (flag.flag) {
                                this.$refs[b][0].openDialog();
                            } else {
                                this.$message({
                                    message: flag.message,
                                    type: 'error',
                                    duration: 2000,
                                    onClose: () => {
                                        this.visible = false
                                        this.$emit('refreshDataList')
                                    }
                                });
                            }
                        } else if (b == 4) {
                            const flag = await this.message(4);
                            if (flag.flag) {
                                this.$refs[b][0].openDialog();
                            } else {
                                this.$message({
                                    message: flag.message,
                                    type: 'error',
                                    duration: 2000,
                                    onClose: () => {
                                        this.visible = false
                                        this.$emit('refreshDataList')
                                    }
                                });
                            }
                        } else {
                            this.$refs[b][0].openDialog();
                        }
                        return;
                    })()
                }
            },
            // 重启病例接口
            resetbingl() {
                this.$http({
                    url: "/caseInfo/restart ",
                    method: "POST",
                    data: {
                        caseId: this.$store.state.caseId
                    }

                }).then(({
                    data
                }) => {
                    data = JSON.parse(data.data)
                    console.log(data)

                }).catch(err => {
                    console.log(err)
                })
            },
            message(data) {
                return new Promise((resolve, reject) => {
                    if (data == 0) { //治疗概况
                        this.$http({
                            url: '/caseInfo/getSurvey',
                            method: 'get',
                            params: {
                                caseId: this.$store.state.caseId,
                            }
                        }).then(({
                            data
                        }) => {
                            console.log(data);
                            if (data.code == 200) {
                                resolve({
                                    flag: true
                                })
                            } else {
                                resolve({
                                    flag: false,
                                    message: data.msg
                                })
                            }

                        }).catch(err => {
                            reject(err);
                            console.log(err);
                        })
                    } else if (data == 4) { //产看患者
                        this.$http({
                            url: '/applianceReplace/getImpression',
                            method: 'post',
                            data: {
                                caseId: this.$store.state.caseId,
                                stageName: this.$store.state.stageNameId,
                                stageCount: this.$store.state.stageCountId,
                            }
                        }).then(({
                            data
                        }) => {
                            if (data.code == 200) {
                                resolve({
                                    flag: true
                                })
                            } else {
                                resolve({
                                    flag: false,
                                    message: data.msg
                                })
                            }
                        }).catch(err => {
                            reject(err);
                            console.log(err);
                        })

                    }
                })


            }
        }
    };
</script>
<style lang="less" scoped>
    // 适配

    @media screen and (max-width: 1660px) {
        .cantent {
            padding: 0 17px !important;

            div {
                // padding-left: 5% !important;
            }
        }
    }

    @media screen and (max-width: 1360px) {
        .cantent {
            padding: 0 13px !important;

            div {
                font-size: 14px !important;
                // padding-left: 1% !important;
            }
        }
    }
</style>
<style scoped lang="less">
    .right2 {
        pointer-events: none;
        filter: grayscale(0.5);
    }

    /deep/ .el-dialog__wrapper {
        overflow: hidden !important;
    }

    /deep/.title {
        position: relative;
        color: #939393;
        margin-left: 15px;
        margin-bottom: 14px;
        font-size: 16px;
        font-weight: 600;
    }

    /deep/.title::before {
        content: "";
        width: 6px;
        height: 100%;
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #1175d2;
    }

    .cantent {
        background: #f9f9f9;
        padding: 0 21px;
        box-sizing: border-box;
        box-shadow: 0px 0px 3px #ccc;

        // box-shadow: 0px 2px 15px #565759;
        div {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ccc;
            color: #565759;
            font-size: 16px;
            // padding-left: 15%;
            box-sizing: border-box;

            &:hover {
                color: #1a95eb;
            }
        }


        div:last-of-type {
            border: none;
        }
    }
</style>