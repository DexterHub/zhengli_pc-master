<template>
    <div class="blgl">
        <div class="box main">
            <div class="box-nav clearfix">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="病例管理" name="one" disabled>
                        <span slot="label" class="topC" @click="binglglone">
                            <span class="title ">病例管理</span>
                            <i class="sjxone el-icon-caret-right"></i>
                            <i class="sjxtow el-icon-caret-right"></i>
                        </span>
                    </el-tab-pane>
                    <el-tab-pane v-if="xiangqshow" label="病例详情" name="oneone" disabled>
                        <span @click="binglgloneone" class="binglxq topC" slot="label">
                            <span class="title">病例详情</span>
                            <i class="sjxone el-icon-caret-right"></i>
                            <i class="sjxtow el-icon-caret-right"></i>
                        </span>
                    </el-tab-pane>
                    <el-tab-pane label="新建病例" name="two">
                        <span slot="label" class="topC">
                            <span class="title ">{{xingjbingli}}</span>
                            <i class="sjxone el-icon-caret-right"></i>
                            <i class="sjxtow el-icon-caret-right"></i>
                        </span>
                        <xjbl ref="newcase"></xjbl>
                    </el-tab-pane>
                    <el-tab-pane label="基本信息" name="three">
                        <span slot="label" class="topC">
                            <span class="title topC">基本信息</span>
                            <i class="sjxone el-icon-caret-right"></i>
                            <i class="sjxtow el-icon-caret-right"></i>
                        </span>
                        <jbxx ref="jibenxingx" :binglft="binglft"></jbxx>
                    </el-tab-pane>
                    <el-tab-pane label="诊断" name="four">
                        <span slot="label">
                            <span class="title">诊断</span>
                            <i class="sjxone el-icon-caret-right"></i>
                            <i class="sjxtow el-icon-caret-right"></i>
                        </span>
                        <zd ref="zhengduan"></zd>
                    </el-tab-pane>
                    <el-tab-pane label="矫治目标1" name="five">
                        <span slot="label">
                            <span class="title">矫治目标1</span>
                            <i class="sjxone el-icon-caret-right"></i>
                            <i class="sjxtow el-icon-caret-right"></i>
                        </span>
                        <jzmb1 ref="jzmb1"></jzmb1>
                    </el-tab-pane>
                    <el-tab-pane label="矫治目标2" name="six">
                        <span slot="label">
                            <span class="title">矫治目标2</span>
                            <i class="sjxone el-icon-caret-right"></i>
                            <i class="sjxtow el-icon-caret-right"></i>
                        </span>
                        <jzmb2 ref="jzmb2"></jzmb2>
                    </el-tab-pane>
                    <el-tab-pane label="矫治目标3" name="seven">
                        <span slot="label">

                            <span class="title">矫治目标3</span>
                            <i class="sjxone el-icon-caret-right"></i>
                            <i class="sjxtow el-icon-caret-right"></i>
                        </span>
                        <jzmb3 ref="jzmb3"></jzmb3>
                    </el-tab-pane>
                    <el-tab-pane label="矫治目标4" name="eight">
                        <span slot="label">

                            <span class="title">矫治目标4</span>
                            <i class="sjxone el-icon-caret-right"></i>
                            <i class="sjxtow el-icon-caret-right"></i>
                        </span>
                        <jzmb4 ref="jzmb4"></jzmb4>
                    </el-tab-pane>
                    <el-tab-pane label="牙况照片" name="nine">
                        <span slot="label">

                            <span class="title">牙况照片</span>
                            <i class="sjxone el-icon-caret-right"></i>
                            <i class="sjxtow el-icon-caret-right"></i>
                        </span>
                        <ykzp ref="yakuangzhaop"></ykzp>
                    </el-tab-pane>
                    <el-tab-pane label="上传文件" name="zero">
                        <span slot="label">

                            <span class="title">上传文件</span>
                        </span>
                        <scwj ref="wenjupload"></scwj>
                    </el-tab-pane>
                </el-tabs>
                <el-row class="elrowone">
                    <el-button @click="baocun" v-if="zuihoyibubaoc" type="primary" style="background:#1175d2;">保存
                    </el-button>
                    <el-button type="text" @click="open" class="quxbut">取消</el-button>
                </el-row>
                <el-row class="elrowtow">
                    <el-button @click="prve" type="primary" :class="{opacity:opactty1}" style="background:#1175d2;">上一步
                    </el-button>
                    <el-button @click="next" type="primary" :class="{opacity:opactty2}" style="background:#1175d2;">下一步
                    </el-button>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
   import {
        sendFn
    } from '@/util/validate'
    import {
        abab
    } from '@/util/validate'
    import {
        fixed
    } from '@/util/validate'
    import {
        dateToStr
    } from '@/util/validate.js'
    
    import xjbl from './component/xjbl'
    import jbxx from './component/jbxx'
    import zd from './component/zd'
    import ykzp from './component/ykzp'
    import scwj from './component/scwj'
    import jzmb1 from './component/jzmb1'
    import jzmb2 from './component/jzmb2'
    import jzmb3 from './component/jzmb3'
    import jzmb4 from './component/jzmb4'
    import baseUrl from '@/main.js'
    export default {
        components: {
            xjbl,
            jbxx,
            zd,
            ykzp,
            scwj,
            jzmb1,
            jzmb2,
            jzmb3,
            jzmb4,
        },
        data() {
            return {
                arr: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 43, 42, 41,
                    31, 32, 33, 34, 35, 36, 37, 38
                ],
                // 判断是不是最后一步 保存 与 取消按钮的显示与隐藏
                zuihoyibubaoc: false,
                activeName: this.$store.state.activeName,
                opactty1: false,
                opactty2: false,
                xiangqshow: false,
                xingjbingli: '新建病例',
                // 是否为病例重启
                binglft: false,
                // // 重启病例id
                huidshangcibinglId: '',
                // // 重启病例阶段
                // choqstageName: '',
                // // 重启病例次数
                // choqstageCount: '',
                // // 重启病例 index
                // actindex : '',

                // 矫治目标一 牙齿数据
                clearances: [],
                // 取消提示语
                quxiaobingli: '你是否要退出新建病例',
                // 保存 提示语
                baocunbuttit: '新建病例成功',
                constUrl: baseUrl.pc + '/output',
            };
        },
        created() {
            this.activeName = this.$store.state.activeName;
            // this.activeName = 'nine'
            if (this.activeName == 'two') {
                this.opactty1 = true;
            }
            if (this.activeName == 'zero') {
                this.opactty2 = true;
            }
            // 是病例重启
            if (this.$route.params.nameid) {
                this.binglft = true;
                this.xingjbingli = '病例重启';
                this.quxiaobingli = '你是否要退出重启病例'
                this.baocunbuttit = '重启病例成功'
                this.xiangqshow = true;
                this.$store.commit('bili', 'two')
                this.activeName = this.$store.state.activeName;
                this.opactty1 = true;
                this.opactty2 = false;
                this.binglnewshuj1(this.$store.state.caseId)
                this.binglnewshuj2(this.$store.state.caseId)
                this.binglnewshuj3(this.$store.state.caseId)
                this.binglnewshuj4(this.$store.state.caseId)
                this.binglnewshuj5(this.$store.state.caseId)
                this.binglnewshuj6(this.$store.state.caseId)
                this.binglnewshuj7(this.$store.state.caseId)
                this.binglnewshuj8(this.$store.state.caseId)
            } else {
                console.log(2);
                switch (this.activeName) {
                    case 'two':
                        break;
                    case 'three':
                        this.binglnewshuj1(this.$store.state.binglId);
                        break;
                    case 'four':
                        this.binglnewshuj1(this.$store.state.binglId);
                        this.binglnewshuj2(this.$store.state.binglId);
                        break;
                    case 'five':
                        this.binglnewshuj1(this.$store.state.binglId);
                        this.binglnewshuj2(this.$store.state.binglId);
                        this.binglnewshuj3(this.$store.state.binglId);
                        break;
                    case 'six':
                        this.binglnewshuj1(this.$store.state.binglId);
                        this.binglnewshuj2(this.$store.state.binglId);
                        this.binglnewshuj3(this.$store.state.binglId);
                        this.binglnewshuj4(this.$store.state.binglId);
                        break;
                    case 'seven':
                        this.binglnewshuj1(this.$store.state.binglId);
                        this.binglnewshuj2(this.$store.state.binglId);
                        this.binglnewshuj3(this.$store.state.binglId);
                        this.binglnewshuj4(this.$store.state.binglId);
                        this.binglnewshuj5(this.$store.state.binglId);
                        break;
                    case 'eight':
                        this.binglnewshuj1(this.$store.state.binglId);
                        this.binglnewshuj2(this.$store.state.binglId);
                        this.binglnewshuj3(this.$store.state.binglId);
                        this.binglnewshuj4(this.$store.state.binglId);
                        this.binglnewshuj5(this.$store.state.binglId);
                        this.binglnewshuj6(this.$store.state.binglId);
                        break;
                    case 'nine':
                        this.binglnewshuj1(this.$store.state.binglId);
                        this.binglnewshuj2(this.$store.state.binglId);
                        this.binglnewshuj3(this.$store.state.binglId);
                        this.binglnewshuj4(this.$store.state.binglId);
                        this.binglnewshuj5(this.$store.state.binglId);
                        this.binglnewshuj6(this.$store.state.binglId);
                        this.binglnewshuj7(this.$store.state.binglId);
                        break;
                    case 'zero':
                        this.zuihoyibubaoc = true
                        this.binglnewshuj1(this.$store.state.binglId);
                        this.binglnewshuj2(this.$store.state.binglId);
                        this.binglnewshuj3(this.$store.state.binglId);
                        this.binglnewshuj4(this.$store.state.binglId);
                        this.binglnewshuj5(this.$store.state.binglId);
                        this.binglnewshuj6(this.$store.state.binglId);
                        this.binglnewshuj7(this.$store.state.binglId);
                        this.binglnewshuj8(this.$store.state.binglId);
                        break;
                }
            }
        },
        mounted() {
            // 是重启
            if (this.$route.params.nameid) {
                this.$refs.yakuangzhaop.isNew = false;
                this.$refs.wenjupload.isNew = false;
            }else {//不是重启
                this.$refs.yakuangzhaop.isNew = true;
                this.$refs.wenjupload.isNew = true;
            }
        },
        updated() {
            if (this.activeName == 'two') {
                this.opactty1 = true;
            } else {
                this.opactty1 = false;
            }
            if (this.activeName == 'zero') {
                this.opactty2 = true;
            } else {
                this.opactty2 = false;
            }
        },
        methods: {
            // 病例管理
            binglglone() {
                this.openguanl()
            },
            // 病例详情
            binglgloneone() {
                this.opentwo()
            },
            handleClick(tab, event) {
                this.activeName = this.$store.state.activeName;
                // 加灰度
                if (this.activeName == 'two') {

                    this.opactty1 = true

                } else {
                    this.opactty1 = false
                }
                if (this.activeName == 'seven') {
                    this.opactty2 = true
                } else {
                    this.opactty2 = false
                }
            },
            // 保存病例
            async baocun() {
                this.loadingInstance = this.Loading.service({
                    text: '正在上传',
                });
                if (this.$route.params.nameid) { //重启进来最后一步保存所有接口
                    await this.resebinglit(); //更新病例ID接口
                    await this.newbingljbxx()
                    await this.newbinglzd()
                    await this.newbingljzmb1()
                    await this.newbingljzmb2() //
                    await this.newbingljzmb3()
                    await this.newbingljzmb4()
                    // 上传
                    let arrList = this.$refs.yakuangzhaop.fileList;
                    for (const i in arrList) {
                        if(!arrList[i]) continue;
                        await this.$refs.yakuangzhaop.newLodImg(arrList[i].raw,Number(i));
                    }
                    if(this.$refs.wenjupload.fileList.length > 0) {
                         await this.$refs.wenjupload.newLodImg()
                    }
                    await this.baocuncgbingl(true);
                } else {
                    this.baocuncgbingl();
                    // this.$refs.wenjupload.schuawj();
                }

            },
            // 保存病例异步上传文件
            baocuncgbingl(flag) {
                return new Promise((resolve, reject) => {
                  
                    let instruct = ()=> {
                        // 保存 成功 提示语
                        this.baocuncg()
                        this.$store.commit('huidaoshangci', 0);
                        // 保存病例 将id传到病例详情 渲染数据
                        this.$store.state.caseId = this.$store.state.binglId;
                        this.$store.state.stageNameId = this.$store.state.stageName;
                        this.$store.state.stageCountId = this.$store.state.stageCount;
                        // 跳转 病例详情
                        this.$store.commit('indexAdd', ['病例详情', '/particulars']);
                        this.$router.replace('/particulars')
                    }
                    if (flag) {
                        this.loadingInstance.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                            this.loadingInstance.close();
                        });
                        instruct();
                        resolve()
                        return;
                    }
                    this.$http({
                        url: "/caseInfo/createComplete",
                        method: "POST",
                        data: {
                            // 病例ID
                            caseId: this.$store.state.binglId,
                        }
                    }).then(({
                        data
                    }) => {
                        instruct();
                        this.loadingInstance.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                            this.loadingInstance.close();
                        });
                        resolve()
                    }).catch(err => {
                        console.log(err)
                        reject(err);
                    })
                })

            },
            // 判断输入的内容
            binglppai(value) {
                if (Number(value) == 0) {
                    this.$message({
                        message: '请选择病例品牌',
                        type: 'error',
                        duration: 2000,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    });
                }
            },
            // 判断必填数据
            bitianshuj(value) {
                this.$message({
                    message: '请输入必填项',
                    type: 'error',
                    duration: 2000,
                    onClose: () => {
                        this.visible = false
                        this.$emit('refreshDataList')
                    }
                });
            },
            // 判断附加说明
            fujiashuom(value) {
                this.$message({
                    message: '请填写附加说明',
                    type: 'error',
                    duration: 2000,
                    onClose: () => {
                        this.visible = false
                        this.$emit('refreshDataList')
                    }
                });
            },
            // 文件上传提示语
            onegwenj(value) {
                this.$message({
                    message: '请至少上传一个文件',
                    type: 'error',
                    duration: 2000,
                    onClose: () => {
                        this.visible = false
                        this.$emit('refreshDataList')
                    }
                });
            },
            // 保存提示语
            baocuncg(value) {
                this.$message({
                    message: this.baocunbuttit,
                    type: 'success'
                });
            },
            // 新建病例
            newbingli() {
                this.$http({
                    url: "/caseInfo/stepOne",
                    method: "POST",
                    data: {
                        // 病例ID----修改时携带,重启时携带
                        // caseId : 0,
                        // 病例品牌 ID  ==确认正确
                        brandId: this.$refs.newcase.checked1,
                        //  是否为重启 true 重启  ==确认正确
                        restart: this.binglft,
                    }
                }).then(({
                    data
                }) => {
                    data = JSON.parse(data.data)
                    this.$store.commit('abab1', data.id);
                    this.$store.commit('abab2', data.stageName);
                    this.$store.commit('abab3', data.stageCount);
                }).catch(err => {
                    console.log(err)
                })
            },
            // 重启 新建病例
            choqixinjian() {
                this.$http({
                    url: "/caseInfo/stepOne",
                    method: "POST",
                    data: {
                        // 病例ID----修改时携带,重启时携带
                        caseId: this.$store.state.binglId,
                        stageName: this.$store.state.stageName,
                        stageCount: this.$store.state.stageCount,
                        restart: this.binglft,
                        brandId: this.$refs.newcase.checked1,
                    }

                }).then(({
                    data
                }) => {
                }).catch(err => {
                    console.log(err)
                })
            },
            // 上一页
            prve() {
                switch (this.activeName) {
                    case 'zero':
                        // this.activeName = 'nine';
                        this.$store.commit('bili', 'nine')
                        this.activeName = this.$store.state.activeName;
                        this.zuihoyibubaoc = false;

                        break;
                    case 'nine':
                        // this.activeName = 'eight';
                        this.$store.commit('bili', 'eight')
                        this.activeName = this.$store.state.activeName;
                        this.zuihoyibubaoc = false;

                        break;
                    case 'eight':
                        this.activeName = 'seven';
                        this.$store.commit('bili', 'seven')
                        this.activeName = this.$store.state.activeName;
                        this.zuihoyibubaoc = false;

                        break;
                    case 'seven':
                        // this.activeName = 'six';
                        this.$store.commit('bili', 'six')
                        this.activeName = this.$store.state.activeName;
                        this.zuihoyibubaoc = false;

                        break;
                    case 'six':
                        // this.activeName = 'five';
                        this.$store.commit('bili', 'five')
                        this.activeName = this.$store.state.activeName;
                        this.zuihoyibubaoc = false;

                        break;
                    case 'five':
                        // this.activeName = 'four';
                        this.$store.commit('bili', 'four')
                        this.activeName = this.$store.state.activeName;
                        this.zuihoyibubaoc = false;

                        break;
                    case 'four':
                        // this.activeName = 'three';
                        this.$store.commit('bili', 'three')
                        this.activeName = this.$store.state.activeName;
                        this.zuihoyibubaoc = false;

                        break;
                    case 'three':
                        // this.activeName = 'two';
                        this.$store.commit('bili', 'two')
                        this.activeName = this.$store.state.activeName;
                        this.zuihoyibubaoc = false;

                        break;
                }
            },
            // 下一页
            next() {
                if (this.$route.params.nameid) { //重启
                    switch (this.activeName) {
                        // 新建病例 或 重启病例
                        case 'two':
                            if (this.$refs.newcase.checked1 == 0) {
                                this.binglppai(this.$refs.newcase.checked1)
                            } else {
                                // this.choqixinjian();
                                // this.activeName = 'three'
                                this.$store.commit('bili', 'three')
                                this.activeName = this.$store.state.activeName;
                            }
                            break;
                            // 基本信息
                        case 'three':
                            if (this.$refs.jibenxingx.form.name != '' &&
                                Number(this.$refs.jibenxingx.form.resource) != '' &&
                                Number(this.$refs.jibenxingx.input1) != '' &&
                                Number(this.$refs.jibenxingx.input2) != '' &&
                                Number(this.$refs.jibenxingx.input3) != '' &&
                                Number(this.$refs.jibenxingx.form.yiy) != '' &&
                                Number(this.$refs.jibenxingx.form.diz) != ''
                            ) {
                                this.$store.commit('bili', 'four');
                                this.activeName = this.$store.state.activeName;
                            } else {
                                this.bitianshuj();
                            }
                            break;
                            // 诊断
                        case 'four':
                            if (
                                Number(this.$refs.zhengduan.radio1) != 0 &&
                                Number(this.$refs.zhengduan.radio2) != 0 &&
                                Number(this.$refs.zhengduan.radio3) != 0 &&
                                Number(this.$refs.zhengduan.radio4) != 0 &&
                                Number(this.$refs.zhengduan.checkboxGroup1) != 0
                            ) {
                                // this.activeName = 'five'
                                this.$store.commit('bili', 'five')
                                this.activeName = this.$store.state.activeName;
                            } else {
                                this.bitianshuj()
                            }

                            break;
                            // 矫治目标1
                        case 'five':
                            if (this.$refs.jzmb1.radio5 == 1) {
                                this.$refs.jzmb4.bottomhe = true
                                this.$refs.jzmb4.tophe = false

                                this.$refs.jzmb4.input13 = this.$refs.jzmb4.input14 = this.$refs.jzmb4.radio14 = ''
                            } else if (this.$refs.jzmb1.radio5 == 2) {
                                this.$refs.jzmb4.tophe = true
                                this.$refs.jzmb4.bottomhe = false
                                this.$refs.jzmb4.input11 = this.$refs.jzmb4.input12 = this.$refs.jzmb4.radio13 = ''
                            } else {
                                this.$refs.jzmb4.bottomhe = false
                                this.$refs.jzmb4.tophe = false
                            }
                            if (
                                Number(this.$refs.jzmb1.radio5) != 0 &&
                                Number(this.$refs.jzmb1.radio6) != 0 &&
                                Number(this.$refs.jzmb1.radio7) != 0 &&
                                Number(this.$refs.jzmb1.radio8) != 0 &&
                                Number(this.$refs.jzmb1.radio9) != 0 &&
                                Number(this.$refs.jzmb1.radio10) != 0 &&
                                Number(this.$refs.jzmb1.radio11) != 0
                            ) {
                                // this.activeName = 'six'
                                this.$store.commit('bili', 'six')
                                this.activeName = this.$store.state.activeName;
                            } else {
                                this.bitianshuj()
                            }

                            break;
                            // 矫治目标2
                        case 'six':
                            // this.activeName = 'seven'
                            this.$store.commit('bili', 'seven')
                            this.activeName = this.$store.state.activeName;
                            break;
                            // 矫治目标3
                        case 'seven':
                            // this.activeName = 'eight'
                            this.$store.commit('bili', 'eight')
                            this.activeName = this.$store.state.activeName;
                            break;
                            // 牙况照片
                        case 'eight':
                            if (this.$refs.jzmb4.bottomhe == true) {
                                if (Number(this.$refs.jzmb4.input11 || this.$refs.jzmb4.input12 || this.$refs.jzmb4
                                        .radio13)) {
                                    this.$store.commit('bili', 'nine')
                                    this.activeName = this.$store.state.activeName;
                                } else {
                                    this.bitianshuj()
                                }
                            } else if (this.$refs.jzmb4.tophe == true) {
                                if (Number(this.$refs.jzmb4.input13 || this.$refs.jzmb4.input14 || this.$refs.jzmb4
                                        .radio14)) {
                                    // // this.jiaozhimubfour();
                                    this.$store.commit('bili', 'nine')
                                    this.activeName = this.$store.state.activeName;
                                } else {
                                    this.bitianshuj()
                                }
                            } else {
                                if (
                                    Number(this.$refs.jzmb4.input11 || this.$refs.jzmb4.input12 || this.$refs.jzmb4
                                        .radio13) &&
                                    Number(this.$refs.jzmb4.input13 || this.$refs.jzmb4.input14 || this.$refs.jzmb4
                                        .radio14)
                                ) {
                                    // this.jiaozhimubfour();
                                    this.$store.commit('bili', 'nine')
                                    this.activeName = this.$store.state.activeName;
                                } else {
                                    this.bitianshuj()
                                }
                            }
                            break;

                            // 文件
                        case 'nine':
                            if (this.$refs.yakuangzhaop.wenj == false) {
                                this.onegwenj();
                            } else {
                                this.$store.commit('bili', 'zero')
                                this.activeName = this.$store.state.activeName;
                                this.zuihoyibubaoc = true;
                            }

                            break;
                    }
                } else { //新建
                    switch (this.activeName) {
                        // 新建病例 或 重启病例
                        case 'two':
                            if (this.$route.params.nameid) {
                                if (this.$refs.newcase.checked1 == 0) {
                                    this.binglppai(this.$refs.newcase.checked1)
                                } else {
                                    this.choqixinjian();
                                    // this.activeName = 'three'
                                    this.$store.commit('bili', 'three')
                                    this.activeName = this.$store.state.activeName;
                                }
                            } else {
                                if (this.$refs.newcase.checked1 == 0) {
                                    this.binglppai(this.$refs.newcase.checked1)
                                } else {
                                    this.newbingli();
                                    // this.activeName = 'three'
                                    this.$store.commit('bili', 'three')
                                    this.activeName = this.$store.state.activeName;
                                }
                            }
                            break;
                            // 基本信息
                        case 'three':
                            if (this.$refs.jibenxingx.form.name != '' &&
                                Number(this.$refs.jibenxingx.form.resource) != '' &&
                                Number(this.$refs.jibenxingx.input1) != '' &&
                                Number(this.$refs.jibenxingx.input2) != '' &&
                                Number(this.$refs.jibenxingx.input3) != '' &&
                                Number(this.$refs.jibenxingx.form.yiy) != '' &&
                                Number(this.$refs.jibenxingx.form.diz) != ''
                            ) {
                                this.newbingljbxx();
                                this.$store.commit('bili', 'four');
                                this.activeName = this.$store.state.activeName;
                            } else {
                                this.bitianshuj();
                            }
                            break;
                            // 诊断
                        case 'four':
                            if (
                                Number(this.$refs.zhengduan.radio1) != 0 &&
                                Number(this.$refs.zhengduan.radio2) != 0 &&
                                Number(this.$refs.zhengduan.radio3) != 0 &&
                                Number(this.$refs.zhengduan.radio4) != 0 &&
                                Number(this.$refs.zhengduan.checkboxGroup1) != 0
                            ) {
                                this.newbinglzd()
                                // this.activeName = 'five'
                                this.$store.commit('bili', 'five')
                                this.activeName = this.$store.state.activeName;
                            } else {
                                this.bitianshuj()
                            }

                            break;
                            // 矫治目标1
                        case 'five':
                            if (this.$refs.jzmb1.radio5 == 1) {
                                this.$refs.jzmb4.bottomhe = true
                                this.$refs.jzmb4.tophe = false

                                this.$refs.jzmb4.input13 = this.$refs.jzmb4.input14 = this.$refs.jzmb4.radio14 = ''
                            } else if (this.$refs.jzmb1.radio5 == 2) {
                                this.$refs.jzmb4.tophe = true
                                this.$refs.jzmb4.bottomhe = false
                                this.$refs.jzmb4.input11 = this.$refs.jzmb4.input12 = this.$refs.jzmb4.radio13 = ''
                            } else {
                                this.$refs.jzmb4.bottomhe = false
                                this.$refs.jzmb4.tophe = false
                            }
                            if (
                                Number(this.$refs.jzmb1.radio5) != 0 &&
                                Number(this.$refs.jzmb1.radio6) != 0 &&
                                Number(this.$refs.jzmb1.radio7) != 0 &&
                                Number(this.$refs.jzmb1.radio8) != 0 &&
                                Number(this.$refs.jzmb1.radio9) != 0 &&
                                Number(this.$refs.jzmb1.radio10) != 0 &&
                                Number(this.$refs.jzmb1.radio11) != 0
                            ) {
                                this.newbingljzmb1()
                                // this.activeName = 'six'
                                this.$store.commit('bili', 'six')
                                this.activeName = this.$store.state.activeName;
                            } else {
                                this.bitianshuj()
                            }

                            break;
                            // 矫治目标2
                        case 'six':
                            this.newbingljzmb2()
                            // this.activeName = 'seven'
                            this.$store.commit('bili', 'seven')
                            this.activeName = this.$store.state.activeName;
                            break;
                            // 矫治目标3
                        case 'seven':
                            this.newbingljzmb3()
                            // this.activeName = 'eight'
                            this.$store.commit('bili', 'eight')
                            this.activeName = this.$store.state.activeName;
                            break;
                            // 矫治目标4
                        case 'eight':
                            if (this.$refs.jzmb4.bottomhe == true) {
                                if (Number(this.$refs.jzmb4.input11 || this.$refs.jzmb4.input12 || this.$refs.jzmb4
                                        .radio13)) {
                                    if (this.$refs.jzmb4.radio15 == 2 && this.$refs.jzmb4.form.fjsm == '') {
                                        this.fujiashuom();
                                    } else {
                                        this.newbingljzmb4();
                                        this.$store.commit('bili', 'nine')
                                        this.activeName = this.$store.state.activeName;
                                    }
                                } else {
                                    this.bitianshuj()
                                }
                            } else if (this.$refs.jzmb4.tophe == true) {
                                if (Number(this.$refs.jzmb4.input13 || this.$refs.jzmb4.input14 || this.$refs.jzmb4
                                        .radio14)) {

                                    if (this.$refs.jzmb4.radio15 == 2 && this.$refs.jzmb4.form.fjsm == '') {
                                        this.fujiashuom();
                                    } else {
                                        this.newbingljzmb4();
                                        this.$store.commit('bili', 'nine')
                                        this.activeName = this.$store.state.activeName;
                                    }

                                } else {
                                    this.bitianshuj()
                                }
                            } else {
                                if (Number(this.$refs.jzmb4.input11 || this.$refs.jzmb4.input12 || this.$refs.jzmb4
                                        .radio13) &&
                                    Number(this.$refs.jzmb4.input13 || this.$refs.jzmb4.input14 || this.$refs.jzmb4
                                        .radio14)
                                ) {
                                    if (this.$refs.jzmb4.radio15 == 2 && this.$refs.jzmb4.form.fjsm == '') {
                                        this.fujiashuom();
                                    } else {
                                        this.newbingljzmb4();
                                        this.$store.commit('bili', 'nine')
                                        this.activeName = this.$store.state.activeName;

                                    }
                                } else {
                                    this.bitianshuj()
                                }
                            }

                            break;

                            // 牙况照片
                        case 'nine':
                            if (this.$refs.yakuangzhaop.wenj == false) {
                                this.onegwenj();
                            } else {
                                const Tz = ()=>{
                                    return new Promise((resolve,reject)=>{
                                        this.$store.commit('bili', 'zero')
                                        this.activeName = this.$store.state.activeName;
                                        this.zuihoyibubaoc = true;
                                        resolve();
                                    })
                                    
                                }
                                Tz();
                            }
                            break;
                    }
                }
            },
            // 新建病例 基本信息
            newbingljbxx() {
                return new Promise((resolve, reject) => {
                    this.$http({
                        url: "/caseInfo/stepTwo",
                        method: "POST",
                        data: {
                            // 病例 id
                            caseId: this.$store.state.binglId,
                            // 病例阶段
                            stageName: this.$store.state.stageName,
                            // 病例次数
                            stageCount: this.$store.state.stageCount,
                            // 病人名称
                            patientName: this.$refs.jibenxingx.form.name,
                            // 性别
                            sex: Number(this.$refs.jibenxingx.form.resource),
                            // 出生日期
                            birthday: (new Date(this.$refs.jibenxingx.input1 + '/' + this.$refs
                                    .jibenxingx.input2 + '/' + this.$refs.jibenxingx.input3))
                                .getTime(),
                            // 医院 ID
                            hospitalId: Number(this.$refs.jibenxingx.form.yiy),
                            // 收货地址主键ID
                            addressId: Number(this.$refs.jibenxingx.form.diz),
                        }
                    }).then(({
                        data
                    }) => {
                        resolve();
                    }).catch(err => {
                        console.log(err)
                        reject();
                    })
                })

            },
            // 新建病例 诊断
            newbinglzd() {
                return new Promise((resolve, reject) => {
                    this.$http({
                        url: "/caseInfo/stepThree",
                        method: "POST",
                        data: {
                            // 诊断分类ID 修改时带上
                            // diagnosisId : Number(this.binglId),

                            // 病例 id
                            caseId: this.$store.state.binglId,
                            // 病例阶段
                            stageName: this.$store.state.stageName,
                            // 病例次数
                            stageCount: this.$store.state.stageCount,
                            // 磨牙关系 左侧磨牙关系选项（1 Ⅰ类，2 Ⅱ类，3 Ⅲ类）
                            molarLeft: Number(this.$refs.zhengduan.radio1),
                            // 磨牙关系 右侧磨牙关系选项（1 Ⅰ类，2 Ⅱ类，3 Ⅲ类）
                            molarRight: Number(this.$refs.zhengduan.radio2),
                            // 尖牙关系 左侧磨牙关系选项（1中性，2近中，3远中）
                            canineLeft: Number(this.$refs.zhengduan.radio3),
                            // 尖牙关系 右侧磨牙关系选项（1中性，2近中，3远中）
                            canineRight: Number(this.$refs.zhengduan.radio4),
                            // 病例分类 单选时 值为 2的n次方 n为选中第几个 多选时将值相加 1.拥挤 2.牙列间隙 3.前突....
                            diagnosisType: this.$refs.zhengduan.binglfenl
                        }

                    }).then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            resolve();
                        }
                    }).catch(err => {
                        console.log(err)
                        reject()
                    })
                })

            },
            // 新建病例 矫治目标1
            newbingljzmb1() {
                return new Promise((resolve, reject) => {
                    this.$http({
                        url: "/caseInfo/stepFour",
                        method: "POST",
                        data: {
                            // 病例 id
                            caseId: this.$store.state.binglId,
                            // 病例阶段
                            stageName: this.$store.state.stageName,
                            // 病例次数
                            stageCount: this.$store.state.stageCount,
                            // [必填]矫治牙列（1上颌，2下颌，3全颌 ）
                            prescpDentition: Number(this.$refs.jzmb1.radio5),
                            // [必填] 覆颌（牙合）（1保持 2改善）保持状态下：覆颌改善数据不可填
                            prescpOverbite: Number(this.$refs.jzmb1.radio6),
                            // 覆颌改善数据
                            prescpOverbiteData: Number(this.$refs.jzmb1.input1),
                            // [必填]覆盖（1保持 2改善）保持状态下：覆盖改善数据不可填
                            prescpOverjet: Number(this.$refs.jzmb1.radio7),
                            // 覆盖改善数据
                            prescpOverjetData: Number(this.$refs.jzmb1.input2),
                            // [必填]左侧磨牙关系选项（1保持，2理想，3改善）选改善才可以填（+近中，-远中）数据[只能填一个]
                            prescpMolarLeft: Number(this.$refs.jzmb1.radio8),
                            // 左侧磨牙关系改善数值（+近中，-远中）
                            prescpMolarLeftData: Number(-this.$refs.jzmb1.input3 || this.$refs.jzmb1
                                .input4),
                            // [必填]右侧磨牙关系选项（1保持，2理想，3改善）选改善才可以填（+近中，-远中）数据[只能填一个]
                            prescpMolarRight: Number(this.$refs.jzmb1.radio9),
                            // 右侧磨牙关系改善数值（+近中，-远中
                            prescpMolarRightData: Number(-this.$refs.jzmb1.input5 || this.$refs
                                .jzmb1
                                .input6),
                            // [必填]左侧尖牙关系选项（1保持，2理想，3改善）选改善才可以填（+近中，-远中）数据[只能填一个]
                            prescpCanineLeft: Number(this.$refs.jzmb1.radio10),
                            // 左侧尖牙关系改善数值（+近中，-远中）[只能填一个]
                            prescpCanineLeftData: Number(-this.$refs.jzmb1.input7 || this.$refs
                                .jzmb1
                                .input8),
                            // [必填]右侧尖牙关系选项（1保持，2理想，3改善）选改善才可以填（+近中，-远中）数据[只能填一个]
                            prescpCanineRight: Number(this.$refs.jzmb1.radio11),
                            // 右侧尖牙关系改善数值（+近中，-远中）
                            prescpCanineRightData: Number(-this.$refs.jzmb1.input9 || this.$refs
                                .jzmb1
                                .input10),
                            // 后牙反/锁 颌（0未选，1保持，2纠正）
                            prescpPosteriorCrossBite: Number(this.$refs.jzmb1.radio12),
                        }

                    }).then(({
                        data
                    }) => {
                        resolve()
                    }).catch(err => {
                        console.log(err)
                        reject(err);
                    })
                })

            },
            // 新建病例 矫治目标2
            newbingljzmb2() {
                return new Promise((resolve, reject) => {
                    let arr = [];
                    this.$refs.jzmb2.yacitop.forEach((item, i) => {
                        if (item.titp1 || item.titp2 || item.titp3 || item.titp4) {
                            arr.push({
                                ex: item.titp1 ? true : false,
                                exp: item.titp2 ? true : false,
                                dm: item.titp3 ? true : false,
                                ipr: item.titp4 ? true : false,
                                teethIndex: i + 1
                            })
                        }
                    })
                    this.$refs.jzmb2.yacibottom.forEach((item, i) => {
                        if (item.titp1 || item.titp2 || item.titp3 || item.titp4) {
                            arr.push({
                                ex: item.titp1 ? true : false,
                                exp: item.titp2 ? true : false,
                                dm: item.titp3 ? true : false,
                                ipr: item.titp4 ? true : false,
                                teethIndex: i + 17
                            })
                        }
                    })

                    arr.forEach(item => {
                        item.teethIndex = this.arr[item.teethIndex - 1];
                    });


                    this.$http({
                        url: "/caseInfo/stepFive",
                        method: "POST",
                        data: {
                            // 病例 id
                            caseId: this.$store.state.binglId,
                            // 病例阶段
                            stageName: this.$store.state.stageName,
                            // 病例次数
                            stageCount: this.$store.state.stageCount,
                            // 牙齿下表
                            clearances: arr,

                        }

                    }).then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            resolve();
                        }
                    }).catch(err => {
                        console.log(err)
                        reject(err);
                    })
                })

            },
            // 新建病例 矫治目标3
            newbingljzmb3() {
                return new Promise((resolve, reject) => {
                    let arr1 = [];
                    this.$refs.jzmb3.yacitop.forEach((item, i) => {
                        if (item.titp1 || item.titp2 || item.titp3) {
                            arr1.push({
                                nm: item.titp1 ? true : false,
                                na: item.titp2 ? true : false,
                                m: item.titp3 ? true : false,
                                teethIndex: i + 1
                            })
                        }
                    })
                    this.$refs.jzmb3.yacibottom.forEach((item, i) => {
                        if (item.titp1 || item.titp2 || item.titp3) {
                            arr1.push({
                                nm: item.titp1 ? true : false,
                                na: item.titp2 ? true : false,
                                m: item.titp3 ? true : false,
                                teethIndex: i + 17
                            })
                        }
                    })
                    arr1.forEach(item => {
                        item.teethIndex = this.arr[item.teethIndex - 1];
                    });
                    this.$http({
                        url: "/caseInfo/stepSix",
                        method: "POST",
                        data: {
                            // 病例 id
                            caseId: this.$store.state.binglId,
                            // 病例阶段
                            stageName: this.$store.state.stageName,
                            // 病例次数
                            stageCount: this.$store.state.stageCount,
                            // 牙齿下表
                            teethVOS: arr1

                        }

                    }).then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            resolve()
                        }
                    }).catch(err => {
                        console.log(err)
                        reject();
                    })
                })

            },
            // 新建病例 矫治目标4
            newbingljzmb4() {
                return new Promise((resolve, reject) => {
                    this.$http({
                        url: "/caseInfo/stepSeven",
                        method: "POST",
                        data: {
                            // 病例 id
                            caseId: this.$store.state.binglId,
                            // 病例阶段
                            stageName: this.$store.state.stageName,
                            // 病例次数
                            stageCount: this.$store.state.stageCount,
                            // 如果矫治目标1 矫治牙列选[下颌] 这边不可填值为0, 双颌可填, 上颌牙列中线（0未选，34保持，+左，-右 [左 右只能填一个，保持状态下不能填写]）
                            fprescpUpperMiddle: Number(this.$refs.jzmb4.radio13 || this.$refs.jzmb4
                                .input11 || -
                                this.$refs.jzmb4.input12),
                            // 如果矫治目标1 矫治牙列选[上颌] 这边不可填值为0, 双颌可填, 下颌牙列中线（0未选，34保持，+左，-右 [左 右只能填一个，保持状态下不能填写]
                            fprescpLowerMiddle: Number(this.$refs.jzmb4.radio14 || this.$refs.jzmb4
                                .input13 || -
                                this.$refs.jzmb4.input14),
                            // 牙列间隙（0未选，1全部关闭，2保留间隙）
                            nprescpSpacing: Number(this.$refs.jzmb4.radio15),
                            // 附加说明
                            strPrescpInstruction: this.$refs.jzmb4.form.fjsm,
                        }

                    }).then(({
                        data
                    }) => {
                        if (data.code == 200) {
                            resolve()
                        }
                    }).catch(err => {
                        console.log(err)
                        reject(err);
                    })
                })

            },
            // 获取病例创建数据-第1步
            binglnewshuj1(id) {
                this.$http({
                    url: "/caseInfo/getStepOne",
                    method: "get",
                    params: {
                        caseId: id
                    }

                }).then(({
                    data
                }) => {
                    data = JSON.parse(data.data)
                    // 回溯病例品牌
                    this.$refs.newcase.checked1 = data.brandId;
                }).catch(err => {

                })
            },
            // 获取病例创建数据-第2步
            binglnewshuj2(id) {
                this.$http({
                    url: "/caseInfo/getStepTwo",
                    method: "get",
                    params: {
                        caseId: id
                    }

                }).then(({
                    data
                }) => {

                    data = JSON.parse(data.data)
                    // 回溯 姓名
                    this.$refs.jibenxingx.form.name = data.patientName;
                    // 回溯 性别
                    this.$refs.jibenxingx.form.resource = String(data.sex);
                    // 回溯 医院
                    this.$refs.jibenxingx.form.yiy = data.hospitalId;
                    // 回溯 出生日期
                    this.$refs.jibenxingx.input1 = dateToStr(new Date(data.birthday)).substring(0, 4);
                    this.$refs.jibenxingx.input2 = dateToStr(new Date(data.birthday)).substring(5, 7);
                    this.$refs.jibenxingx.input3 = dateToStr(new Date(data.birthday)).substring(8, 10);
                    // 回溯 收货地址
                    this.$refs.jibenxingx.form.diz = data.addressId;

                }).catch(err => {

                })
            },
            // 获取病例创建数据-第3步
            binglnewshuj3(id) {
                this.$http({
                    url: "/caseInfo/getStepThree",
                    method: "get",
                    params: {
                        caseId: id
                    }

                }).then(({
                    data
                }) => {
                    data = JSON.parse(data.data)

                    // 回溯 磨牙关系
                    this.$refs.zhengduan.radio1 = data.molarLeft;
                    this.$refs.zhengduan.radio2 = data.molarRight;
                    // 回溯 尖牙关系
                    this.$refs.zhengduan.radio3 = data.canineLeft;
                    this.$refs.zhengduan.radio4 = data.canineRight;

                    // 回溯 病例分类
                    // this.$refs.zhengduan.checkboxGroup1 = abab(data.diagnosisType);
                    let that = this;
                    abab(data.diagnosisType).forEach(function (a, b) {
                        let c = Math.pow(2, a);
                        that.$refs.zhengduan.checkboxGroup1.push(c)
                    })
                    let sha = 0;
                    that.$refs.zhengduan.checkboxGroup1.forEach(function (a, b) {
                        sha = sha + a;
                    })
                    that.$refs.zhengduan.binglfenl = sha
                }).catch(err => {

                })
            },
            // 获取病例创建数据-第4步
            binglnewshuj4(id) {
                this.$http({
                    url: "/caseInfo/getStepFour",
                    method: "get",
                    params: {
                        caseId: id
                    }

                }).then(({
                    data
                }) => {
                    data = JSON.parse(data.data);
                    data = data[0]
                    data.prescpOverbiteData == 0 ? data.prescpOverbiteData = '' : data.prescpOverbiteData = data
                        .prescpOverbiteData;
                    data.prescpOverjetData == 0 ? data.prescpOverjetData = '' : data.prescpOverjetData = data
                        .prescpOverjetData;
                    data.prescpOverbite == 2 ? this.$refs.jzmb1.lpl1 = false : data.prescpOverbite = data
                        .prescpOverbite;
                    data.prescpOverjet == 2 ? this.$refs.jzmb1.lpl2 = false : data.prescpOverjet = data
                        .prescpOverjet;

                    // 回溯 矫治牙列
                    this.$refs.jzmb1.radio5 = data.prescpDentition;
                    // 回溯 覆颌
                    this.$refs.jzmb1.radio6 = data.prescpOverbite;
                    // 回溯 覆颌 改善数据
                    this.$refs.jzmb1.input1 = data.prescpOverbiteData;
                    // 回溯 覆盖
                    this.$refs.jzmb1.radio7 = data.prescpOverjet;
                    // 回溯 覆盖 改善数据
                    this.$refs.jzmb1.input2 = data.prescpOverjetData;

                    // 回溯 磨牙关系 左侧
                    this.$refs.jzmb1.radio8 = data.prescpMolarLeft;
                    // 回溯 磨牙关系 改善关系
                    if (data.prescpMolarLeftData > 0) {
                        this.$refs.jzmb1.input4 = data.prescpMolarLeftData;
                    } else {
                        if (data.prescpMolarLeftData != 0) {
                            this.$refs.jzmb1.input3 = Math.abs(data.prescpMolarLeftData);
                        }

                    }

                    // 回溯 磨牙关系 右侧
                    this.$refs.jzmb1.radio9 = data.prescpMolarRight;
                    // 回溯 磨牙关系 改善关系
                    if (data.prescpMolarRightData > 0) {
                        this.$refs.jzmb1.input6 = data.prescpMolarRightData;
                    } else {
                        if (data.prescpMolarRightData != 0) {
                            this.$refs.jzmb1.input5 = Math.abs(data.prescpMolarRightData);
                        }

                    }

                    // 回溯 尖牙关系 左侧
                    this.$refs.jzmb1.radio10 = data.prescpCanineLeft;
                    // 回溯 尖牙关系 改善关系
                    if (data.prescpCanineLeftData > 0) {
                        this.$refs.jzmb1.input8 = data.prescpCanineLeftData
                    } else {
                        if (data.prescpCanineLeftData != 0) {
                            this.$refs.jzmb1.input7 = Math.abs(data.prescpCanineLeftData)
                        }

                    }
                    // 回溯 尖牙关系 右侧
                    this.$refs.jzmb1.radio11 = data.prescpCanineRight;
                    // 回溯 尖牙关系 改善关系
                    if (data.prescpCanineRightData > 0) {
                        this.$refs.jzmb1.input10 = data.prescpCanineRightData
                    } else {
                        if (data.prescpCanineRightData != 0) {
                            this.$refs.jzmb1.input9 = Math.abs(data.prescpCanineRightData)
                        }

                    }

                    // 回溯 后牙反颌
                    this.$refs.jzmb1.radio12 = data.prescpPosteriorCrossBite;


                    this.$refs.jzmb1.radio8 == 3 ? this.$refs.jzmb1.middle1 = false : this.$refs.jzmb1.radio8
                    this.$refs.jzmb1.radio9 == 3 ? this.$refs.jzmb1.middle2 = false : this.$refs.jzmb1.radio9
                    this.$refs.jzmb1.radio10 == 3 ? this.$refs.jzmb1.yazuo = false : this.$refs.jzmb1.radio10
                    this.$refs.jzmb1.radio11 == 3 ? this.$refs.jzmb1.yayou = false : this.$refs.jzmb1.radio11

                }).catch(err => {

                })
            },
            // 获取病例创建数据-第5步
            binglnewshuj5(id) {
                this.$http({
                    url: "/caseInfo/getStepFive",
                    method: "get",
                    params: {
                        caseId: id
                    }

                }).then(({
                    data
                }) => {
                    data = JSON.parse(data.data)
                    let that = this;
                    data.forEach(function (a, b) {
                        a.teethIndex = that.arr.indexOf(a.teethIndex) + 1;

                        if (a.teethIndex > 16) {
                            // 下排牙齿
                            let index = a.teethIndex - 16;
                            a.ex == true ? a.ex = 'Ex' : a.ex = '';
                            a.exp == true ? a.exp = 'EXP' : a.exp = '';
                            a.dm == true ? a.dm = 'DM' : a.dm = '';
                            a.ipr == true ? a.ipr = 'IPR' : a.ipr = '';
                            that.$refs.jzmb2.yacibottom[index - 1].titp1 = a.ex;
                            that.$refs.jzmb2.yacibottom[index - 1].titp2 = a.exp;
                            that.$refs.jzmb2.yacibottom[index - 1].titp3 = a.dm;
                            that.$refs.jzmb2.yacibottom[index - 1].titp4 = a.ipr;
                        } else {
                            // 上排牙齿
                            a.ex == true ? a.ex = 'Ex' : a.ex = '';
                            a.exp == true ? a.exp = 'EXP' : a.exp = '';
                            a.dm == true ? a.dm = 'DM' : a.dm = '';
                            a.ipr == true ? a.ipr = 'IPR' : a.ipr = '';
                            that.$refs.jzmb2.yacitop[a.teethIndex - 1].titp1 = a.ex;
                            that.$refs.jzmb2.yacitop[a.teethIndex - 1].titp2 = a.exp;
                            that.$refs.jzmb2.yacitop[a.teethIndex - 1].titp3 = a.dm;
                            that.$refs.jzmb2.yacitop[a.teethIndex - 1].titp4 = a.ipr;
                        }
                    })

                }).catch(err => {

                })
            },
            // 获取病例创建数据-第6步
            binglnewshuj6(id) {
                this.$http({
                    url: "/caseInfo/getStepSix",
                    method: "get",
                    params: {
                        caseId: id
                    }

                }).then(({
                    data
                }) => {
                    data = JSON.parse(data.data)
                    let that = this;
                    data.forEach(function (a, b) {
                        a.teethIndex = that.arr.indexOf(a.teethIndex) + 1;
                        if (a.teethIndex > 16) {
                            // 下排牙齿
                            let index = a.teethIndex - 16;
                            a.nm == true ? a.nm = 'NM' : a.nm = '';
                            a.na == true ? a.na = 'NA' : a.na = '';
                            a.m == true ? a.m = 'M' : a.m = '';
                            that.$refs.jzmb3.yacibottom[index - 1].titp3 = a.m;
                            that.$refs.jzmb3.yacibottom[index - 1].titp2 = a.na;
                            that.$refs.jzmb3.yacibottom[index - 1].titp1 = a.nm;
                        } else {
                            // 上排牙齿
                            a.nm == true ? a.nm = 'NM' : a.nm = '';
                            a.na == true ? a.na = 'NA' : a.na = '';
                            a.m == true ? a.m = 'M' : a.m = '';


                            that.$refs.jzmb3.yacitop[a.teethIndex - 1].titp3 = a.m;
                            that.$refs.jzmb3.yacitop[a.teethIndex - 1].titp2 = a.na;
                            that.$refs.jzmb3.yacitop[a.teethIndex - 1].titp1 = a.nm;
                        }
                    })

                }).catch(err => {

                })
            },
            // 获取病例创建数据-第7步
            binglnewshuj7(id) {
                this.$http({
                    url: "/caseInfo/getStepSeven",
                    method: "get",
                    params: {
                        caseId: id
                    }

                }).then(({
                    data
                }) => {
                    data = JSON.parse(data.data)
                    data = data[0];
                    // 回溯 中线上颌
                    if (data.fprescpUpperMiddle == 34) {
                        this.$refs.jzmb4.radio13 = data.fprescpUpperMiddle
                    } else if (data.fprescpUpperMiddle > 0) {
                        this.$refs.jzmb4.input11 = data.fprescpUpperMiddle
                    } else {
                        this.$refs.jzmb4.input12 = Math.abs(data.fprescpUpperMiddle)
                    }

                    // 回溯 中线下颌
                    if (data.fprescpLowerMiddle == 34) {
                        this.$refs.jzmb4.radio14 = data.fprescpLowerMiddle
                    } else if (data.fprescpLowerMiddle > 0) {
                        this.$refs.jzmb4.input13 = data.fprescpLowerMiddle
                    } else {
                        this.$refs.jzmb4.input14 = Math.abs(data.fprescpLowerMiddle)
                    }

                    // 回溯 牙列间隙
                    this.$refs.jzmb4.radio15 = data.nprescpSpacing
                    // 回溯 附加说明
                    this.$refs.jzmb4.form.fjsm = data.strPrescpInstruction

                }).catch(err => {

                })
            },
            // 获取病例创建数据-第8步
             binglnewshuj8(id) {
                this.$http({
                    url: "/caseInfo/getStepEight",
                    method: "get",
                    params: {
                        caseId: id
                    }
                }).then(async ({
                    data
                }) => {
                    let imgArrList  = JSON.parse(data.data);

                    for(const e of imgArrList){
                        let imgsrc =  this.constUrl + e.path;
                        const num = Number(e.fileNumber) - 1;
                        if(num ===  11) {
                            this.$refs.wenjupload.scwjadd = "N";
                            continue;
                        }
                        // 至少又一个文件上传成功
                        this.$refs.yakuangzhaop.wenj = true;
                        // 线上文件转base64;
                        const value = await sendFn(imgsrc);
                        this.$refs.yakuangzhaop.fileList[num] = {raw:value};
                        if(num  < 8){
                            this.$refs.yakuangzhaop.photographL[num].imageUrl = imgsrc;
                            this.$refs.yakuangzhaop.photographL[num].add = 'N';
                        }else {
                           let number = num - 8;
                            this.$refs.yakuangzhaop.photographR[number].imageUrl = imgsrc;
                            this.$refs.yakuangzhaop.photographR[number].add = 'N';
                        }
                    }

                }).catch(err => {
                    console.log(err);
                })
            },
            // 取消
            open() {
                if (this.$route.params.nameid) {
                    this.$confirm(this.quxiaobingli, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: 'myClass'
                    }).then(() => {
                        // this.$message({
                        // type: 'success',
                        // message: '删除成功!'
                        // });
                        this.$store.commit('indexAdd', ['病例详情', '/particulars']);
                        this.$router.push(this.$router.replace('/particulars'));
                    }).catch(() => {
                        // this.$message({
                        // type: 'info',
                        // message: '已取消删除'
                        // });
                    });
                } else {
                    this.$confirm(this.quxiaobingli, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        customClass: 'myClass'
                    }).then(() => {
                        // this.$message({
                        // type: 'success',
                        // message: '删除成功!'
                        // });
                        this.$router.replace('./index');
                    }).catch(() => {
                        // this.$message({
                        // type: 'info',
                        // message: '已取消删除'
                        // });
                    });
                }

            },
            // 病例详情
            opentwo() {
                this.$confirm(this.quxiaobingli, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.$message({
                    // type: 'success',
                    // message: '删除成功!'
                    // });
                    this.$store.commit('indexAdd', ['病例详情', '/particulars']);
                    this.$router.push(this.$router.replace('/particulars'));
                }).catch(() => {
                    // this.$message({
                    // type: 'info',
                    // message: '已取消删除'
                    // });
                });
            },
            // 病例管理
            openguanl() {
                this.$confirm(this.quxiaobingli, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.$message({
                    // type: 'success',
                    // message: '删除成功!'
                    // });
                    this.$router.replace('./index');
                }).catch(() => {
                    // this.$message({
                    // type: 'info',
                    // message: '已取消删除'
                    // });
                });
            },
            // 重启
            resebinglit() {
                return new Promise((resolve, reject) => {
                    this.$http({
                        url: "/caseInfo/restart",
                        method: "POST",
                        data: {
                            // 病例ID----修改时携带,重启时携带
                            caseId: this.$store.state.caseId
                        }

                    }).then(({
                        data
                    }) => {
                        data = JSON.parse(data.data)
                        this.$store.commit('abab1', data.caseId);
                        this.$store.commit('abab2', data.stageName);
                        this.$store.commit('abab3', data.stageCount);
                        resolve();
                    }).catch(err => {
                        console.log(err);
                        reject();
                    })
                })
            },
        },
    };
