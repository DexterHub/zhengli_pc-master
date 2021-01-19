<template>
  <div class="survey">
    <div class="showBox"></div>
    <div class="downloadBtn">下载</div>
  </div>
</template>
<style lang="less" scoped>
@import "../../../assets/css/base.less";
.survey {
  flex: 1;
  width: 100%;
  display: flex;
  padding: 0 40 / @rem;
  flex-direction: column;
  width: 580 / @rem;
  box-sizing: border-box;
  margin-top: 40 / @rem;
  .showBox {
    border: 1 / @rem solid #1175d2;
    flex: 1;
    border-radius: 8 / @rem;
    margin-bottom: 25 / @rem;
  }
  .downloadBtn {
    width: 100 / @rem;
    height: 36 / @rem;
    text-align: center;
    line-height: 36 / @rem;
    color: #fff;
    font-size: 16 / @rem;
    background-color: #1175d2;
    border-radius: 5 / @rem;
  }
}
</style>
