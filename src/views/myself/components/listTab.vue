<template>
    <div>
        <div class="xgmm main">
            <div class="box-nav clearfix">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane v-for="(item,i) in routerUrl" :key="i" :name="item[0]" @tab-click="handleClick"
                        :router="item[1]" style="width:auto">
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
            this.routerUrl = this.$store.state.myselfArr;
            this.activeName = this.routerUrl[this.routerUrl.length - 1][0]
        },
        methods: {
            handleClick(tab, event) {
                this.$store.commit('myselfRemove', Number(tab.index) + 1);
                let router = tab.$attrs.router;
                this.$router.push(router);
            }
        },
        computed: {
            changelength() {
                let leng = this.$store.state.myselfArr.length - 1
                return this.$store.state.myselfArr[length];
            },
            changeDate() {
                return this.$store.state.myselfArr.length;
            },
        },
        watch: {
            changelength() {
                this.routerUrl = this.$store.state.myselfArr
                this.activeName = this.routerUrl[this.routerUrl.length - 1][0]
            },
            changeDate() {
                this.routerUrl = this.$store.state.myselfArr
                this.activeName = this.routerUrl[this.routerUrl.length - 1][0]
            }
        },
    }
</script>

<style lang="less" scoped>
  
    /deep/.xgmm {
        height: 96px;

    }

    /deep/.box-nav {
        box-sizing: border-box;
    }

    /deep/.el-tabs__header {
        margin-bottom: 0px;
        height: 96px;

        .el-tabs__nav-wrap {
            // line-height: 96px;
            // height: 96px;

            .el-tabs__nav-scroll {
                margin-top: 34px;
            }

            .el-tabs__item {
                width: auto !important;
                color: #666666;
                padding: 0 !important;
            }
        }

    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        background: transparent !important;

        /deep/.el-tabs__item {
            color: #1175d2;

        }
    }


    /deep/ .el-tabs__item {
        font-size: 16px;
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
        padding-left: 0;
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
            border: 1px solid #1175d2;
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
        margin: 0 24px;
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

    // tab 当前选中的颜色
    /deep/.is-active {
        color: #1175d2;

        i {
            color: #1175d2;
        }
    }

    /deep/.el-tabs__item:hover {
        color: #1175d2 !important;

        i {
            color: #1175d2 !important;
        }
    }
      // 兼容垃圾IE
    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
        /deep/.sjxone {
            margin-top: 12px;
        }

        /deep/.sjxtow {
            margin-top: 12px;
        }

    }

</style>