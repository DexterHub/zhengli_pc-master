<template>
    <div class="bbzx ">
        <div class="topsek">

        </div>
        <el-tabs class="main" v-model="activeName" type="card" @tab-click="handleClick">


            <el-tab-pane label="下载专区" name="first">
                <div class="biaot">文档资料</div>
                <div :class="[{'box':true},{'clearfix':true},{'marbo':flag1}]">
                    <div class="renwu renwu1">
                        <img class="renwuleftimg" src="../../assets/bbzx/2.png">
                        委托加工单
                    </div>
                    <el-row>
                        <el-button type="primary" @click="toOne" class="huyi2">
                            <img style="position:absolute;right:40px;top: 50%;transform: translateY(-50%);"
                                class="xiaztup" src="@/assets/2.2病例详情/下载按钮图标.png">
                            下载

                        </el-button>
                    </el-row>
                </div>
                <div :class="{'hide':flag1}">
                    <div class="biaot">OrthoPlus软件下载</div>
                    <div class="box clearfix">
                        <div class="renwu renwu2">
                            <img class="renwuleftimg" src="../../assets/bbzx/1.png">
                            OrthoPlus.exe
                            <span style="position:absolute;top:-5px;vertical-align: super; font-size:8px;">®</span>
                        </div>
                        <el-row>
                            <el-button type="primary" @click="lkj" class="huyi2">
                                <img style="position:absolute;right:40px;top: 50%;transform: translateY(-50%);"
                                    class="xiaztup" src="@/assets/2.2病例详情/下载按钮图标.png">
                                下载
                            </el-button>
                        </el-row>
                    </div>
                    <p class="pbq p1">OrthoPlus是正丽科技自主研发的一款集提交、修改、跟踪、查看病例于一体的软件，方便医生管理病例并拟定治疗方案的在线病例管理平台。</p>
                </div>

                <p class="pbq p2">如果您在使用正丽科技软件时遇到任何技术问题，请查阅我们的软件帮助手册。</p>
                <p class="pbq p3">您也可以联系公司客服或当地营销人员，以获取进一步帮助。</p>


            </el-tab-pane>

            <el-tab-pane label="联系我们" name="second">
                <p class="pbq pp1">非常感谢您对正丽科技的关注，我们全体员工将致力于为您提供优质的服务。</p>
                <p class="pbq pp2">如果您有任何问题或需要了解更多的产品信息，请通过电话或邮件联系相应的客户经理。</p>
                <div class="item clearfix">
                    <div>联系方式</div>
                    <div>
                        <p style="margin-bottom:2px;">医生服务热线： 022-84846099</p>
                        <p>客服热线： 4007-177-977</p>
                    </div>
                </div>

                <div class="item clearfix">
                    <div>工作时间</div>
                    <div>
                        <p>上午9点至下午6点，周一至周五</p>
                    </div>
                </div>

                <div class="item clearfix">
                    <div class="dizhi">地址</div>
                    <div>
                        <p style="margin-bottom:2px;">上海市闵行区申虹路958号富力中心C栋6楼</p>
                        <p>天津市东丽区空港经济区中环西路56号中科天保智谷9号楼</p>
                    </div>
                </div>

                <!-- <div class="item clearfix">
                    <div>客户经理</div>
                    <div>
                        <p>Linda Li</p>
                    </div>
                </div> -->

                <!-- <div class="item clearfix">
                    <div>电子邮箱</div>
                    <div>
                        <p>case@magicalign.com</p>
                    </div>
                </div> -->

                <div class="item clearfix">
                    <div>临床顾问</div>
                    <div>
                        <p>请联系您的客户经理为您预约临床支持服务</p>
                    </div>
                </div>

            </el-tab-pane>

        </el-tabs>
    </div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                activeName: 'first',
                url1: '',
                url2: '',
                flag1:false
            };
        },
        created() {
            this.download();
            this.judgeMac();
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            download() {
                this.$http({
                    url: "/caseInfo/download",
                    method: "get"
                }).then(({
                    data
                }) => {
                    // console.log(data)
                    if (data.code == 200) {
                        // console.log(JSON.parse(data.data))
                        this.url1 = JSON.parse(data.data).order;
                        this.url2 = JSON.parse(data.data).orthoplus;
                    } else {

                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            toOne() {
                window.open(this.url1, "_blank");
            },
            lkj() {
                window.open(this.url2, "_blank");
            },
            // 判断电脑是不是苹果系统
            judgeMac() {
                var agent = navigator.userAgent.toLowerCase();
                var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
                
                if (isMac) {
                    this.flag1=true
                    // alert("这是mac系统");
                }
            }
        }
    }
</script>
<style scoped lang="less">
    .bbzx {
        width: 100%;
        height: 100%;
        font-size: 16px;
    }
    .hide{
        display: none;
    }
    .marbo{
        margin-bottom: 50px !important;
    }
    .huyi2:hover {
        background: #1a95eb !important;
    }

    /deep/.topsek {
        width: 100%;
        height: 120px;
        background: #565759;
    }

    /deep/.el-tabs__header {
        margin-bottom: 0px;
    }

    /deep/.el-tabs--card>.el-tabs__header {
        height: 59px;
        margin-bottom: 1px;
        border: none;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: none;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item {
        border: none;
        width: 150px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #fff;
    }

    /deep/.el-tabs {
        margin-top: -50px;
    }

    .clearfix:before,
    .clearfix:after {
        content: "";
        display: table;
    }

    .clearfix:after {
        clear: both;
    }

    .clearfix {
        *zoom: 1;
    }

    /deep/.biaot {
        color: #666666;
        position: relative;
        margin-bottom: 30px;
        margin-top: 52px;
        // height:25px;
        // line-height: 25px;
        padding: 3px 0;
    }

    /deep/.biaot::before {
        content: "";
        width: 6px;
        height: 25px;
        position: absolute;
        left: -15px;
        top: 50%;
        transform: translateY(-50%);
        background: #1175d2;
    }

    /deep/.renwu {
        color: #1175d2;
        position: relative;
        float: left;
        line-height: 40px;
        margin-right: 60px;
    }

    /deep/.renwuleftimg {
        vertical-align: middle;
        margin-right: 10px;
    }

    .el-button--primary {
        background: #1175d2 !important;
        height: 36px;
        line-height: 35px;
        padding: 0;
        border: none;
    }

    /deep/.el-row {
        float: left;
        height: 40px;

        .el-button {
            height: 100%;
        }
    }

    /deep/.el-button {
        width: 140px;
    }

    /deep/.el-button span {
        color: #fefefe;
        margin-left: -25px;
    }

    /deep/ .el-button:active {
        border: none !important;
    }

    /deep/.el-tabs__content {
        height: 650px;
        background: #f9f9f9;
        padding-left: 74px;
        box-sizing: border-box;
        margin-bottom: 80px;
        // box-shadow: 0px 15px 15px #ccc;
        margin-top: -10px;
    }

    #pane-first {
        padding-left: 12px;
    }

    /deep/.pbq {
        font-size: 14px;
        color: #999999;
    }

    /deep/.p1 {
        margin-top: 20px;
        margin-bottom: 30px;
        color: #666;
    }

    /deep/.p2 {
        color: #999999;
        margin-bottom: 2px;
    }

    /deep/.p3 {
        color: #909399;
    }

    /deep/.pp1 {
        margin-top: 60px;
        margin-bottom: 2px;
    }

    /deep/.pp2 {
        margin-bottom: 40px;
    }

    /deep/.item>div {
        margin-bottom: 36px;
        float: left;
        color: #666;
    }

    /deep/.item .dizhi {
        letter-spacing: 33px;
    }

    /deep/.item>div:nth-child(1) {
        width: 150px;
        color: #333333;
        font-weight: 600;
    }

    /deep/.renwu1 {
        width: 160px;
    }

    /deep/.renwu2 {
        width: 160px;
    }

    /deep/.el-tabs__nav-wrap {
        overflow: visible;

        /deep/.el-tabs__nav-scroll {
            overflow: visible;
        }
    }

    // 选中的
    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        background: #fff;
        color: #1175d2;
        // box-shadow: 0px 5px 5px #cccccc;
    }

    /deep/ .el-tabs__item {
        border-radius: 5px 5px 0 0;
        transition: all 0.5s;
        font-size: 16px;
        // box-shadow: 0px 10px 10px #888;

    }

    /deep/ .renwu2 {
        position: relative;
    }

    /deep/ .renwu2 span {
        border-radius: 5px 5px 0 0;
    }
</style>