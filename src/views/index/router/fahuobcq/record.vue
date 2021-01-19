<template>
    <div class="fhjl">

        <div class="topbox">
            <div label="联系我们" name="second">
                <p class="titlebt">保持器发货记录<span class="titlespan">({{state}})</span></p>

                <div class="wenzitem clearfix" v-for="(item,i) in datashuzu" :key="i">

                    <div class="title">{{item.title}}</div>
                    <div class="boxtext">
                        <p class="neirtext4" v-for="itm in item.neirotext4" :key="itm.id">{{itm.retainer}}</p>
                        <div class="neirtext1" 
                        v-for="itm in item.neirotext3" 
                        :key="itm.id" 
                        style="overflow:hidden;height:32px;line-height:32px">
                            <p style="float: left;margin-right: 30px;color: #1175d2;" v-if="itm.id<=4?true:false">上颌</p>
                            <p style="float: left;margin-right: 30px;color: #1175d2;" v-if="itm.id>4?true:false">下颌</p>
                            <p class="fl">{{itm.explain}}</p>
                            <div v-show="itm.id===3?true:false" class="fl speci">
                                <span>上颌</span>
                                <el-input v-model="maxillary" :value="maxillary"></el-input>
                            </div>
                            <div v-show="itm.id===7?true:false" class="fl speci">
                                <span>下颌</span>
                                <el-input v-model="underjaw" :value="underjaw"></el-input>
                            </div>
                        </div>
                        <p class="neirtext1">{{item.neirotext1}}</p>
                        <p class="neirtext1">{{item.neirotext2}}</p>
                    </div>
                    <div class="typevalue">
                        {{item.type}}<p class="fr">{{item.typevalue}}</p>
                    </div>
                    <div class="number">
                        <div class="fl">{{item.num}}</div>
                        <p class="fl"> {{item.kjk}} <span>{{item.num1}}</span></p>
                        <p class="fl"> {{item.kjt}} <span>{{item.num2}}</span></p>
                    </div>
                    <!-- <div class="boxnav" v-if="item.baba">
                        <div class="list1 clearfix">
                            <div v-for="(item,i) in yacitop" :key="i" class="item">
                                <div :style="item.kuang" class="boximg">
                                    <img v-show="!item.alter" :src="item.imageUrl">
                                    <img v-show="item.alter" :src="item.imageUrlactive">
                                </div>
                                <div class="boxtext">
                                    {{item.shuzhi}}
                                </div>
                            </div>
                        </div>
                        <div class="zhoxian">
                            <span class="yacright">右</span>
                            <span class="yacleft">左</span>
                        </div>
                        <div class="list2 clearfix">
                            <div v-for="(item,i) in yacibottom" :key="i" class="item">
                                <div class="boxtext">
                                    {{item.shuzhi}}
                                </div>
                                <div :style="item.kuang" class="boximg">
                                    <img v-show="!item.alter" :src="item.imageUrl">
                                    <img v-show="item.alter" :src="item.imageUrlactive">
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="boxnav" v-if="item.baba">
                        <div class="list1 clearfix">
                            <div v-for="(item,i) in yacitop" :key="i" class="item">
                                <div :style="item.kuang" class="boximg">
                                    <img @click.stop="list1fun1.call(this,i)" v-show="!item.alter"
                                        :src="item.imageUrl" />
                                    <img @click.stop="list1fun1.call(this,i)" v-show="item.alter"
                                        :src="item.imageUrlactive" />
                                </div>
                                <div class="boxtext">{{item.shuzhi}}</div>
                            </div>
                        </div>
                        <div class="zhoxian">
                            <span class="yacright">右</span>
                            <span class="yacleft">左</span>
                        </div>
                        <div class="list2 clearfix">
                            <div v-for="(item,i) in yacibottom" :key="i" class="item">
                                <div class="boxtext">{{item.shuzhi}}</div>
                                <div :style="item.kuang" class="boximg">
                                    <img @click.stop="list2fun2.call(this,i)" v-show="!item.alter"
                                        :src="item.imageUrl" />
                                    <img @click.stop="list2fun2.call(this,i)" v-show="item.alter"
                                        :src="item.imageUrlactive" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-row>
            <el-button @click="fanhui" type="primary">返回</el-button>
        </el-row>

    </div>
