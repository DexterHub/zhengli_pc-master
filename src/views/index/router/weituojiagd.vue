<template>
    <div class="weituojiagd">


        <div class="boxTop">
            <p class="fortit">诊断</p>
            <el-form class="clearfix" ref="formone" label-width="80px">
                <div class="jiaozy clearfix">
                    <div class="jiaoleft">
                        <el-form-item class="danxuanfl textleft" label="磨牙关系">
                            <div>
                                <el-form-item class="danxuanfl moyabottom" label="左侧">
                                    <div>
                                        <el-radio-group fill="#1175d2" class="asflei" v-model="radio1">
                                            <el-radio-button label="1">|类</el-radio-button>
                                            <el-radio-button label="2">||类</el-radio-button>
                                            <el-radio-button label="3">|||类</el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item class="danxuanfl" label="右侧">
                                    <div>
                                        <el-radio-group fill="#1175d2" class="asflei" v-model="radio2">
                                            <el-radio-button label="1">|类</el-radio-button>
                                            <el-radio-button label="2">||类</el-radio-button>
                                            <el-radio-button label="3">|||类</el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="jiaoleft">
                        <el-form-item class="danxuanfl textleft" label="尖牙关系">
                            <div>
                                <el-form-item class="danxuanfl moyabottom" label="左侧">
                                    <div>
                                        <el-radio-group fill="#1175d2" class="asflei" v-model="radio3">
                                            <el-radio-button label="1">中性</el-radio-button>
                                            <el-radio-button label="2">近中</el-radio-button>
                                            <el-radio-button label="3">远中</el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item class="danxuanfl" label="右侧">
                                    <div>
                                        <el-radio-group fill="#1175d2" class="asflei" v-model="radio4">
                                            <el-radio-button label="1">中性</el-radio-button>
                                            <el-radio-button label="2">近中</el-radio-button>
                                            <el-radio-button label="3">远中</el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item style="margin-bottom:50px;" class="cuoelx duoxuanfl marginright textleft" label="病例分类">
                    <div>
                        <el-checkbox-group fill="#1175d2" v-model="checkboxGroup1">
                            <el-checkbox-button v-for="(city,i) in cities" :label="Math.pow(2,i+1)" :key="i">{{city}}
                            </el-checkbox-button>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        <div class="boxCenter">
            <p class="fortit">矫治目标</p>
            <el-form ref="formone" label-width="80px">
                <el-form-item class="marginright moyabottom textleft" label="矫治牙列">
                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio5">
                        <el-radio-button label="1">上颌</el-radio-button>
                        <el-radio-button label="2">下颌</el-radio-button>
                        <el-radio-button label="3">全颌</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="marginright moyabottom textleft" label="覆𬌗">
                    <el-radio-group fill="#1175d2" class="jiaozhilefbut clearfix" v-model="radio6" @change="fuheaio">
                        <el-radio-button label="1">保持</el-radio-button>
                        <el-radio-button label="2">改善</el-radio-button>

                    </el-radio-group>
                    <el-form-item class="jiaozhifuhipt clearfix" style="margin-left:0" >
                        <div>
                            <el-radio-group fill="#1175d2" class="asflei">
                                <el-input @input="fuheipt" v-model="input1"></el-input>
                            </el-radio-group>
                            <span class="mm">mm</span>
                        </div>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="覆盖" class="borderbottom marginright moyabottom textleft">
                    <el-radio-group fill="#1175d2" class="jiaozhilefbut clearfix" v-model="radio7" @change="fugaiaio">
                        <el-radio-button label="1">保持</el-radio-button>
                        <el-radio-button label="2">改善</el-radio-button>
                    </el-radio-group>
                    <el-form-item class="jiaozhifuhipt clearfix" style="margin-left:0" >
                        <div>
                            <el-radio-group fill="#1175d2" class="asflei">
                                <el-input @input="fugaiipt" v-model="input2"></el-input>
                            </el-radio-group>
                            <span class="mm">mm</span>
                        </div>
                    </el-form-item>
                </el-form-item>

                <div class="moya">
                    <p class="moyabottom" style="color:#333333;font-size:16px;font-weight: 400;margin-top:40px;">
                        磨牙关系(上颌第一磨牙相对下颌第一磨牙的位置关系)</p>
                    <el-form-item class="danxuanfl" label="">
                        <div>
                            <el-form-item class="danxuanfl moyabottom" label="左侧">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio8" @change="moyaleft">
                                        <el-radio-button label="1">保持</el-radio-button>
                                        <el-radio-button label="2">理想</el-radio-button>
                                        <el-radio-button label="3">改善</el-radio-button>
                                        <el-form-item class="jiaozhifuhipt input3 clearfix" label="远中(-)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="moyaleftipt2" v-model="input4"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="jiaozhifuhipt input4 clearfix" label="近中(+)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="moyaleftipt1" v-model="input3"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item class="danxuanfl moyabottom" label="右侧">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio9" @change="moyaright">
                                        <el-radio-button label="1">保持</el-radio-button>
                                        <el-radio-button label="2">理想</el-radio-button>
                                        <el-radio-button label="3">改善</el-radio-button>
                                        <el-form-item class="jiaozhifuhipt input3 clearfix" label="远中(-)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="moyarightipt2" v-model="input6"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="jiaozhifuhipt input4 clearfix" label="近中(+)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="moyarightipt1" v-model="input5"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <p class="moyabottom" style="color:#333333; font-size:16px;font-size:16px;font-weight: 400;">
                        尖牙关系(上颌尖牙相对下颌尖牙的位置关系)</p>
                    <el-form-item class="danxuanfl" label="">
                        <div>
                            <el-form-item class="danxuanfl moyabottom" label="左侧">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio10"
                                        @change="jianyaleft">
                                        <el-radio-button label="1">保持</el-radio-button>
                                        <el-radio-button label="2">理想</el-radio-button>
                                        <el-radio-button label="3">改善</el-radio-button>
                                        <el-form-item class="jiaozhifuhipt input3 clearfix" label="远中(-)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="jianyaleftipt2" v-model="input8"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="jiaozhifuhipt input4 clearfix" label="近中(+)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="jianyaleftipt1" v-model="input7"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>

                                </div>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item class="danxuanfl moyabottom" label="右侧">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio11"
                                        @change="jianyaright">
                                        <el-radio-button label="1">保持</el-radio-button>
                                        <el-radio-button label="2">理想</el-radio-button>
                                        <el-radio-button label="3">改善</el-radio-button>
                                        <el-form-item class="jiaozhifuhipt input3 clearfix" label="远中(-)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="jianyarightipt2" v-model="input10"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="jiaozhifuhipt input4 clearfix" label="近中(+)">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="jianyarightipt1" v-model="input9"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                    </el-form-item>
                </div>
                <el-form-item class="marginright moyabottom textleft" label="后牙反𬌗">
                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio12">
                        <el-radio-button label="1">保持</el-radio-button>
                        <el-radio-button label="2">纠正</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <!-- 牙齿 1 -->
                <div class="yactop clearfix">
                    <div class="toptext clearfix">
                        <p class="title">间隙获得</p>
                        <p>可邻面去釉牙齿<span>(IPR)</span></p>
                        <p>扩弓<span>(EXP)</span></p>
                        <p>拔牙<span>(EX)</span></p>
                        <p>远移磨牙<span>(DM)</span></p>
                    </div>
                    <div class="boxnav">

                        <div class="list1 clearfix">
                            <div v-for="(item,i) in yacitop1" :key="i" class="item">
                                <div :style="item.kuang" class="boximg">
                                    <div :style="item.gao" class="boximghez">
                                        <div class="boxheznav">
                                            <p class="p1">{{item.titp1}}</p>
                                            <p class="p2">{{item.titp2}}</p>
                                            <p class="p3">{{item.titp3}}</p>
                                            <p class="p4">{{item.titp4}}</p>
                                        </div>
                                        <img @click.stop="list1fun.call(this,i)" v-show="!item.alter"
                                            :src="item.imageUrl">
                                        <img @click.stop="list1fun.call(this,i)" v-show="item.alter"
                                            :src="item.imageUrlactive">
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
                            <div v-for="(item,i) in yacibottom1" :key="i" class="item">
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
                                        <img @click.stop="list2fun.call(this,i)" v-show="!item.alter"
                                            :src="item.imageUrl">
                                        <img @click.stop="list2fun.call(this,i)" v-show="item.alter"
                                            :src="item.imageUrlactive">
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 牙齿 2 -->
                <div class="yacbottom">
                    <div class="toptext clearfix">
                        <p class="title">特殊要求</p>
                        <p>不可移动牙齿<span>(NM)</span></p>
                        <p>无附件<span>(NA)</span></p>
                        <p>缺失牙<span>(M)</span></p>
                    </div>
                    <div class="boxnav">
                        <div class="list1 clearfix">
                            <div v-for="(item,i) in yacitop2" :key="i" class="item">
                                <div :style="item.kuang" class="boximg">
                                    <div :style="item.gao" class="boximghez">
                                        <div class="boxheznav">
                                            <p class="p1">{{item.titp1}}</p>
                                            <p class="p2">{{item.titp2}}</p>
                                            <p class="p3">{{item.titp3}}</p>
                                        </div>
                                        <img @click.stop="list1fun.call(this,i)" v-show="!item.alter"
                                            :src="item.imageUrl">
                                        <img @click.stop="list1fun.call(this,i)" v-show="item.alter"
                                            :src="item.imageUrlactive">
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
                            <div v-for="(item,i) in yacibottom2" :key="i" class="item">
                                <div class="boxtext">
                                    {{item.shuzhi}}
                                </div>
                                <div :style="item.kuang" class="boximg">
                                    <div :style="item.gao" class="boximghez">
                                        <div class="boxheznav">
                                            <p class="p1">{{item.titp1}}</p>
                                            <p class="p2">{{item.titp2}}</p>
                                            <p class="p3">{{item.titp3}}</p>
                                        </div>
                                        <img @click.stop="list2fun.call(this,i)" v-show="!item.alter"
                                            :src="item.imageUrl">
                                        <img @click.stop="list2fun.call(this,i)" v-show="item.alter"
                                            :src="item.imageUrlactive">
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="moya">
                    <!-- <p style="color:#333333; font-size:16px;font-weight:400;">中线</p> -->
                    <el-form-item class="zhoxianlab danxuanfl moyabottom" label="中线">
                        <div>
                            <el-form-item class="danxuanfl moyabottom" label="上颌">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio13"
                                        @change="zhoxianshanghe">
                                        <el-radio-button label="34">保持</el-radio-button>
                                        <!-- <el-radio-button label="2">改善</el-radio-button> -->
                                        <el-form-item class="jiaozhifuhipt input3 clearfix" label="右">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="shangheright" v-model="input12"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="jiaozhifuhipt input4 clearfix" label="左">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="shangheleft" v-model="input11"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>

                                </div>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item class="danxuanfl" label="下颌">
                                <div>
                                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio14"
                                        @change='zhoxianxiahe'>
                                        <el-radio-button label="34">保持</el-radio-button>
                                        <!-- <el-radio-button label="2">改善</el-radio-button> -->
                                        <el-form-item class="jiaozhifuhipt input3 clearfix" label="右">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="xiaheright" v-model="input14"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item class="jiaozhifuhipt input4 clearfix" label="左">
                                            <div>
                                                <el-radio-group fill="#1175d2" class="asflei">
                                                    <el-input @input="xiaheleft" v-model="input13"></el-input>
                                                </el-radio-group>
                                                <span class="mm">mm</span>
                                            </div>
                                        </el-form-item>
                                    </el-radio-group>
                                </div>
                            </el-form-item>
                        </div>
                    </el-form-item>
                </div>
                <el-form-item class="marginright moyabottom textleft" label="牙列间隙">
                    <el-radio-group fill="#1175d2" class="asflei" v-model="radio15">
                        <el-radio-button label="1">全部关闭</el-radio-button>
                        <el-radio-button label="2">保留间隙</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="huodxs marginright textleft" label="附加说明">
                    <el-input type="textarea" style="pointer-events: auto;background-color: transparent;color:#333" :disabled="true" v-model="form.fjsm"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-row>
            <!-- <el-button @click.native="changeURl" class="tijbut" type="primary">提交</el-button> -->
            <el-button @click="fanhui" class="quxbut" type="primary">返回</el-button>
        </el-row>
    </div>
