<template>
    <vcade title="收货地址" class="goods">
        <span v-show="!sign" @click="addLine" slot="title-right" class="add myCursor">
            <el-avatar shape="square" :src="require('@/assets/4个人中心/地址-新增.png')"></el-avatar>
            <span>新增</span>
        </span>
        <div slot="content">
            <!-- 不可修改表格 -->
            <el-table :data="tableData1" align="center" header-align="center" v-show="sign" style="width: 100%">
                <el-table-column prop="deliveryName" label="收货人" min-width="19%">
                </el-table-column>
                <el-table-column label="所在地区" min-width="34%">
                    <template slot-scope="scope">
                        <span style="padding-right:10px;">{{tableData1[scope.$index].country }}</span>
                        <span style="padding-right:10px;">{{tableData1[scope.$index].province }}</span>
                        <span style="padding-right:10px;">{{tableData1[scope.$index].city }}</span>
                        <span style="padding-right:10px;">{{tableData1[scope.$index].area}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址" min-width="28%">
                </el-table-column>
                <el-table-column prop="contactNumber" label="联系电话" min-width="15%">
                </el-table-column>
                <el-table-column min-width="4%">
                </el-table-column>
            </el-table>

            <!-- 可修改表格 -->
            <el-table :data="tableData" style="width: 100%" v-show="!sign" row-key="rowIndex">
                <el-table-column label="收货人" min-width="15%">
                    <template slot-scope="scope">
                        <el-input maxlength="16"  v-model="tableData[scope.$index].deliveryName" style="width:150px"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="所在地区" min-width="42%">
                    <template slot-scope="scope">
                        <!-- 国家 -->
                        <el-select v-model="tableData[scope.$index].countriesId" placeholder="国家"
                            style="width:150px;margin-right:5px" @change="changeCountry.call(this,scope.$index)">
                            <el-option v-for="item in country" :key="item.countriesName" :label="item.countriesName"
                                :value="item.countriesId">
                            </el-option>
                        </el-select>
                        <!-- 省 -->
                        <el-select v-model="tableData[scope.$index].provinceId" placeholder="省/直辖市"
                            @change="changeProvince.call(this,scope.$index)" style="width:150px;margin-right:5px">
                            <el-option v-for="item in province" :key="item.provinceName" :label="item.provinceName"
                                :value="item.provinceId">
                            </el-option>
                        </el-select>
                        <!-- 市 -->
                        <el-select v-model="tableData[scope.$index].cityId" placeholder="市/区"
                            @change="changeCitys.call(this,scope.$index)" style="width:150px;margin-right:5px">
                            <el-option v-for="item in citys[scope.$index]" :key="item.cityName" :label="item.cityName"
                                :value="item.cityId">
                            </el-option>
                        </el-select>
                        <!-- 区 -->
                        <el-select v-model="tableData[scope.$index].areaId" @change="changeArea.call(this,scope.$index)"
                            style="width:150px">
                            <el-option v-for="item in area[scope.$index]" :key="item.areaName" :label="item.areaName"
                                :value="item.areaId">
                            </el-option>
                        </el-select>

                    </template>
                </el-table-column>
                <el-table-column label="地址" min-width="20%">
                    <template slot-scope="scope">
                        <el-input maxlength="40" v-model="tableData[scope.$index].address" style="width:100%"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="联系电话" min-width="10%">
                    <template slot-scope="scope">
                        <el-input maxlength="11" v-model="tableData[scope.$index].contactNumber" style="width:150px">
                        </el-input>
                    </template>
                </el-table-column>
                <!-- 删除 -->
                <el-table-column min-width="4%">
                    <template slot-scope="scope">
                        <el-image shape="square" class="myCursor" @click="handleDelete(scope.$index, scope.row)"
                            :src="require('@/assets/4个人中心/地址-删除.png')"></el-image>
                    </template>
                </el-table-column>
            </el-table>

            <el-button type="primary" v-show="sign" class="editor huyi2" @click="cancel">编辑</el-button>
            <div class="addressSave" v-show="!sign">
                <el-button type="primary" class="save huyi2" @click="save">保存</el-button>
                <el-button type="primary" class="cancel huyi1" @click="cancel">取消</el-button>
            </div>
        </div>
    </vcade>
</template>

<script>
    import vcade from './vcade'
    export default {
        components: {
            vcade,
        },
        data() {
            return {
                country: [], //国家
                province: [], //省份
                citys: [], //市
                area: [], //区

                //因为有取消功能，所以需要两个数组，一个给用户修改，一个不给用户修改 
                // 可修改表格
                tableData: [],
                // 不可修改表格
                tableData1: [],
                sign: true, //控制显示隐藏
                countryListID: 1, //国家
                provinceListID: 2, //省份
                cityListID: 3, //市区
                areaListID: 4, //区
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let that = this;
                // 初始化获取
                that.$http({
                    url: "/deliveryAddress/getAddressList",
                    method: "get",
                    params: {}
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        let dataList = JSON.parse(data.data);
                        that.tableData1 = that.newobj(dataList);
                        that.tableData = that.newobj(dataList);
                    }
                }).then(() => {
                    that.getcounty();
                    that.provinceList();
                    that.tableData.forEach((item, i) => {
                        that.cityList(item.provinceId, i);
                        that.areaList(item.cityId, i);
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            // 保存按钮
            save() {
                this.$http({
                    url: "/deliveryAddress/addDeliveryAddressList",
                    method: "post",
                    data: this.tableData
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.sign = !this.sign;
                        this.tableData1 = this.newobj(this.tableData);
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err)
                });

            },
            // 取消按钮
            cancel() {
                this.sign = !this.sign;
                this.tableData = this.newobj(this.tableData1);
            },
            // 新增按钮
            addLine() {
                this.tableData.push({
                    deliveryName: '', //收货人
                    countriesId: '', //国家ID
                    country: '', //国家
                    provinceId: '', //省ID
                    province: '', //省
                    cityId: '', //市ID
                    city: '', //市
                    areaId: '', //区ID
                    area: '', //区
                    address: '', //详细地址
                    contactNumber: '', //电话号码
                });
            },
            rowIndex(row) {

            },
            // 删除按钮
            handleDelete(index) {
                this.tableData.splice(index, 1);
            },
            // 复制深度复制
            newobj(obj) {
                let newObj = JSON.parse(JSON.stringify(obj));
                return newObj;
            },
            // 国家接口
            getcounty(id = 1) {
                this.$http({
                    url: "/region/countryList",
                    method: "get",
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.country = JSON.parse(data.data);
                        this.$set(this.tableData)
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err)
                });
            },
            // 请求省接口
            provinceList(id = 1) {
                this.$http({
                    url: "/region/provinceList",
                    method: "get",
                    params: {
                        countriesId: id
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.province = JSON.parse(data.data);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 请求市接口
            cityList(id = 1, index) {
                ;
                this.$http({
                    url: "/region/cityList",
                    method: "get",
                    params: {
                        provinceId: id,
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.citys[index] = JSON.parse(data.data);
                        this.$set(this.tableData, index, this.tableData[index])
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 请求区接口
            areaList(id = 1, index) {
                this.$http({
                    url: "/region/areaList",
                    method: "get",
                    params: {
                        cityId: id,
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.area[index] = JSON.parse(data.data);
                        this.$set(this.tableData, index, this.tableData[index])
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            //改变国家
            changeCountry(num) {
                let that = this;
                this.country.forEach(item => {
                    if (that.tableData[num].countriesId == item.countriesId) {
                        that.tableData[num].country = item.countriesName
                    }
                })
                let data = this.tableData[num].countriesId;
                this.tableData[num].provinceId = '';
                this.tableData[num].cityId = '';
                this.tableData[num].areaId = '';
                this.province = [];
                this.citys[num] = [];
                this.area[num] = [];
                this.provinceList(data, num);
            },
            //改变省
            changeProvince(num) {
                let that = this;
                this.province.forEach(item => {
                    if (item.provinceId == that.tableData[num].provinceId) {
                        that.tableData[num].province = item.provinceName
                    }
                })
                let data = this.tableData[num].provinceId;
                this.tableData[num].cityId = '';
                this.tableData[num].areaId = '';
                this.citys[num] = [];
                this.area[num] = [];
                this.cityList(data, num);
            },
            //改变市
            changeCitys(num) {
                let that = this;
                this.citys[num].forEach(item => {
                    if (item.cityId == that.tableData[num].cityId) {
                        that.tableData[num].city = item.cityName
                    }
                })
                let data = this.tableData[num].cityId;
                this.tableData[num].areaId = '';
                this.area[num] = [];
                this.areaList(data, num);
            },
            //改变县
            changeArea(num) {
                let that = this;
                this.area[num].forEach(item => {
                    if (item.areaId == that.tableData[num].areaId) {
                        that.tableData[num].area = item.areaName
                    }
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    @media screen and (max-width: 1660px) {
        /deep/.el-table td div {
            width: 100% !important;
        }
    }

    @media screen and (max-width: 1360px) {
        /deep/ .el-table .cell {
            line-height: 40px;
        }
    }
</style>
<style lang="less" scoped>
    /deep/.el-image__inner {
        width: auto !important;
    }  
    .huyi1:hover{
        border-color:#1a95eb !important;
    }
    .huyi2:hover{
        background:#1a95eb !important;
    }
    .goods {
        /deep/.el-table tr {
            background-color: #f4f4f4 !important;
        }

        /deep/.el-table,
        .el-table__expanded-cell {
            background: transparent;
        }

        .add {
            font-size: 16px;
            color: #4a95db;
            margin-right: 86px;
            margin-top: -40px;

            .el-avatar--square {
                width: 18px;
                height: 18px;
                vertical-align: middle;
                background: #f4f4f4;
                margin-right: 4px;
                margin-top: -4px;
            }
        }

        /deep/ .el-table {
            width: 1500px !important;
            margin: 0 auto;
            font-size: 16px;
            margin-bottom: 56px;
        }

        /deep/ .el-table thead {
            font-weight: 400 !important;
            color: #666;
        }

        /deep/ .el-table {
            color: #333;
        }

        /deep/ .el-table td:nth-child(1) {
            border-bottom: 1px solid #e4e6ea;
            padding-left: 54px;
        }

        /deep/ .el-table .cell {
            line-height: 40px;
            // background: #000;
            height: 41px;
            overflow: 5;
        }

        /deep/ .el-table th:nth-child(1) {
            background-color: #e1e1e1;
            padding-left: 54px;
        }

        /deep/ .el-table th {
            background-color: #e1e1e1;
        }

        /deep/ .el-table__row:hover>td {
            background: #fff !important;
        }

        /deep/ .el-table th>.cell {
            // padding-left: 54px;
        }

        /deep/ .card-content {
            margin-left: 0;
        }

        // .table2
        .editor {
            width: 140px;
            height: 40px;
            line-height: 42px;
            font-size: 16px;
            border: none;
            background-color: #1175d2;
            padding: 0;
            position: relative;
            left: 50%;
            transform: translate(-50%);
        }

        .addressSave {
            display: flex;
            justify-content: center;
            margin-left: -20px;

            .save {
                width: 140px;
                height: 40px;
                line-height: 42px;
                font-size: 16px;
                border: none;
                background-color: #1175d2;
                padding: 0;
                margin-right: 70px;
            }

            .cancel {
                width: 140px;
                height: 40px;
                line-height: 42px;
                font-size: 16px;
                border: 1px solid #1175d2;
                background-color: #f4f4f4 !important;
                color: #000;
                padding: 0;
            }
        }

        .el-select {
            width: 21% !important;

            .el-input {
                border: 1px solid #1a95eb;
            }
        }

        /deep/.el-image__inner {
            // background: #000;
            margin-top: 10px;
        }
    }
</style>