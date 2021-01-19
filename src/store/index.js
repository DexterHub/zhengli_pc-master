import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 底部展示区域
    showCopyright: true,
    // 员工id
    staffId: 0,
    jurisdiction: false,
    indexFlag: true,
    // 个人中心标签
    myselfArr: [["个人中心", "/myself"]],
    // 病例管理标签
    indexArr: [["病例管理", "/index"]],
    // 权限
    authority: "",
    // 员工权限列表
    rightCode: [],
    // 病例详情;
    caseId: "",
    // 病例详情stageCount
    stageCountId: "",
    // 病例详情stageName
    stageNameId: "",
    // 病例id
    binglId: "",
    // 病例阶段
    stageName: "",
    // 病例次数
    stageCount: "",
    // 病例重启 index
    actindex: "",
    // 判断是否 需要 回到 上次新建
    yeshuono: "",

    // 用处上传新建未完成 id
    continuecaseId: "",

    // 新建病例 activeName 懂的都懂 不懂别看 别问
    activeName: "two",

    // 步数
    stepNum: 0,

    // 侧边栏切换
    wrapper: 0
  },
  mutations: {
    changeSCopyRight(state, flag) {
      //底部展示区域
      state.showCopyright = flag;
    },
    changeCaseId(state, id) {
      //病例详情
      state.caseId = id;
    },
    changeStageCount(state, id) {
      //病例详情stageCount
      state.stageCountId = id;
    },
    changeStageNameId(state, id) {
      //病例详情stageName
      state.stageNameId = id;
    },
    // 员工账户进来push权限列表函数
    permissionList(state, id) {
      state.rightCode.push(id);
    },
    empty(state) {
      state.rightCode.splice(0, state.rightCode.length);
    },
    staffIdassignment(state, id) {
      state.staffId = id;
    },
    abab1(state, id) {
      state.binglId = id;
    },
    abab2(state, id) {
      state.stageName = id;
    },
    abab3(state, id) {
      state.stageCount = id;
    },
    abab4(state, index) {
      state.actindex = index;
    },
    huidaoshangci(state, index) {
      state.yeshuono = index;
    },
    jurisdiction(state, jurisdiction) {
      state.jurisdiction = jurisdiction;
    },

    bili(state, b) {
      state.activeName = b;
    },
    continueid(state, b) {
      state.continuecaseId = b;
    },

    // 判断个人中心
    indexFlag(state, indexFlag) {
      state.indexFlag = indexFlag;
    },
    // 个人中心标签页增加
    myselfAdd(state, myselfArr) {
      // console.log(myselfArr)
      let flag = true;
      state.myselfArr.forEach((item) => {
        if (item[0] == myselfArr[0]) flag = false;
      });
      if (flag) {
        state.myselfArr.push(myselfArr);
      }
    },
    // 个人中心标签页删除
    myselfRemove(state, myselfArr) {
      state.myselfArr = state.myselfArr.slice(0, myselfArr);
    },

    // 病例管理标签页增加
    indexAdd(state, indexArr) {
      let flag = true;
      state.indexArr.forEach((item) => {
        if (item[0] == indexArr[0]) flag = false;
      });
      if (flag) {
        state.indexArr.push(indexArr);
      }
    },
    // 病例管理标签页删除
    indexRemove(state, indexArr) {
      state.indexArr = state.indexArr.slice(0, indexArr);
    },
    // 步数改变
    stepNumChange(state, num) {
      state.stepNum = num;
    },
    // 改变侧边栏
    wrapperChange(state, tf) {
      state.wrapper = tf;
    }
  },
  actions: {},
  modules: {}
});
