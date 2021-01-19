<template>
    <div class="yuangong">
        <div class="head">
            <p>员工账户列表</p>
            <!-- <span>备注: 员工账号无法访问个人中心界面</span> -->
            <el-button @click="changeURl">
                <i class="el-icon-edit"></i>
                新建账户
            </el-button>
        </div>
        <el-table :data="tableData" stripe lazy @row-click="rowdata" style="width: 100%">
            <el-table-column prop="name" label="员工" width="200">
            </el-table-column>
            <el-table-column prop="accountNumber" label="账号" width="300">
            </el-table-column>
            <el-table-column label="权限">
                <template slot-scope="scope">
                    <p>{{scope.row.rights | conversion }}</p>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
            }
        },
        mounted() {
               this.yuangongData();
        },
        filters: {
            conversion(value) {
                if(value.length === 0){
                    return ''
                }
                let pop = [];
                value.forEach(function (itm, idx) {
                    // switch (pop[idx]) {
                    //     case '0':
                    //         pop[idx] = '病例管理'
                    //         break;
                    //     case '1':
                    //         pop[idx] = '委托加工单管理'
                    //         break;
                    //     case '2':
                    //         pop[idx] = '治疗管理'
                    //         break;
                    //     default:
                    //         pop[idx] = '';
                    //         break;
                    // }
                    pop.push(itm.saleName)
                });
                return pop.join('/')
            }
        },
        methods: {
            rowdata(row, column, event) {
                const staffId= row.staffId;
                this.$store.commit('myselfAdd', ['员工账户', '/myself']);
                this.$store.commit('myselfAdd', ['账户信息', '/zhxx']);
                this.$store.commit('staffIdassignment',staffId);
                this.$router.push('/zhxx');
            },
            changeURl() {
                this.$store.commit('myselfAdd', ['员工账户', '/myself']);
                this.$store.commit('myselfAdd', ['新建账户', '/xjzh']);
                this.$router.push('/xjzh');
            },
            // 获取员工数据
            yuangongData() {

                this.$http({
                    url: "/staff/findAllStaff",
                    method: "get",
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.tableData = JSON.parse(data.data);
                    } else {

                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        computed: {
            pickedDate() {
                return this.$route.fullPath
            }
        },
        watch: {
            pickedDate(newVal) {
                if(newVal == '/myself'){
                    this.yuangongData();
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .yuangong {
        .head {
            font-size: 16px;
            height: 100px;
            background: #f9f9f9;
            display: flex;
            align-items: center;

            p {
                color: #1175d2;
                font-weight: bold;
                margin-left: 94px;
            }

            span {
                color: #f79494;
                font-size: 14px;
                margin-left: 80px;
            }

            .el-button {
                width: 200px;
                height: 50px;
                background-color: #1175d2;
                font-size: 16px;
                color: #fff;
                position: absolute;
                right: 88px;
                top: 25px;
            }

        }

        /deep/ .el-table th {
            background-color: #e8e8e8;

        }

        /deep/ .el-table th>.cell {
            padding-left: 94px;
            font-size: 16px;
            color: #000;
        }

        /deep/ .el-table .cell {
            line-height: 55px;
            padding-left: 94px;
            font-size: 16px;
            color: #666;
        }

        /deep/ .el-table__row {
            background-color: #f9f9f9 !important;
            cursor: pointer;

        }

        /deep/ .el-table__row--striped td {
            background-color: #edeeee !important;
            cursor: pointer;
            height: 92px;
        }

        /deep/ .el-table__row:hover>td {
            background: none !important;
        }

        /deep/ .el-table--enable-row-hover .el-table__body tr:hover {
            background-color: rgba(0, 0, 0, 0) !important;
        }
    }
</style>