</template>
<script>
    import {
        abab
    } from '@/util/validate.js'
    const cityOptions = ['拥挤', '牙列间隙', '前突', '前牙反𬌗','开𬌗','深覆𬌗', '深覆盖',  '后牙锁𬌗', '后牙反𬌗'];
    export default {
        components: {

        },
        data() {
            return {
                arr: [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28,48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38],
                // 诊断 磨牙关系 左侧
                radio1: 0,
                // 诊断 磨牙关系 右侧
                radio2: 0,
                // 诊断 尖牙关系 左侧
                radio3: 0,
                // 诊断 尖牙关系 右侧
                radio4: 0,
                // 诊断 病例分类
                checkboxGroup1: [''],
                cities: cityOptions,

                // 矫治目标 矫治牙列
                radio5: 0,
                // 矫治目标  覆𬌗 
                radio6: 0,
                input1: '',
                // 矫治目标  覆盖
                radio7: 0,
                input2: '',
                // 矫治目标  磨牙关系 左侧
                radio8: 0,
                input3: '',
                input4: '',
                // 矫治目标  磨牙关系 右侧
                radio9: 0,
                input5: '',
                input6: '',
                // 矫治目标  尖牙关系 左侧
                radio10: 0,
                input7: '',
                input8: '',
                // 矫治目标  尖牙关系 右侧
                radio11: 0,
                input9: '',
                input10: '',
                // 矫治目标  后牙反𬌗 
                radio12: 0,
                // 矫治目标  中线 上颌
                radio13: 0,
                input11: '',
                input12: '',
                // 矫治目标  中线 下颌
                radio14: 0,
                input13: '',
                input14: '',
                // 矫治目标  牙列间隙 
                radio15: 0,
                // 矫治目标  附加说明 
                form: {
                    fjsm: '',
                },
                yacitop1: [{
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
                yacibottom1: [{
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
                yacitop2: [{
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
                yacibottom2: [{
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

            };
        },
        mounted () {
            this.jiekoqqiu();
            console.log(this.$store.state.caseId)
        },
        methods: {
            jiekoqqiu() {
                this.$http({
                    url: "/caseInfo/getEntrust",
                    method: "POST",
                    data: {
                        caseId: this.$store.state.caseId,
                        follow: true,
                    }

                }).then(({
                    data
                }) => {
                    data = JSON.parse(data.data)
                    console.log(data)
                    // 磨牙
                    this.radio1 = data.molarLeft;
                    this.radio2 = data.molarRight;
                    // 尖牙
                    this.radio3 = data.canineLeft;
                    this.radio4 = data.canineRight;
                    // 矫治牙列
                    this.radio5 = data.prescpDentition;
                    // 覆颌
                    this.radio6 = data.prescpOverbite;
                    // 覆颌 改善
                    this.input1 = data.prescpOverbiteData;
                    // 覆盖
                    this.radio7 = data.prescpOverjet;
                    // 覆盖 改善
                    this.input2 = data.prescpOverjetData;
                    // 磨牙关系 上颌 第一相对 下颌第一
                    var that = this;
                    abab(data.diagnosisType).forEach(function(a,b){
                        let c = Math.pow(2,a+1);
                        that.checkboxGroup1.push(c)

                    })
                    
                    // 矫治目标  磨牙关系 左侧
                    this.radio8 = data.prescpMolarLeft;
                    if(data.prescpMolarLeftData > 0){
                        // 正
                        this.input3 = data.prescpMolarLeftData;
                    }else{
                        // 负
                        this.input4 = Math.abs(data.prescpMolarLeftData);
                    }          
                    
                    
                    this.radio9 = data.prescpMolarRight;
                    if(data.prescpMolarRightData > 0){
                        // 正
                        this.input5 = data.prescpMolarRightData;
                    }else{
                        // 负
                        this.input6 = Math.abs(data.prescpMolarRightData);
                    } 
                    // 尖牙关系 上颌尖牙相对下颌尖牙
        
                    // 矫治目标  尖牙关系 左侧
                    this.radio10 = data.prescpCanineLeft;
                    if(data.prescpCanineLeftData > 0){
                        // 正
                        this.input7 = Math.abs(data.prescpCanineLeftData)
                    }else{
                        // 负
                        this.input8 = Math.abs(data.prescpCanineLeftData);
                    } 
                    // 矫治目标  尖牙关系 右侧
                    this.radio11 = data.prescpCanineRight;
                    if(data.prescpCanineRightData > 0){
                        // 正
                        this.input9 = data.prescpCanineRightData
                    }else{
                        // 负
                        this.input10 = Math.abs(data.prescpCanineRightData);
                    } 
                    // 后牙反颌
                    this.radio12 = data.prescpPosteriorCrossBite;
                    // 间隙 获得

                    // 特殊要求
                    // --------=========中线上
                    if(data.fprescpUpperMiddle === 34){
                            this.radio13 = data.fprescpUpperMiddle
                    }else{
                        if(data.fprescpUpperMiddle > 0){
                            // 正数
                            this.input11 = data.fprescpUpperMiddle
                        }else{
                            // 负数
                            this.input12 = Math.abs(data.fprescpUpperMiddle)
                        }
                    }
                    // --------=========中线下
                    if(data.fprescpLowerMiddle === 34){
                            this.radio14 = data.fprescpLowerMiddle;
                    }else{
                        if(data.fprescpLowerMiddle > 0){
                            // 正数
                            this.input13 = data.fprescpLowerMiddle
                        }else{
                            // 负数
                            this.input14 = Math.abs(data.fprescpLowerMiddle)
                        }
                    }
                    // 牙列间隙
                    this.radio15 = data.nprescpSpacing;
                    // 附加说明
                    this.form.fjsm = data.strPrescpInstruction;
                    var that = this;
                    console.log(data)
                    data.clearanceVOS.forEach(function (a, b) {
                        // console.log(a, b)
                       
                        a.teethIndex = that.arr.indexOf(a.teethIndex)+1;
                        if (a.teethIndex > 16) {
                            // 下排牙齿
                            let index = a.teethIndex - 16;
                            a.ex == true ? a.ex = 'EX' : a.ex = '';
                            a.exp == true ? a.exp = 'EXP' : a.exp = '';
                            a.dm == true ? a.dm = 'DM' : a.dm = '';
                            a.ipr == true ? a.ipr = 'IPR' : a.ipr = '';
                            that.yacibottom1[index-1].titp1 = a.ex;
                            that.yacibottom1[index-1].titp2 = a.exp;
                            that.yacibottom1[index-1].titp3 = a.dm;
                            that.yacibottom1[index-1].titp4 = a.ipr;
                        }else{
                            // 上排牙齿
                            a.ex == true ? a.ex = 'EX' : a.ex = '';
                            a.exp == true ? a.exp = 'EXP' : a.exp = '';
                            a.dm == true ? a.dm = 'DM' : a.dm = '';
                            a.ipr == true ? a.ipr = 'IPR' : a.ipr = '';
                            that.yacitop1[a.teethIndex-1].titp1 = a.ex;
                            that.yacitop1[a.teethIndex-1].titp2 = a.exp;
                            that.yacitop1[a.teethIndex-1].titp3 = a.dm;
                            that.yacitop1[a.teethIndex-1].titp4 = a.ipr;
                        }
                        
                    })
                    data.teethVOS.forEach(function(a,b){
                        a.teethIndex = that.arr.indexOf(a.teethIndex)+1;
                        if(a.teethIndex > 16){
                            // 下排牙齿
                            let index = a.teethIndex - 16;
                            a.m == true ? a.m='M':a.m='';
                            a.na == true ? a.na='NA':a.na='';
                            a.nm == true ? a.nm='NM':a.nm='';
                            that.yacibottom2[index-1].titp1 = a.m;
                            that.yacibottom2[index-1].titp2 = a.na;
                            that.yacibottom2[index-1].titp3 = a.nm;
                        }else{
                            // 上排牙齿
                            a.m == true ? a.m='M':a.m='';
                            a.na == true ? a.na='NA':a.na='';
                            a.nm == true ? a.nm='NM':a.nm='';
                            that.yacitop2[a.teethIndex-1].titp1 = a.m;
                            that.yacitop2[a.teethIndex-1].titp2 = a.na;
                            that.yacitop2[a.teethIndex-1].titp3 = a.nm;
                        }
                    })

                    if (this.input1 == 0) {
                        this.input1 = ''
                    }
                    if (this.input2 == 0) {
                        this.input2 = ''
                    }
                    if (this.input3 == 0) {
                        this.input3 = ''
                    }
                    if (this.input4 == 0) {
                        this.input4 = ''
                    }
                    if (this.input5 == 0) {
                        this.input5 = ''
                    }
                    if (this.input6 == 0) {
                        this.input6 = ''
                    }
                    if (this.input7 == 0) {
                        this.input7 = ''
                    }
                    if (this.input8 == 0) {
                        this.input8 = ''
                    }
                    if (this.input9 == 0) {
                        this.input9 = ''
                    }
                    if (this.input10 == 0) {
                        this.input10 = ''
                    }
                    if (this.input11 == 0) {
                        this.input11 = ''
                    }
                    if (this.input12 == 0) {
                        this.input12 = ''
                    }
                    if (this.input13 == 0) {
                        this.input13 = ''
                    }
                    if (this.input14 == 0) {
                        this.input14 = ''
                    }
                    // console.log(data)
                }).catch(err => {
                    console.log(err)
                })
            },
            // 返回按钮
            fanhui() {
                this.$router.push('/particulars')
                this.$store.commit('indexRemove', 2);
            },
            // changeURl() {
            // this.$router.push('./record')
            // this.$store.commit('indexAdd', ['发货记录','/fahuobcq/record']);
            // },
            fuheaio() {
                this.input1 = '';
            },
            fuheipt() {
                this.radio6 = '';

            },

            fugaiaio() {
                this.input2 = '';
            },
            fugaiipt() {
                this.radio7 = '';
            },

            // 第一个牙齿
            list1fun1(i) {
                this.yacitop1[i].alter = !this.yacitop1[i].alter
            },
            list2fun1(i) {
                this.yacibottom1[i].alter = !this.yacibottom1[i].alter
            },

            // 第二个牙齿
            list1fun2(i) {
                this.yacitop2[i].alter = !this.yacitop2[i].alter
            },
            list2fun2(i) {
                this.yacibottom2[i].alter = !this.yacibottom2[i].alter
            },

            // 磨牙左侧
            moyaleft() {
                this.input3 = '';
                this.input4 = '';
            },
            moyaleftipt1() {
                this.radio8 = '';
                this.input4 = '';
            },
            moyaleftipt2() {
                this.radio8 = '';
                this.input3 = '';
            },

            // 磨牙右侧
            moyaright() {
                this.input5 = '';
                this.input6 = '';
            },
            moyarightipt1() {
                this.radio9 = '';
                this.input6 = '';
            },
            moyarightipt2() {
                this.radio9 = '';
                this.input5 = '';
            },

            // 尖牙左侧
            jianyaleft() {
                this.input7 = '';
                this.input8 = '';
            },
            jianyaleftipt1() {
                this.radio10 = '';
                this.input8 = '';
            },
            jianyaleftipt2() {
                this.radio10 = '';
                this.input7 = '';
            },

            // 尖牙右侧
            jianyaright() {
                this.input9 = '';
                this.input10 = '';
            },
            jianyarightipt1() {
                this.radio11 = '';
                this.input10 = '';
            },
            jianyarightipt2() {
                this.radio11 = '';
                this.input9 = '';
            },

            // 中线上
            zhoxianshanghe() {
                this.input11 = '';
                this.input12 = '';
            },
            shangheleft() {
                console.log(this)
                this.radio13 = '';
                this.input12 = '';
            },
            shangheright() {
                this.radio13 = '';
                this.input11 = '';
            },
            // 中线下
            zhoxianxiahe() {
                this.input13 = '';
                this.input14 = '';
            },
            xiaheleft() {
                this.radio14 = '';
                this.input14 = '';
            },
            xiaheright() {
                this.radio14 = '';
                this.input13 = '';
            },
        },
    }
</script>
<style scoped lang="less">
    // 提交
    // /deep/.tijbut {
    //     background: #1175d2;
    //     border: #1175d2
    // }

    /deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background: #1175d2 !important;
    }

    // 取消
    @media screen and (max-width: 1360px) {
        span {
            padding: 0px;
            line-height: 30px;
            width: 100px;
            height: 30px;
            margin-right: 34px;
            // border: 1px solid #1175d2;
            border-radius: 5px;
            box-shadow: none;
        }

        // 病例分类
        /deep/.duoxuanfl .el-checkbox-button__inner {
            line-height: 30px;
            width: 100px;
            height: 30px;
            padding: 0px;
            margin-right: 20px;
            border: 1px solid #1175d2;
            border-radius: 5px;
            box-shadow: none;
        }

    }

    @media screen and (max-width: 1024px) {
        /deep/.el-button {
            span {
                color: #333333;
            }
        }
    }

    .quxbut {
        background: none !important;
        // margin-left: 30px;
        border: 1px solid #1175d2;
        color: #333333;
    }

    // 取消单选框盒子阴影
    /deep/.el-radio-button {
        box-shadow: none !important;
    }

    /deep/.is-active {
        box-shadow: none;
    }

    /deep/.el-row {
        margin-top: 20px;
        margin-bottom: 20px;

        .el-button {
            width: 140px;
            height: 40px;
        }
    }

    /deep/.el-form-item__label {
        color: black !important;
    }

    /deep/.zhoxianlab {

        >.el-form-item__label {
            text-align: left;
            font-size: 16px;
            font-weight: 400;
        }
    }

    .weituojiagd {
        .fortit {
            color: #1175d2;
            padding-top: 35px;
            padding-bottom: 50px;
            font-weight: 400;
        }

        /deep/.marginright {
            .el-form-item__label {
                margin-right: 42px;
            }
        }

        /deep/.moyabottom {
            margin-bottom: 25px;
        }

        /deep/.textleft {

            >.el-form-item__label {
                text-align: left;
                font-size: 16px;
                font-weight: 400;
            }
        }

        .boxTop {
            pointer-events: none;
            padding-left: 77px;
            box-sizing: border-box;
            background: #fff;
            margin-bottom: 40px;

            /deep/.asflei .el-radio-button__inner {
                padding: 0px;
                line-height: 30px;
                width: 100px;
                height: 30px;
                margin-right: 20px;
                border: 1px solid #1175d2;
                border-radius: 5px;
                box-shadow: none;
            }

            span {
                padding: 0px;
                line-height: 30px;
                width: 100px;
                height: 30px;
                margin-right: 20px;
                border: 1px solid #1175d2;
                border-radius: 5px;
                box-shadow: none;
            }

            // 病例分类
            /deep/.duoxuanfl .el-checkbox-button__inner {
                line-height: 30px;
                width: 100px;
                height: 30px;
                padding: 0px;
                margin-right: 20px;
                border: 1px solid #1175d2;
                border-radius: 5px;
                box-shadow: none;
            }
        }

        .boxCenter {
            pointer-events: none;
            padding-left: 77px;
            box-sizing: border-box;
            background: #fff;

            /deep/.asflei .el-radio-button__inner {
                padding: 0px;
                line-height: 30px;
                width: 100px;
                height: 30px;
                margin-right: 25px;
                border: 1px solid #1175d2;
                border-radius: 5px;
                box-shadow: none;
            }

            /deep/.el-radio-button span {
                padding: 0px;
                line-height: 30px;
                width: 100px;
                height: 30px;
                margin-right: 25px;
                border: 1px solid #1175d2;
                border-radius: 5px;
                box-shadow: none;
            }

            /deep/.jiaozhilefbut {
                float: left;
            }

            /deep/.jiaozhifuhipt {
                position: relative;
                margin-left: -37px;
                margin-top: -5px;
                float: left;
                display: table-cell;
                vertical-align: bottom;

                .el-form-item__label {
                    margin-right: 0px;
                }

                .el-input__inner {
                    height: 30px;
                    line-height: 30px;
                    width: 50px;
                    border: 1px solid #1175d2;
                    padding: 0px;
                    text-align: center;
                }

                span {
                    margin-left: 10px;
                    font-weight: 400;
                }

                .mm {
                    position: absolute;
                    top: 8px;
                }
            }

            .input3 {
                float: right;
                margin-left: 45px;
            }

            .input4 {
                float: right;
                margin-left: -20px;
            }

            .moya {
                width: 100%;
            }

            .yactop {
                .boxnav {
                    // width: 100%;
                    // margin-top: 300px;
                    margin-left: -240px;
                    margin-top: 30px;
                    transform: scale(0.6);
                    font-size: 20px;

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
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p2 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p3 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p4 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
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
                        width: 969px;
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
                            text-align: right;
                            margin-left: 34px;
                            margin-right: 0px;
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

                            /deep/.boximghez {
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
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p2 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p3 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p4 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
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

                .toptext {
                    p {
                        float: left;
                        margin-right: 20px;

                        span {
                            color: #d85959;
                        }
                    }

                    .title {
                        font-weight: 400;
                        font-size: 16px;
                        margin-right: 40px;
                    }

                }
            }

            .yacbottom {
                border-bottom: 1px solid #aeaeae;
                margin-bottom: 40px;

                .boxnav {
                    // width: 100%;
                    // margin-top: 300px;
                    margin-left: -240px;
                    margin-top: 30px;
                    transform: scale(0.6);
                    font-size: 20px;

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
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p2 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p3 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p4 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
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
                        width: 969px;
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
                            text-align: right;
                            margin-left: 34px;
                            margin-right: 0px;
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

                            /deep/.boximghez {
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
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p2 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p3 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
                                    line-height: 15px;
                                    color: #ff0000;
                                }

                                .p4 {
                                    pointer-events: none;
                                    width: 100%;
                                    text-align: center;
                                    font-size: 16px;
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

                .toptext {
                    p {
                        float: left;
                        margin-right: 20px;

                        span {
                            color: #d85959;
                        }
                    }

                    .title {
                        font-weight: 400;
                        font-size: 16px;
                        margin-right: 40px;
                    }

                }
            }

            // 活动形式
            /deep/.huodxs .el-textarea__inner {
                height: 150px;
                outline: none;
                resize: none;
                font-size: 16px;
                border: 1px solid #1175d2;
                margin-bottom: 80px;
                color: #000;
            }

            .el-textarea {
                width: 80%;
            }
        }
    }

    /deep/.borderbottom {
        border-bottom: 1px solid #aeaeae;
        padding-bottom: 40px;
        box-sizing: border-box;
        margin-bottom: 0px;
    }


    @media screen and (max-width: 1340px) {

        .boxTop,
        .boxCenter {
            padding-left: 40px !important;
        }

        /deep/.cuoelx .el-radio-button__inner,
        /deep/.cuoelx .el-checkbox-button__inner {
            width: 75px !important;
            margin-right: 10px !important;
        }
    }

    @media screen and (max-width: 1340px) {
        .list1 {
            margin-left: 100px !important;
        }

        .list2 {
            margin-left: 100px !important;
        }

        .zhoxian {
            margin-left: 100px !important;
        }
    }
</style>