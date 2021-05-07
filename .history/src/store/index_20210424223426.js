import Vue from "vue";

export const store = Vue.observable({
  updateFlag: false,//更新
  openFormFlag: false,//打开表单
  createFormFlag:false,//创建新表单
  formInfo: {}
});
export const mutations = {
  setUpdateFlag(flag) {
    store.updateFlag = flag;
    //   alert('flag:'+store.updateFlag)
  },
  setFormFlag(flag) {
    store.openFormFlag = flag;
  },
  setFormInfo(info) {
    store.formInfo = info;
  },
  setCreateFlag(flag){
    store.createFormFlag=flag;
  }
};


          // store的用法可以写一篇文章