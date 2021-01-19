<template>
    <div id="particulars">
        <el-row v-if="true">
            <el-col :span="8">
                <p class="title">基本信息</p>
                <info ref="fatherData" class="cantent scale"></info>
            </el-col>
            <el-col :offset="1" :span="10" v-show="true">
                <p class="title">病例进程</p>
                <schedule class="cantent2 scale"></schedule>
            </el-col>
            <el-col :offset="1" :span="4">
                <ul>
                    <li class="item" >
                        <components-module :content="rightDate[0]">
                        </components-module>
                    </li>
                      <li class="item" >
                        <components-module @info="info" :content="rightDate[1]">
                        </components-module>
                    </li>
                      <li class="item" >
                        <components-module :content="rightDate[2]">
                        </components-module>
                    </li>
                </ul>
                
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import componentsModule from './components/componentsModule'
    import schedule from './components/schedule'
    import info from './components/info'
    import weituojiagd from '../weituojiagd'

    export default {
        components: {
            componentsModule,
            schedule,
            info,
            weituojiagd,
            datfatherDataa: {},
        },
        data() {
            return {
                fatherData: {},

                rightDate: [{
                        title: '补充选项',
                        arrayDate: [{
                                title: '病例重启',
                                router: '/blgl?havecq=1',
                                flag:5,
                            },
                            {
                                title: '后续生产',
                                router: '/hoxuxinjian/index'
                            },
                            {
                                title: '附件模板',
                                router: '/fujmob/index'
                            },
                            {
                                title: '备用矫治器',
                                router: '/baozhijiaozhiq/index'
                            },
                            {
                                title: '保持器',
                                router: '/fahuobcq/index'
                            },
                        ],
                    },
                    {
                        title: '方案信息',
                        arrayDate: [{
                                title: '委托加工单',
                                router: '/weituojiagd'
                            },
                            {
                                title: '3D方案',
                                router: '/three'
                            },
                            {
                                title: '治疗概况',
                                router: '0',
                            },
                            {
                                title: '患者照片',
                                router: '1',
                            }, {
                                title: 'X光片',
                                router: '2',
                            },
                        ],
                    },
                    {
                        title: '附加服务',
                        arrayDate: [{
                                title: '矫治器佩戴日期表',
                                router: '3'
                            },
                            // {
                            //     title: '查看变形的印模/扫描',
                            //     router: '4'
                            // },
                            //查看变形的印模/扫描   下个版本功能完善后再显示
                        ],
                    },
                ],
            }
        },
        created() {
            this.info();
        },
        methods: {
            info() {
            console.log(this.$store.state.caseId)

                this.fatherData = this.$route.params.data;
                this.$http({
                    url: "/caseInfo/getCaseInfo",
                    method: "POST",
                    data: {
                        caseId: this.$store.state.caseId,
                    }

                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        data = JSON.parse(data.data);
                        console.log(data)
                        this.$store.commit('changeCaseId',data.caseId);
                        this.$store.commit('changeStageCount',data.stageCount);
                        this.$store.commit('changeStageNameId',data.stageName);
                        this.$refs.fatherData.init(data);
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>
<style lang="less" scoped>
.el-icon-circle-close { color: #fff;}
    @media screen and (max-width: 1660px) {}

    @media screen and (max-width: 1360px) {}
</style>
<style lang="less" scoped>
    // 适配
    @media screen and (min-height: 1100px) {
         #particulars  {
             .scale {
                 height:700px !important;
             }
            /deep/.card-content div{
            height: 60px;
            line-height: 60px;
            }
         }
    }
    @media screen and (max-width: 1660px) {
        #particulars .el-row div[class^="el-col"] .cantent {
            padding: 30px 30px !important;
        }
    }

    @media screen and (max-width: 1360px) {}
</style>
<style scoped lang="less">
    #particulars {
        margin-top: 20px;

        /deep/.item {
            margin-bottom: 25px;
            cursor: pointer;
        }

        /deep/ .el-col-8 {
            width: 35%;
        }

        /deep/ .el-col-10 {
            width: 40%;
        }

        /deep/ .el-col-4 {
            width: 21.5%;
        }

        /deep/ .el-col-offset-1 {
            margin-left: 1.5%;
        }

        .el-row {
            div[class^="el-col"] {

                .title {
                    font-size: 16px;
                    color: #939393;
                    margin-bottom: 12px;
                    font-weight: 600;
                }

                .cantent {
                    box-shadow: 0px 0px 5px #ccc;
                    border-radius: 5px;
                    background: #f9f9f9;
                    padding: 35px 55px;
                    min-height: 605px;
                    box-sizing: border-box;
                }

                .cantent2 {
                    box-shadow: 0px 0px 5px #ccc;
                    border-radius: 5px;
                    background: #f9f9f9;
                    padding: 35px 55px;
                    height: 605px;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>