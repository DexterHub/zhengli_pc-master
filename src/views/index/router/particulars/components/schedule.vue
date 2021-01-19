<template>
	<div id="particulars-schedule">
		<el-timeline :reverse="reverse">
			<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.startTime+''">
				<el-image slot="dot" :src="index == 0?status[1]:status[0]"></el-image>
				{{activity.processName}}
				<el-row class="butonezu" v-if="activity.type == 9">
					<el-button class="huyi2" @click="logisticsData(activity.phone,activity.takeNo)">查看</el-button>
				</el-row>
				<!-- <el-row :class="{buttwozu:true,clearfix:true,planFlag:activity.planFlag}" v-if="activity.type == 6 && activity.processName!='方案需修改'"> -->
				<el-row :class="{buttwozu:true,clearfix:true,planFlag:!activity.planFlag}" v-if="activity.type == 6 && activity.processName!='方案需修改'">
					<el-button @click="skip" :disabled="!activity.planFlag">
						Web OrthoPlus		
					</el-button>
					<!-- <el-button>
							OrthoPlus
					</el-button> -->
				</el-row>
				<img v-if="activity.status <= 38 && activity.status >= 35" :src="reminder[0]" class="reminderStyle" @click="reminderClick(index)">
				<div class="line"></div>
				<div class="reminder" v-if="arrflag[index]">
                    <div class="top">
                        <span>本次生产：</span>
                        <span>上颌 <i>10-11</i></span>
                        <span>下颌<i>10-11</i></span>
                    </div>
                    <div class="bottom">
                        <span>总步数：</span>
                        <span>上颌 <i>1-50</i></span>
                        <span>下颌<i>1-50</i></span>
                    </div>
                </div>
			</el-timeline-item>
		</el-timeline>
		<el-dialog :visible.sync="centerDialogVisible" :close-on-press-escape="false" :close-on-click-modal="false">
			<p class="trackingNumber">物流单号：<span>{{tokeno}}</span></p>
			<div class="koko">
				<p class="fl p1">收货人: <span>{{receiver}}</span></p>
				<p class="fl">手机号：<span>{{phone}}</span></p>
			</div>
			<div class="wrap">
				<el-timeline>
					<el-timeline-item v-for="(activity, index) in activities2" :key="index" :icon="activity.icon"
						:type="activity.type" :color="activity.color" :size="activity.size"
						>
						<p :class="index===0?'date':'specificTime'">{{activity.desc}}</p>
						<p :class="index===0?'date':'specificTime'">{{activity.next}}</p>
						<div class="time">
							<p :class="index===0?'date':'specificTime'">{{activity.date}}</p>
							<p :class="index===0?'date':'specificTime'">{{activity.time}}</p>
						</div>
					</el-timeline-item>
				</el-timeline>
			</div>

		</el-dialog>
	</div>
