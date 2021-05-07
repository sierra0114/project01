import Vue from "vue";

export const store = Vue.observable({
  updateFlag: false,//更新
  openFormFlag: false,//
  createFormFlag:false,
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