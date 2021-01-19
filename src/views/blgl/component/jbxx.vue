<template>
    <div class="jbxx">
        <el-form ref="form" :model="form" label-width="108px">
            <el-form-item class="huangzname jbxxform" label="患者姓名">
                <el-input v-model="form.name" @input="fibbidface2" maxlength="16" :disabled="binglft ? true : false"></el-input>
            </el-form-item>

            <el-form-item label="性别" class="xingbtit jbxxform">
                <el-radio-group v-model="form.resource">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item class="jiuzyy jbxxform" label="就诊医院">
                <el-select v-model="form.yiy">
                    <el-option v-for="(item,i) in yiyshuzu" :key="i" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-button @click="xzyybut" style="font-size:16px;width:110px;color:#1175d2;" type="text">新增医院
                </el-button>
            </el-form-item>

            <el-form-item class="csrq jbxxform" label="出生日期">
                <el-input maxlength="4" v-model="input1" class="ipt1" @input="yearxie"></el-input>
                <span>年</span>
                <el-input maxlength="2" v-model="input2" class="ipt2" @input="monthxie"></el-input>
                <span>月</span>
                <el-input maxlength="2" v-model="input3" class="ipt3" @input="datexie"></el-input>
                <span>日</span>
            </el-form-item>

            <el-form-item class="shdz jbxxform" label="收货地址">
                <!-- clearable filterable allow-create default-first-option -->
                <el-select v-model="form.diz">
                    <el-option v-for="(item,i) in dizshuzu" :key="i" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-button @click="xzdzbut" style="font-size:16px;width:110px;color:#1175d2;" type="text">新增地址
                </el-button>
            </el-form-item>
        </el-form>
        <newhospital @pushyiyshuj="pushyiyshuj" ref="tanchuangyiy"></newhospital>
        <newsite @pushdizhishuju="pushdizhishuju" ref="tanchuangdizhi"></newsite>
    </div>
