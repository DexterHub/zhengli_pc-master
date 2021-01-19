<template>
    <div id="header">
        <div class="main clearfix">
            <div class="logo fl" style="cursor: pointer" @click="handleCommand('/index')">
                <img src="@/assets/1顶部导航/切图_06.png">
            </div>
            <div class="fl">
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                    background-color="#353b43" text-color="#b0b2b5" active-text-color="#fff">
                    <el-menu-item index="0" ref="index0" @click="handleCommand('/index')">病例管理</el-menu-item>
                    <el-menu-item index="1" ref="index1" @click="handleCommand('/myself')" v-if="this.authority">个人中心
                    </el-menu-item>
                    <el-menu-item index="2" ref="index2" @click="handleCommand('/bzzx')">帮助中心</el-menu-item>
                </el-menu>
            </div>
            <div style="margin-top:10px;" class="fr myCursor">
                <el-dropdown trigger="click" style="height:30px;margin-top:15px" @command="info">
                    <div class="el-dropdown-link;line-height:30px">
                        <el-avatar shape="square" fit="fill" :src="require('@/assets/1顶部导航/切图_03.png')" class="fl"
                            style="height:30px;"></el-avatar>
                        <div class="fl private" style="height:30px;line-height:30px;color:#fff;">
                            {{username}} {{staffName}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='1' v-if="!this.authority">账户权限</el-dropdown-item>
                        <el-dropdown-item command='2' v-if="this.authority">医生信息</el-dropdown-item>
                        <el-dropdown-item command='3' v-if="this.authority">矫治偏好</el-dropdown-item>
                        <el-dropdown-item command='4' v-if="this.authority">修改密码</el-dropdown-item>
                        <el-dropdown-item command='5'>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                flag: '0',
                activeIndex2: '0',
                authority: true,
                username: '',
                staffName: '',
            }
        },
        mounted() {
            this.authority = localStorage.getItem("authority") == 1;
            this.routePath(this.$route.fullPath);
            if (this.authority == 1) {
                this.getinfoDoctor();
            }

            this.staffName = localStorage.getItem('staffName');
        },
        methods: {
            // 获取医生信息接口
            getinfoDoctor() {
                this.$http({
                    url: "/doctor/getInfo",
                    method: "get",
                }).then(({
                    data
                }) => {
                    // console.log(data)
                    if (data.code == 200) {
                        // console.log(JSON.parse(data.data))
                        var pop = JSON.parse(data.data);
                        this.username = pop.realname;
                        window.localStorage.setItem('realname', pop.realname);
                        window.localStorage.setItem('accountNumber', pop.accountNumber);
                        window.localStorage.setItem('email', pop.email);
                        window.localStorage.setItem('phone', pop.phone);
                    } else {

                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            handleSelect() {},
            // 路径跳转
            handleCommand(command) {
                let that = this;
                if (this.$route.fullPath == '/blgl') {
                    this.activeIndex2 = '10';
                    console.log(this.activeIndex2)
                    this.$confirm('你是否要退出病例', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push(command);
                    }).catch(err => {
                        console.log(err)
                        that.activeIndex2 = '0';

                    });
                } else {
                    this.$router.push(command);
                    that.flag = "1";
                }
            },
            // 控制横线
            routePath(newVal) {
                switch (newVal) {
                    case '/index':
                        this.$store.commit('indexRemove', 1);
                        this.$store.commit('myselfRemove', 1);
                        this.activeIndex2 = '0';
                        break;
                    case '/myself':
                        this.$store.commit('indexRemove', 1);
                        this.$store.commit('myselfRemove', 1);
                        this.activeIndex2 = '1';
                        break;
                    case '/bzzx':
                        this.$store.commit('indexRemove', 1);
                        this.$store.commit('myselfRemove', 1);
                        this.activeIndex2 = '2';
                        break;
                }
            },
            //个人信息 
            info(data) {
                let that = this;

                function cy() {
                    if (data == 1) {
                        that.$store.commit('jurisdiction', true);
                    } else if (data == 2) {
                        that.$router.push('/myself');
                        that.activeIndex2 = '1';
                    } else if (data == 3) {
                        that.$router.push('/clinic');
                        that.activeIndex2 = '0';
                    } else if (data == 4) {
                        that.$router.push('/xgmm');
                        that.activeIndex2 = '1';
                        that.$store.commit('myselfAdd', ['修改密码', '/xgmm']);
                    } else if (data == 5) {
                        window.localStorage.removeItem('realname');
                        window.localStorage.removeItem('accountNumber');
                        window.localStorage.removeItem('email');
                        window.localStorage.removeItem('phone');
                        window.localStorage.removeItem('staffName');
                        that.$cookie.remove('token');
                        that.$router.push('./login');
                        that.$http({
                            url: "/loginOut",
                            method: "get",
                            params: {}
                        }).then(({
                            data
                        }) => {

                        }).catch(err => {
                            console.log(err);
                        })
                    }
                }
                if (this.$route.fullPath == '/blgl') {
                    this.activeIndex2 = '10';
                    this.$confirm('你是否要退出病例', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log(123)
                        cy();
                    }).catch(err => {
                        console.log(err)
                        // if (data == 1) {
                        // } else if (data == 2) {
                        //     that.activeIndex2 = '1';
                        // } else if (data == 3) {
                        //     that.activeIndex2 = '0';
                        // } else if (data == 4) {
                        //     that.activeIndex2 = '1';
                        // } else if (data == 5) {
                            that.activeIndex2 = '0';
                        // }
                    });
                } else {
                    cy()
                }




            }
        },
        computed: {
            pickedDate() {
                return this.$route.fullPath
            }
        },
        watch: {
            pickedDate(newVal) {
                this.routePath(newVal)
            },
            activeIndex2(newVal) {
                console.log(newVal)
            }
        },
    }
</script>
<style lang="less" scoped>
    // 兼容垃圾IE
    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
        .private {
            line-height: 40px !important;
        }
    }

    // 适配
    @media screen and (max-width: 1660px) {
        #header .logo {
            margin-right: 180px*0.8 !important;
        }

    }

    @media screen and (max-width: 1360px) {
        #header .logo {
            margin-right: 180px*0.7 !important;
        }

    }
</style>
<style scoped lang="less">
    #header {
        height: 80px;
        background: #353b43;
        box-shadow: 0px 0px 25px #000;
        position: fixed;
        z-index: 100;
        // left: 50%;
        top: 0;
        width: 100%;
        // transform: translateX(-50%);

        .logo {
            margin-top: 29px;
            ;
            margin-right: 180px;
        }

        .el-avatar {
            background: none;
            line-height: 80px;
        }

        .el-menu--horizontal>.el-menu-item {
            font-size: 20px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            width: 94px;
            padding: 0;
            margin-right: 78px;
        }

        // .logo,.el-dropdown {
        //     color: white;
        // }
        .el-menu--horizontal>.el-menu-item.is-active {
            text-align: center;
            width: 94px;
            border-bottom-color: #ec8d03 !important;
            border-bottom-width: 4px;
            background-color: #353b43 !important;
            color: #f99400 !important;

            // text-shadow: 1px 1px 5px #fff;
            &:hover {
                background-color: #353b43 !important;
            }
        }

        .el-menu-item:hover {
            border-width: 4px;
            border-bottom-color: #fda21c !important;
            background-color: #353b43 !important;
            pointer-events: couser;
        }

        .el-menu.el-menu--horizontal {
            border: none;
        }

        .private {
            font-size: 16px;
        }

        .el-icon--right {
            margin-left: 20px;
        }
    }

    .el-dropdown-menu {
        top: 50px !important;
    }
</style>