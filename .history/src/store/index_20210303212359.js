import Vue from"vue";
    
export const store = Vue.observable({
  update: false
});
export const mutations = {
    setUpdateState(flag) {
      store.update = flag;
    }
};
