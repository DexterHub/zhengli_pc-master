<template>
  <div class="feedback">
    <div>
      <ul>
        <li :class="activeTag ? 'active' : ''" @click="activeTag = true">所有</li>
        <li :class="!activeTag ? 'active' : ''" @click="activeTag = false">文件</li>
      </ul>
      <div v-if="activeTag" class="feedbackMsg">
        <div class="msgArea">
          <div id="messageList">
            <template v-for="data of messages">
              <p class="month">{{ data.date }}</p>
              <div v-for="(item, idx) of data.chatting_records" :class="item.mymsg ? 'myMsg_box' : 'message_box'">
                <div class="head_img">
                  <img :src="item.head_img" />
                </div>
                <div class="bubble">
                  <p class="time">{{ item.time }}</p>
                  <div class="message" v-html="item.content"></div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="sendBox">
          <div class="fnBtn">
            <div class="potoBtn">
              <img src="../../../assets/img/photograph.png" />
            </div>
            <div class="fileBtn">
              <img src="../../../assets/img/paper.png" />
              <input type="file" />
            </div>
            <div class="screenshotBtn" @click="screensHot">
              <img src="../../../assets/img/screenshot.png" />
            </div>
          </div>
          <el-input type="textarea" placeholder="请输入内容" resize="none" v-model="textarea" @keydown.native="pressEnter($event)"> </el-input>
          <div class="sendBtn" @click="sendBtnClick">发送</div>
        </div>
      </div>
      <div v-else class="feedbackFile">
        <div>
          <template v-for="data of filesData">
            <p>{{ data.date }}</p>
            <el-row :gutter="30">
              <el-col v-for="file of data.files" :span="6">
                <!-- <div></div> -->
                <div :style="'background-image:url(' + file + ');'"></div>
                <p title="yc.png">yc.png</p>
              </el-col>
            </el-row>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import "../../assets/css/base.less";
