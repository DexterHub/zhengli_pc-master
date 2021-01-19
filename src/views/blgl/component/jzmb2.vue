<template>
<div class="jzyq clearfix" >
    <div class="boxleft" @click.self="diantangcxiaos">
        <p class="jiestit">间隙获得 请在相应的牙位处填写相应的标记</p>
        <el-button type="text"><span class="ywen">Ex</span><span class="zhowen">拔牙</span></el-button>
        <el-button type="text"><span class="ywen">EXP</span><span class="zhowen">扩弓</span></el-button>
        <el-button type="text"><span class="ywen">DM</span><span class="zhowen">远移磨牙</span></el-button>
        <el-button type="text"><span class="ywen">IPR</span><span class="zhowen">可邻面去釉牙齿</span></el-button>
    </div>
    <div class="boxright" @click.self="diantangcxiaos">
        <div class="boxnav">

            <div class="list1 clearfix">
                <div v-for="(item,i) in yacitop" :key="i" class="item">
                    <div :style="item.kuang" class="boximg">
                        <div :style="item.gao" class="boximghez">
                            <div class="boxheznav">
                                <p class="p1">{{item.titp1}}</p>
                                <p class="p2">{{item.titp2}}</p>
                                <p class="p3">{{item.titp3}}</p>
                                <p class="p4">{{item.titp4}}</p>
                            </div>
                            <jiaozhiyacclick @yachishijtop="yachishijtop" :ref="'yactop'+i" v-show="item.zujkozhi" class="clickzujiantop"></jiaozhiyacclick>
                            <img @click.stop="list1fun.call(this,i)" v-show="!item.alter" :src="item.imageUrl">
                            <img @click.stop="list1fun.call(this,i)" v-show="item.alter" :src="item.imageUrlactive">
                        </div>
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
                        <div :style="item.gao" class="boximghez">
                            <div class="boxheznav">
                                <p class="p1">{{item.titp1}}</p>
                                <p class="p2">{{item.titp2}}</p>
                                <p class="p3">{{item.titp3}}</p>
                                <p class="p4">{{item.titp4}}</p>
                            </div>
                            <jiaozhiyacclick @yachishijbottom="yachishijbottom" :ref="'yacbottom'+i" v-show="item.zujkozhi" class="clickzujianbottom"></jiaozhiyacclick>
                            <img @click.stop="list2fun.call(this,i)" v-show="!item.alter" :src="item.imageUrl">
                            <img @click.stop="list2fun.call(this,i)" v-show="item.alter" :src="item.imageUrlactive">
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import jiaozhiyacclick from '@/views/newtangc/jiaozhiyacclick'
export default {
    components: {
        jiaozhiyacclick,
    },
    data() {
        return {
            yctopsho: true,
            yacitop: [{
                    kuang: 'width:60px',
                    gao: 'height:46px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/18.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/18-.png'),
                    shuzhi: 18,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',

                },
                {
                    kuang: 'width:65px',
                    gao: 'height:51px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/17.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/17-.png'),
                    shuzhi: 17,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:80px',
                    gao: 'height:53px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/16.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/16-.png'),
                    shuzhi: 16,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:42px',
                    gao: 'height:56px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/15.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/15-.png'),
                    shuzhi: 15,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:42px',
                    gao: 'height:61px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/14.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/14-.png'),
                    shuzhi: 14,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:58px',
                    gao: 'height:81px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/13.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/13-.png'),
                    shuzhi: 13,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:40px',
                    gao: 'height:66px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/12.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/12-.png'),
                    shuzhi: 12,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:58px',
                    gao: 'height:80px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/11.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/11-.png'),
                    shuzhi: 11,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:58px',
                    gao: 'height:78px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/21.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/21-.png'),
                    shuzhi: 21,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:40px',
                    gao: 'height:65px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/22.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/22-.png'),
                    shuzhi: 22,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:61px',
                    gao: 'height:81px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/23.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/23-.png'),
                    shuzhi: 23,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:43px',
                    gao: 'height:63px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/24.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/24-.png'),
                    shuzhi: 24,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:44px',
                    gao: 'height:55px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/25.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/25-.png'),
                    shuzhi: 25,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:80px',
                    gao: 'height:53px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/26.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/26-.png'),
                    shuzhi: 26,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:67px',
                    gao: 'height:50px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/27.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/27-.png'),
                    shuzhi: 27,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:60px',
                    gao: 'height:46px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/28.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/28-.png'),
                    shuzhi: 28,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
            ],
            yacibottom: [{
                    kuang: 'width:73px',
                    gao: 'height:57px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/48.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/48-.png'),
                    shuzhi: 48,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',

                },
                {
                    kuang: 'width:70px',
                    gao: 'height:60px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/47.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/47-.png'),
                    shuzhi: 47,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',

                },
                {
                    kuang: 'width:80px',
                    gao: 'height:58px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/46.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/46-.png'),
                    shuzhi: 46,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',

                },
                {
                    kuang: 'width:51px',
                    gao: 'height:62px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/45.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/45-.png'),
                    shuzhi: 45,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',

                },
                {
                    kuang: 'width:49px',
                    gao: 'height:62px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/44.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/44-.png'),
                    shuzhi: 44,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:52px',
                    gao: 'height:78px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/43.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/43-.png'),
                    shuzhi: 43,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:39px',
                    gao: 'height:62px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/42.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/42-.png'),
                    shuzhi: 42,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:38px',
                    gao: 'height:59px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/41.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/41-.png'),
                    shuzhi: 41,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:41px',
                    gao: 'height:59px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/31.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/31-.png'),
                    shuzhi: 31,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:40px',
                    gao: 'height:61px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/32.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/32-.png'),
                    shuzhi: 32,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:55px',
                    gao: 'height:77px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/33.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/33-.png'),
                    shuzhi: 33,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:50px',
                    gao: 'height:62px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/34.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/34-.png'),
                    shuzhi: 34,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:53px',
                    gao: 'height:62px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/35.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/35-.png'),
                    shuzhi: 35,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:80px',
                    gao: 'height:59px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/36.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/36-.png'),
                    shuzhi: 36,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:70px',
                    gao: 'height:59px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/37.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/37-.png'),
                    shuzhi: 37,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
                {
                    kuang: 'width:69px',
                    gao: 'height:56px',
                    imageUrl: require('@/assets/3新建病例/矫治要求-牙位/38.png'),
                    imageUrlactive: require('@/assets/3新建病例/矫治要求-牙位/38-.png'),
                    shuzhi: 38,
                    alter: false,
                    zujkozhi: false,
                    titp1: '',
                    titp2: '',
                    titp3: '',
                    titp4: '',
                },
            ],
            shuzhiitop: '',
            shuzhiibottom: '',
            // 上传接口的 值
            yachishuzu: []

        };
    },
    created() {
    },
    mounted() {
          
    },
    methods: {
        list1fun(i) {
            if (this.yacitop[i].zujkozhi == true) {
                this.yacitop[i].zujkozhi = false;
            } else {
                // 关闭 其他 所以复选框 
                this.yacitop.forEach(function (a, b) {
                    a.zujkozhi = false;
                    a.alter = false;
                })
                this.yacibottom.forEach(function (a, b) {
                    a.zujkozhi = false;
                    a.alter = false;
                })
                this.shuzhiitop = i;
                this.yacitop[i].zujkozhi = true;
            }
            // 点击 图片更换
            this.yacitop[i].alter = !this.yacitop[i].alter;
            let baba = this.yacitop[this.shuzhiitop];
            if(baba.titp1 == 'Ex'){
                this.$refs['yactop' +  this.shuzhiitop][0].fanfa(baba.titp1)
            }
            if(baba.titp2 == 'EXP'){
                this.$refs['yactop' +  this.shuzhiitop][0].fanfa(baba.titp2)
            }
            if(baba.titp3 == 'DM'){
                this.$refs['yactop' +  this.shuzhiitop][0].fanfa(baba.titp3)
            }
            if(baba.titp4 == 'IPR'){
                this.$refs['yactop' +  this.shuzhiitop][0].fanfa(baba.titp4)
            }
            // let that = this;
            // this.yacitop.forEach(function(a,b){

            //     if(a.titp1 == 'Ex'){
            //         that.$refs['yactop' +  that.shuzhiitop][0].fanfa(a.titp1)
            //     }
            //     if(a.titp2 == 'EXP'){
            //         that.$refs['yactop' +  that.shuzhiitop][0].fanfa(a.titp2)
            //     }
            //     if(a.titp3 == 'DM'){
            //         that.$refs['yactop' +  that.shuzhiitop][0].fanfa(a.titp3)
            //     }
            //     if(a.titp4 == 'IPR'){
            //         that.$refs['yactop' +  that.shuzhiitop][0].fanfa(a.titp4)
            //     }
                
            // })

            
        },
        yachishijtop() {
            // if (this.$refs['yactop' + this.shuzhiitop][0].checkList[0]) {
            //     this.yacitop[this.shuzhiitop].titp1 = this.$refs['yactop' + this.shuzhiitop][0].checkList[0]
            // } else {
            //     this.yacitop[this.shuzhiitop].titp1 = ''
            // }

            // if (this.$refs['yactop' + this.shuzhiitop][0].checkList[1]) {
            //     this.yacitop[this.shuzhiitop].titp2 = this.$refs['yactop' + this.shuzhiitop][0].checkList[1]
            // } else {
            //     this.yacitop[this.shuzhiitop].titp2 = ''
            // }

            // if (this.$refs['yactop' + this.shuzhiitop][0].checkList[2]) {
            //     this.yacitop[this.shuzhiitop].titp3 = this.$refs['yactop' + this.shuzhiitop][0].checkList[2]
            // } else {
            //     this.yacitop[this.shuzhiitop].titp3 = ''
            // }

            // if (this.$refs['yactop' + this.shuzhiitop][0].checkList[3]) {
            //     this.yacitop[this.shuzhiitop].titp4 = this.$refs['yactop' + this.shuzhiitop][0].checkList[3]
            // } else {
            //     this.yacitop[this.shuzhiitop].titp4 = ''
            // }
            let that = this;
            // let q,w,e,r;
            // this.$refs['yactop' + this.shuzhiitop][0].checkList.forEach(function(a,b){
            //         q = a == 'Ex'?'Ex' : '',
            //         w = a == 'EXP'?'EXP' : '',
            //         e = a == 'DM'?'DM' : '',
            //         r = a == 'IPR'?'IPR' : '',
            //     that.yachishuzu.push({
            //         Ex : q,
            //         EXP : w,
            //         DM : e,
            //         IPR : r
            //     })
            // })
            // this.yacitop.forEach(function(a,b){
            // })
            // for


            that.yacitop[that.shuzhiitop].titp1 = ''
            that.yacitop[that.shuzhiitop].titp2 = ''
            that.yacitop[that.shuzhiitop].titp3 = ''
            that.yacitop[that.shuzhiitop].titp4 = ''
            this.$refs['yactop' + this.shuzhiitop][0].checkList.forEach(function(a,b){
                if(a == 'Ex'){
                    that.yacitop[that.shuzhiitop].titp1 = a
                }else if(a == 'EXP'){
                    that.yacitop[that.shuzhiitop].titp2 = a
                    
                }else if(a == 'DM'){
                    that.yacitop[that.shuzhiitop].titp3 = a
                    
                }else if(a == 'IPR'){
                    that.yacitop[that.shuzhiitop].titp4 = a
                    
                }
            })
       
        },
        list2fun(i) {
            if (this.yacibottom[i].zujkozhi == true) {
                this.yacibottom[i].zujkozhi = false
            } else {
                // 关闭 其他 所以复选框 
                this.yacitop.forEach(function (a, b) {
                    a.zujkozhi = false;
                    a.alter = false;
                })
                this.yacibottom.forEach(function (a, b) {
                    a.zujkozhi = false;
                    a.alter = false;
                })
                this.shuzhiibottom = i;
                this.yacibottom[i].zujkozhi = true;
            }
            // 点击 图片更换
            this.yacibottom[i].alter = !this.yacibottom[i].alter

            let baba = this.yacibottom[this.shuzhiibottom]
            if(baba.titp1 == 'Ex'){
                this.$refs['yacbottom' +  this.shuzhiibottom][0].fanfa(baba.titp1)
            }
            if(baba.titp2 == 'EXP'){
                this.$refs['yacbottom' +  this.shuzhiibottom][0].fanfa(baba.titp2)
            }
            if(baba.titp3 == 'DM'){
                this.$refs['yacbottom' +  this.shuzhiibottom][0].fanfa(baba.titp3)
            }
            if(baba.titp4 == 'IPR'){
                this.$refs['yacbottom' +  this.shuzhiibottom][0].fanfa(baba.titp4)
            }
        },
        yachishijbottom() {
            // if (this.$refs['yacbottom' + this.shuzhiibottom][0].checkList[0]) {
            //     this.yacibottom[this.shuzhiibottom].titp1 = this.$refs['yacbottom' + this.shuzhiibottom][0].checkList[0]
            // } else {
            //     this.yacibottom[this.shuzhiibottom].titp1 = ''
            // }

            // if (this.$refs['yacbottom' + this.shuzhiibottom][0].checkList[1]) {
            //     this.yacibottom[this.shuzhiibottom].titp2 = this.$refs['yacbottom' + this.shuzhiibottom][0].checkList[1]
            // } else {
            //     this.yacibottom[this.shuzhiibottom].titp2 = ''
            // }

            // if (this.$refs['yacbottom' + this.shuzhiibottom][0].checkList[2]) {
            //     this.yacibottom[this.shuzhiibottom].titp3 = this.$refs['yacbottom' + this.shuzhiibottom][0].checkList[2]
            // } else {
            //     this.yacibottom[this.shuzhiibottom].titp3 = ''
            // }

            // if (this.$refs['yacbottom' + this.shuzhiibottom][0].checkList[3]) {
            //     this.yacibottom[this.shuzhiibottom].titp4 = this.$refs['yacbottom' + this.shuzhiibottom][0].checkList[3]
            // } else {
            //     this.yacibottom[this.shuzhiibottom].titp4 = ''
            // }
            let that = this;
            that.yacibottom[that.shuzhiibottom].titp1 = ''
            that.yacibottom[that.shuzhiibottom].titp2 = ''
            that.yacibottom[that.shuzhiibottom].titp3 = ''
            that.yacibottom[that.shuzhiibottom].titp4 = ''
            this.$refs['yacbottom' + this.shuzhiibottom][0].checkList.forEach(function(a,b){
                if(a == 'Ex'){
                    that.yacibottom[that.shuzhiibottom].titp1 = a
                }else if(a == 'EXP'){
                    that.yacibottom[that.shuzhiibottom].titp2 = a
                    
                }else if(a == 'DM'){
                    that.yacibottom[that.shuzhiibottom].titp3 = a
                    
                }else if(a == 'IPR'){
                    that.yacibottom[that.shuzhiibottom].titp4 = a
                    
                }
            })
        },

        diantangcxiaos() {
            
            // 关闭 其他 所以复选框  与 图片 更换蓝色 
            this.yacitop.forEach(function(a,b){
                a.zujkozhi = false;
                a.alter = false;
            })
            this.yacibottom.forEach(function(a,b){
                a.zujkozhi = false;
                a.alter = false;
            })
        },
        // 循环 数据 变成可以传给后台的 数据格式

    }
}
</script>