</template>
<script>
    import {
        dateToStr
    } from '@/util/validate.js'
    export default {
        components: {},
        data() {
            return {
                arr: [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 43, 42, 41,
                    31, 32, 33, 34, 35, 36, 37, 38
                ],
                underjaw: '',
                maxillary: '',
                datashuzu: [{
                        title: '时间',
                        neirotext1: '',
                        type: '类型：',
                        typevalue: '',
                    },
                    {
                        title: '牙弓',
                        neirotext1: '双颌',
                        num: '数量：',
                        kjk: '上颌：',
                        kjt: '下颌：',
                        num1: '',
                        num2: '',
                    },
                    {
                        title: '设计说明',
                        neirotext3: '',
                    },
                    {
                        title: '特殊说明',
                        neirotext1: '在以下牙位上放置假牙空泡',
                        baba: true,
                    },
                    {
                        title: '固定舌侧保持器',
                        neirotext4: '无',
                    },
                    {
                        title: '收货地址',
                        neirotext1: '上海市闵兴区申虹路958号富力中心C栋6楼 张女士 19756421876',
                    }
                ],
                state: '',
                yacitop: [{
                        kuang: "width:33px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/18.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/18-.png"),
                        shuzhi: 18,
                        alter: false
                    },
                    {
                        kuang: "width:36px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/17.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/17-.png"),
                        shuzhi: 17,
                        alter: false
                    },
                    {
                        kuang: "width:45px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/16.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/16-.png"),
                        shuzhi: 16,
                        alter: false
                    },
                    {
                        kuang: "width:24px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/15.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/15-.png"),
                        shuzhi: 15,
                        alter: false
                    },
                    {
                        kuang: "width:25px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/14.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/14-.png"),
                        shuzhi: 14,
                        alter: false
                    },
                    {
                        kuang: "width:33px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/13.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/13-.png"),
                        shuzhi: 13,
                        alter: false
                    },
                    {
                        kuang: "width:22px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/12.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/12-.png"),
                        shuzhi: 12,
                        alter: false
                    },
                    {
                        kuang: "width:32px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/11.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/11-.png"),
                        shuzhi: 11,
                        alter: false
                    },
                    {
                        kuang: "width:33px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/21.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/21-.png"),
                        shuzhi: 21,
                        alter: false
                    },
                    {
                        kuang: "width:23px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/22.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/22-.png"),
                        shuzhi: 22,
                        alter: false
                    },
                    {
                        kuang: "width:34px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/23.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/23-.png"),
                        shuzhi: 23,
                        alter: false
                    },
                    {
                        kuang: "width:24px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/24.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/24-.png"),
                        shuzhi: 24,
                        alter: false
                    },
                    {
                        kuang: "width:25px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/25.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/25-.png"),
                        shuzhi: 25,
                        alter: false
                    },
                    {
                        kuang: "width:45px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/26.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/26-.png"),
                        shuzhi: 26,
                        alter: false
                    },
                    {
                        kuang: "width:38px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/27.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/27-.png"),
                        shuzhi: 27,
                        alter: false
                    },
                    {
                        kuang: "width:34px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/28.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/28-.png"),
                        shuzhi: 28,
                        alter: false
                    }
                ],
                yacibottom: [{
                        kuang: "width:41px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/48.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/48-.png"),
                        shuzhi: 48,
                        alter: false
                    },
                    {
                        kuang: "width:40px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/47.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/47-.png"),
                        shuzhi: 47,
                        alter: false
                    },
                    {
                        kuang: "width:45px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/46.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/46-.png"),
                        shuzhi: 46,
                        alter: false
                    },
                    {
                        kuang: "width:29px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/45.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/45-.png"),
                        shuzhi: 45,
                        alter: false
                    },
                    {
                        kuang: "width:28px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/44.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/44-.png"),
                        shuzhi: 44,
                        alter: false
                    },
                    {
                        kuang: "width:30px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/43.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/43-.png"),
                        shuzhi: 43,
                        alter: false
                    },
                    {
                        kuang: "width:22px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/42.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/42-.png"),
                        shuzhi: 42,
                        alter: false
                    },
                    {
                        kuang: "width:21px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/41.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/41-.png"),
                        shuzhi: 41,
                        alter: false
                    },
                    {
                        kuang: "width:23px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/31.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/31-.png"),
                        shuzhi: 31,
                        alter: false
                    },
                    {
                        kuang: "width:23px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/32.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/32-.png"),
                        shuzhi: 32,
                        alter: false
                    },
                    {
                        kuang: "width:31px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/33.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/33-.png"),
                        shuzhi: 33,
                        alter: false
                    },
                    {
                        kuang: "width:28px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/34.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/34-.png"),
                        shuzhi: 34,
                        alter: false
                    },
                    {
                        kuang: "width:31px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/35.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/35-.png"),
                        shuzhi: 35,
                        alter: false
                    },
                    {
                        kuang: "width:46px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/36.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/36-.png"),
                        shuzhi: 36,
                        alter: false
                    },
                    {
                        kuang: "width:40px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/37.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/37-.png"),
                        shuzhi: 37,
                        alter: false
                    },
                    {
                        kuang: "width:39px",
                        imageUrl: require("@/assets/3新建病例/保持器牙列切图/默认/38.png"),
                        imageUrlactive: require("@/assets/3新建病例/保持器牙列切图/选中/38-.png"),
                        shuzhi: 38,
                        alter: false
                    }
                ],
            };
        },
        created() {
            this.mobanDetail();
        },
        methods: {
            fanhui() {
                this.$router.push('./index');
                this.$store.commit('indexRemove', 3);
            },
            // 保持器模板详情接口
            mobanDetail() {
                this.$http({
                    url: "/zhengLiRetainer/zhengLiDetails",
                    method: "get",
                    params: {
                        id: this.$route.params.id
                    }
                }).then(({
                    data
                }) => {
                    if (data.code == 200) {
                        console.log(JSON.parse(data.data))
                        var kk = JSON.parse(data.data)
                        switch (kk.state) {
                            case 0:
                                this.state = '审批中';
                                break;
                            case 1:
                                this.state = '已批准'
                                break;
                            case 2:
                                this.state = '未批准';
                                break;
                            case 3:
                                this.state = '生产中'
                                break
                            case 4:
                                this.state = '已完成'
                                break;
                            case 5:
                                this.state = '订单取消'
                            break;
                            default:
                                return ''
                        };
                        // 根据类型
                        switch (kk.type) {
                            case 1:
                                this.datashuzu[0].typevalue = '术前保持器'
                                break;
                            case 2:
                                this.datashuzu[0].typevalue = '术中保持器'
                                break;
                            case 3:
                                this.datashuzu[0].typevalue = '术后保持器'
                                break
                            default:
                                this.datashuzu[0].typevalue = ''

                        };
                        switch (kk.dentalArch) {
                            case 1:
                                this.datashuzu[1].neirotext1 = '双颌';
                                this.datashuzu[1].num1 = kk.upArchCount;
                                this.datashuzu[1].num2 = kk.downArchCount;
                                break;
                            case 2:
                                this.datashuzu[1].neirotext1 = '上颌';
                                this.datashuzu[1].num1 = kk.upArchCount;
                                this.datashuzu[1].kjt = '';
                                break;
                            case 3:
                                this.datashuzu[1].neirotext1 = '下颌';
                                this.datashuzu[1].num2 = kk.downArchCount;
                                this.datashuzu[1].kjk = '';
                                break;
                            default:
                                this.datashuzu[1].neirotext1 = '';
                                this.datashuzu[2].neirotext1 = '';
                                break;
                        };
                        this.maxillary=kk.upSteps;
                        this.underjaw=kk.downSteps;
                        this.datashuzu[0].neirotext1 = dateToStr(new Date(kk.time));
                        this.datashuzu[2].neirotext3 = kk.zhengLiDesigns
                        if (kk.specialDescription === 1) {
                            this.datashuzu[3].neirotext1 = '无';
                        } else if (kk.specialDescription === 2) {
                            this.datashuzu[3].neirotext1 = '在以下牙位上放置假牙空泡';
                        } else {
                            this.datashuzu[3].neirotext1 = '';
                        }
                        // this.datashuzu[1].neirotext1=`第${kk.lowerStart}步———第${kk.lowerEnd}步`
                        // this.datashuzu[2].neirotext1=kk.remark;
                        this.datashuzu[4].neirotext4 = kk.fixedRetainers;
                        // fixedRetainers
                        if (kk.address.indexOf('n') !== -1) {
                            this.datashuzu[5].neirotext1 = '';
                        } else {
                            this.datashuzu[5].neirotext1 = kk.address + ' - ' + kk.deliveryName + ' - ' + kk.contactNumber;
                        }
                        let that = this;

                        kk.zhengLiBridges.forEach(function (a, b) {
                            let num = that.arr.indexOf(a.teethIndex)
                            if (num >= 16) {
                            console.log(num);

                                that.yacibottom[num-16].alter = true;
                            } else {
                            console.log(num);

                                that.yacitop[num].alter = true;
                            }
                        })


                    }
                }).catch(err => {
                    console.log(err);
                });
            },


            // 第一个牙齿
            list1fun1(i) {
                this.yacitop[i].alter = !this.yacitop[i].alter
            },
            list2fun2(i) {
                this.yacibottom[i].alter = !this.yacibottom[i].alter
            },
        }
    }