</script>

<style lang="less" scoped>
    // 兼容垃圾IE
    @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
        /deep/.title {
            padding-top: 20px !important;
            line-height: 10px;
            display: inline-block;
        }

        .topC {
            span {
                line-height: 6px !important;
            }

            i {
                margin-top: 10px;
            }
        }
    }

    /deep/#tab-two,
    /deep/#tab-three,
    /deep/#tab-four,
    /deep/#tab-five,
    /deep/#tab-six,
    /deep/#tab-seven,
    /deep/#tab-eight,
    /deep/#tab-nine,
    /deep/#tab-zero {
        pointer-events: none;
    }

    .blgl {
        background: #dfe0e2;

        /deep/.el-radio-button {
            box-shadow: none !important;
        }
    }

    /deep/.binglxq {
        margin-left: -20px !important;
    }

    .opacity {
        opacity: 0.5;
        pointer-events: none;
    }

    .title {
        font-size: 16px;
        cursor: pointer;
    }

    // /deep/.box {
    //     // height:682px;
    // }
    /deep/.box-nav {
        // padding-bottom:50px;
        box-sizing: border-box;
    }

    /deep/.el-tabs__header {
        margin-bottom: 0px;
        margin-top: 42px;
        margin-bottom: 14px;

        // height:96px;
        .el-tabs__nav-wrap {
            // line-height: 96px;
        }
    }

    /deep/.el-tabs--card>.el-tabs__header {
        border: none;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: none;
    }

    /deep/.el-tabs--card>.el-tabs__header .el-tabs__item {
        border: none;
        padding: 0px;
    }

    /deep/#tab-two {
        padding: 0px;
    }

    /deep/.el-tabs__content {
        background: #f9f9f9;
        width: 100%;
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
            background: none !important;
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
        border: none;
        font-size: 16px;
    }

    /deep/.el-icon-caret-right {
        font-size: 20px;
    }

    .sjxone {
        margin-top: 12px;
        float: right;
        display: block;
        margin-left: -14px;
        margin-right: 22px;
        color: rgba(17, 117, 219, 0.3);
    }

    .sjxtow {
        margin-left: 20px;
        margin-top: 12px;
        float: right;
        display: block;
        color: rgba(17, 117, 219, 0.3) // margin-left: -14px;
    }

    /deep/.is-top {
        color: #666666;
    }

    // tab 当前选中的颜色
    /deep/.is-active {
        color: #1175d2;

        i {
            color: #1175d2;
        }
    }

    /deep/.el-tabs__item:hover {
        color: #1175d2;

        i {
            color: #1175d2;
        }
    }

    @media screen and (max-width: 1600px) {
        /deep/.sjxone {
            margin-right: 15px !important;
        }

        /deep/.sjxtow {
            margin-left: 10px !important;
        }

    }

    @media screen and (max-width: 1300px) {
        /deep/.sjxone {
            margin-right: 5px !important;
        }

        /deep/.sjxtow {
            margin-left: 3px !important;
        }

    }
    @media screen and (min-height: 1100px) {
        .el-tab-pane {
                transform: scale(1.1);
    padding: 30px 0 0 37px;
    height: 800px;
        }
    }
</style>
<style lang="less">
    .myClass {
        width: 500px;

        .el-message-box__header {
            margin-top: 10px;
        }

        .el-message-box__content {
            margin-top: 20px;

            .el-message-box__message {
                color: #666666;
                font-size: 16px;
            }
        }

        .el-message-box__btns {
            margin-top: 10px;
            margin-bottom: 10px;

            .el-button {
                padding: 10px 30px;
            }
        }
    }
</style>