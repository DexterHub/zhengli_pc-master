<template>
    <div id="listTab">
        <div class="xgmm main" style="padding:0;">
            <div class="box-nav clearfix">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane v-for="(item,i) in routerUrl" :key="i" :name="item[0]" @tab-click="handleClick"
                        :router="item[1]">
                        <span slot="label">
                            <div class="arrows fr" v-if="i!=routerUrl.length-1">
                                <i class="sjxone el-icon-caret-right" style="color:#71a6d8"></i>
                                <i class="sjxtow el-icon-caret-right" style="color:#71a6d8"></i>
                            </div>
                            <span class="title">{{item[0]}}</span>
                        </span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: '',
                routerUrl: ['1', '2', '3'],
            }
        },
        beforeMount() {
            this.routerUrl = this.$store.state.indexArr;
            this.activeName = this.routerUrl[this.routerUrl.length - 1][0]
        },
        methods: {
            handleClick(tab, event) {
                this.$store.commit('indexRemove', Number(tab.index) + 1);
                let router = tab.$attrs.router;
                this.$router.push(router);
            }
        },
        computed: {
            changelength() {
                let leng = this.$store.state.indexArr.length - 1
                return this.$store.state.indexArr[length];
            },
            changeDate() {
                return this.$store.state.indexArr.length;
            },
        },
        watch: {
            changelength() {
                this.routerUrl = this.$store.state.indexArr
                this.activeName = this.routerUrl[this.routerUrl.length - 1][0]
            },
            changeDate() {
                this.routerUrl = this.$store.state.indexArr
                this.activeName = this.routerUrl[this.routerUrl.length - 1][0]
            }
        },
    }
</script>
<style lang="less" scoped>
    // 适配
    @media screen and (max-width: 1660px) {
       /deep/ .el-tabs__item {
            padding-left:0 !important;
        }

    }
    //  @media screen and (min-height: 1100px) {
    //      #listTab  {
    //         transform: scale(1.1);
    //         transform-origin: center top;
    //     }
    // }
    @media screen and (max-width: 1360px) {
        .xgmm{
            padding-left:0px !important;
        }

    }
</style>
<style lang="less" scoped>
 // 兼容垃圾IE
    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
        /deep/.el-icon-caret-right {
            margin-top: 13px !important;
        }
    }
    /deep/.xgmm {
        // height: 96px;
        line-height: 40px;
        margin-top: 42px;
        margin-bottom: 14px;
    }
    // ==============开始
    .sjxone {
        margin-top: 11px;
        float: right;
        display: block;
        margin-left: -14px;
        margin-right: 42px;
        color: rgba(17, 117, 219, 0.3);
    }
    .sjxtow {
        margin-left: 20px;
        margin-top: 11px;
        float: right;
        display: block;
        color: rgba(17, 117, 219, 0.3) // margin-left: -14px;
    }
    
    // tab 当前选中的颜色
    /deep/.is-active {
        color: #1175d2 !important;

        i {
            color: #1175d2 !important;
        }
    }

    /deep/.el-tabs__item:hover {
        color: #409EFF !important;

        i {
            color: #409EFF !important;
        }
    }
    // =========结束
    /deep/.box-nav {
        box-sizing: border-box;
        // margin-left:-20px;

    }

    /deep/.el-tabs__header {
        margin-bottom: 0px;
        // height: 96px;

        .el-tabs__nav-wrap {
            // line-height: 96px;
            // height: 96px;

        }

            .el-tabs__item {
                color: #666666;
                // padding:0 !important;
            }
      
    }
    /deep/.el-tabs__item {
        color: #666666;
        padding-left:0px !important;
    }
    // }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        background: transparent !important;

        .el-tabs__item {
            color: #1175d2;

        }
    }


    /deep/ .el-tabs__item {
        font-size: 16px;
        padding-left:0px;
    }

    /deep/ .el-tabs__item.is-active {
        color: #1175d2;
    }

    /deep/.el-tabs--card>.el-tabs__header {
        border: none;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: none;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item {
        border: none;
    }

    // 按钮
    /deep/.elrowone {
        float: left;
        margin-top: 20px;
        margin-bottom: 20px;

        .el-button {
            margin-right: 30px;
        }

        .quxbut {
            background: none;
            border: 1px solid skyblue;
            color: black;
        }
    }

    /deep/.elrowtow {
        float: right;
        margin-top: 20px;
        margin-bottom: 20px;

        .el-button {
            margin-left: 30px;
        }
    }

    /deep/.el-button {
        padding: 0px;
        width: 140px;
        height: 36px;
    }

    /deep/.el-icon-caret-right {
        font-size: 20px;
    }

    /deep/.arrows {
        margin-right: -30px;
        margin-top: -5px;
    }

    /deep/.sjxone {
        float: right;
        margin-top: 16px;
    }

    /deep/.sjxtow {
        margin-top: 16px;
        float: right;
        margin-right: -13px;
    }

    /deep/.el-tabs {
        margin-top: 0 !important;
    }
</style>