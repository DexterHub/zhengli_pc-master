<template>
    <div>
        <el-form style="height:1030px;" v-show="yistc" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
            label-width="100px" class="demo-ruleForm">
            <el-form-item prop="realname">
                <el-input class="yszhipt ooo" ref="font1" @focus="focusFont1" @blur="blurFont1" placeholder="医生姓名"
                    v-model="ruleForm.realname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="hospitalName">
                <el-input class="ysmmipt ooo o1" ref="font2" @focus="focusFont2" @blur="blurFont2" placeholder="诊所/医院名称"
                    v-model="ruleForm.hospitalName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input class="ysmmipt" autocomplete="off" disabled></el-input>
                <div class="wrap">
                    <el-select v-model="ruleForm.country" @change="changeCountry" placeholder="国家" class="fl"
                        style="width:100px;margin-right:8px">
                        <el-option v-for="item in country" :key="item.value" :label="item.countriesName"
                            :value="item.countriesId"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.province" @change="changeProvince" placeholder="省" class="fl"
                        style="width:100px;margin-right:8px">
                        <el-option v-for="item in province" :key="item.value" :label="item.provinceName"
                            :value="item.provinceId"></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.city" @change="changeCitys" placeholder="市" class="fl"
                        style="width:100px;margin-right:8px">
                        <el-option v-for="item in citys" :key="item.value" :label="item.cityName" :value="item.cityId">
                        </el-option>
                    </el-select>
                    <el-select v-model="ruleForm.area" @change="changearea" placeholder="县" class="fl"
                        style="width:100px">
                        <el-option v-for="item in county" :key="item.value" :label="item.areaName" :value="item.areaId">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item>
                <el-input class="ysmmipt" placeholder="详细地址" v-model="ruleForm.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input class="ysmmipt ooo o6" ref="font3" maxlength="11" @focus="focusFont3" @blur="blurFont3"
                    placeholder="手机号" v-model="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode">
                <el-input class="ysmmipt ooo o5" ref="font7" @focus="focusFont7" @blur="blurFont7" placeholder="验证码"
                    v-model="ruleForm.verificationCode" autocomplete="off"></el-input>
                <el-button class="but2" @click.stop="getAuthorization" type="text" ref="refCode">获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="email">
                <el-input class="ysmmipt" placeholder="电子邮箱" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="accountNumber">
                <el-input class="ysmmipt ooo o2" ref="font4" @focus="focusFont4" @blur="blurFont4" maxlength="20"
                    placeholder="请设置您的账号  （4-20数字和字母组成）" v-model="ruleForm.accountNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" ref="font5" @focus="focusFont5" @blur="blurFont5" maxlength="11"
                    class="ysmmipt ooo o3" placeholder="请设置您的账号密码 （6-11位数字或字母组成）" v-model="password" autocomplete="off">
                </el-input>
            </el-form-item>
            <el-form-item prop="repeatPassword">
                <el-input type="password" ref="font6" @focus="focusFont6" @blur="blurFont6" maxlength="11"
                    class="ysmmipt ooo o4" placeholder="重复输入密码 （6-11位数字或字母组成）" v-model="repeatPassword"
                    autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <router-link class="but1" tag="el-button" type="text" to="/login">已有账号， 去登录</router-link>
                <el-button style="background:#1175d2;" type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
        </el-form>

        <div style="height:488px;" class="tc" v-show="!yistc">
            <div class="mmtext">
                <p>您的医生账号已注册成功</p>
                <p class="p1">
                    账号 :
                    <span>{{ruleForm.accountNumber}}</span>
                </p>
                <p class="p2">
                    密码 :
                    <span>{{password}}</span>
                </p>
            </div>
            <el-row>
                <!-- <el-button type="primary">去登录</el-button> -->
                <router-link tag="el-button" type="text" to="/login">去登录</router-link>
            </el-row>
        </div>
    </div>
