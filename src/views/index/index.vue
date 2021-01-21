<template>
    <div id="homeList">
        <div v-show="flag">
            <div class="head">
                <div class="main">
                    <el-row type="flex" class="row-bg" style="padding-top: 50px;" justify="space-between">
                        <!-- 新建按钮 -->
                        <el-col :span="7">
                            <!-- @click="()=>{this.$router.push('/blgl')}" -->
                            <el-button type="primary" @click="newbinglbut"
                                :class="{ xinjian: true, right1: !this.$store.state.rightCode.includes(1) }">
                                <el-image style :src="require('@/assets/2.1病例管理首页/切图_26.png')"></el-image>
                                <span class="xjblispantext">新建病例</span>
                            </el-button>
                        </el-col>
                        <!-- 治疗量和时间 -->
                        <el-col style="border-radius: 5px; overflow: hidden;" class="myCursor" :span="9">
                            <div class="fl number">
                                <p class="fl" style="color:#000;">
                                    治疗方案获
                                    <br class="line" />批准的病例量：
                                </p>
                                <span class="dada"
                                    style="font-size: 32px;color:#f99400;margin-left:16px;">{{ count }}</span>
                            </div>
                            <div class="fl time">
                                <div class="fl" style="color:#fff">
                                    <p style="margin-bottom:5.5px;">{{ value2[0] | date }}</p>
                                    <p>{{ value2[1] | date }}</p>
                                </div>

                                <el-image style="background:transparent" shape="square" fit="fill"
                                    :src="require('@/assets/2.1病例管理首页/切图_49.png')" class="fl"></el-image>
                                <div class="block">
                                    <el-date-picker onPick="selectDate" v-model="value2" type="daterange">
                                    </el-date-picker>
                                </div>
                            </div>
                        </el-col>
                        <!-- 搜索功能 -->
                        <el-col :span="7" class="right">
                            <i style="font-size: 27px;" class="el-icon-search"></i>
                            <el-image shape="square" fit="fill" @click="search"
                                :src="require('@/assets/2.1病例管理首页/切图_65.png')" class="fr searchImg myCursor" style>
                            </el-image>
                            <el-input placeholder="请输入患者姓名查询" v-model="indexSearch" class="fr el-input-group huyi">
                            </el-input>
                        </el-col>
                    </el-row>
                    <!-- tab切换 -->
                    <el-row type="flex" class="row-bg bottom" style=" height:71px;padding-top: 22px;"
                        justify="space-between">
                        <el-col :span="10">
                            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
                                @select="handleSelect" background-color="#545759" text-color="#b0b2b5"
                                active-text-color="#fff">
                                <el-menu-item index="0" route>{{ `治疗中（${treatment}）` }}
                                </el-menu-item>
                                <el-menu-item index="1" route>{{ `处理中（${handle}）` }}
                                </el-menu-item>
                                <el-menu-item index="2" route>{{ `已完成（${complete}）` }}
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                        <!-- 切换页面跳转 -->
                        <el-col :span="6" class="select">
                            <!-- 切换页码 -->
                            <p style="float: left;height: 40px;line-height: 40px;color: #fff">
                                <i class="el-icon-arrow-left myCursor" @click="pre" style="margin-right:15px"></i>
                                <span style="user-select:none ">{{ (page || 1) + "/" + (caseData.totalPage || 1) }}</span>

                                <i class="el-icon-arrow-right myCursor" @click="next" style="margin-left:15px"></i>
                            </p>
                            <!-- 跳转页码 -->
                            <div class="Dx_left">
                                <span>跳转</span>
                                <el-input v-model="pageNum" oninput="value=value.replace(/[^\d]/g,'')" class="page"
                                    style="width: 50px;"></el-input>
                                <span>页</span>
                                <el-button @click="confirm" class="queding">确定</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="body">
                <refactor-table @follow="follow" :tableData2="tableData1"></refactor-table>
            </div>
        </div>
        <div v-show="!flag" class="main">
            <listTab></listTab>
            <router-view />
        </div>
        <dialogbg @continuenew="continuenew" @newxinjbingl="newxinjbingl" ref="xingjbltc"></dialogbg>
    </div>