</template>
<script>
	import {
		dateToStr
	} from "@/util/validate.js";
	export default {
		data() {
			return {
				centerDialogVisible: false,
				reverse: false,
				reverse2: false,
				type: [],
				status: [
					require("@/assets/2.2病例详情/已完成.png"), 
					require("@/assets/2.2病例详情/进行中.png"), 
				],
				reminder:[require("@/assets/2.2病例详情/reminder.png")],
				activities2: [],
				activities: [],
				tokeno:'',
				phone:'',
				receiver:'',
				arrflag:[false,false,false,false]
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.$http({
						url: "/caseInfo/caseProcess",
						method: "POST",
						data: {
							caseId: this.$store.state.caseId
						}
					})
					.then(({
						data
					}) => {
						if (data.code == 200) {
							this.activities = JSON.parse(data.data);
							this.activities.forEach((el) => {
								if(el.receiver){
									this.tokeno=el.takeNo;
									this.phone=el.phone;
									this.receiver = el.receiver;
								}
								el.startTime = dateToStr(new Date(el.startTime))
							});
							// this.logisticsData();
							// console.log(this.activities.reverse());
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 物流接口
			logisticsData(phone,takeNo){
				this.phone = phone;
				this.tokeno = takeNo;
				this.centerDialogVisible = true
				this.$http({
						url: "/caseInfo/getSF",
						method: "POST",
						data: {
							takeNo,
							phone
						}
				})
					.then(({
						data
					}) => {
						// console.log(data)
						if (data.code == 200) {
							// console.log(JSON.parse(data.data).reverse());
							this.activities2 = JSON.parse(data.data);
							var that = this;
							this.activities2.forEach(function (el,idx) {
									// type: 'primary',
									// color: '#f99400',
								if(idx === 0){
									el.color='#f99400';
								}else{
									el.color='#f9c67c';
								}
								el.type='primary';
							
							});
							// this.activities2;
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			skip(){
				 window.open(window.location.href.replace('particulars',`three?caseId=${this.$store.state.caseId}`))
			},
			reminderClick(index){
				for(let i = 0; i<this.arrflag.length; i++){
					if(index!=i){
						this.$set(this.arrflag,i,false)
					}
				}
				this.$set(this.arrflag,index,!this.arrflag[index])
			}
		}
	};
</script>
<style lang="less" scoped>
	@media screen and (max-width: 1660px) {
		#particulars-schedule .el-timeline-item[data-v-0b4bed50] .butonezu .el-button {
			transform: scale(0.8);
			margin: 0px;
		}

		#particulars-schedule .el-timeline-item[data-v-0b4bed50] .buttwozu .el-button {
			transform: scale(0.8);
			margin: 0px;
			width: 140px;
			float: left;
			display: block;
		}

		#particulars-schedule .el-timeline-item[data-v-0b4bed50] .buttwozu {
			width: 140px !important;
			// bottom: -36% !important;
			right: 2% !important;
		}
		#particulars-schedule /deep/ .el-dialog{
			margin-top: 18vh !important;
			transform: scale(0.9);
			height: 475px !important;
		}
		#particulars-schedule .el-dialog  .el-dialog__body .koko{
			margin-bottom: 20px !important;
		}
		
		#particulars-schedule .el-dialog  .el-dialog__body .wrap{
			height: 300px !important;
		}
	}

	@media screen and (max-width: 1360px) {
		#particulars-schedule /deep/ .el-dialog{
			transform: scale(0.8);
			height: 450px !important;
		}
		#particulars-schedule .el-dialog  .el-dialog__body .koko{
			margin-bottom: 20px !important;
		}
		
		#particulars-schedule .el-dialog  .el-dialog__body .wrap{
			height: 300px !important;
		}
	}
</style>
<style scoped lang="less">
	.planFlag {
		/deep/.el-button {
			background: #666 !important;
			border: none !important;
			span {
				color: #fff !important;
			}
		}
	}