</script>
<style scoped lang="less">
    .el-row {
        margin-top: 20px;
        margin-bottom: 20px;

        .el-button {
            widows: 140px;
            height: 40px;
            background: none !important;
            color: black;
        }
    }

    // 新加样式 下面两个
    .typevalue {
        position: absolute;
        left: 350px;
        font-weight: 600;
        color: #333;

        p {
            margin-left: 25px;
            font-weight: normal;
            color: #666666;
        }
    }

    .number {
        position: absolute;
        left: 350px;

        div {
            font-weight: 600;
            margin-right: 25px;
            color: #333;
        }

        p {
            color: #666666;
            margin-right: 35px;
        }
    }

    /deep/.boxnav {
        width: 601px;
        font-size: 20px;
        position: relative;
        left: 11%;
        pointer-events: none;

        .list1 {
            display: inline-block;
            margin-left: 5px;

            .item {
                // width:60px;
                height: 1px;
                position: relative;
                float: left;
                margin-right: 5px;

                .boximg {
                    // width:100%;
                    height: 100%;
                    position: relative;

                    img {
                        display: block;
                        position: absolute;
                        bottom: 0px;
                    }
                }

                .boxtext {
                    font-size: 12px;
                    font-weight: 400;
                    text-align: center;
                }
            }
        }

        .zhoxian::before {
            content: "";
            width: 1px;
            height: 50px;
            background: #333333;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .zhoxian {
            position: relative;
            width: 574px;
            height: 2px;
            background: #333333;
            margin-left: 7px;
            margin-top: 15px;
            margin-bottom: 5px;

            .yacright {
                position: absolute;
                left: -35px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 14px;
            }

            .yacleft {
                position: absolute;
                right: -35px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 14px;
            }
        }

        .list2 {
            display: inline-block;
            // margin-left: 140px;

            .item {
                // width:60px;
                height: 100px;
                position: relative;
                float: left;
                margin-right: 5px;

                .boximg {
                    // width:100%;
                    height: 100%;
                    position: relative;

                    img {
                        display: block;
                        position: absolute;
                        top: 0px;
                    }
                }

                .boxtext {
                    font-size: 12px;
                    font-weight: 400;
                    text-align: center;
                }
            }
        }
    }


    .fhjl {
        width: 100%;
        height: 100%;
        .topbox {
            pointer-events: none;
            padding-left: 95px;
            padding-bottom: 30px;
            box-sizing: border-box;
            width: 100%;
            // height: 585px;
            background: #f9f9f9;
        }
    }

    /deep/.titlebt {
        padding-top: 50px;
        margin-bottom: 65px;
        color: #1175d2;
        font-size: 16px;
        font-weight: 600;

        span {
            padding-left: 20px;
            color: #f99400;
        }
    }

    .wenzitem {
        position: relative;
    }

    .wenzitem>div {

        margin-bottom: 15px;
        float: left;
    }

    /deep/.boxtext {
        width: 80%;
        font-weight: 400;
        color: #666;
    }

    /deep/.neirtext1 {
        padding-bottom: 20px;

        .speci {
            margin-left:20px;
            span {
                float: left;
                margin-right:10px;
            }
            .el-input {
                width: auto;
                .el-input__inner {
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid #1175d2;
                    box-sizing: border-box;
                    text-align: center;
                }
            }

        }
    }

    /deep/.neirtext1,
    .neirtext2 {
        color: #666666;
    }

    /deep/.title {
        width: 150px;
        color: #333333;
        font-weight: 600;
    }

    /deep/.el-button {
        padding: 0px;
        width: 140px;
        height: 36px;
    }
</style>