<style lang="less" scoped>
  @media all and (-ms-high-contrast: none),
    (-ms-high-contrast: active) {
        /deep/.yaciclickBox .el-checkbox-group {
            margin-top: -5px !important;
        }
    }
.jzyq {
    height: 682px;
}

// .clickzujiantop{
//     position: absolute;
//     bottom:0px;
//     left:50%;
// }
/deep/.boxleft {
    width: 25%;
    height: 100%;
    float: left;
    // background: pink;
    padding-left: 80px;
    box-sizing: border-box;

    .jiestit {
        white-space: nowrap;
        letter-spacing: 2px;
        margin-top: 35px;
        color: #1175d2;
        font-size: 16px;
        font-weight: 400;
    }

    .el-button:nth-of-type(1) {
        margin-top: 18px;
    }

    .el-button {
        display: block;
        text-align: left;
        margin-left: 0px;
        margin-bottom: 10px;
        width: auto;

        .ywen {
            color: #ff0000;
            font-weight: 400;
            font-size: 18px;
            width: 60px;
            display: inline-block;
        }

        .zhowen {
            text-align: right;
            color: #333333;
            font-size: 18px;
        }
    }
}

/deep/.boxright {
    width: 75%;
    height: 100%;
    float: left;
    // background: #1175d2;

    .boxnav {
        width: 1200px;
        margin-top: 300px;
        margin-left: -260px;

        .list1 {
            display: inline-block;
            margin-left: 148px;

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
                        //    display: block;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        cursor: pointer;
                    }
                }

                .boximghez {
                    width: 100%;
                    display: block;
                    position: absolute;
                    bottom: 0px;

                    .boxheznav {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        pointer-events: none;
                    }

                    .clickzujiantop {
                        position: absolute;
                        left: 50%;
                        bottom: 110px;
                        margin-left: -320px;
                    }

                    .p1 {
                        pointer-events: none;
                        width: 100%;
                        text-align: center;
                        font-size: 12px;
                        line-height: 15px;
                        color: #ff0000;
                    }

                    .p2 {
                        pointer-events: none;
                        width: 100%;
                        text-align: center;
                        font-size: 12px;
                        line-height: 15px;
                        color: #ff0000;
                    }

                    .p3 {
                        pointer-events: none;
                        width: 100%;
                        text-align: center;
                        font-size: 12px;
                        line-height: 15px;
                        color: #ff0000;
                    }

                    .p4 {
                        pointer-events: none;
                        width: 100%;
                        text-align: center;
                        font-size: 12px;
                        line-height: 15px;
                        color: #ff0000;
                    }
                }

                .boxtext {
                    text-align: center;
                }
            }
        }

        .zhoxian::before {
            content: "";
            width: 2px;
            height: 75px;
            background: #aeaeae;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .zhoxian {
            position: relative;
            width: 80%;
            height: 2px;
            background: #aeaeae;

            // margin:0 auto;
            margin-left: 150px;
            margin-top: 41px;
            margin-bottom: 20px;

            .yacright {
                position: absolute;
                left: -35px;
                top: 50%;
                transform: translateY(-50%);
            }

            .yacleft {
                position: absolute;
                right: -35px;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .list2 {
            display: inline-block;
            margin-left: 140px;

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
                        position: absolute;
                        left: 0;
                        top: 0;
                        cursor: pointer;
                    }
                }

                .boximghez {
                    width: 100%;
                    display: block;
                    position: absolute;
                    top: 0px;

                    .boxheznav {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        pointer-events: none;
                    }

                    .clickzujianbottom {
                        position: absolute;
                        left: 50%;
                        top: 110px;
                        margin-left: -320px;
                    }

                    .p1 {
                        pointer-events: none;
                        width: 100%;
                        text-align: center;
                        font-size: 12px;
                        line-height: 15px;
                        color: #ff0000;
                    }

                    .p2 {
                        pointer-events: none;
                        width: 100%;
                        text-align: center;
                        font-size: 12px;
                        line-height: 15px;
                        color: #ff0000;
                    }

                    .p3 {
                        pointer-events: none;
                        width: 100%;
                        text-align: center;
                        font-size: 12px;
                        line-height: 15px;
                        color: #ff0000;
                    }

                    .p4 {
                        pointer-events: none;
                        width: 100%;
                        text-align: center;
                        font-size: 12px;
                        line-height: 15px;
                        color: #ff0000;
                    }
                }

                .boxtext {
                    text-align: center;
                }
            }
        }
    }
}

@media screen and (max-width: 1660px) {
    /deep/.boxnav {
        transform: scale(0.8);
        margin-left: -310px !important;
    }
}

@media screen and (max-width: 1300px) {
    /deep/.boxnav {
        transform: scale(0.7);
        margin-left: -310px !important;
    }
}
@media screen and (max-width: 1350px) {
    /deep/.boxright .boxnav .list1 .item .boximghez .clickzujiantop{
        width: 585px;
        .el-checkbox-group {
            margin-left: -290px;
        }
    }
    /deep/.boxright .boxnav .list2 .item .boximghez .clickzujianbottom{
        width: 585px;
        .el-checkbox-group {
            margin-left: -290px;
        }
    }
}
@media screen and (max-width: 1180px) {
     /deep/.boxright .boxnav .list1 .item .boximghez .clickzujiantop{
        width: 455px;
        .el-checkbox-group {
            margin-left: -240px;
        }
    }
    /deep/.boxright .boxnav .list2 .item .boximghez .clickzujianbottom{
        width: 455px;
        .el-checkbox-group {
            margin-left: -240px;
        }
    }
}
</style>
