<template>
    <div class="clinic main">
        <div class="head">
            <p>-&nbsp;&nbsp;医生矫治偏好&nbsp;&nbsp;-</p>
        </div>
        <div class="body">
            <el-row style="padding: 74px 12px 0;">
                <el-col class="rightB" :span="12" style="padding-bottom: 140px;">
                    <card :title="'1.临床牙位表示法'" :jkl="0" @vb="koko" :asd="judge[0]">
                        <div slot="content">
                            <el-radio-group v-model="radio1">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('1_1')">Universal牙位标记法
                                    (#1-#32)</el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('1_2')">Palmer牙标记法 (UR8-LR8)
                                </el-radio>
                                <el-radio :label="3" @click.native.prevent="onRadioChange('1_3')" class="default">
                                    FDI牙位标记法 (1.8-4.8)</el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'2.上下颌治疗'" :jkl="1" @vb="koko" :asd="judge[1]">
                        <div slot="content">
                            <el-radio-group v-model="radio2">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('2_1')" class="default">默认设置
                                </el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('2_2')">上下颌同时开始</el-radio>
                                <el-radio :label="3" @click.native.prevent="onRadioChange('2_3')">上下颌同时结束</el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'3.单颌保持矫治器'" :jkl="2" @vb="koko" :asd="judge[2]">
                        <div slot="content">
                            <el-radio-group v-model="radio3">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('3_1')" class="default">
                                    是，请增加单颌保持矫治器以匹配更多步数的对颌</el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('3_2')">不需要，上下颌步骤统一</el-radio>
                                <el-radio :label="3" @click.native.prevent="onRadioChange('3_3')">以上选项均不是</el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'4.首次矫治方案是否接受片切'" :jkl="3" @vb="koko" :asd="judge[3]">
                        <div slot="content">
                            <el-radio-group v-model="radio4">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('4_1')" class="default">是
                                </el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('4_2')">否</el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'5.IPR的阶段选择'" :jkl="4" @vb="koko" :asd="judge[4]">
                        <div slot="content">
                            <p class="plan">(默认设置)</p>
                            <el-radio-group v-model="radio5">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('5_1')" class="default">默认方案
                                </el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('5_2')">
                                    推迟
                                    <p class="postpone" @click.stop>
                                        推迟到第
                                        <el-input v-model="input1" :value="input1" :disabled="radio5===2?false:true">
                                        </el-input>步
                                    </p>
                                </el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'6.附件黏贴的阶段选择'" :jkl="5" @vb="koko" :asd="judge[5]">
                        <div slot="content">
                            <p class="plan">(默认设置)</p>
                            <el-radio-group v-model="radio6">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('6_1')" class="default">默认方案
                                </el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('6_2')">
                                    推迟
                                    <p class="postpone" @click.stop>
                                        推迟到第
                                        <el-input v-model="input2" :value="input2" :disabled="radio6===2?false:true">
                                        </el-input>步
                                    </p>
                                </el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'7.拔牙步数的阶段选择'" :jkl="6" @vb="koko" :asd="judge[6]">
                        <div slot="content">
                            <p class="plan">(默认设置)</p>
                            <el-radio-group v-model="radio7">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('7_1')" class="default">默认方案
                                </el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('7_2')">
                                    推迟
                                    <p class="postpone" @click.stop>
                                        推迟到第
                                        <el-input v-model="input3" :value="input3" :disabled="radio7===2?false:true">
                                        </el-input>步
                                    </p>
                                </el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'8.缺失牙替代物'" :jkl="7" @vb="koko" :asd="judge[7]">
                        <div slot="content">
                            <el-radio-group v-model="radio8">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('8_1')" class="default to">
                                    对于超过3.5mm的间隙,将默认放置假牙空泡。若间隙减小，假牙空泡将自动调整宽度。</el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('8_2')">其他：请选择以下一个或多个选项
                                </el-radio>
                                <ul class="chooo">
                                    <li>
                                        <el-checkbox v-model="checked8_1" :disabled="radio8 === 2?false:true">拔牙治疗方案不添加
                                        </el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox v-model="checked8_2" :disabled="radio8 === 2?false:true">有后牙间隙则不添加
                                        </el-checkbox>
                                    </li>
                                </ul>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'9.扩弓选择'" :jkl="8" @vb="koko" :asd="judge[8]">
                        <div slot="content">
                            <el-radio-group v-model="radio9">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('9_1')" class="default">
                                    尖牙、前磨牙及磨牙区域扩弓</el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('9_2')">只在尖牙及前磨牙区域扩弓
                                </el-radio>
                                <el-radio :label="3" @click.native.prevent="onRadioChange('9_3')" class="default">
                                    只在前磨牙及磨牙区域扩弓</el-radio>
                                <el-radio :label="4" @click.native.prevent="onRadioChange('9_4')">维持牙弓形态，不扩弓</el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'10.扩弓量的选择'" :jkl="9" @vb="koko" :asd="judge[9]">
                        <div slot="content">
                            <el-radio-group v-model="radio10">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('10_1')" class="default">
                                    &lt;=2毫米</el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('10_2')">大于2毫米</el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                </el-col>

                <el-col :span="12" class="rightB" style="border:none">
                    <card :title="'11.侧切牙为过小牙的间隙选择'" :jkl="10" @vb="koko" :asd="judge[10]">
                        <div slot="content">
                            <el-radio-group v-model="radio11">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('11_1')" class="default">
                                    远中预留间隙</el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('11_2')">近远中预留间隙</el-radio>
                                <el-radio :label="3" @click.native.prevent="onRadioChange('11_3')">关闭间隙（可片切对𬌗牙）
                                </el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'12.中切牙与侧切牙的排齐方式选择'" :jkl="11" @vb="koko" :asd="judge[11]">
                        <div slot="content">
                            <el-radio-group v-model="radio12">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('12_1')">其他：以下可多选</el-radio>
                                <ul class="chooo" style="margin-bottom:18px">
                                    <li>
                                        <el-checkbox v-model="checked12_1" :disabled="radio12===1?false:true">
                                            中切牙与侧切牙切端排齐</el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox v-model="checked12_2" :disabled="radio12===1?false:true">
                                            中切牙比侧切牙切端长0.5mm</el-checkbox>
                                    </li>
                                </ul>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('12_2')" class="default">
                                    按切牙龈缘排齐</el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'13.矫治器边缘处理方式选择'" :jkl="12" @vb="koko" :asd="judge[12]">
                        <div slot="content">
                            <p class="plan">针对牙周条件较差患者</p>
                            <el-radio-group v-model="radio13">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('13_1')" class="default">
                                    矫治器边缘在釉牙骨质界至龈缘1/2处</el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('13_2')">矫治器切边缘到釉牙骨质界
                                </el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <!-- <card :title="'14.针对间隙关闭，应用虚拟C-Chain '" :jkl="13" @vb="koko" :asd="judge[13]">
            <div slot="content">
              <p class="plan">针对间隙关闭的过矫正矫治器</p>
              <el-radio-group v-model="radio14">
                <el-radio :label="1" @click.native.prevent="onRadioChange('14_1')" class="default">是</el-radio>
                <el-radio :label="2" @click.native.prevent="onRadioChange('14_2')">否</el-radio>
              </el-radio-group>
            </div>
          </card> -->
                    <card :title="'14.印模或口扫中出现磨牙末端变形情况'" :jkl="14" @vb="koko" :asd="judge[14]">
                        <div slot="content">
                            <el-radio-group v-model="radio15">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('15_1')" class="default to">
                                    矫治器不包裹变形部分</el-radio>
                                <!-- <ul class="chooo">
                  <li style="margin-bottom:20px">
                    <el-checkbox
                      class="ppp to jk"
                      v-model="checked15"
                      :disabled="radio15===1?false:true"
                    >如果移除末端磨牙的远中部分仍无法完全移除变形，需要完全移除变形的末端磨牙，必要时移除相邻磨牙的远中部分从而使矫治器能正确就位。我理解无法覆盖末端磨牙造成过度萌出的可能性及我将在临床上解决该问题。</el-checkbox>
                  </li>
                </ul> -->
                                <el-radio :label="2" @click.native.prevent="onRadioChange('15_2')"
                                    class="ppp to jk love">尽可能修整变形部分（可能会导致矫治器不贴合的问题）</el-radio>
                                <el-radio :label="3" @click.native.prevent="onRadioChange('15_3')" class="ppp to jk">
                                    重新提供印模或口扫</el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'15.附件的选择'" :jkl="15" @vb="koko" :asd="judge[15]">
                        <div slot="content">
                            <p @click="chenyiSb" style="font-size:16px;color:#488bd7;margin-top: 44px;cursor: pointer;">
                                查看附件页面</p>
                        </div>
                    </card>
                    <card :title="'16.优化附件尺寸的选择'" :jkl="16" @vb="koko" :asd="judge[16]">
                        <div slot="content">
                            <p class="plan">(1)前牙</p>
                            <el-radio-group v-model="radio17" style="margin-left:40px">
                                <el-radio :label="1" @click.native.prevent="onRadioChange('17_1')" class="default">默认尺寸
                                </el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('17_2')">相应牙齿的最大尺寸</el-radio>
                            </el-radio-group>
                            <p class="plan">(2)后牙</p>
                            <el-radio-group v-model="radio17_1" style="margin-left:40px">
                                <el-radio @click.native.prevent="onRadioChange('17_2_1')" :label="1" class="default">
                                    默认尺寸</el-radio>
                                <el-radio @click.native.prevent="onRadioChange('17_2_2')" :label="2">相应牙齿的最大尺寸
                                </el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'17.切割与附件'" :jkl="17" @vb="koko" :asd="judge[17]">
                        <div slot="content">
                            <!-- <p class="plan" style="color:#333;font-weight:bold">精密切割界面</p> -->
                            <el-radio-group v-model="radio18">
                                <!-- <el-radio :label="1" @click.native.prevent="onRadioChange('18_1')">只保留优化附件</el-radio>
                <ul class="chooo">
                  <li>
                    <el-checkbox
                      v-model="checked18"
                      :disabled="radio18===1?false:true"
                    >需要的话，将开窗改为牵引钩，保留优化附件</el-checkbox>
                  </li>
                </ul> -->
                                <el-radio :label="1" @click.native.prevent="onRadioChange('18_1')" class="default"
                                    style="margin-top:24px">切割界面只要牵引钩和开窗</el-radio>
                                <el-radio :label="2" @click.native.prevent="onRadioChange('18_2')" class="default">
                                    切割界面上牵引钩、开窗和附件都要</el-radio>
                            </el-radio-group>
                        </div>
                    </card>
                    <card :title="'18.开始牵引的阶段选择'" :jkl="18" @vb="koko" :asd="judge[18]">
                        <div slot="content">
                            <div class="mji">
                                从第
                                <el-input class="hu19" v-model="input19" :value="input19"></el-input>步开始
                            </div>
                        </div>
                    </card>
                </el-col>
            </el-row>
            <div class="ffgg">
                <p>
                    附加说明
                    <!-- <span>特殊要求</span>（这项临床偏好可供您输入在以上临床偏好中没有涉及到的其他的临床偏好说明。） -->
                </p>
                <el-input type="textarea" :rows="10" placeholder="请输入内容" :autosize="false" maxlength="400"
                    v-model="textarea"></el-input>
            </div>
        </div>
        <div class="footer">
            <div class="save">
                <!-- <p class="fl">*黑色加粗的选项为默认选项</p> -->
                <div class="fr">
                    <el-button class="cancel" @click="cancel">取消</el-button>
                    <el-button type="primary" class="xinjian" @click="submit">提交修改</el-button>
                </div>
            </div>
        </div>

        <yacitangc ref="tanc"></yacitangc>
    </div>
</template>
<script>
    import card from "./components/card";
    import yacitangc from "./components/yacitangc";
    export default {
        components: {
            card,
            yacitangc,
        },
        data() {
            return {
                radio1: 1,
                radio2: 1,
                radio3: 1,
                radio4: 1,
                radio5: 1,
                input1: "0",
                radio6: 1,
                input2: "0",
                radio7: 1,
                input3: "0",
                radio8: 1,
                radio9: 1,
                radio10: 1,
                radio11: 1,
                radio12: 1,
                radio13: 1,
                radio14: 1,
                radio15: 1,
                radio17: 1,
                radio17_1: 1,
                radio18: 1,
                radio19: 0,
                checked8_1: false,
                checked8_2: false,
                checked12_1: true,
                checked12_2: true,
                checked15: true,
                checked18: true,
                input19: "0",
                textarea: "",
                clinicData: {},
                judge: [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                ],
            };
        },
        mounted() {
            this.hobbyData();
        },
        methods: {
            onRadioChange(num) {
                switch (num) {
                    case "1_1":
                        this.radio1 == num.substr(2, 1) ? (this.radio1 = 0) : (this.radio1 = 1);
                        break;
                    case "1_2":
                        this.radio1 == num.substr(2, 1) ? (this.radio1 = 0) : (this.radio1 = 2);
                        break;
                    case "1_3":
                        this.radio1 == num.substr(2, 1) ? (this.radio1 = 0) : (this.radio1 = 3);
                        break;
                    case "2_1":
                        this.radio2 == num.substr(2, 1) ? (this.radio2 = 0) : (this.radio2 = 1);
                        break;
                    case "2_2":
                        this.radio2 == num.substr(2, 1) ? (this.radio2 = 0) : (this.radio2 = 2);
                        break;
                    case "2_3":
                        this.radio2 == num.substr(2, 1) ? (this.radio2 = 0) : (this.radio2 = 3);
                        break;
                    case "3_1":
                        this.radio3 == num.substr(2, 1) ? (this.radio3 = 0) : (this.radio3 = 1);
                        break;
                    case "3_2":
                        this.radio3 == num.substr(2, 1) ? (this.radio3 = 0) : (this.radio3 = 2);
                        break;
                    case "3_3":
                        this.radio3 == num.substr(2, 1) ? (this.radio3 = 0) : (this.radio3 = 3);
                        break;
                    case "4_1":
                        this.radio4 == num.substr(2, 1) ? (this.radio4 = 0) : (this.radio4 = 1);
                        break;
                    case "4_2":
                        this.radio4 == num.substr(2, 1) ? (this.radio4 = 0) : (this.radio4 = 2);
                        break;
                    case "5_1":
                        this.radio5 == num.substr(2, 1) ? (this.radio5 = 0) : (this.radio5 = 1);
                        this.input1 = 0
                        break;
                    case "5_2":
                        this.radio5 == num.substr(2, 1) ? (this.radio5 = 0) : (this.radio5 = 2);
                        this.input1 = 0
                        break;
                    case "6_1":
                        this.radio6 == num.substr(2, 1) ? (this.radio6 = 0) : (this.radio6 = 1);
                        this.input2 = 0
                        break;
                    case "6_2":
                        this.radio6 == num.substr(2, 1) ? (this.radio6 = 0) : (this.radio6 = 2);
                        this.input2 = 0
                        break;
                    case "7_1":
                        this.radio7 == num.substr(2, 1) ? (this.radio7 = 0) : (this.radio7 = 1);
                        this.input3 = 0
                        break;
                    case "7_2":
                        this.radio7 == num.substr(2, 1) ? (this.radio7 = 0) : (this.radio7 = 2);
                        this.input3 = 0
                        break;
                    case "8_1":
                        this.radio8 == num.substr(2, 1) ? (this.radio8 = 0) : (this.radio8 = 1);
                        this.checked8_1 = false
                        this.checked8_2 = false
                        break;
                    case "8_2":
                        this.radio8 == num.substr(2, 1) ? (this.radio8 = 0, this.checked8_1 = false, this.checked8_2 =
                            false) : (this.radio8 = 2, this.checked8_1 = true, this.checked8_2 = true);
                        break;
                    case "9_1":
                        this.radio9 == num.substr(2, 1) ? (this.radio9 = 0) : (this.radio9 = 1);
                        break;
                    case "9_2":
                        this.radio9 == num.substr(2, 1) ? (this.radio9 = 0) : (this.radio9 = 2);
                        break;
                    case "9_3":
                        this.radio9 == num.substr(2, 1) ? (this.radio9 = 0) : (this.radio9 = 3);
                        break;
                    case "9_4":
                        this.radio9 == num.substr(2, 1) ? (this.radio9 = 0) : (this.radio9 = 4);
                        break;
                    case "10_1":
                        this.radio10 == num.substr(3, 1) ? (this.radio10 = 0) : (this.radio10 = 1);
                        break;
                    case "10_2":
                        this.radio10 == num.substr(3, 1) ? (this.radio10 = 0) : (this.radio10 = 2);
                        break;
                    case "11_1":
                        this.radio11 == num.substr(3, 1) ? (this.radio11 = 0) : (this.radio11 = 1);
                        break;
                    case "11_2":
                        this.radio11 == num.substr(3, 1) ? (this.radio11 = 0) : (this.radio11 = 2);
                        break;
                    case "11_3":
                        this.radio11 == num.substr(3, 1) ? (this.radio11 = 0) : (this.radio11 = 3);
                        break;
                    case "12_1":
                        this.radio12 == num.substr(3, 1) ? (this.radio12 = 0, this.checked12_1 = false, this
                            .checked12_2 = false) : (this.radio12 = 1, this.checked12_1 = true, this.checked12_2 =
                            true);
                        break;
                    case "12_2":
                        this.radio12 == num.substr(3, 1) ? (this.radio12 = 0) : (this.radio12 = 2);
                        this.checked12_1 = false
                        this.checked12_2 = false
                        break;
                    case "13_1":
                        this.radio13 == num.substr(3, 1) ? (this.radio13 = 0) : (this.radio13 = 1);
                        break;
                    case "13_2":
                        this.radio13 == num.substr(3, 1) ? (this.radio13 = 0) : (this.radio13 = 2);
                        break;
                    case "14_1":
                        this.radio14 == num.substr(3, 1) ? (this.radio14 = 0) : (this.radio14 = 1);
                        break;
                    case "14_2":
                        this.radio14 == num.substr(3, 1) ? (this.radio14 = 0) : (this.radio14 = 2);
                        break;
                    case "15_1":
                        this.radio15 == num.substr(3, 1) ? (this.radio15 = 0, this.checked15 = false) : (this.radio15 =
                            1, this.checked15 = true);
                        break;
                    case "15_2":
                        this.radio15 == num.substr(3, 1) ? (this.radio15 = 0) : (this.radio15 = 2);
                        this.checked15 = false
                        break;
                    case "15_3":
                        this.radio15 == num.substr(3, 1) ? (this.radio15 = 0) : (this.radio15 = 3);
                        this.checked15 = false
                        break;
                    case "17_1":
                        this.radio17 == num.substr(3, 1) ? (this.radio17 = 0) : (this.radio17 = 1);
                        break;
                    case "17_2":
                        this.radio17 == num.substr(3, 1) ? (this.radio17 = 0) : (this.radio17 = 2);
                        break;
                    case "17_2_1":
                        this.radio17_1 == num.substr(5, 1) ? (this.radio17_1 = 0) : (this.radio17_1 = 1);
                        break;
                    case "17_2_2":
                        this.radio17_1 == num.substr(5, 1) ? (this.radio17_1 = 0) : (this.radio17_1 = 2);
                        break;
                    case "18_1":
                        this.radio18 == num.substr(3, 1) ? (this.radio18 = 0, this.checked18 = false) : (this.radio18 =
                            1, this.checked18 = true);
                        break;
                    case "18_2":
                        this.radio18 == num.substr(3, 1) ? (this.radio18 = 0) : (this.radio18 = 2);
                        this.checked18 = false
                        break;
                    case "18_3":
                        this.radio18 == num.substr(3, 1) ? (this.radio18 = 0) : (this.radio18 = 3);
                        this.checked18 = false
                        break;
                }
            },
            // change1(value) {
            //   if (value === 1) {
            //     this.checked8_1 = false;
            //     this.checked8_2 = false;
            //   }
            // },
            // change2(value) {
            //   if (value === 2) {
            //     this.checked12_1 = false;
            //     this.checked12_2 = false;
            //   }
            // },
            // change3(value) {
            //   if (value !== 1) {
            //     this.checked15 = false;
            //   }
            // },
            // change4(value) {
            //   if (value !== 1) {
            //     this.checked18 = false;
            //   }
            // },
            // change5(value) {
            //   if (value == 1) {
            //     this.input1 = 0;
            //   }
            // },
            // change6(value) {
            //   if (value == 1) {
            //     this.input2 = 0;
            //   }
            // },
            // change7(value) {
            //   console.log(value);
            //   if (value == 1) {
            //     this.input3 = 0;
            //   }
            // },
            // 获取临床偏好数据
            hobbyData() {
                this.$http({
                        url: "/clinical/getClinical",
                        method: "get",
                    })
                    .then(({
                        data
                    }) => {
                        if (data.code === 200) {
                            if (JSON.parse(data.data) == null) {
                                console.log(data);
                                return false;
                            }
                            const lkj = JSON.parse(data.data);
                            console.log(lkj);

                            this.radio1 = lkj.tooth;
                            this.radio2 = lkj.bimaxillary;
                            this.radio3 = lkj.passiveAppliance;
                            this.radio4 = lkj.isSlice;
                            this.radio5 = lkj.delayStepsIPR;
                            this.input1 = lkj.stepsIPR;
                            this.radio6 = lkj.delayEnclosure;
                            this.input2 = lkj.stepsEnclosure;
                            this.radio7 = lkj.extraction;
                            this.input3 = lkj.delayExtraction;
                            this.radio8 = lkj.missingTeeth;
                            this.checked8_1 = lkj.missTeethOtherOne;
                            this.checked8_2 = lkj.missTeethOtherTwo;
                            this.radio9 = lkj.expansionBimaxillary;
                            this.radio10 = lkj.expansionCount;
                            this.radio11 = lkj.denticles;
                            this.radio12 = lkj.incisor;
                            this.checked12_1 = lkj.incisorOtherOne;
                            this.checked12_2 = lkj.incisorOtherTwo;
                            this.radio13 = lkj.applianceCutting;
                            this.radio14 = lkj.clearance;
                            this.radio15 = lkj.deformation;
                            this.checked15 = lkj.deformationType;
                            this.radio17 = lkj.frontSize;
                            this.radio17_1 = lkj.afterSize;
                            this.radio18 = lkj.relationship;
                            this.checked18 = lkj.relationshipType;
                            this.input19 = lkj.step;
                            this.textarea = lkj.specialRequirements;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            koko(i) {
                var fg = i;
                this.judge[i] = !this.judge[i];
                for (var j = 0; j < this.judge.length; j++) {
                    if (j != i) {
                        this.judge[j] = false;
                    }
                }

                this.$forceUpdate();
                // this.$set(this.judge,!this.judge[i],!this.judge[i])
                // console.log(this.judge)
            },
            // 保存临床偏好接口
            clinic() {
                this.LoadingOpen();
                this.$http({
                        url: "/clinical/saveClinical",
                        method: "post",
                        data: this.clinicData,
                    })
                    .then(({
                        data
                    }) => {
                        this.LoadingClose();
                        if (data.code === 200) {
                            this.$message({
                                message: data.msg,
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.visible = false;
                                    this.$emit("refreshDataList");
                                },
                            });
                            this.$router.push("/index");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },

            // 取消按钮
            cancel() {
                this.$router.push("/index");
            },
            // 提交按钮
            submit() {
                this.clinicData.tooth = this.radio1;
                this.clinicData.bimaxillary = this.radio2;
                this.clinicData.passiveAppliance = this.radio3;
                this.clinicData.isSlice = this.radio4;
                this.clinicData.delayStepsIPR = this.radio5;
                this.clinicData.stepsIPR = Number(this.input1);
                this.clinicData.delayEnclosure = this.radio6;
                this.clinicData.stepsEnclosure = Number(this.input2);
                this.clinicData.extraction = this.radio7;
                this.clinicData.delayExtraction = Number(this.input3);
                this.clinicData.missingTeeth = this.radio8;
                this.clinicData.missTeethOtherOne = this.checked8_1;
                this.clinicData.missTeethOtherTwo = this.checked8_2;
                this.clinicData.expansionBimaxillary = this.radio9;
                this.clinicData.expansionCount = this.radio10;
                this.clinicData.denticles = this.radio11;
                this.clinicData.incisor = this.radio12;
                this.clinicData.incisorOtherOne = this.checked12_1;
                this.clinicData.incisorOtherTwo = this.checked12_2;
                this.clinicData.applianceCutting = this.radio13;
                this.clinicData.clearance = this.radio14;
                this.clinicData.deformation = this.radio15;
                this.clinicData.deformationType = this.checked15;
                this.clinicData.frontSize = this.radio17;
                this.clinicData.afterSize = this.radio17_1;
                this.clinicData.relationship = this.radio18;
                this.clinicData.relationshipType = this.checked18;
                this.clinicData.step = this.input19;
                this.clinicData.specialRequirements = this.textarea;

                this.clinic();
            },

            // 控制 弹窗出来 chenyiSb
            chenyiSb() {
                this.$refs.tanc.dialogFormVisible = true;
                this.$refs.tanc.huoquxx();
                this.$refs.tanc.heade1();
                //  this.huisuyaci(this.daixinSb1)
            },
        },
    };
</script>
<style lang="less" scoped>
    // @media screen and (max-width: 1360px) {
    //   .love {
    //     margin-top: 32% !important;
    //   }
    // }
    @media screen and (max-width: 1060px) {

        // .love {
        //   margin-top: 50% !important;
        // }
        .clinic .body /deep/.el-col {
            padding-left: 20px !important;
        }
    }

    // @media screen and (max-width: 1035px) {
    //   .love {
    //     margin-top: 70% !important;
    //   }
    // }
</style>
<style lang="less" scoped>
    .clinic {
        margin-top: 55px;

        // .love {
        //   margin-top: 85px;
        // }
        .head {
            text-align: center;
            height: 66px;
            background: #565759;
            line-height: 66px;
            font-size: 18px;
            color: white;
            font-weight: 600;
        }

        .body {
            padding-bottom: 50px;
            background: #f9f9f9;

            .el-col {
                color: #666666;
                padding: 0 74px 0 64px;

                /deep/ .postpone .el-input .el-input__inner {
                    padding-left: 0;
                    text-align: center;
                }

                .default {
                    width: 100px;
                    color: #000;
                }
            }

            .rightB {
                border-right: 1px solid #707070;

                .el-radio-group {
                    /deep/ .el-radio {
                        width: 100%;
                        margin-bottom: 18px;
                        color: #666 !important;
                    }

                    /deep/ .el-radio__label {
                        font-size: 16px;
                    }

                    /deep/ .el-radio__input.is-checked+.el-radio__label {
                        color: #333 !important;
                        font-weight: 600;
                    }

                    /deep/ .el-radio__inner {
                        width: 20px;
                        height: 20px;
                        border-color: #747474;
                    }

                    /deep/ .el-radio__input.is-checked .el-radio__inner {
                        background: #fff;
                        border-color: #747474;
                    }

                    /deep/ .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
                        box-shadow: none;
                    }
                }

                .mji {
                    margin-left: 30px;
                    font-size: 16px;
                }

                .hu19 {
                    width: 36px;
                    height: 36px;
                    margin: 0 5px;
                    letter-spacing: 2px;

                    /deep/ .el-input__inner {
                        height: 100%;
                        line-height: 36px;
                        padding: 0;
                        text-align: center;
                        border: 1px solid #999999;
                        color: #f9a121;
                        font-weight: 600;
                    }
                }
            }

            .ffgg {
                width: 100%;
                padding: 0 84px 0 78px;
                box-sizing: border-box;

                p {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 10px;

                    span {
                        font-size: 16px;
                        color: #333;
                        font-weight: 600;
                        margin-right: 5px;
                    }
                }

                /deep/ .el-textarea__inner {
                    border-color: #cfcfcf;
                    font-size: 16px;
                    color: #000;
                    resize: none;
                    letter-spacing: 2px;
                }
            }
        }

        .footer {
            width: 100%;
            margin-top: 30px;
            overflow: hidden;
            padding-bottom: 180px;

            .save {
                margin-top: 10px;

                p {
                    font-size: 14px;
                    color: #333;
                    font-weight: 600;
                    line-height: 38px;
                }

                .xinjian {
                    width: 140px;
                    height: 36px;
                    font-size: 16px;
                    background: #1175d2 !important;
                    margin-left: 30px;
                    padding: 0;
                }

                .cancel {
                    width: 140px;
                    height: 36px;
                    color: #333;
                    border-color: #1175d2;
                    background: none !important;
                    padding: 0;
                }
            }
        }
    }

    .plan {
        font-size: 16px;
        color: #666;
        margin-bottom: 18px;
    }

    .postpone {
        float: right;
        color: #666 !important;
        font-weight: normal !important;

        .el-input {
            width: 24px;
            height: 22px;
            background: #f9f9f9;
            border-radius: 2px;
            border: 1px solid #999999;
            margin-top: -3px;

            /deep/ .el-input__inner {
                width: 100%;
                height: 100%;
                line-height: 22px;
                padding: 0;
                background: #f9f9f9;
                border: none;
                color: #f9a121;
                padding-left: 7px;
            }
        }
    }

    .to {
        width: 100%;
        line-height: 30px;
        margin-top: -6px;
        white-space: initial !important;
    }

    /deep/ .el-checkbox {
        margin-top: 0;
    }

    .ss {
        position: absolute;
        line-height: 30px;
    }

    .chooo,
    .lml {
        margin-left: 34px;
        margin-top: -14px;

        li {
            margin-top: 18px;
        }

        /deep/ .el-checkbox__inner {
            width: 20px;
            height: 20px;
            border-color: #747474;
        }

        /deep/ .el-checkbox__inner:hover {
            border-color: #747474;
        }

        /deep/ .el-checkbox__input.is-checked .el-checkbox__inner::after {
            width: 7px;
            height: 12px;
            border-color: #f9a121;
            left: 5px;
            top: 1px;
            border-width: 2px;
        }

        /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #333;
            font-weight: 600;
        }

        /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
            background: #fff;
            border-color: #747474;
        }

        /deep/ .el-checkbox__label {
            font-size: 14px;
            color: #666;
            border-color: #747474;
            line-height: 30px;
        }
    }

    /deep/ .el-checkbox.jk .el-checkbox__label {
        position: absolute;
    }
</style>