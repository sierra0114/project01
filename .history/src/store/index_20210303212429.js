import Vue from"vue";
    
export const store = Vue.observable({
  updateState: false
});
export const mutations = {
    setUpdateState(flag) {
      store.update = flag;
    }
};