</template>
<script>
    import {
        isEmail
    } from "@/util/validate.js";
    import {
        isMobile
    } from "@/util/validate.js";
    import {
        jsEncrypt
    } from "@/util/validate.js";
    import {
        IEVersion
    } from "@/util/validate.js";
    import {
        regular
    } from "@/util/validate.js";
    import {
        regular2
    } from "@/util/validate.js";
    export default {
        data() {
            var realname = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入医生姓名"));
                } else {
                    callback();
                }
            };
            var hospitalName1 = (rule, value, callback) => {
                callback();
            };
            var hospitalAddress = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入诊所/医院地址"));
                } else {
                    callback();
                }
            };
            var phone = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输输入正确的联系方式"));
                } else if (!isMobile(value)) {
                    callback(new Error("请输输入正确的联系方式"));
                } {
                    callback();
                }
            };
            var verificationCode = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输输入验证码"));
                } {
                    callback();
                }
            };
            var email = (rule, value, callback) => {
                if (value !== "" && !isEmail(value)) {
                    callback(new Error("请输入正确的电子邮箱"));
                } else {
                    callback();
                }
            };
            var accountNumber = (rule, value, callback) => {
                console.log(regular2(this.ruleForm.accountNumber));
                if (value === "") {
                    callback(new Error("请设置您的账号"));
                } else if (
                    this.ruleForm.accountNumber.length < 4 ||
                    !regular2(this.ruleForm.accountNumber)
                ) {
                    callback(new Error("请设置您的账号 （4-20数字和字母组成）"));
                } else {
                    callback();
                }
            };
            var password = (rule, value, callback) => {
                console.log(regular(this.password));
                if (this.password === "") {
                    callback(new Error("请设置您的密码"));
                } else if (this.password.length < 6 || !regular(this.password)) {
                    callback(new Error("请设置您的账号密码（6-11数字或字母组合）"));
                } else {
                    callback();
                }
            };
            var repeatPassword = (rule, value, callback) => {
                if (this.repeatPassword === "") {
                    callback(new Error("请再次输入密码"));
                } else if (this.repeatPassword !== this.password) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            var changeFont1 = (rule, value, callback) => {
                if (value.length > 0) {
                    this.$refs.font1.$el.classList.remove("ooo");
                } else {
                    if (isNaN(IEVersion())) {
                        this.$refs.font1.$el.classList.add("ooo");
                    }
                }
                callback();
            };
            var changeFont2 = (rule, value, callback) => {
                if (value.length > 0) {
                    this.$refs.font2.$el.classList.remove("ooo");
                } else {
                    if (isNaN(IEVersion())) {
                        this.$refs.font2.$el.classList.add("ooo");
                    }
                }
                callback();
            };
            var changeFont3 = (rule, value, callback) => {
                if (value.length > 0) {
                    this.$refs.font3.$el.classList.remove("ooo");
                } else {
                    if (isNaN(IEVersion())) {
                        this.$refs.font3.$el.classList.add("ooo");
                    }
                }
                callback();
            };
            var changeFont4 = (rule, value, callback) => {
                if (value.length > 0) {
                    this.$refs.font4.$el.classList.remove("ooo");
                } else {
                    if (isNaN(IEVersion())) {
                        this.$refs.font4.$el.classList.add("ooo");
                    }
                }
                callback();
            };
            var changeFont5 = (rule, value, callback) => {
                if (this.password.length > 0) {
                    this.$refs.font5.$el.classList.remove("ooo");
                } else {
                    if (isNaN(IEVersion())) {
                        this.$refs.font5.$el.classList.add("ooo");
                    }
                }
                callback();
            };
            var changeFont6 = (rule, value, callback) => {
                if (this.repeatPassword.length > 0) {
                    this.$refs.font6.$el.classList.remove("ooo");
                } else {
                    if (isNaN(IEVersion())) {
                        this.$refs.font6.$el.classList.add("ooo");
                    }
                }
                callback();
            };
            var changeFont7 = (rule, value, callback) => {
                if (value.length > 0) {
                    this.$refs.font7.$el.classList.remove("ooo");
                } else {
                    if (isNaN(IEVersion())) {
                        this.$refs.font7.$el.classList.add("ooo");
                    }
                }
                callback();
            };

            return {
                delay: 60,
                options: [],
                iscode: true,
                yzm: true,
                yistc: true,
                country: [],
                province: [], //省
                citys: [], //市
                county: [], //区
                focus: [],
                ruleForm: {
                    country: "",
                    realname: "",
                    hospitalName: "",
                    province: "",
                    city: "",
                    area: "",
                    address: "",
                    phone: "",
                    email: "",
                    accountNumber: "",
                    password: "",
                    repeatPassword: "",
                    verificationCode: "",
                },
                password: "", //需要加秘密的密码
                repeatPassword: "", //需要加密的密码
                rules: {
                    realname: [{
                            validator: realname,
                            trigger: "blur",
                        },
                        {
                            validator: changeFont1,
                            trigger: "change",
                        },
                    ],

                    hospitalName: [{
                            validator: hospitalName1,
                            trigger: "blur",
                        },
                        {
                            validator: changeFont2,
                            trigger: "change",
                        },
                    ],

                    hospitalAddress: [{
                        validator: hospitalAddress,
                        trigger: "blur",
                    }, ],

                    phone: [{
                            validator: phone,
                            trigger: "blur",
                        },
                        {
                            validator: changeFont3,
                            trigger: "change",
                        },
                    ],

                    verificationCode: [{
                            validator: verificationCode,
                            trigger: "blur",
                        },
                        {
                            validator: changeFont7,
                            trigger: "change",
                        },
                    ],

                    email: [{
                        validator: email,
                        trigger: "blur",
                    }, ],

                    accountNumber: [{
                            validator: accountNumber,
                            trigger: "blur",
                        },
                        {
                            validator: changeFont4,
                            trigger: "change",
                        },
                    ],

                    password: [{
                            validator: password,
                            trigger: "blur",
                        },
                        {
                            validator: changeFont5,
                            trigger: "change",
                        },
                    ],

                    repeatPassword: [{
                            validator: repeatPassword,
                            trigger: "blur",
                        },
                        {
                            validator: changeFont6,
                            trigger: "change",
                        },
                    ],
                },
            };
        },
        mounted() {
            this.monitor();
            this.getcounty();
        },
        methods: {
            // 狗逼IE，艹
            focusFont1() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (this.focusFont1[0]) return;
                this.focusFont1[0] = true;
                this.$refs.font1.$el.classList.remove("ooo");
            },
            focusFont2() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (this.focusFont1[1]) return;
                this.focusFont1[1] = true;
                this.$refs.font2.$el.classList.remove("ooo");
            },
            focusFont3() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (this.focusFont1[2]) return;
                this.focusFont1[2] = true;
                this.$refs.font3.$el.classList.remove("ooo");
            },
            focusFont4() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (this.focusFont1[3]) return;
                this.focusFont1[3] = true;
                this.$refs.font4.$el.classList.remove("ooo");
            },
            focusFont5() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (this.focusFont1[4]) return;
                this.focusFont1[4] = true;
                this.$refs.font5.$el.classList.remove("ooo");
            },
            focusFont6() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (this.focusFont1[5]) return;
                this.focusFont1[5] = true;
                this.$refs.font6.$el.classList.remove("ooo");
            },
            focusFont7() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (this.focusFont1[6]) return;
                this.focusFont1[6] = true;
                this.$refs.font7.$el.classList.remove("ooo");
            },

            // 干！！！！！！！
            blurFont1() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (!this.focusFont1[0]) return;
                if (this.ruleForm.realname.length > 0) return;
                this.focusFont1[0] = false;
                this.$refs.font1.$el.classList.add("ooo");
            },
            blurFont2() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (!this.focusFont1[1]) return;
                if (this.ruleForm.hospitalName.length > 0) return;
                this.focusFont1[1] = false;
                this.$refs.font2.$el.classList.add("ooo");
            },
            blurFont3() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (!this.focusFont1[2]) return;
                if (this.ruleForm.realname.length > 0) return;
                this.focusFont1[2] = false;
                this.$refs.font3.$el.classList.add("ooo");
            },
            blurFont4() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (!this.focusFont1[3]) return;
                if (this.ruleForm.repeatPassword.length > 0) return;
                this.focusFont1[3] = false;
                this.$refs.font4.$el.classList.add("ooo");
            },
            blurFont5() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (!this.focusFont1[4]) return;
                if (this.ruleForm.verificationCode.length > 0) return;
                this.focusFont1[4] = false;
                this.$refs.font5.$el.classList.add("ooo");
            },
            blurFont6() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (!this.focusFont1[5]) return;
                if (this.ruleForm.realname.length > 0) return;
                this.focusFont1[5] = false;
                this.$refs.font6.$el.classList.add("ooo");
            },
            blurFont7() {
                if (isNaN(IEVersion())) return; //判断是否是IE
                if (!this.focusFont1[6]) return;
                if (this.ruleForm.verificationCode.length > 0) return;
                this.focusFont1[6] = false;
                this.$refs.font7.$el.classList.add("ooo");
            },

            // 注册按钮
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.register();
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            // 判断
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 点击注册接口
            register() {
                this.ruleForm.password = jsEncrypt(this.password);
                this.ruleForm.repeatPassword = this.ruleForm.password;
                this.LoadingOpen();
                this.$http({
                        url: "/doctor/registerDoctor",
                        method: "POST",
                        data: this.ruleForm,
                    })
                    .then((res) => {
                        this.LoadingClose();
                        if (res.status != 200) return;
                        res = res.data;
                        if (res.code == 200) {
                            this.yistc = !this.yistc;
                        } else {
                            this.$message({
                                message: res.msg,
                                type: "error",
                                duration: 2000,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                },
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            // 验证码
            getAuthorization() {
                if (this.yzm) {} else {
                    return;
                }
                this.yzm = false;
                let that = this;
                setTimeout((item) => {
                    that.yzm = true;
                }, 2000);
                if (!this.ruleForm.phone) {
                    this.$message({
                        message: "请输入手机号码",
                        type: "error",
                        duration: 1500,
                        onClose: () => {
                            this.visible = false;
                            this.$emit("refreshDataList");
                        },
                    });
                    return;
                }
                this.$http({
                        url: "/doctor/getYZM",
                        method: "get",
                        params: {
                            phone: this.ruleForm.phone,
                        },
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.countDown();
                            this.$message({
                                message: "验证码发送成功",
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                },
                            });
                        } else {
                            this.$message({
                                message: "验证码发送失败",
                                type: "error",
                                duration: 1500,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                },
                            });
                        }
                    })
                    .catch((err) => {
                        this.$message({
                            message: "验证码发送失败",
                            type: "error",
                            duration: 1500,
                            onClose: () => {
                                this.visible = false;
                                this.$emit("refreshDataList");
                            },
                        });
                    });
            },
            monitor() {
                let LocalDelay = this.getLocalDelay();
                let timeLine = parseInt((new Date().getTime() - LocalDelay.time) / 1000);
                let rescode = this.$refs.refCode.$el.childNodes[2];
                let but = this.$refs.refCode.$el;
                if (timeLine > LocalDelay.delay) {} else {
                    let _delay = LocalDelay.delay - timeLine;
                    rescode.innerText = _delay + "s后重新获取";
                    but.style.pointerEvents = 'none';
                    let timer = setInterval(() => {
                        if (_delay > 1) {
                            _delay--;
                            rescode.innerText = _delay + "s后重新获取";
                            this.setLocalDelay(_delay);
                        } else {
                            clearInterval(timer);
                            rescode.innerText = "获取验证码";
                            but.style.pointerEvents = 'auto';
                        }
                    }, 1000);
                }
            },
            countDown() {
                this.delay = 60;
                let rescode = this.$refs.refCode.$el.childNodes[2];
                let but = this.$refs.refCode.$el;
                if (rescode.innerText == "获取验证码") {
                    let delay = this.delay;
                    rescode.innerText = delay + "s后重新获取";
                    but.style.pointerEvents = 'none';
                    let timer = setInterval(() => {
                        if (delay > 1) {
                            delay--;
                            rescode.innerText = delay + "s后重新获取";
                            this.setLocalDelay(delay);
                        } else {
                            clearInterval(timer);
                            rescode.innerText = "获取验证码";
                            but.style.pointerEvents = 'auto';
                        }
                    }, 1000);
                } else {
                    return false;
                }
            },
            // 国家接口
            getcounty() {
                this.$http({
                        url: "/region/countryList",
                        method: "get",
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.country = JSON.parse(data.data);
                        } else {
                            this.$message({
                                message: data.msg,
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                },
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            // 省接口
            provinceList(id = 1) {
                this.$http({
                        url: "/region/provinceList",
                        method: "get",
                        params: {
                            countriesId: id,
                        },
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.province = JSON.parse(data.data);
                        } else {
                            this.$message({
                                message: data.msg,
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                },
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            // 请求市接口
            cityList(id = 1) {
                this.$http({
                        url: "/region/cityList",
                        method: "get",
                        params: {
                            provinceId: id,
                        },
                    })
                    .then(({
                        data
                    }) => {
                        console.log(data);
                        if (data.code == 200) {
                            this.citys = JSON.parse(data.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            // 请求区接口
            areaList(id = 1) {
                this.$http({
                        url: "/region/areaList",
                        method: "get",
                        params: {
                            cityId: id,
                        },
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            this.county = JSON.parse(data.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            // 改变国家
            changeCountry(data) {
                this.provinceList(data);
                const pop = this.country.find((item) => {
                    return item.countriesId === data;
                });
                this.ruleForm.countriesId = pop.countriesId;
                this.ruleForm.country = pop.countriesName;
                this.ruleForm.province = "";
                this.ruleForm.city = "";
                this.ruleForm.area = "";
                this.province = [];
                this.citys = [];
                this.county = [];
            },
            //改变省
            changeProvince(data) {
                this.cityList(data);
                const pop = this.province.find((item) => {
                    return item.provinceId === data;
                });
                this.ruleForm.provinceId = pop.provinceId;
                this.ruleForm.province = pop.provinceName;
                this.ruleForm.city = "";
                this.ruleForm.area = "";
                this.citys = [];
                this.county = [];
            },
            //改变市
            changeCitys(data) {
                this.areaList(data);
                const pop = this.citys.find((item) => {
                    return item.cityId === data;
                });
                this.ruleForm.cityId = pop.cityId;
                this.ruleForm.city = pop.cityName;
                this.ruleForm.area = "";
                this.county = [];
            },
            // 获取最后一个下拉框的值
            changearea(data) {
                const pop = this.county.find((item) => {
                    return item.areaId === data;
                });
                this.ruleForm.areaId = pop.areaId;
                this.ruleForm.area = pop.areaName;
            },

            //设置setLocalDelay
            setLocalDelay(delay) {
                //location.href作为页面的唯一标识，可能一个项目中会有很多页面需要获取验证码。
                localStorage.setItem("delay_" + location.href, delay);
                localStorage.setItem("time_" + location.href, new Date().getTime());
            },
            //getLocalDelay()
            getLocalDelay() {
                let LocalDelay = {};
                LocalDelay.delay = localStorage.getItem("delay_" + location.href);
                LocalDelay.time = localStorage.getItem("time_" + location.href);
                return LocalDelay;
            },
        },
    };
</script>
<style scoped lang="less">
    @supports (-ms-ime-align: auto) {

        //针对edge
        /deep/ .el-input__inner {
            font-size: 16px !important;
        }
    }

    .o1 {
        &::after {
            left: 113px !important;
            top: -3px;
        }
    }

    .o2 {
        &::after {
            left: 124px !important;
            top: -3px;
        }
    }

    .o3 {
        &::after {
            left: 156px !important;
            top: -3px;
        }
    }

    .o4 {
        &::after {
            left: 108px !important;
            top: -3px;
        }
    }

    .o5 {
        &::after {
            left: 61px !important;
            top: -3px;
        }
    }

    .o6 {
        &::after {
            left: 61px !important;
            top: -3px;
        }
    }

    .ooo {
        position: relative;

        &::after {
            content: "*";
            font-size: 16px;
            color: #ff0000;
            font-weight: 900;
            position: absolute;
            left: 77px;
            top: -3px;
        }
    }

    .wrap {
        position: absolute;
        left: 10px;
        top: 0;
    }

    /deep/ .el-select {
        height: 36px;

        .el-input {
            width: 100%;
            height: 100% !important;
            border: 1px solid #1a95eb;
            border-radius: 5px;
            line-height: 100% !important;

            .el-input__inner {
                height: 100% !important;
                border-bottom: none;
                color: #999;
                font-size: 14px;
            }
        }
    }

    /deep/.tc {
        width: 100%;
        height: 100%;
        // position: absolute;
        // left: 0;
        // top: 0px;
        padding-top: 130px;
        box-sizing: border-box;

        .mmtext {
            font-size: 16px;
            text-align: center;
            // margin-top: 25%;
            color: #666666;

            .p1 {
                margin-top: 20px;
            }

            .p2 {
                margin-top: 20px;
            }

            span {
                padding-left: 5px;
                color: #f99400;
            }
        }

        .el-row {
            position: absolute;
            left: 50%;
            top: 70%;
            transform: translate(-50%, -50%);

            .el-button {
                width: 140px;
                height: 40px;
                background: #1175d2 !important;
                color: #fff;
            }
        }
    }

    /deep/.el-form-item__content {
        margin-left: 0px;
        margin: 0 120px;
        position: relative;
    }

    /deep/.el-checkbox-group {
        float: left;
    }

    /deep/.el-checkbox__inner {
        border-radius: 5px;
        border: 1px solid black;
        width: 20px;
        height: 20px;
    }

    /deep/.el-checkbox__inner::after {
        width: 4px;
        height: 10px;
        left: 7px;
    }

    /deep/.el-button {
        float: right;
        width: 150px;
        height: 40px;
    }

    /deep/.el-input__inner {
        font-size: 18px;
        border: none;
        border-bottom: 1px solid #909399;
        border-radius: 0px;
        background: none;
        // color:#606266;
    }

    /deep/.but1 {
        width: 160px;
        margin-left: 25px;
        border-radius: 0px;
        padding-bottom: 10px;
        font-size: 16px;
        float: left;
        border: none;
        color: #1175d2;
        background: none;
    }

    /deep/.but1:focus,
    .but1:hover {
        background: none;
    }

    /deep/.but2:focus,
    .but2:hover {
        background: none;
    }

    /deep/.but1 span {
        border-bottom: 1px solid #1175d2;
        padding-bottom: 5px;
        box-sizing: border-box;
    }

    /deep/.but2 {
        width: auto;
        position: absolute;
        right: 30px;
        top: 0px;
        font-size: 16px;
    }

    .el-input__inner {
        height: 50px !important;
        padding-left: 10px !important;

        &::placeholder {
            color: #999999 !important;
            font-size: 16px !important;
            line-height: 50px !important;
        }
    }

    /deep/.el-form {
        padding-top: 100px;
        box-sizing: border-box;
        // height: 870px;
        // height:488px;
        // height:100% !important;
    }

    /deep/.el-input.is-disabled .el-input__inner {
        background: transparent;
        border-bottom-color: #909399;
    }

    /deep/.el-input.is-disabled .el-input__inner {
        // color: #606266 !important;
        font-size: 14px;
    }

    /deep/ .el-tabs__nav {
        width: 100%;
    }
</style>