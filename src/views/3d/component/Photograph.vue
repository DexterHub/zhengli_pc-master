<template>
  <div class="photographBox">
    <ul>
      <li :class="optActive >= 0 && optActive < faceList.length ? 'active' : ''" @click="changeIndex(0)">
        面像照
      </li>
      <li :class="optActive >= faceList.length && optActive < mouthList.length + faceList.length ? 'active' : ''" @click="changeIndex(faceList.length)">口内照</li>
      <li :class="optActive >= mouthList.length + faceList.length && optActive < mouthList.length + faceList.length + XList.length ? 'active' : ''" @click="changeIndex(mouthList.length + faceList.length)">
        X光片
      </li>
    </ul>
    <div class="slideshowBox">
      <swiper ref="mySwiper" :options="swiperOption2">
        <!-- slides -->
        <swiper-slide v-for="(item, idx) in zhList" :key="idx">
          <img :src="item" />
        </swiper-slide>
        <!-- <swiper-slide>I'm Slide 2</swiper-slide>
        <swiper-slide>I'm Slide 3</swiper-slide>
        <swiper-slide>I'm Slide 4</swiper-slide> -->
        <!-- Optional controls -->
        <!-- <div class="swiper-pagination " slot="pagination"></div> -->
        <div class="swiper-button-prev" @click="prevPage" slot="button-prev"></div>
        <div class="swiper-button-next" @click="nextPage" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
import "swiper/swiper-bundle.css";
export default {
  data() {
    let than = this;
    return {
      swiperOption2: {
        // 添加下面这两个属性后,刷新后,轮播图才不会有样式问题
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        //循环
        // loop: true,
        //自动播放
        // autoplay: {
        //   delay: 3000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: true
        // },
        //滑动速度
        speed: 500,
        //滑动之后回调函数
        on: {
          slideChangeTransitionEnd: function() {
            // console.log(this.activeIndex); //切换结束时，告诉我现在是第几个slide
            // console.log(Vue);
            than.optActive = this.activeIndex;
          }
        }
      },
      optActive: 0,
      faceList: [require("../../../assets/img/1.png"), require("../../../assets/img/2.png"), require("../../../assets/img/3.png")],
      mouthList: [require("../../../assets/img/4.png"), require("../../../assets/img/5.png"), require("../../../assets/img/5.2.png")],
      XList: [require("../../../assets/img/4.4.png"), require("../../../assets/img/5.1.png"), require("../../../assets/img/5.2.png")],
      zhList: []
    };
  },
  methods: {
    prevPage() {
      this.$refs.mySwiper.swiper.slidePrev();
      this.optActive = this.$refs.mySwiper.swiper.activeIndex;
      //   this.zhList = [...this.faceList, ...this.mouthList, ...this.XList];
      //   console.log([...this.faceList, ...this.mouthList, ...this.XList]);
    },
    nextPage() {
      this.$refs.mySwiper.swiper.slideNext();
      this.optActive = this.$refs.mySwiper.swiper.activeIndex;
      //   this.zhList = [...this.faceList, ...this.mouthList, ...this.XList];
      //   console.log([...this.faceList, ...this.mouthList, ...this.XList]);
    },
    changeIndex(idx) {
      this.optActive = idx;
      this.$set(this.$refs.mySwiper.swiper, "activeIndex", idx);
      console.log(this.$refs.mySwiper.swiper.activeIndex);
    }
  },
  mounted() {
    this.zhList = [...this.faceList, ...this.mouthList, ...this.XList];
    //可以使用swiper这个对象去使用swiper官网中的那些方法
    // console.log("this is current swiper instance object", this.swiper);
    // console.log(this.$refs.mySwiper.swiper);
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/base.less";
.swiper-container {
  width: 100%;
  height: 100%;
}
.slideshowBox {
  width: 100%;
  height: 100%;
  --swiper-theme-color: #999; /* 设置Swiper风格 */
  --swiper-navigation-color: #f99400; /* 单独设置按钮颜色 */
  --swiper-navigation-size: 34px; /* 设置按钮大小 */
}
.swiper-button-prev {
  left: 70 / @rem;
  top: 57%;
  transform: translateY(-50%);
  margin: 0;
}
.swiper-button-next {
  right: 70 / @rem;
  top: 57%;
  transform: translateY(-50%);
  margin: 0;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.photographBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 580 / @rem;
  margin-top: 58 / @rem;
  box-sizing: border-box;
  padding: 0 40 / @rem;
  flex: 1;
  max-height: 100%;
  height: 100%;
  > ul {
    display: flex;
    li {
      font-size: 16 / @rem;
      border-bottom: 3 / @rem solid transparent;
      padding: 5 / @rem 0;
      &:nth-of-type(2) {
        margin: 0 63 / @rem 0 58 / @rem;
      }
    }

    .active {
      color: #1175d2;
      border-color: #1175d2;
    }
  }
  .slideshowBox {
    width: 100%;
    flex: 1;
    margin-top: 14 / @rem;
    border: 1 / @rem solid #1175d2;
    border-radius: 8 / @rem;
    box-sizing: border-box;
    max-height: 94%;
    .swiper-slide {
      width: 100%;
      height: 100%;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
