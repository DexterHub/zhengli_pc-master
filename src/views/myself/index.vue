<template>
    <div class="myself " style="background:#dcdddf">
        <div v-show="flag">
            <div class="topsek">
            </div>
            <el-tabs type="card" class="main"  @tab-click="handleClick">
                <el-tab-pane label="医生账户">
                    <yi></yi>
                    <shou></shou>
                    <!-- <ti></ti> -->
                </el-tab-pane>

                <el-tab-pane label="员工账户">
                    <yuangong></yuangong>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div v-show="!flag">
            <listTab></listTab>
            <router-view />
        </div>

    </div>
</template>

<script>
    import yi from './components/yisheng.vue'
    import shou from './components/shouhuo.vue'
    // import ti from './components/tixing.vue'
    import yuangong from './components/yuangong.vue'
    import listTab from './components/listTab.vue'
    export default {
        components: {
            yi,
            shou,
            // ti,
            yuangong,
            listTab
        },
        data() {
            return {
                flag: true,
                activeName: 'two',
            }
        },
        beforeMount(){
            if (this.$route.matched[1].path = '/myself') {
                if (this.$route.matched.length > 2) {
                    this.flag = false
                } else {
                    this.flag = true
                }
            }
        },
        methods: {
            handleClick(tab) {
                if(tab.label == '员工账户') {
                    this.$store.commit('myselfAdd', ['员工账户','/myself']);
                }else {
                    this.$store.commit('myselfRemove',1);
                }
            },
        },
        computed: {
            pickedDate() {
                if (this.$route.matched[1].path = '/myself') {
                    if (this.$route.matched.length > 2) {
                        return false
                    } else {
                        return true
                    }
                }
            }
        },
        watch: {
            pickedDate(newVal) {
                this.flag = newVal
            }
        },
    }
</script>

<style lang="less" scoped>
    .myself {
        height: 100%;
    }
    .el-tabs--border-card {
        border: none;
    }


    /deep/ .el-tabs--card>.el-tabs__header {
        border-bottom: none;
    }

    /deep/.el-tabs__nav-scroll {
        height: 51px;
    }
    .w1{
        width: 150px;
    }
    /deep/.el-tabs__item {
        width: 150px;
        color: #fff;
        font-size: 16px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border: 0px !important;
    }

    /deep/.topsek {
        width: 100%;
        height: 120px;
        background: #565759;
    }

    /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        background: #fff;
        color: #1175d2;
    }

    /deep/ .el-tabs__item:hover {
        color: none;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        color: none;
    }

    /deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: none;
    }

    /deep/ .el-tabs--border-card>.el-tabs__header {
        border-bottom: none;
    }
       
    /deep/ .el-tabs--border-card>.el-tabs__content {
        background-color: #dcdddf;
        // padding: 0;
    }
    /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        border-radius: 5px 5px 0 0;
    }

    /deep/ .el-tabs--border-card>.el-tabs__header {
        // padding-top: 50px;
        background-color: #565759;
    }

    /deep/.el-tabs {
        margin-top: -50px;
    }
    /deep/ .el-tabs__header {
        margin: 0;
    }
</style>