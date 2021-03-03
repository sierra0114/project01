import Vue from"vue";
    
export const store = Vue.observable({
  updateFlag: false
});
export const mutations = {
    setUpdateState(flag) {
      store.updateFlag = flag;
    }
};
