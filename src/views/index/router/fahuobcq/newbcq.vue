<template>
	<div class="newbcq">
		<div class="hoxuxinjian-nav">
			<p class="tit">新建保持器</p>

			<el-form class ref="form" :model="form" label-width="117px">
				<el-form-item class="xuanzheyag qqq" label="选择类型">
					<el-radio-group v-model="form.type">
						<el-radio label="1">术前保持器</el-radio>
						<el-radio label="2">术中保持器</el-radio>
						<el-radio label="3">术后保持器</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item class="xuanzheyag qqq" label="选择牙弓">
					<el-radio-group v-model="form.yag" @change="xuanze">
						<el-radio label="1">双颌</el-radio>
						<el-radio label="2">上颌</el-radio>
						<el-radio label="3">下颌</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item class="shulian borderbottom qqq2" label="数量">
					<div class="fl cv" v-show="tophe">
						<span class="fl sd">上颌</span>
						<el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="form.name1" class="hj"></el-input>
					</div>
					<div class="fl" v-show="bottomhe">
						<span class="fl sd">下颌</span>
						<el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="form.name2" class="hj"></el-input>
					</div>
				</el-form-item>
				<el-form-item class="shejshuombox clearfix borderbottom qqq" label="设计说明">
					<div class="fl Shejileft" v-show="tophe">
						<p class="tips">上颌</p>
						<el-radio-group class="clearfix" v-model="form.design1" @change="design1">
							<el-radio v-for="(item,i) in shejshuom1" :key="i" class="rdoone" :label="item.id">
								{{item.explain}}
								<span v-show="item.display" class="ipttit">{{item.jaw == 2?'上颌': '下颌'}}</span>
								<el-input v-show="item.display" :disabled="iptshuru" class="inputtext"
									oninput="value=value.replace(/[^\d]/g,'')" style="width:100px; height:40px;"
									v-model="taoyand1" @input="hahah">
								</el-input>
							</el-radio>


						</el-radio-group>
					</div>
					<div class="fl Shejiright" v-show="bottomhe">
						<p class="tips">下颌</p>
						<el-radio-group class="clearfix" v-model="form.design2" @change="design2">
							<el-radio v-for="(item,i) in shejshuom2" :key="i" class="rdoone" :label="item.id">
								{{item.explain}}
								<span v-show="item.display" class="ipttit">{{item.jaw == 2?'上颌': '下颌'}}</span>
								<el-input v-show="item.display" :disabled="iptshuru2" class="inputtext"
									oninput="value=value.replace(/[^\d]/g,'')" style="width:100px; height:40px;"
									v-model="taoyand2" @input="hahah">
								</el-input>
							</el-radio>
						</el-radio-group>
					</div>
				</el-form-item>
				<el-form-item class="tssm clearfix borderbottom qqq" label="特殊说明">
					<el-radio-group style="width:100%;" class="clearfix" v-model="form.tessm" @change="gaibtessm">
						<el-radio v-for="(item,i) in teshushuom" :key="i" class="rdoone" :label="item.id">
							{{item.design}}</el-radio>
					</el-radio-group>
					<div :class="teshushuombianl?'boxnav jinzhiclick':'boxnav'" :disabled="jinzhidianji">
						<div class="list1 clearfix">
							<div v-for="(item,i) in yacitop" :key="i" class="item">
								<div :style="item.kuang" class="boximg">
									<img @click.stop="list1fun.call(this,i)" v-show="!item.alter"
										:src="item.imageUrl" />
									<img @click.stop="list1fun.call(this,i)" v-show="item.alter"
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
									<img @click.stop="list2fun.call(this,i)" v-show="!item.alter"
										:src="item.imageUrl" />
									<img @click.stop="list2fun.call(this,i)" v-show="item.alter"
										:src="item.imageUrlactive" />
								</div>
							</div>
						</div>
					</div>
				</el-form-item>

				<el-form-item class="gudbaocq borderbottom qqq" label="固定舌侧保持器" label-width="150px">
					<el-radio-group v-model="form.gudseq" @change="gudinsecbcq">
						<el-radio v-for="(item, i) in gdscbcq" :key="i" :label="i">{{item.retainer}}</el-radio>
					</el-radio-group>
					<p class="ptxt" style="color:#666666; font-size:14px;width:73%;line-height:30px;">
						<span
							style="color:red;">**</span>如医生要求根据舌侧固定保持器（例如有粘接舌侧保持丝），需要在相应的位置对保持器进行切割，这会影响到保持器的耐久性。不仅要考虑到保持器的耐久性，而且要避免舌侧丝的脱落，医生有责任保证切割后保持器的就位良好。
					</p>
				</el-form-item>
				<el-form-item class="diz qqq" label="收货地址">
					<el-select v-model="form.diz" @change="getAddressId">
						<el-option v-for="(item,i) in baochiqsz" :key="i" :label="item.address" :value="item.id">
						</el-option>
					</el-select>
					<el-button @click="newbaochiqdizhi" style="font-size:16px;width:110px;color:#1175d2;" type="text">
						新增地址
					</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-row>
			<el-button @click.native="tijiao" class="tijbut" type="primary">提交</el-button>
			<el-button @click.native="quxiao" class="quxbut" type="primary">取消</el-button>
		</el-row>

		<newsite @pushdizhishuju="pushdizhishuju" ref="baochiq"></newsite>
	</div>
