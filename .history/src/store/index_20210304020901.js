import Vue from"vue";
    
export const store = Vue.observable({
  updateFlag: false,
  openFormFlag:true
});
export const mutations = {
    setUpdateFlag(flag) {
      store.updateFlag = flag;
    //   alert('flag:'+store.updateFlag)
    }
};