</template>
<script>
    import {
        abab
    } from "@/util/validate.js";

    import {
        dateToStr
    } from "@/util/validate.js";

    import listTab from "./components/listTab";
    import refactorTable from "./components/refactorTable";
    import dialogbg from "./components/dialog";
    export default {
        components: {
            listTab,
            refactorTable,
            dialogbg
        },
        data() {
            return {
                // 病例状态图标，不同的返回值对应不同的图标，
                statusType: {
                    2: require("@/assets/2.1病例管理首页/资料收集.png"),
                    3: require("@/assets/2.1病例管理首页/资料质检.png"),
                    4: require("@/assets/2.1病例管理首页/病例沟通.png"),
                    5: require("@/assets/2.1病例管理首页/方案设计.png"),
                    6: require("@/assets/2.1病例管理首页/方案确认.png"),
                    7: require("@/assets/2.1病例管理首页/订单确认.png"),
                    8: require("@/assets/2.1病例管理首页/生产.png"),
                    9: require("@/assets/2.1病例管理首页/发货.png"),
                    10: require("@/assets/2.1病例管理首页/签收.png"),
                    11: require("@/assets/2.1病例管理首页/治疗已结束.png")
                },
                // 默认展示数量

                treatment: 0,
                handle: 0,
                complete: 0,
                // 搜索显示数量
                searchunm1: "",
                // 将搜索到的存起来
                middle: ["", "", ""],
                page: 1,
                pageNum: "",
                // 当前tab
                tabActive: 1,
                // 当前需要搜索的值
                indexSearch: "",
                flag: true,
                activeIndex2: "0",
                value2: [new Date(), new Date()],
                dataArr: {
                    totalPage: "",
                    total: ""
                },
                tableData1: [],
                caseData: {},
                count: "",

                // 后台返回的全部数据
                allData: [],
                // 搜索到的字符串，暂存
                searchData: []
            };
        },

        mounted() {
            this.init();
            this.doctor({});
        },
        filters: {
            date(date) {
                return dateToStr(new Date(date));
            }
        },
        beforeMount() {
            if ((this.$route.matched[1].path = "/myself")) {
                if (this.$route.matched.length > 2) {
                    this.flag = false;
                } else {
                    this.flag = true;
                }
            }
        },
        methods: {
            // 获取 未完成 病例  判断进入 新建病例
            weiwcbingl() {
                this.LoadingOpen();
                this.$http({
                        url: "/caseInfo/getCaseNotComplete",
                        method: "get",
                        params: {}
                    })
                    .then(({
                        data
                    }) => {
                        this.LoadingClose();
                        if (data.data == "您没有未完成病例") {
                            this.$router.push("./blgl");
                            this.$store.commit("bili", "two");
                        } else {
                            data = JSON.parse(data.data);
                            this.$store.commit("abab1", data.id);
                            this.$store.commit("abab2", data.stageName);
                            this.$store.commit("abab3", data.stageCount);
                            this.$store.commit("huidaoshangci", data.createIndex);
                            if (this.$store.state.yeshuono) {
                                this.$refs.xingjbltc.centerDialogVisible = true;
                            }
                        }
                    })
                    .catch((err) => {
                        console.err(err);
                    });
            },
            // 新建病例 but 按钮
            newbinglbut() {
                this.weiwcbingl();
            },
            // 让 dialog 子组件 触发的 事件   是 继续新建
            continuenew() {
                this.$router.push("./blgl");
                this.LoadingClose();
                switch (this.$store.state.yeshuono) {
                    case 1:
                        this.$store.commit("bili", "three");
                        this.activeName = this.$store.state.activeName;
                        break;

                    case 2:
                        this.$store.commit("bili", "four");
                        this.activeName = this.$store.state.activeName;
                        break;

                    case 3:
                        this.$store.commit("bili", "five");
                        this.activeName = this.$store.state.activeName;
                        break;

                    case 4:
                        this.$store.commit("bili", "six");
                        this.activeName = this.$store.state.activeName;
                        break;

                    case 5:
                        this.$store.commit("bili", "seven");
                        this.activeName = this.$store.state.activeName;
                        break;

                    case 6:
                        this.$store.commit("bili", "eight");
                        this.activeName = this.$store.state.activeName;
                        break;

                    case 7:
                        this.$store.commit("bili", "nine");
                        this.activeName = this.$store.state.activeName;
                        break;

                    case 8:
                        this.$store.commit("bili", "zero");
                        this.activeName = this.$store.state.activeName;
                        break;
                }
            },

            // 让 dialog 子组件 触发的 事件   否 新建病例
            newxinjbingl() {
                this.LoadingClose();
                this.$http({
                        url: "/caseInfo/cancelCase",
                        method: "get"
                    })
                    .then(({
                        data
                    }) => {})
                    .catch((err) => {});
                this.$router.push("./blgl");
                this.$store.commit("bili", "two");
                this.activeName = this.$store.state.activeName;
            },

            selectDate({
                maxDate,
                minDate
            }) {},
            // 初始化判断权限之类的东西
            init() {
                //当前时间
                let pre = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
                this.value2[0] = pre;
                this.approvalCount(this.value2[0], this.value2[1]);
                this.typeCount(); //获取不同状态的数量
                if (localStorage.getItem("authority") == 1) {
                    // 医生账户进来
                    // this.getinfoDoctor();
                    this.$store.commit("empty");
                    this.$store.commit("permissionList", 1);
                    this.$store.commit("permissionList", 2);
                    this.$store.commit("permissionList", 3);
                    this.$store.commit("permissionList", 4);
                    this.$store.commit("permissionList", 5);
                    this.$store.commit("permissionList", 6);
                    this.$store.commit("permissionList", 7);
                    this.$store.commit("permissionList", 8);
                    this.$store.commit("permissionList", 9);
                } else {
                    // 员工账户进来
                    this.employee();
                }
            },
            // 获取治疗方案获批准的病例量
            approvalCount(startTime, entTime) {
                startTime = new Date(new Date(startTime.toLocaleDateString()).getTime()).getTime();
                entTime = new Date(new Date(entTime.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
                    .getTime();
                this.$http({
                        url: "/caseInfo/approvalCount",
                        method: "post",
                        data: {
                            startTime: startTime,
                            entTime: entTime
                        }
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.count = JSON.parse(data.data).count;
                        } else {}
                    })
                    .catch((err) => {
                        console.err(err);
                    });
            },
            handleSelect(val) {
                //tab切换
                this.page = 1;
                this.tabActive = Number(val) + 1;
                this.doctor({
                    outerNo: this.indexSearch,
                    patientName: this.indexSearch,
                    type: this.tabActive,
                    pageNum: this.page,
                    pageSize: 10
                });
            },
             search() {
                //点击搜索干啥
                this.page = 1;
                if (!this.indexSearch) {
                    this.doctor({});
                    return;
                }
                this.doctor({
                    patientName: this.indexSearch
                });
            },
            //获取不同状态的数量
            typeCount() {
                this.$http({
                        url: "/caseInfo/getTypeCount",
                        method: "get"
                        // data: {

                        // }
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.treatment = String(JSON.parse(data.data).treatment);
                            this.handle = String(JSON.parse(data.data).handle);
                            this.complete = String(JSON.parse(data.data).complete);
                            this.middle[0] = this.treatment;
                            this.middle[1] = this.handle;
                            this.middle[2] = this.complete;
                        }
                    })
                    .catch((err) => {
                        console.err(err);
                    });
            },
            // 账户权限接口
            employee() {
                let that = this;
                that.$store.commit("empty");
                let jurisdiction = localStorage.getItem("employeeClone");
                var employeeClone = JSON.parse(jurisdiction);
                employeeClone.forEach((item, idx) => {
                    that.$store.commit("permissionList", item.rightCode);
                });
            },
            // 获取医生信息接口
            getinfoDoctor() {
                this.$http({
                        url: "/doctor/getInfo",
                        method: "get"
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            var pop = JSON.parse(data.data);
                            window.localStorage.setItem("realname", pop.realname);
                            window.localStorage.setItem("accountNumber", pop.accountNumber);
                            window.localStorage.setItem("email", pop.email);
                            window.localStorage.setItem("phone", pop.phone);
                        } else {}
                    })
                    .catch((err) => {
                        console.err(err);
                    });
            },

            //关注取消病例
            follow(id, follow) {
                this.$http({
                        url: "/caseInfo/follow",
                        method: "POST",
                        data: {
                            caseId: id,
                            follow: follow
                        }
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {} else {
                            this.$message({
                                message: data.msg,
                                type: "error",
                                duration: 1500,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                }
                            });
                        }
                    })
                    .catch((err) => {
                        console.err(err);
                    });
            },

            //获取所有病例

            /**
             * @param {string} outerNo 病例对外编号
             * @param {string} patientName 病人姓名
             * @param {Number} type 1 治疗中 2 处理中 3 已完成
             * @param {Number} pageNum 页码
             * @param {Number} pageSize 分页大小
             */
            doctor(dataAll) {
                return new Promise((resolve, reject) => {
                    (dataAll.outerNo = dataAll.outerNo || ""), 
                    (dataAll.patientName = dataAll.patientName || ""), 
                    (dataAll.type = dataAll.type || this.tabActive),
                    (dataAll.pageNum = dataAll.pageNum || 1),
                    (dataAll.pageSize = dataAll.pageSize || 10), 
                    delete dataAll.outerNo;
                    this.$http({
                            url: "/caseInfo/getCaseAll",
                            method: "POST",
                            data: dataAll
                        })
                        .then(({
                            data
                        }) => {
                            if (data.code == 200) {
                                this.caseData = JSON.parse(data.data) || [];
                                this.searchunm1 = this.caseData.total;
                                
                                // 如果当前页码大于总页码,则等于总页码
                                if(this.page > this.caseData.totalPage) {
                                    this.page = this.caseData.totalPage
                                }

                                if (this.tabActive == 1) {
                                    this.treatment = this.searchunm1
                                } else if (this.tabActive == 2) {
                                    this.handle = this.searchunm1
                                } else {
                                    this.complete = this.searchunm1
                                }
                                this.dispose();
                            }
                        })
                        .catch((err) => {
                            console.err(err);
                            reject(err);
                        });
                });
            },
            // 头像处理
            theadUrl(str) {
                if (str && str.indexOf("http") >= 0) {
                    return str;
                } else {
                    return require("@/assets//1顶部导航/切图_03.png");
                }
            },
            // 参数处理
            dispose() {
                let that = this;
                let arr = [];
                this.caseData.rows.forEach((item) => {
                    arr.push({
                        患者: {
                            mask: item.follow, //是否关注
                            avatar: that.theadUrl(item.headUrl), //用户头像
                            name: item.patientName, //用户名字
                            remark: item.outerNo //用户编号
                        },
                        创建日期: dateToStr(new Date(item.createTime)),
                        病例状态: {
                            type: that.statusType[item.statusType],
                            font: item.statusTypeName
                        },
                        备注: item.remark
                            .replace(/<br\/>/g, "")
                            .replace(/\&nbsp;/g, "")
                            .replace(/\\n/g, ""),
                        品牌: item.caseBrand == "正丽科技自主创立品牌" ? require("@/assets/3新建病例/1.png") : item
                            .caseBrand == "正丽科技与士卓曼联合打造" ? require("@/assets/3新建病例/2.png") : require(
                                "@/assets/3新建病例/weitianxie.png"),
                        临床分类: abab(item.caseType, "Str"),
                        "诊所/医院": item.hospitalName,
                        caseId: item.caseId, //病例ID
                        endDay: item.endDay, //结束天
                        age: item.age //年龄
                    });
                });
                for (let i = this.caseData.rows.length; i < 10; i++) {
                    arr.push({
                        患者: {
                            mask: "", //是否关注
                            avatar: "", //用户头像
                            name: "", //用户名字
                            remark: "" //用户编号
                        },
                        创建日期: "",
                        病例状态: {
                            type: "",
                            font: ""
                        },
                        备注: "",
                        品牌: "",
                        临床分类: "",
                        诊所医院: "",
                        caseId: "", //病例ID
                        endDay: "", //结束天
                        age: "" //年龄
                    });
                }
                that.tableData1 = arr;
            },
            // 上一页
            pre() {
                if (this.page <= 1) return;
                this.page--;
                this.doctor({
                    outerNo: this.indexSearch,
                    patientName: this.indexSearch,
                    type: this.tabActive,
                    pageNum: this.page,
                    pageSize: 10
                });
            },
            // 下一页
            next() {
                if (this.page >= this.caseData.totalPage) return;
                this.page++;
                this.doctor({
                    outerNo: this.indexSearch,
                    patientName: this.indexSearch,
                    type: this.tabActive,
                    pageNum: this.page,
                    pageSize: 10
                });
            },
            // 确定页数
            confirm() {
                if (this.pageNum >= this.caseData.totalPage) {
                    this.pageNum = this.caseData.totalPage;
                } else if (this.pageNum <= 1) {
                    this.pageNum = 1;
                }
                this.page = this.pageNum;
                this.doctor({
                    outerNo: this.indexSearch,
                    patientName: this.indexSearch,
                    type: this.tabActive,
                    pageNum: this.page,
                    pageSize: 10
                });
            }
        },
        computed: {
            pickedDate() {
                if ((this.$route.matched[1].path = "/index")) {
                    if (this.$route.matched.length > 2) {
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            routerChange() {
                return this.$route.fullPath;
            },
            valueDate() {
                return this.value2[0];
            }
        },

        watch: {
            pickedDate(newVal) {
                this.flag = newVal;
            },
            routerChange(newVal) {
                if (this.$route.fullPath == "/index") {
                    this.doctor({
                        pageNum: this.page
                    });
                }
            },
            valueDate() {
                this.approvalCount(this.value2[0], this.value2[1]);
            },
            indexSearch(val) {
                if (val == "") {
                    this.doctor({
                        outerNo: this.indexSearch,
                        patientName: this.indexSearch,
                        type: this.tabActive,
                        pageNum: this.page,
                        pageSize: 10
                    });
                    if (this.tabActive == 1) {
                        this.treatment = this.middle[0];
                    } else if (this.tabActive == 2) {
                        this.handle = this.middle[1];
                    } else {
                        this.complete = this.middle[2];
                    }
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    .huyi {

        /deep/ .el-input__inner:hover,
        /deep/ .el-input__inner:focus {
            border-color: #1a95eb !important;
        }
    }

    // .huyi2 {}

    .Dx_left {
        float: right;
        height: 40px;
        line-height: 40px;

        color: #fff;

        span {
            display: inline-block;
            line-height: 40px;
        }

        .page {
            height: 35px;
            line-height: 35px;
            margin: 0 10px;

            /deep/ .el-input__inner {
                height: 35px;
                line-height: 35px;
                text-align: center;
            }
        }
    }

    /deep/ .el-button--primary:hover {
        background: #1a95eb !important;
    }

    .right1 {
        pointer-events: none;
        opacity: 0.5;
    }

    /deep/.xjblispantext {
        // vertical-align: sub !important;
        vertical-align: middle !important;
        margin-left: 5px;
    }

    .queding {
        margin-left: 15px;
        height: 20px;
        background: #1175d2;
        border: 0;
        color: white;
        padding: 2px 15px;
        text-align: center;
        height: 35px;
        line-height: 35px;
    }

    /deep/.dn {
        display: none;
    }

    // 日期框
    .block {
        width: 46px;
        height: 46px;
        position: absolute;
        overflow: hidden;
        right: 10%;
        opacity: 0;

        .el-input__inner {
            height: 100%;
        }

        /deep/ .el-range__icon {
            margin-left: 0;
            line-height: 46px;
        }
    }

    /deep/ .el-date-range-picker {
        left: 56%;
    }

    /deep/ .popper__arrow {
        left: 50% !important;
        transform: translateX(-50%);
    }

    .line {
        display: none;
    }

    .mark {
        width: 24px !important;
        height: 22px !important;
        top: 20px;
        left: -220px;
    }

    /deep/.el-input::-webkit-scrollbar-thumb {
        border-radius: 4px !important;
    }

    .el-input-group__append,
    .el-input-group__prepend {
        background-color: #fff;
        border: none;
        padding: 0 5px;
    }

    .el-image {
        vertical-align: middle !important;
    }

    .head {
        min-width: 1024px;
        height: 210px;
        background: #565759;

        .xinjian {
            width: 200px;
            height: 50px;
            font-size: 16px;
            // vertical-align: sub;
            // line-height: 25px;

            .el-icon-edit {
                margin-right: 10px;
            }
        }

        .right {
            position: relative;

            .el-icon-search {
                position: absolute;
                color: #9a9896;
                left: 145px;
                top: 7px;
                z-index: 3;
            }

            /deep/ .el-input__inner {
                border: 1px solid #fff;
                padding: 0;
                padding-left: 45px;
            }

            /deep/ .el-input.is-active .el-input__inner,
            .el-input__inner:focus {
                border-color: #fff;
            }

            /deep/ .el-input__inner:hover {
                border: 1px solid #fff;
            }

            /deep/ .el-input-group {
                width: 62%;
                margin-right: 2%;
            }

            /deep/ .el-button {
                padding: 19px 20px;
            }
        }

        .el-menu.el-menu--horizontal {
            border: none;
        }

        .el-menu--horizontal>.el-menu-item {
            background: #565759 !important;
            color: #fff !important;
            border-radius: 5px 5px 0 0;
            line-height: 50px;
            border-bottom: none !important;
            width: 150px;
            height: 50px;
            text-align: center;
            font-size: 16px;
        }

        .el-menu--horizontal>.el-menu-item:hover {
            color: #1a95eb !important;
        }

        .el-menu--horizontal>.el-menu-item.is-active {
            border-bottom: none !important;
        }

        .el-menu--horizontal>.is-active {
            background: white !important;
            color: #1175d2 !important;
        }

        .select {
            i {
                border: 1px solid #fff;
                border-radius: 50%;
                padding: 1px;
                color: #fff;
            }
        }
    }

    /deep/ .el-input-group__prepend {
        background: #fff;
        padding: 0;
    }

    .body {
        min-width: 1024px;
    }

    .el-checkbox {
        display: block;
    }

    /deep/.set {
        /deep/.el-button {
            padding: 0;
            border: none;
        }
    }

    /deep/.el-table .warning-row {
        background: #f9f9f9;
        cursor: pointer;
    }

    /deep/.el-table .success-row {
        background: #edeeee;
        cursor: pointer;
    }

    .number {
        width: 61.5%;
        background: white;
        height: 88px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .time {
        position: relative;
        padding: 1.2%;
        width: 37.7%;
        height: 88px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: 1px solid #fff;
        border-left-width: 0;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        padding-left: 16px;

        .el-image {
            margin-left: 10px;
        }

        p {
            white-space: nowrap;
        }
    }

    .right {
        .searchImg {
            width: 40px;
            height: 40px;
            overflow: visible;
            cursor: pointer;

            img {
                width: 100%;
            }
        }
    }

    /deep/th[class^="huangzhe"] {
        .cell {
            padding-left: 70px;
            letter-spacing: 5px;
        }
    }
</style>
<style lang="less" scoped>
    // 兼容垃圾IE
    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
        .number {
            padding-top: 12px;
            overflow: hidden;
            height: 88px;
            box-sizing: border-box;
        }

        /deep/.el-col>.time {
            padding-top: 18px !important;
        }

        /deep/ .dada {
            padding-top: 6px !important;
        }

        /deep/.el-table th .cell {
            padding-top: 10px;
        }

        /deep/.head .select i {
            padding-top: 2px !important;
            padding-bottom: 0px !important;
        }

        // 日期框
        /deep/.block {
            right: 14%;
            top: 22%;
            padding: 10px !important;
        }
    }

    // 适配

    @media screen and (max-width: 1660px) {
        .el-icon-search {
            left: 27% !important;
        }

        .el-search {
            padding-left: 35px !important;
        }

        .block {
            right: 6%;
        }
    }

    @media screen and (max-width: 1360px) {
        .line {
            display: block !important;
        }

        .block {
            right: 5%;
        }

        .time {
            padding-left: 6px !important;
        }

        /deep/ .el-col-6 {
            width: 30%;
        }

        /deep/.el-menu-item {
            width: 130px !important;
        }

        // .el-icon-search {
        //     left: 100px !important;
        // }

        .el-search {
            padding-left: 27px !important;
        }

        /deep/ .el-table__body-wrapper {
            /deep/.el-avatar {
                margin-left: 34px;
            }
        }

        .mark {
            left: 45px;
        }
    }

    @media screen and (max-width: 1200px) {
        /deep/.el-menu-item {
            width: 130px !important;
        }

        // .el-icon-search {
        //     left: 78px !important;
        // }

        .el-search {
            padding-left: 30px !important;
        }
    }
</style>