</template>
<script>
	import newsite from "@/views/newtangc/newsite";
	export default {
		components: {
			newsite
		},
		data() {
			return {
				baochiqsz: [],
				input1: "",
				input2: "",
				textarea: "",
				teshushuombianl: true,
				xiaheipt: "",
				form: {
					type: "1",
					yag: "1",
					name1: "",
					name2: "",
					design1: '',
					design2: '',
					shul: "",
					diz: "",
					resource1: "",
					resource2: "",
					amount: "",
					gudseq: 0,
					tessm: 1
				},
				jinzhidianji: false,
				quanhe: '',
				tophe: true,
				bottomhe: true,
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
				addressId: Number,
				gdscbcq: [],
				// 设计说明 
				shejshuom1: [],
				shejshuom2: [],
				// 设计说明input v-model
				taoyand1: '',
				taoyand2: '',
				// 设计说明 控制 为选中 不能输入input
				iptshuru: true,
				iptshuru2: true,
				// 特殊说明 
				teshushuom: [],

				checkList: [],
				abab: [],

				shasini: [],

				// 存放 牙齿数组
				yachitopshuzu: [],

				 httpflag:true,
			};
		},
		methods: {
			hahah() {
				// console.log(Number(this.taoyand[5]))
			},
			design1(val) {
				// console.log(val)
				if (val === 3) {
					this.iptshuru = false;
				} else {
					this.iptshuru = true;
				}
			},
			design2(val) {
				// console.log(val)
				if (val === 7) {
					this.iptshuru2 = false;
				} else {
					this.iptshuru2 = true;
				}
			},
			// 提交
			tijiao() {
				if(!this.httpflag) return;
      			this.httpflag = false;
				let that = this;
				const stageCount = this.$store.state.stageCountId
				const stageName = this.$store.state.stageNameId
				// 循环上排牙齿
				this.yacitop.forEach(function (a, b) {
					if (a.alter == true) {
						that.yachitopshuzu.push({
							teethIndex: a.shuzhi,
							id: 0,
							stageCount: stageCount, 
							stageName: stageName, 
							zlRetainerId: 0
						})

					}
				})
				// 循环下排牙齿
				this.yacibottom.forEach(function (a, b) {
					// console.log(a)
					if (a.alter == true) {
						that.yachitopshuzu.push({
							teethIndex: a.shuzhi,
							id: 0,
							stageCount: stageCount, 
							stageName: stageName, 
							zlRetainerId: 0
						})

					}
				})
				that.abab = [];
				if (this.form.design1) {
					that.abab.push({
						id: this.form.design1
					});
				}
				if (this.form.design2) {
					that.abab.push({
						id: this.form.design2
					});
				}
				this.shasini = [];
				this.shasini.push({
					id: this.form.gudseq + 1,
				})
				if (this.form.yag == 1 && ((!this.form.name1 || !this.form.name2) || this.abab.length < 2)) { //双颌判断
					this.$message({
						message: '请输入双颌数量或设计说明',
						type: "error",
						duration: 1500,
						onClose: () => {
                            this.httpflag = true;
							this.visible = false;
							this.$emit("refreshDataList");
						}
					});
					return false
				}
				if (this.form.yag == 2 && (!this.form.name1  || this.abab.length == 0)) { //上颌判断
					this.$message({
						message: '请输入上颌数量或设计说明',
						type: "error",
						duration: 1500,
						onClose: () => {
                            this.httpflag = true;
							this.visible = false;
							this.$emit("refreshDataList");
						}
					});
					return false
				}
				if (this.form.yag == 3 &&  (!this.form.name2 || this.abab.length == 0)) { //下颌判断
					this.$message({
						message: '请输入下颌数量或设计说明',
						type: "error",
						duration: 1500,
						onClose: () => {
                            this.httpflag = true;
							this.visible = false;
							this.$emit("refreshDataList");
						}
					});
					return false
				}
				if (!this.form.diz) {
					this.$message({
						message: '请输入正确的地址',
						type: "error",
						duration: 1500,
						onClose: () => {
                            this.httpflag = true;
							this.visible = false;
							this.$emit("refreshDataList");
						}
					});
					return false;
				}
				this.LoadingOpen();
				this.$http({
					url: "/zhengLiRetainer/createZhengLiRetainer",
					method: "POST",
					data: {
						// 病例id
						caseInfoId: this.$store.state.caseId,
						stageName: this.$store.state.stageNameId,
						stageCount: this.$store.state.stageCountId,
						// 选择类型
						type: Number(this.form.type),
						// 选择牙弓 1.双颌 2.上颌 3.下颌
						dentalArch: Number(this.form.yag),
						// 上颌步数
						upSteps: Number(this.taoyand1),
						// 下颌步数
						downSteps: Number(this.taoyand2),
						// 上颌数量
						upArchCount: Number(this.form.name1),
						// 下颌数量
						downArchCount: Number(this.form.name2),
						// 设计说明，此处放JSON数组 id:1.患者上颌新印模 2.使用最近的....5.患者下颌新印模
						zhengLiDesigns: this.abab,
						// 特殊说明 id:1.无 2.在以下牙位上放置假牙空泡 需要传递桥体位置
						specialDescription: Number(this.form.tessm),
						// 桥体位置，此处放JSON数组 id: 1-1、2-17、9-21、17-48、25-31
						bridges: this.yachitopshuzu,
						// 此处放JSON数组 固定舌侧保持器 id:1.无 2.保留舌侧保持其，并用保持器将其覆盖....
						fixedRetainers: this.shasini,
						// 收货地址
						addressId: this.form.diz,
					}
				}).then(({
					data
				}) => {
					this.LoadingClose();
					if (data.code == 200) {
						this.$message({
							message: '保存成功',
							type: 'success',
							duration: 1500,
							onClose: () => {
								this.visible = false
								this.$emit('refreshDataList')
							}
						});
						this.$router.push("./index");
						this.$store.commit("indexRemove", 3);
					} else {
						this.$message({
							message: data.msg,
							type: "error",
							duration: 1500,
							onClose: () => {
								this.visible = false;
								this.$emit("refreshDataList");
							}
						});
					}
					this.httpflag = true;
				}).catch(err => {
					console.log(err)
				})
			},
			// 多选框
			huoquduoxuankval(val) {},
			// 固定舌侧保持器 
			gudinsecbcq() {
				console.log(this.form.gudseq)
			},
			// 选择 上 下 全颌 的 显示与隐藏
			xuanze(value) {
				if (value == 1) {
					this.tophe = this.bottomhe = true;
				} else if (value == 2) {
					this.bottomhe = false;
					this.tophe = true;
				} else if (value == 3) {
					this.bottomhe = true;
					this.tophe = false;
				}

				// this.shejishuom(value);
			},

			// 改变特殊说明 牙齿的 点击 与否 
			gaibtessm(value) {
				// console.log(this.form.tessm)
				if (value == 1) {
					this.teshushuombianl = true;
					// 关闭 其他 所以复选框 
					this.yacitop.forEach(function (a, b) {
						a.alter = false;
					})
					this.yacibottom.forEach(function (a, b) {
						a.alter = false;
					})
				} else {
					this.teshushuombianl = false
				}
			},
			quxiao() {
				this.$router.push("./index");
				this.$store.commit("indexRemove", 3);
			},
			list1fun(i) {
				if (!this.yacitop[i].alter) {}
				this.yacitop[i].alter = !this.yacitop[i].alter;
			},
			list2fun(i) {
				if (!this.yacibottom[i].alter) {}
				this.yacibottom[i].alter = !this.yacibottom[i].alter;
			},

			//获取地址id
			getAddressId(e) {
				var that = this;
				this.baochiqsz.forEach(function (el) {
					if (el.address == e) {
						that.addressId = el.id;
					}
				});
			},
			// 新增地址
			newbaochiqdizhi() {
				this.$refs.baochiq.dialogFormVisibledizhi = true;
			},
			// 获取地址 列表
			huoqudizhi() {
				this.$http({
						url: "/deliveryAddress/getAddressList",
						method: "get"
					})
					.then(({
						data
					}) => {
						if (data.code == 200) {
							data = JSON.parse(data.data);
							var that = this;
							data.forEach(function (el, idx) {
								that.baochiqsz.push({
									id: el.id,
									address: el.country + el.province + el.city + el.area + el
										.address + ' - ' + el.deliveryName + ' - ' + el.contactNumber
								});
							});
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			pushdizhishuju() {
				this.huoqudizhi();
				// this.form.diz =
				//   this.$refs.tanchuangdizhi.country +
				//   this.$refs.tanchuangdizhi.province +
				//   this.$refs.tanchuangdizhi.city +
				//   this.$refs.tanchuangdizhi.area +
				//   this.$refs.tanchuangdizhi.form.diz;
				// this.dizshuzu.push(this.form.diz);
			},
			// 获取设计说明
			shejishuom(baba) {
				this.$http({
						url: "/zhengLiRetainer/zhengLiDesign",
						method: "get",
						params: {
							dentalArch: baba
						}
					})
					.then(({
						data
					}) => {

						if (data.code == 200) {
							data = JSON.parse(data.data);
							// console.log(data)
							this.shejshuom1 = data.slice(0, 4);
							this.shejshuom2 = data.slice(4, data.length);
							console.log(this.shejshuom1, this.shejshuom2)
						} else {

						}
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		mounted() {
			this.shejishuom(1)
			// 地址列表
			this.huoqudizhi();
			var that = this;
			//获取舌侧保持器
			this.$http({
					url: "/zhengLiRetainer/fixedRetainers",
					method: "get"
				})
				.then(({
					data
				}) => {
					if (data.code == 200) {
						data = JSON.parse(data.data);
						that.gdscbcq = data;
						// console.log(data);
					}
				})
				.catch(err => {
					console.log(err);
				});
			// 正丽保持器具特殊说明列表
			this.$http({
					url: "/zhengLiRetainer/specialDesign",
					method: "get"
				})
				.then(({
					data
				}) => {
					if (data.code == 200) {
						data = JSON.parse(data.data);
						this.teshushuom = data;
						// console.log(data);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
</script>
<style scoped lang="less">
	.jinzhiclick {
		pointer-events: none;
	}

	.qqq {
		position: relative;

		/deep/ .el-form-item__label::after {
			content: '*';
			font-size: 16px;
			color: #ff0000;
			font-weight: 900;
		}

	}

	.qqq2 {
		position: relative;

		/deep/ .el-form-item__label::after {
			content: '*';
			font-size: 16px;
			color: #ff0000;
			font-weight: 900;
			position: absolute;
			left: 56px;
		}

	}

	/deep/.boxnav {
		width: 601px;
		font-size: 20px;
		position: relative;
		left: 11%;

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
						cursor: pointer;
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
			margin-top: 26px;
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
						cursor: pointer;
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

	/deep/.el-form-item__label {
		font-weight: 600;
		color: black;
		font-size: 16px;
	}

	/deep/.tijbut {
		font-size: 16px;
	}

	.newbcq {
		.el-row {
			margin-top: 20px;
			margin-bottom: 20px;

			.quxbut {
				background: none !important;
				margin-left: 30px;
				color: #333;
				font-size: 16px;
			}
		}

		/deep/.el-radio__inner {
			width: 20px;
			height: 20px;
		}

		.hoxuxinjian-nav {
			padding-left: 95px;
			box-sizing: border-box;
			width: 100%;
			background: #f9f9f9;
		}

		.borderbottom {
			border-bottom: 1px solid #aeaeae;
			margin-bottom: 15px;
			padding-bottom: 15px;
		}

		.tit {
			color: #1175d2;
			width: 117px;
			padding-top: 40px;
			padding-bottom: 70px;
			box-sizing: border-box;
			font-weight: 600;
			font-size: 16px;
		}

		.xiaotit {
			width: 117px;
		}

		/deep/.el-form {
			padding-bottom: 50px;

			.shejshuombox {
				padding-top: 15px;
				padding-bottom: 40px;

				.Shejileft {
					width: 45%;
					margin-right: 5%;
				}

				.Shejiright {
					width: 45%;
				}

				.tips {
					font-size: 16px;
					color: #1175d2;
					float: left;
					margin-top: -10px;
				}

				.ipttit {
					padding-left: 20px;
					padding-right: 10px;
				}

				.el-input__inner {
					width: 80px;
					height: 30px;
					line-height: 30px;
					border: 1px solid #1175d2;
					box-sizing: border-box;
				}

				.el-radio-group {
					float: left;
					width: 85%;
					margin-left: 20px;

					.el-radio {
						display: block;
						font-size: 16px;
						color: #666666;
						margin-bottom: 20px;

						.el-radio__input {
							span {
								border: 1px solid #1175d2;
								border-radius: 50%;
							}
						}

						.el-radio__label {
							.el-input__inner {
								text-align: center;
								border: 1px solid #1175d2;
							}
						}
					}
				}
			}

			.tssm {
				padding-top: 15px;
				padding-bottom: 10px;

				.el-radio-group {
					float: left;

					.el-radio {
						display: block;
						float: left;
						font-size: 16px;
						color: #666666;
						margin-bottom: 20px;

						.el-radio__input {
							span {
								border: 1px solid #1175d2;
								border-radius: 50%;
							}
						}
					}

					.rdoone {
						margin-right: 80px;
					}
				}
			}

			.gudbaocq {
				padding-top: 15px;
				padding-bottom: 25px;

				.el-radio-group {
					.el-radio {
						display: block;
						font-size: 16px;
						color: #666666;
						margin-bottom: 20px;
						margin-right: 0px;

						.el-radio__input {
							span {
								border: 1px solid #1175d2;
								border-radius: 50%;
							}
						}
					}
				}

				.el-checkbox-group {
					font-size: 16px;
					color: #666666;
					// width:45%;
					display: block;

					.el-checkbox {
						display: block;

						.is-checked {
							// background: #1175d2;
							border-radius: 50%;
						}

						.el-checkbox__input.is-checked .el-checkbox__inner,
						.el-checkbox__input.is-indeterminate .el-checkbox__inner {
							background: #1175d2
						}

						.el-checkbox__inner {
							width: 20px;
							height: 20px;
							border-radius: 50%;
							border: 1px solid #1175d2;
							// background: #1175d2;
							box-sizing: border-box;
							position: relative;

							&:after {
								content: "";
								width: 3px;
								height: 3px;
								background: #fff;
								border-radius: 50%;
								position: absolute;
								left: 50%;
								top: 50%;
								transform: translate(-50%, -50%);
							}
						}
					}

					.ipttit {
						padding-left: 20px;
						padding-right: 10px;
					}

					.el-input__inner {
						width: 80px;
						height: 30px;
						line-height: 30px;
						border: 1px solid #1175d2;
						box-sizing: border-box;
					}
				}
			}

			.xuanzheyag {
				.el-radio-group {
					.el-radio {
						font-size: 16px;
						color: #666666;
						margin-bottom: 20px;

						.el-radio__input {
							span {
								border: 1px solid #1175d2;
								border-radius: 50%;
							}
						}
					}
				}
			}

			.shulian {
				.el-input__inner {
					width: 80px;
					height: 40px;
					line-height: 40px;
					border: 1px solid #1175d2;
					text-align: center;
				}

				.el-form-item__label {
					letter-spacing: 25px;
					line-height: 40px;
				}

				.cv {
					margin-right: 50px;
				}

				.sd {
					margin-right: 20px;
				}

				.hj {
					width: auto;
				}
			}

			.el-form-item__label {
				padding: 0px;
				text-align: left;
				line-height: normal;
				height: 40px;
			}

			.diz {
				padding-top: 15px;
			}

			.diz .el-form-item__label {
				line-height: 40px;

			}

			.diz .el-input__inner {
				width: 800px;
				height: 40px;
				line-height: 40px;
				border: 1px solid #1175d2;
			}
		}
	}

	/deep/.el-button {
		padding: 0px;
		width: 140px;
		height: 36px;
	}

	@media all and (-ms-high-contrast: none),
	(-ms-high-contrast: active) {
		/deep/.ipttit {
			padding-left: 50px !important;
		}
	}

	@media screen and (max-width: 1300px) {
		/deep/.shejtop {
			width: 100% !important;
			margin-bottom: 50px;
		}

		/deep/.shejbottom {
			width: 100% !important;
		}

		/deep/.diz .el-input__inner {
			width: 600px !important;
		}

		/deep/.boxnav {
			margin-left: -120px !important;
		}

		/deep/.ptxt {
			width: 80% !important;
		}

		.hoxuxinjian-nav {
			padding-left: 35px !important;
		}
	}

	@media screen and (max-width: 1250px) {

		// .hoxuxinjian-nav {
		// 	padding-left: 15px !important;
		// }
		// /deep/.el-form .shejshuombox .el-checkbox-group .el-input__inner{
		// 		width: 40px !important;
		// 		padding: 0 5px;
		// }
		.newbcq /deep/.el-form .shejshuombox .el-checkbox-group {
			display: block;
			position: static;
			width: 75%;
		}
	}
</style>