<template>
    <el-dialog title="新增医院" :visible.sync="dialogFormVisibleyiy">
        <el-form :model="form" class="tangcform">
            <el-form-item class="selectbox" label="地址 : " :label-width="formLabelWidth">
                <el-select v-model="country" @change="changeCountry" placeholder="国家">
                    <el-option v-for="item in countryArr" :key="item.countriesId" :value="item.countriesId"
                        :label="item.countriesName">
                        <span style="float: left">{{ item.countriesName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px"></span>
                    </el-option>
                </el-select>
                <el-select v-model="province" @change="changeProvince" placeholder="省">
                    <el-option v-for="item in provinceArr" :key="item.provinceId" :label="item.provinceName"
                        :value="item.provinceId">
                        <span style="float: left">{{ item.provinceName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px"></span>
                    </el-option>
                </el-select>
                <el-select v-model="city" @change="changeCitys" placeholder="市">
                    <el-option v-for="item in cityArr" :key="item.cityId" :label="item.cityName" :value="item.cityId">
                        <span style="float: left">{{ item.cityName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px"></span>
                    </el-option>
                </el-select>
                <el-select v-model="area" @change="changeCounty" placeholder="县">
                    <el-option v-for="item in areaArr" :key="item.areaId" :label="item.areaName" :value="item.areaId">
                        <span style="float: left">{{ item.areaName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px"></span>
                    </el-option>
                </el-select>

            </el-form-item>

            <el-form-item class="tancdiz" label="地址 : " :label-width="formLabelWidth">
                <el-input v-model="form.dizhi" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item class="tancdiz" label="名称 : " :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" @input="fibbidface2" maxlength="20"></el-input>
            </el-form-item>

        </el-form>


        <div slot="footer" class="dialog-footer">
            <el-button class="baocun" type="primary" @click="dakaihuid">保存</el-button>
            <el-button class="quxiao" @click="guanbihuid">取消</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                ddd: '',
                countrydata: [],
                countryArr: [{ //国家列表

                }],
                // 国家 id 数据
                countriesId: '',
                // 国家 名 数据
                country: '',


                provinceArr: [{ //省列表

                }],
                // 省 id 数据
                provinceId: '',
                // 省 城市名 数据
                province: '',


                cityArr: [{ //市列表

                }],
                // 市 id 数据
                cityId: '',
                // 市 城市名 数据
                city: '',


                areaArr: [{ //县列表

                }],
                // 县 id 数据
                areaId: '',
                // 县 城市
                area: '',
                form: {
                    dizhi: '',
                    name: '',
                },
                dialogFormVisibleyiy: false,
                formLabelWidth: '120px'
            };
        },
        created() {
            this.getcounty();
        },
        methods: {
            dakaihuid() {
                this.fn();
                this.dialogFormVisibleyiy = false;
            },
            fn() {
                this.LoadingOpen();
                this.$http({
                    url: "/hospital/saveHospital",
                    method: "POST",
                    data: {
                        hospitalName: this.form.name,
                        country: this.country, //国家 ++
                        countriesId: this.countriesId, //国家ID ++
                        province: this.province, //省
                        provinceId: this.provinceId, //省ID  ++
                        city: this.city, //市
                        cityId: this.cityId, //市Id
                        area: this.area, //县
                        areaId: this.areaId, //县ID
                        address: this.form.dizhi,
                    }
                }).then(({
                    data
                }) => {
                    this.LoadingClose();
                    if (data.code== 200) {
                        this.form.name = '';
                        this.countryArr = '';
                        this.provinceArr = '';
                        this.cityArr = '';
                        this.areaArr = '';
                        this.country = ''
                        this.province = '';
                        this.city = '';
                        this.area = '';
                        this.form.dizhi = '';
                        this.$emit('pushyiyshuj');
                        this.$message({
                            message: data.msg,
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        })
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList')
                            }
                        })
                    }

                }).catch(err => {
                    console.log(err)
                })
            },
            guanbihuid() {
                this.dialogFormVisibleyiy = false;
            },
            // 禁止输入表情
            fibbidface2(value) {
                var html = value,
                    oldHtml = "";
                oldHtml = html;
                var reg =
                    /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
                if (html.match(reg)) {
                    html = html.replace(reg, '');
                }

                if (html != oldHtml) {
                    this.form.name = html
                };
                if (this.form.name.length < 1) {
                    this.$message({
                        message: '请至少输入一位医院名称',
                        type: 'error',
                        duration: 2000,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    })
                }
            },
            // 国家接口
            getcounty() {
                this.countryArr = [];
                this.$http({
                    url: "/region/countryList",
                    method: "get",
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.countryArr = JSON.parse(data.data);
                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.visible = false
                                this.$emit('refreshDataList');
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 请求省接口
            provinceList(id = 1) {
                this.provinceArr = [];
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
                        this.provinceArr = JSON.parse(data.data);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 请求市接口
            cityList(id = 1) {
                this.cityArr = []
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
                        this.cityArr = JSON.parse(data.data);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 请求区接口
            areaList(id = 1) {
                this.areaArr = [];
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
                        this.areaArr = JSON.parse(data.data);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 改变国家
            changeCountry(data) {
                this.provinceList(data);
                const pop = this.countryArr.find(item => {
                    return item.countriesId === data
                });
                this.countriesId = pop.countriesId
                this.country = pop.countriesName;
                this.provinceArr = [];
                this.cityArr = [];
                this.areaArr = [];
                this.province = '';
                this.city = '';
                this.area = '';
            },
            //改变省
            changeProvince(data) {
                this.cityList(data);
                const pop = this.provinceArr.find(item => {
                    return item.provinceId === data
                });
                this.provinceId = pop.provinceId
                this.province = pop.provinceName;
                this.cityArr = [];
                this.areaArr = [];
                this.city = '';
                this.area = '';
            },
            //改变市
            changeCitys(data) {
                this.areaList(data);
                const pop = this.cityArr.find(item => {
                    return item.cityId === data
                });
                this.cityId = pop.cityId
                this.city = pop.cityName;
                this.areaArr = [];
                this.area = '';
            },
            //改变区
            changeCounty(data) {
                const pop = this.areaArr.find(item => {
                    return item.areaId === data
                });
                this.areaId = pop.areaId
                this.area = pop.areaName;
            }
        }
    };
</script>
<style scoped lang="less">
    /deep/.tangcform {
        padding-left: 0px !important;
        height: auto !important;

        >div {
            margin-bottom: 40px;
        }
    }

    /deep/.el-dialog {
        width: 950px !important;
    }

    /deep/.el-dialog__footer {
        text-align: center;

        .el-button {
            width: 100px;
            border: 1px solid #1175d2;
            box-sizing: border-box;
            margin-bottom: 20px;
        }

        .baocun {
            margin-right: 50px;
            line-height: 36px;
        }

        .quxiao {
            line-height: 36px;
        }
    }

    /deep/.shohuor {
        .el-input__inner {
            width: 200px;
        }
    }

    /deep/.selectbox {
        .el-select {
            width: 150px;
            margin-right: 10px;
        }
    }

    /deep/.tancdiz {
        .el-input__inner {
            width: 450px;
        }
    }

    @media screen and (max-width: 1300px) {
        /deep/.el-dialog {
            transform: scale(0.8);
        }
    }
</style>