import Vue from "vue";

export const store = Vue.observable({
  updateFlag: false,
  openFormFlag: true,
  formInfo: {}
});
export const mutations = {
  setUpdateFlag(flag) {
    store.updateFlag = flag;
    //   alert('flag:'+store.updateFlag)
  },
  setFormFlag(flag){
    store.openFormFlag=flag;
  },
  setFormInfo(info){
    store.
  }
};