a {
	text-decoration:none;
	color: #fda21c;
	&:hover {
		color: #333;
	}
}
	@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) { //针对ie
		#particulars-schedule .el-dialog .el-dialog__body .wrap .el-timeline-item__wrapper{
			top:-7px;
		}
	}
	#particulars-schedule {
		overflow: auto;

		.el-timeline-item {
			height: 70px;
			padding-bottom: 34px;

			.el-timeline-item__dot {
				.el-image {
					margin-left: -8px;
					width: 26px;
					height: 26px;
				}
			}

			/deep/.el-timeline-item__wrapper {
				position: relative;
				padding-left: 36px;
				font-size: 16px;
			}

			/deep/ .el-timeline-item__tail {
				border-left-style: dashed;
			}

			.line {
				height: 0;
				width: 94%;
				position: absolute;
				bottom: -34px;
				right: 0;
				border: 0.5px solid #d6d6d6;
			}

			/deep/.buttwozu {
				// height:36px;
				// width:100%;
				position: absolute;
				right: 2%;
				bottom: 0%;
				z-index: 1;

				.el-button {
					width: 140px;
					height: 36px;
					padding: 0;
					line-height: 36px;
					border: 1px solid #f99400;
					box-sizing: border-box;
					background: #f9f9f9;

					span {
						color: #fda21c;
					}

					// span:hover {
					// 	color: #fff;
					// }
				}

				// .el-button:hover {
				//   background-color: red;
				// }

				.el-button:active {
					// background-color:#1175d2;
				}
			}

			.butonezu {
				// height:36px;
				// width:100%;
				position: absolute;
				right: 2%;
				// margin-top:-15%;
				bottom: 0%;
				z-index: 1;

				/deep/.el-button {
					width: 140px;
					height: 36px;
					padding: 0;
					line-height: 36px;
					background: #f99400;
					border: none;

					span {
						color: #fff;
					}
				}
			}

			.huyi2:hover {
				background-color: #fda21c !important;
			}

			// .line:last-child{
			//     border:none;
			// }
		}

		/deep/ .el-dialog {
			width: 570px;
			height: 610px;
			// margin-top: 18vh !important;
			background: #f9f9f9;
			padding-left: 50px;

			.el-dialog__header {
				padding: 25px 25px 0 40px;

				 .el-dialog__title {
					font-weight: normal;
					padding: 0;
				}

				.el-dialog__headerbtn {
					top: 15px;
					right: 17px;
				}

				.el-dialog__headerbtn .el-dialog__close {
					width: 14px;
					height: 14px;
					color: #4b4b4b;

				}
			}

			.el-dialog__body {
				padding: 0;
				text-align: center;
				font-size: 16px;

				.trackingNumber {
					text-align: left;
					margin-bottom:10px;
				}
				
				.koko {
					overflow: hidden;
					margin-bottom: 48px;

					.p1 {
						margin-right: 60px;
					}
				}

				.wrap {
					height: 420px;
					padding-right: 120px;
					overflow: auto;
					.el-timeline-item{
						height: auto;
					}
					.el-timeline{
						padding-top:10px ;
					}
					.el-timeline-item__wrapper{
						width: 70%;
						padding-left: 168px;
						top:-12px;
					}
					.el-timeline-item__timestamp{
						
					}
					.el-timeline-item__tail{
						height:100%;
						border-left-style: solid;
						border-left-color: #999999;
						left: 129px;
						// top:22px;
					}
					.el-timeline-item__node--normal{
						left: 120px;
						width: 20px;
						height: 20px;
					}
					.el-timeline-item__content,.el-timeline-item__timestamp{
						text-align: left;
					}
					.el-timeline-item__timestamp.is-bottom{
						margin-top: 5px;
						color: #666 !important;
					}
					.time{
						position: absolute;
						left: 0;
						top:0;
						font-size: 16px;
						
					}
					.date{
							color: #333 !important;
					}
					.specificTime{
						color: #666 !important;
					}
				}
			}


		}
	}
</style>

<style scoped lang="less">
	@media screen and (max-width: 1660px) {
		#particulars-schedule .el-timeline-item .butonezu .el-button {
			transform: scale(0.8) !important;
			margin: 0px !important;
		}

		#particulars-schedule .el-timeline-item .buttwozu .el-button {
			transform: scale(0.8) !important;
			margin: 0px !important;
			width: 140px !important;
			float: left !important;
		}

		#particulars-schedule .el-timeline-item .buttwozu {
			width: 140px !important;
			// bottom: -36% !important;
			right: 2% !important;
		}
	}

	@media screen and (max-width: 1360px) {}
</style>
<style lang="less" scoped>
.el-timeline .el-timeline-item {
	position: relative;
}
.reminder {
	position: absolute;
	top: 0;
	left: 165px;
	width: 260px;
	height: 80px;
	padding: 15px;
	border-radius: 4px;
	box-shadow: 2px 2px 5px #aaa;
	justify-content: space-between;
	box-sizing: border-box;
	background: #fff;
	z-index: 5;
	.top,.bottom {
		font-size: 14px;
		color: #333;
		i {
			font-style: normal;
		}
		span:nth-of-type(1){
			color: #1175d2;
		}
		span:nth-of-type(2){
			margin-right: 26px;
		}
	}
	.bottom {
		margin-top: 10px;
		span:nth-of-type(1){
			margin-right: 13px;
		}
		span:nth-of-type(2){
			margin-right: 34px;
		}
	}
}

.reminderStyle {
	position: absolute;
	top: 3px;
	left: 138px;
	width: 20px;
	height: 20px;
}
</style>