</template>
<script>
    import newsite from '@/views/newtangc/newsite'
    import newhospital from '@/views/newtangc/newhospital'
    export default {
        components: {
            newsite,
            newhospital,
        },
        props: {
            binglft: {
                type: Boolean
            }
        },
        data() {
            return {
                input1: '',
                input2: '',
                input3: '',
                form: {
                    name: '',
                    yiy: '',
                    diz: '',
                    resource: '',
                },
                // 医院
                yiyshuzu: [],
                // 地址
                dizshuzu: [],
                // 弹出框
            };
        },
        created(){
        this.dizhijieko();
        this.yiyjieko();
        },
        mounted() {
            // this.init();
        },
        methods: {
            // 年份限制
            yearxie(value){
                this.input1=value.replace(/[^\d]/g,'')
                if((Number(value)<=0 || Number(value)>2021) && value != ''){
                    this.input1='';
                    this.$message({
                        message: '请输入正确的年份',
                        type: 'error',
                        duration: 2000,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    })
                }
            },
            // 月份限制
            monthxie(value){
                this.input2=value.replace(/[^\d]/g,'')
                if((Number(value)<=0 || Number(value)>12) && value != ''){
                    this.input2='';
                    this.$message({
                        message: '请输入正确的月份',
                        type: 'error',
                        duration: 2000,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    })
                }
            },
            // 日期限制
            datexie(value){
                this.input3=value.replace(/[^\d]/g,'')
                if((Number(value)<=0 || Number(value)>31) && value != ''){
                    this.input3='';
                    this.$message({
                        message: '请输入正确的日期',
                        type: 'error',
                        duration: 2000,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    })
                }
            },
            // 收货收获地址列表
            dizhijieko(){
                this.$http({
                    url: "/deliveryAddress/getAddressList",
                    method: "get",
                    params: {

                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.dizshuzu = JSON.parse(data.data).map(x => {
                            return {
                                name: x.country+x.province + x.city + x.area + x.address + ' - ' + x.deliveryName,
                                id: x.id
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 医院地址列表
            yiyjieko(){
                this.$http({
                    url: "/hospital/hospitalList",
                    method: "get",
                    params: {

                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        this.yiyshuzu = JSON.parse(data.data).map(x => {
                            return {
                                name: x.country+x.province + x.city + x.area + x.address+x.hospitalName,
                                id: x.id
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 医院 显示弹窗
            xzyybut() {
                this.$refs.tanchuangyiy.dialogFormVisibleyiy = true;
            },
            // 地址 显示弹窗
            xzdzbut() {
                this.$refs.tanchuangdizhi.dialogFormVisibledizhi = true;
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
                // if (this.form.name.length < 1) {
                //     this.$message({
                //         message: '请至少输入一位姓名',
                //         type: 'error',
                //         duration: 2000,
                //         onClose: () => {
                //             this.visible = false
                //             this.$emit('refreshDataList')
                //         }
                //     })
                // }
            },
            // 新增医院 方法
            pushyiyshuj() {
                this.yiyjieko();
                // this.form.yiy =
                    // this.$refs.tanchuangyiy.country +
                    // this.$refs.tanchuangyiy.province +
                    // this.$refs.tanchuangyiy.city +
                    // this.$refs.tanchuangyiy.area +
                    // this.$refs.tanchuangyiy.form.dizhi;
                // this.yiyshuzu.push(this.form.yiy);
            },
            // 新增地址方法
            pushdizhishuju() {
                this.dizhijieko();
                // this.form.diz =
                    // this.$refs.tanchuangdizhi.country +
                    // this.$refs.tanchuangdizhi.province +
                    // this.$refs.tanchuangdizhi.city +
                    // this.$refs.tanchuangdizhi.area +
                    // this.$refs.tanchuangdizhi.form.diz;
                // this.dizshuzu.push(this.form.diz)
                
            },

            // 获取医院列表
            // yiyhuoqu(){
            //     this.$http({
            //         url: "/hospital/hospitalList",
            //         method: "get",
            //     }).then(({
            //         data
            //     }) => {
            //         // data = JSON.parse(data.data);
            //         // this.yiyshuzu = data;
            //         this.dizshuzu = JSON.parse(data.data).map(x => {
            //             return {
            //                 name: x.province + x.city + x.area + x.address,
            //                 id: x.id
            //             }
            //         })
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // }
        }
    }
</script>
<style scoped lang="less">
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

    .jbxx {
        height: 682px;
        font-size: 16px;
    }

    /deep/.el-form-item {
        font-weight: 400;
        margin-bottom: 25px;
        position: relative;
     
        .el-form-item__label{
            color: #333333;
        }
        .el-input input {
            border: 1px solid #1175d2;
        }
    }
    /deep/.jbxxform {
        font-weight: 400;
        margin-bottom: 25px;
        position: relative;
     
        .el-form-item__label{
            position: relative;
            &::before{
                content: "*";
                font-weight: 900;
                font-size: 16px;
                color:#ff0000;
                position: absolute;
                right:32px;
                top:-5px;
                letter-spacing: 0px;
            }
        }
    }

    /deep/.el-form-item__label {
        text-align: center;
        font-size: 16px;
        padding-right: 0px;
        text-align: left;
        // margin-right:40px;
    }

    /deep/.el-form-item__content {
        // margin-left:40px !important;
    }

    /deep/.huangzname .el-form-item__content {
        width: 400px;
    }

    /deep/.huangzname {
        padding-top: 36px;
        box-sizing: border-box;
    }

    /deep/.jiuzyy .el-input--suffix .el-input__inner {
        width: 400px;
    }

    /deep/.shdz .el-input--suffix .el-input__inner {
        width: 800px;
    }

    /deep/.csrq .el-form-item__content .el-input {
        width: auto;
    }

    /deep/.csrq .ipt1 .el-input__inner {
        font-weight: 400 !important;
        width: 100px;
        margin-right: 10px;
        text-align: center;
    }

    /deep/.csrq .ipt2 .el-input__inner {
        font-weight: 400 !important;
        width: 80px;
        margin-right: 10px;
        margin-left: 30px;
        text-align: center;
    }

    /deep/.csrq .ipt3 .el-input__inner {
        font-weight: 400 !important;
        width: 80px;
        margin-right: 10px;
        margin-left: 30px;
        text-align: center;
    }

    /deep/.csrq span {
        font-weight: 400 !important;
    }

    /deep/.el-form {
        padding-left: 80px;
        height: 682px;
    }

    /deep/.xingbtit .el-form-item__label {
        letter-spacing: 30px;
        padding: 0px;
        text-align: left;
    }

    // 性别
    /deep/.el-radio__inner {
        border: 1px solid #1175d2 !important;
        width: 20px;
        height: 20px;
    }

    // 新增
    /deep/.el-select .el-input .el-select__caret {
        color: #1175d2;
        font-size: 20px;
        font-weight: 1000;
        // el-icon-caret-bottom
    }

    /deep/.el-icon-arrow-up:before {
        content: "\e6e1";
    }

    @media screen and (max-width: 1660px) {
        /deep/.el-form {
            padding-left: 30px !important;
        }

    }

    @media screen and (max-width: 1200px) {

        /deep/.shdz input,
        /deep/.el-textarea .el-textarea__inner {
            width: 600px !important;
        }

        /deep/.el-checkbox-button__inner {
            width: 80px !important;
        }

    }
</style>