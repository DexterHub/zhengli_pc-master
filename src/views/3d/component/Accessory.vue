<template>
  <div class="accessoryMenu" @click="pdshow">
    <div class="accessoryNav">
      <ul>
        <li class="active">颊侧</li>
        <li>舌侧</li>
      </ul>
      <div class="resetBtn" @click="resetBtn($event)">
        重置
      </div>
    </div>
    <div class="accessoryMenuBd">
      <div class="deficiencyBox">
        <div class="deficiency">
          <div @mousedown="moveImg($event, 1)" @click.stop>
            <img src="../../../assets/img/sq.png" />
          </div>

          缺失牙齿
        </div>
        <div class="optimize">
          <div @mousedown="moveImg($event, 1)" @click.stop>
            <img src="../../../assets/img/optimize.png" />
          </div>

          优化附件
        </div>
      </div>
      <div class="confirmTooth">
        <div class="confirmToothTop">
          <ul>
            <li v-for="(item, index) in toothTopList" :key="index" :data-index="index" @click="showXuanz(index, 'top', $event)">
              <div class="choiceStyle" v-show="item.fjSize">{{ item.fjstyle }}{{ item.fjSize }}毫米</div>
              <div class="imgBox">
                <img :src="item.src" :style="{ width: item.ImgW / 100 + 'rem', height: item.ImgH / 100 + 'rem' }" />
                <img class="hideImg" src="" />
                <div class="xuanz">
                  <el-radio-group v-model="item.fjSize">
                    <el-radio v-model="item.fjSize" :label="3">3毫米</el-radio>
                    <el-radio v-model="item.fjSize" :label="4">4毫米</el-radio>
                    <el-radio v-model="item.fjSize" :label="5">5毫米</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <span>{{ item.serial }}</span>
            </li>
          </ul>
        </div>
        <div class="confirmToothBtm">
          <ul>
            <li v-for="(item, index) in toothBtmList" :key="index" :data-index="index + toothTopList.length" @click="showXuanz(index, 'Btm', $event)">
              <div class="choiceStyle" v-show="item.fjSize">{{ item.fjstyle }}{{ item.fjSize }}毫米</div>
              <span>{{ item.serial }}</span>
              <div class="imgBox">
                <img :src="item.src" :style="{ width: item.ImgW / 100 + 'rem', height: item.ImgH / 100 + 'rem' }" />
                <img class="hideImg" src="" />
                <div class="xuanz">
                  <el-radio-group v-model="item.fjSize">
                    <el-radio :label="3">3毫米</el-radio>
                    <el-radio :label="4">4毫米</el-radio>
                    <el-radio :label="5">5毫米</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="line">
          <div>右</div>
          <div></div>
          <div>左</div>
        </div>
      </div>
    </div>
    <div class="adjunctStyle">
      <div v-for="(items, idx) in modelList" :key="idx">
        <div v-for="(item, index) in items" :key="index" @mousedown="moveImg($event, false, idx, index)">
          <img :src="item" />
        </div>
      </div>
      <div class="delete" @mousedown="moveImg($event, true)">
        <img src="../../../assets/img/adjunct.png" />
      </div>
    </div>
    <img src="" class="moveImg" />
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      /* 上牙数据 */
      toothTopList: [
        {
          serial: 18,
          src: require("../../../assets/img/18.png"),
          ImgW: 57,
          ImgH: 45,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 17,
          src: require("../../../assets/img/17.png"),
          ImgW: 63,
          ImgH: 49,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 16,
          src: require("../../../assets/img/16.png"),
          ImgW: 76,
          ImgH: 51,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 15,
          src: require("../../../assets/img/15.png"),
          ImgW: 40,
          ImgH: 54,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 14,
          src: require("../../../assets/img/14.png"),
          ImgW: 41,
          ImgH: 59,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 13,
          src: require("../../../assets/img/13.png"),
          ImgW: 55,
          ImgH: 78,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 12,
          src: require("../../../assets/img/12.png"),
          ImgW: 38,
          ImgH: 65,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 11,
          src: require("../../../assets/img/11.png"),
          ImgW: 56,
          ImgH: 77,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 21,
          src: require("../../../assets/img/21.png"),
          ImgW: 56,
          ImgH: 75,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 22,
          src: require("../../../assets/img/22.png"),
          ImgW: 38,
          ImgH: 62,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 23,
          src: require("../../../assets/img/23.png"),
          ImgW: 59,
          ImgH: 77,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 24,
          src: require("../../../assets/img/24.png"),
          ImgW: 40,
          ImgH: 60,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 25,
          src: require("../../../assets/img/25.png"),
          ImgW: 42,
          ImgH: 52,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 26,
          src: require("../../../assets/img/26.png"),
          ImgW: 78,
          ImgH: 51,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 27,
          src: require("../../../assets/img/27.png"),
          ImgW: 64,
          ImgH: 49,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 28,
          src: require("../../../assets/img/28.png"),
          ImgW: 58,
          ImgH: 44,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        }
      ],
      /* 下牙数据 */
      toothBtmList: [
        {
          serial: 48,
          src: require("../../../assets/img/48.png"),
          ImgW: 69,
          ImgH: 54,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 47,
          src: require("../../../assets/img/47.png"),
          ImgW: 68,
          ImgH: 57,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 46,
          src: require("../../../assets/img/46.png"),
          ImgW: 77,
          ImgH: 55,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 45,
          src: require("../../../assets/img/45.png"),
          ImgW: 50,
          ImgH: 60,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 44,
          src: require("../../../assets/img/44.png"),
          ImgW: 47,
          ImgH: 60,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 43,
          src: require("../../../assets/img/43.png"),
          ImgW: 50,
          ImgH: 74,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 42,
          src: require("../../../assets/img/42.png"),
          ImgW: 37,
          ImgH: 60,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 41,
          src: require("../../../assets/img/41.png"),
          ImgW: 37,
          ImgH: 58,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 31,
          src: require("../../../assets/img/31.png"),
          ImgW: 40,
          ImgH: 58,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 32,
          src: require("../../../assets/img/32.png"),
          ImgW: 39,
          ImgH: 60,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 33,
          src: require("../../../assets/img/33.png"),
          ImgW: 53,
          ImgH: 74,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 34,
          src: require("../../../assets/img/34.png"),
          ImgW: 48,
          ImgH: 60
        },
        {
          serial: 35,
          src: require("../../../assets/img/35.png"),
          ImgW: 51,
          ImgH: 60,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 36,
          src: require("../../../assets/img/36.png"),
          ImgW: 77,
          ImgH: 56,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 37,
          src: require("../../../assets/img/37.png"),
          ImgW: 69,
          ImgH: 56,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        },
        {
          serial: 38,
          src: require("../../../assets/img/38.png"),
          ImgW: 67,
          ImgH: 58,
          fjstyle: null,
          fjSize: null,
          fjFlag: false
        }
      ],
      /* 模型数据 */
      modelList: [
        [require("../../../assets/img/1.png"), require("../../../assets/img/1.1.png")],
        [require("../../../assets/img/2.png"), require("../../../assets/img/2.2.png")],
        [require("../../../assets/img/3.png"), require("../../../assets/img/3.3.png")],
        [require("../../../assets/img/4.png"), require("../../../assets/img/4.4.png")]
      ],
      dragModelList: [],
      dragModelFlag: true,
      dragModelNum: null
    };
  },
  methods: {
    moveImg(e, flag, idx, idx1) {
      if (this.dragModelNum) {
        if (this.dragModelNum < this.toothTopList.length) {
          console.log(this.toothTopList[this.dragModelNum].fjSize);
          if (!this.toothTopList[this.dragModelNum].fjSize && !document.querySelectorAll(".confirmToothTop li")[this.dragModelNum].getAttribute("data-flag")) {
            return false;
          }
        } else {
          if (!this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjSize && !document.querySelectorAll(".confirmToothBtm li")[this.dragModelNum - this.toothTopList.length].getAttribute("data-flag")) {
            return false;
          }
        }
      }
      let w = e.currentTarget.children[0].clientWidth;
      /* naturalWidth获取到图片的原始宽度  naturalHeight获取到图片的原始高度 */
      let w1 = e.currentTarget.children[0].naturalWidth / 100;
      let h = e.currentTarget.children[0].clientHeight;
      let h1 = e.currentTarget.children[0].naturalHeight / 100;
      let x = e.pageX;
      let y = e.pageY;
      let startX = e.currentTarget.offsetLeft + (e.currentTarget.clientWidth / 2 - e.currentTarget.children[0].clientWidth / 2);
      let startY = e.currentTarget.offsetTop + (e.currentTarget.clientHeight / 2 - e.currentTarget.children[0].clientHeight / 2);
      let img = document.querySelector(".moveImg");
      let imgW = null;
      let imgH = null;
      let imgL = null;
      let imgT = null;
      let moveX = null;
      let moveY = null;
      let elTop = null;
      let elLeft = null;
      let elW = null;
      let elH = null;
      img.src = e.currentTarget.children[0].src;
      img.style.display = "block";
      img.style.position = "absolute";
      img.style.left = startX + "px";
      img.style.top = startY + "px";
      console.log(img.style.left, img.style.top);
      img.style.width = w + "px";
      img.style.height = h + "px";
      console.log(startX, startY, x, y);

      document.body.onmousemove = (e) => {
        moveX = e.pageX - x + startX;
        moveY = e.pageY - y + startY;
        img.style.left = moveX + "px";
        img.style.top = moveY + "px";
        elTop = document.querySelector(".confirmTooth").offsetTop;
        elLeft = document.querySelector(".confirmTooth").offsetLeft;
        elW = document.querySelector(".confirmTooth").clientWidth;
        elH = document.querySelector(".confirmTooth").clientHeight;
      };
      document.body.onmouseup = (e) => {
        document.body.onmousemove = null;
        if (moveY > elTop && moveY < elTop + elH && moveX > elLeft - 30 && moveX < elLeft + elW) {
          console.log(e.target.tagName);
          if (e.target.tagName == "IMG") {
            imgW = e.target.clientWidth;
            imgH = e.target.clientHeight;
            let imgW1 = e.target.naturalWidth;
            let imgH1 = e.target.naturalHeight;
            imgL = e.target.offsetLeft + elLeft;
            imgT = e.target.offsetTop + elTop;
            let liT = e.target.parentNode.parentNode.offsetTop;
            let liL = e.target.parentNode.parentNode.offsetLeft;
            console.log(e.target.offsetLeft);

            if (moveY > imgT - 10 && moveY < imgT + imgH + liT + 20 && moveX > imgL - 30 && moveX < imgL + imgW + liL + 20) {
              if (this.dragModelNum) {
                if (this.dragModelNum < this.toothTopList.length) {
                  if (!this.toothTopList[this.dragModelNum].fjSize && !document.querySelectorAll(".confirmToothTop li")[this.dragModelNum].getAttribute("data-flag")) {
                    return false;
                  }
                } else {
                  if (!this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjSize && !document.querySelectorAll(".confirmToothBtm li")[this.dragModelNum - this.toothTopList.length].getAttribute("data-flag")) {
                    return false;
                  }
                }
              }

              if (flag === true) {
                // e.target.parentNode.parentNode.setAttribute("data-index", null);
                e.target.parentNode.parentNode.setAttribute("data-flag", false);
                e.target.parentNode.querySelector(".hideImg").src = "";
                e.target.parentNode.querySelector(".hideImg").style.display = "none";
                e.target.parentNode.querySelector(".hideImg").index = "";
                img.style.display = "none";
                if (e.target.parentNode.parentNode.getAttribute("data-index") <= this.toothTopList.length - 1) {
                  this.toothTopList[e.target.parentNode.parentNode.getAttribute("data-index")].fjSize = null;
                } else {
                  this.toothBtmList[parseInt(e.target.parentNode.parentNode.getAttribute("data-index")) - this.toothTopList.length].fjSize = null;
                }
                return false;
              }
              if (e.target.parentNode.querySelector(".hideImg").index) {
                img.style.display = "none";
                return false;
              }

              if (!e.target.className && flag !== true) {
                e.target.parentNode.querySelector(".hideImg").src = img.src;
                console.log(imgH1 / 2, (h1 * 100) / 2, e.target.offsetTop, e.target.parentNode.querySelector(".hideImg").style.top, e.target.parentNode.offsetTop);
                if (flag === 1) {
                  e.target.parentNode.parentNode.setAttribute("data-flag", true);
                  e.target.parentNode.parentNode.querySelector(".xuanz").style.display = "none";
                } else {
                  if (!e.target.parentNode.querySelector(".hideImg").src.includes("png")) {
                    return false;
                  }
                  e.target.parentNode.parentNode.querySelector(".xuanz").style.display = "block";
                }
                e.target.parentNode.parentNode.querySelector(".xuanz").style.left = (e.target.offsetLeft + imgW1 / 2) / 100 + "rem";
                e.target.parentNode.parentNode.querySelector(".xuanz").style.top = (e.target.offsetTop + imgH1 / 2) / 100 + "rem";
              }
              if (flag === true) {
                return false;
              }
              this.dragModelNum = e.target.parentNode.parentNode.getAttribute("data-index");

              e.target.parentNode.querySelector(".hideImg").style.display = "block";
              e.target.parentNode.querySelector(".hideImg").setAttribute("data-index", e.target.parentNode.parentNode.querySelector("span").innerText);
              if (flag === 1) {
                e.target.parentNode.parentNode.setAttribute("data-flag", true);
                e.target.parentNode.parentNode.querySelector(".xuanz").style.display = "none";
              } else {
                if (!e.target.parentNode.querySelector(".hideImg").src.includes("png")) {
                  return false;
                }
                e.target.parentNode.parentNode.querySelector(".xuanz").style.display = "block";
              }
              if (this.dragModelNum < this.toothTopList.length) {
                switch (idx) {
                  case 0:
                    switch (idx1) {
                      case 0:
                        this.toothTopList[this.dragModelNum].fjstyle = "半椭球附件垂直";
                        break;
                      case 1:
                        this.toothTopList[this.dragModelNum].fjstyle = "半椭球附件水平";
                        break;
                    }
                    break;
                  case 1:
                    switch (idx1) {
                      case 0:
                        this.toothTopList[this.dragModelNum].fjstyle = "梯形附件无斜角垂直";
                        break;
                      case 1:
                        this.toothTopList[this.dragModelNum].fjstyle = "梯形附件无斜角垂直水平右";
                        break;
                    }
                    break;
                  case 2:
                    switch (idx1) {
                      case 0:
                        this.toothTopList[this.dragModelNum].fjstyle = "梯形附件垂直右";
                        break;
                      case 1:
                        this.toothTopList[this.dragModelNum].fjstyle = "梯形附件垂直左";
                        break;
                    }
                    break;
                  case 3:
                    switch (idx1) {
                      case 0:
                        this.toothTopList[this.dragModelNum].fjstyle = "梯形附件水平左";
                        break;
                      case 1:
                        this.toothTopList[this.dragModelNum].fjstyle = "梯形附件水平右";
                        break;
                    }
                    break;
                }
              } else {
                switch (idx) {
                  case 0:
                    switch (idx1) {
                      case 0:
                        this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjstyle = "半椭球附件垂直";
                        break;
                      case 1:
                        this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjstyle = "半椭球附件水平";
                        break;
                    }
                    break;
                  case 1:
                    switch (idx1) {
                      case 0:
                        this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjstyle = "梯形附件无斜角垂直";
                        break;
                      case 1:
                        this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjstyle = "梯形附件无斜角垂直水平右";
                        break;
                    }
                    break;
                  case 2:
                    switch (idx1) {
                      case 0:
                        this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjstyle = "梯形附件垂直右";
                        break;
                      case 1:
                        this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjstyle = "梯形附件垂直左";
                        break;
                    }
                    break;
                  case 3:
                    switch (idx1) {
                      case 0:
                        this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjstyle = "梯形附件水平左";
                        break;
                      case 1:
                        this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjstyle = "梯形附件水平右";
                        break;
                    }
                    break;
                }
              }
              e.target.parentNode.querySelector(".hideImg").style.width = w1 + "rem";
              e.target.parentNode.querySelector(".hideImg").style.height = h1 + "rem";
              img.src = "";
              img.style.display = "none";
              document.querySelector(".moveImg").src = "";
            } else {
              img.style.display = "none";
            }
          } else {
            img.style.display = "none";
          }
        } else {
          img.style.display = "none";
        }
      };
    },
    pdshow(e) {
      if (e.target.parentNode.parentNode.tagName == "LI") {
        return false;
      }
      if (this.dragModelNum || this.dragModelNum === 0) {
        setTimeout(() => {
          if (this.dragModelNum <= this.toothTopList.length - 1) {
            if (this.toothTopList[this.dragModelNum].fjSize) {
              console.log(this.dragModelNum);
              document.querySelectorAll(".confirmToothTop li")[parseInt(this.dragModelNum)].querySelector(".xuanz").style.display = "none";
            }
          } else {
            if (this.toothBtmList[parseInt(this.dragModelNum) - this.toothTopList.length].fjSize) {
              document.querySelectorAll(".confirmToothBtm li")[parseInt(this.dragModelNum) - this.toothTopList.length].querySelector(".xuanz").style.display = "none";
            }
          }
        }, 1);
      }
    },
    showXuanz(idx, direction, e) {
      if (e.target.parentNode.parentNode.tagName != "LI") {
        return false;
      }
      //   if (!e.target.parentNode.querySelector(".hideImg").src.includes("png")) {
      //     return false;
      //   }
      if (this.dragModelNum) {
        if (this.dragModelNum < this.toothTopList.length) {
          if (!this.toothTopList[this.dragModelNum].fjSize && !document.querySelectorAll(".confirmToothTop li")[this.dragModelNum].getAttribute("data-flag")) {
            return false;
          }
        } else {
          if (!this.toothBtmList[this.dragModelNum - this.toothTopList.length].fjSize && !document.querySelectorAll(".confirmToothBtm li")[this.dragModelNum - this.toothTopList.length].getAttribute("data-flag")) {
            return false;
          }
        }
      }

      if (!e.target.parentNode.querySelector(".hideImg").src.includes("png")) {
        return false;
      }
      console.log(e.target.parentNode.querySelector(".hideImg"));
      if (e.target.parentNode.parentNode.getAttribute("data-flag")) {
        return false;
      }

      if (direction == "top") {
        document.querySelectorAll(".confirmToothTop li")[idx].querySelector(".xuanz").style.display = "block";
        this.dragModelNum = idx;
      } else {
        document.querySelectorAll(".confirmToothBtm li")[idx].querySelector(".xuanz").style.display = "block";
        this.dragModelNum = idx + this.toothTopList.length;
      }
    },
    resetBtn(e) {
      console.log(e.target.parentNode.parentNode);
      [...e.target.parentNode.parentNode.querySelectorAll(".hideImg")].forEach((item, index) => {
        item.src = null;
        item.style.display = "none";
        if (index <= this.toothTopList.length - 1) {
          this.toothTopList[index].fjSize = null;
        } else {
          this.toothBtmList[index - this.toothTopList.length].fjSize = null;
        }
      });
      e.target.parentNode.parentNode.querySelector(".moveImg").src = "";
      this.dragModelNum = null;
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      console.log(1524);
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/base.less";
.accessoryMenu {
  height: 100%;
}
.accessoryMenuBd {
  li {
    position: relative;
    &:hover {
      .choiceStyle {
        display: block;
      }
    }
    .choiceStyle {
      position: absolute;
      top: -30 / @rem;
      display: none;
      left: 50%;
      z-index: 2;
      transform: translateX(-50%);
      padding: 10 / @rem;
      background-color: #fff;
      white-space: nowrap;
      border: 1px solid rgb(17, 117, 210);
      border-radius: 5 / @rem;
      font-size: 17 / @rem;
    }
    .xuanz {
      position: absolute;
      left: 50%;
      top: 50%;
      //   transform: translate(-50%, -50%);
      z-index: 1;
      .setwh(115, 120);
      background-color: #fff;
      border: 1px solid rgb(17, 117, 210);
      font-size: 16 / @rem;
      display: none;
      @{deep}.el-radio-group {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
      @{deep}.el-radio {
        display: flex;
        align-items: center;
        margin: 0;
      }
      @{deep}.el-radio__input {
        @{deep}.el-radio__inner {
          margin: 0;
        }
        .setwh(18, 18);
      }
      @{deep}.el-radio__inner {
        margin: 0;
        .setwh(18, 18);
      }
    }
  }
  .confirmToothBtm {
    .choiceStyle {
      top: -10 / @rem;
    }
  }
  li img {
    pointer-events: auto;
  }
}
.imgBox {
  position: relative;
}
.hideImg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
.accessoryMenu .adjunctStyle .delete {
  .setwh(135, 56);
  img {
    .setwh(26, 34);
    margin: 0 auto;
  }
}
</style>