// let date = new Date();
import $ from "jquery";
import { Slicing } from "../../../util/screenhot.js";
export default {
  data() {
    return {
      messages: [
        {
          date: "12.30",
          chatting_records: [
            {
              mymsg: true,
              content: "<p>在吗？</p>",
              head_img: require("../../../assets/img/touxiang.png"),
              time: "12:20"
              // date: "12.30"
            },
            {
              mymsg: false,
              content: "<p>那个小伙子一个冲拳，很快啊，我大意了啊，没有闪，一个20多岁小伙子，欺负一个70多数的老人，这好吗？这不好</p>",
              head_img: require("../../../assets/img/touxiang.png"),
              time: "12:50"
              // date: "12.30"
            }
          ]
        },
        {
          date: "12.31",
          chatting_records: [
            {
              mymsg: true,
              content: "<p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>",
              head_img: require("../../../assets/img/touxiang.png"),
              time: "12:10"
              // date: "12.31"
            }
          ]
        }
      ],
      // messages: [
      //   {
      //     mymsg: true,
      //     content: "<p>在吗？</p>",
      //     head_img: require("../../../assets/img/touxiang.png"),
      //     time: "12:20",
      //     date: "12.30"
      //   },
      //   {
      //     mymsg: false,
      //     content: "<p>那个小伙子一个冲拳，很快啊，我大意了啊，没有闪，一个20多岁小伙子，欺负一个70多数的老人，这好吗？这不好</p>",
      //     head_img: require("../../../assets/img/touxiang.png"),
      //     time: "12:50",
      //     date: "12.30"
      //   },
      //   {
      //     mymsg: true,
      //     content: "<p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>",
      //     head_img: require("../../../assets/img/touxiang.png"),
      //     time: "12:10",
      //     date: "12.31"
      //   }
      // ],
      filesData: [
        {
          date: "2020.12.28",
          files: [require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png")]
        },
        {
          date: "2020.12.28",
          files: [require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png")]
        },
        {
          date: "2020.12.30",
          files: [require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png")]
        },
        {
          date: "2020.12.30",
          files: [require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png"), require("../../../assets/img/yc.png")]
        }
      ],
      textarea: "",
      activeTag: true
    };
  },
  methods: {
    //发送消息
    sendBtnClick() {
      if (this.textarea) {
        // console.log(this.textarea);
        let date = new Date();
        let s = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let t = date.getHours() + ":" + s;
        let d = date.getMonth() + 1 + "." + date.getDate();
        if (this.messages[this.messages.length - 1].date === d) {
          // console.log(111);
          this.$set(this.messages[this.messages.length - 1].chatting_records, this.messages[this.messages.length - 1].chatting_records.length, {
            mymsg: true,
            content: "<p>" + this.textarea + "</p>",
            head_img: require("../../../assets/img/touxiang.png"),
            time: t
            // date: d
          });
        } else {
          this.$set(this.messages, this.messages.length, {
            date: d,
            chatting_records: [
              {
                mymsg: true,
                content: "<p>" + this.textarea + "</p>",
                head_img: require("../../../assets/img/touxiang.png"),
                time: t
              }
            ]
          });
        }
        this.textarea = "";
        this.$nextTick(() => {
          $(".message:last")[0].scrollIntoView();
        });
      }
    },
    // 截图
    screensHot(e) {
      // cutImage();
      let date = new Date();
      let s = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let t = date.getHours() + ":" + s;
      let d = date.getMonth() + 1 + "." + date.getDate();
      const screensHot = new Slicing();
      screensHot.init().then((res) => {
        if (this.messages[this.messages.length - 1].date === d) {
          // console.log(111);
          this.$set(this.messages[this.messages.length - 1].chatting_records, this.messages[this.messages.length - 1].chatting_records.length, {
            mymsg: true,
            content: "<img src='" + res + "'>",
            head_img: require("../../../assets/img/touxiang.png"),
            time: t
            // date: d
          });
        } else {
          this.$set(this.messages, this.messages.length, {
            date: d,
            chatting_records: [
              {
                mymsg: true,
                content: "<img src='" + res + "'>",
                head_img: require("../../../assets/img/touxiang.png"),
                time: t
              }
            ]
          });
        }
        this.$nextTick(() => {
          // console.log($(".message:last"));
          $(".message:last")[0].scrollIntoView();
        });
      });
    },
    //回车发送
    pressEnter() {
      if (event.keyCode === 13) {
        this.sendBtnClick(); // 发送文本
        // console.log(11111111);
        event.preventDefault(); // 阻止浏览器默认换行操作
        return false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/base.less";
.feedback {
  font-size: 16 / @rem;
  height: 100%;
  width: 580 / @rem;
  // width: 100%;
  padding: 34 / @rem 40 / @rem 0;
  box-sizing: border-box;
  > div {
    border: 1 / @rem solid #1175d2;
    border-radius: 8 / @rem;
    width: 100%;
    height: 100%;
    display: flex;

    flex-direction: column;
    overflow: hidden;
  }
  > div > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30 / @rem;
    padding-top: 8 / @rem;
    li {
      padding: 3 / @rem 6 / @rem;
      border-bottom: 3 / @rem solid transparent;
      margin-right: 45 / @rem;
      &:nth-of-type(2) {
        margin: 0;
      }
    }
    .active {
      color: #1175d2;
      border-color: #1175d2;
    }
  }
  .feedbackMsg {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    .msgArea {
      flex: 1;
      overflow: hidden;
      overflow-y: auto;
      position: relative;
      > div {
        position: absolute;
        padding: 24 / @rem;
      }
      &::-webkit-scrollbar {
        display: none;
      }
      .month {
        text-align: center;
        font-size: 14 / @rem;
        color: #666;
      }
      .message_box,
      .myMsg_box {
        margin: 10px 0;
        display: flex;
        .head_img {
          .setwh(40, 40);
          border-radius: 50%;
          margin-right: 10 / @rem;
          padding-top: 10px;
          img {
            width: 100%;
          }
        }
        .bubble {
          width: 60%;
          .time {
            font-size: 12px;
            color: #aaa;
          }
          @{deep}.message {
            padding: 1px;
            p {
              font-size: 14 / @rem;
              border-radius: 3px;
              text-align: left;
              border: 1px solid #1175d2;
              display: inline-block;
              padding: 9 / @rem;
            }
            img {
              border: 1px solid #1175d2;
              width: 100%;
            }
          }
        }
      }
      .myMsg_box {
        flex-direction: row-reverse;
        text-align: right;
        .head_img {
          margin: 0;
          margin-left: 10 / @rem;
        }
        .bubble {
          @{deep}.message {
            p {
              background-color: #1175d2;
              color: #eee;
            }
          }
        }
      }
    }
    .sendBox {
      position: relative;
      border-top: 1 / @rem solid #1175d2;
      background-color: #fff;
      height: 175 / @rem;
      // display: flex;
      // justify-content: space-between;
      // padding: 0 18 / @rem 14 / @rem 0;
      box-sizing: border-box;
      .fnBtn {
        padding-top: 15 / @rem;
        display: flex;
        > div {
          margin-left: 20 / @rem;
        }
      }
      .potoBtn,
      .fileBtn {
        .setwh(18, 15);
        img {
          .setwh(18, 15);
        }
      }
      .fileBtn {
        position: relative;
        input {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
      .screenshotBtn {
        .setwh(18, 18);
        img {
          .setwh(18, 18);
        }
      }
      .sendBtn {
        position: absolute;
        bottom: 14 / @rem;
        right: 18 / @rem;
        .setwh(100, 36);
        background-color: #1175d2;
        color: #fff;
        text-align: center;
        line-height: 36 / @rem;
        border-radius: 5 / @rem;
        align-self: flex-end;
      }
      @{deep}.el-textarea {
        margin-top: 10px;
        height: 40%;
        textarea {
          min-height: 100% !important;
          border: none;
          outline: none;
          font-size: 14 / @rem;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }
  .feedbackFile {
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: 20px;
    & > div {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      padding: 0 24 / @rem;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        display: none;
      }
      & > p {
        color: #1175d2;
        margin-bottom: 10 / @rem;
      }
      .el-row {
        margin-bottom: 20 / @rem;
        .el-col {
          margin-bottom: 20 / @rem;
          div {
            height: 80 / @rem;
            background: no-repeat center/cover;
          }
          p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
