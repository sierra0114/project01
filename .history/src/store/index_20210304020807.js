import Vue from"vue";
    
export const store = Vue.observable({
  updateFlag: false,
  openForm
});
export const mutations = {
    setUpdateFlag(flag) {
      store.updateFlag = flag;
    //   alert('flag:'+store.updateFlag)
    }
};
