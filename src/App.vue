<template>
  <div id="app">
    <router-view />
    <div class="bottomdesc" v-if="$store.state.showCopyright">
      Copyright2016-2020 正丽科技 All Rights Reserved 津ICP备16006009号
      广告审批文号：津械广审（文）第 210412-00386号
    </div>
  </div>
</template>


<style lang="less" scoped>
html body .el-popover {
  width: 180px !important;
  height: 610px;
  padding: 34px 22px;
  border: 1px solid #2883d6;
  font-size: 16px;
  color: #333333;
}
html body .popper__arrow {
  display: none !important;
}
.el-popover__title {
  text-align: center;
}
.el-checkbox {
  height: 22px;
  margin-top: 38px;
}
.el-checkbox__label {
  padding-left: 20px !important;
}
</style>
<style>
.bottomdesc {
  /* position: absolute; */
  /* margin-top: 60px; */
  width: 100%;
  height: 60px;
  font-size: 14px;
  font-family: "SourceHanSansCN-Regular";
  line-height: 60px;
  color: #fff;
  background: #565759;
  text-align: center;
}
</style>