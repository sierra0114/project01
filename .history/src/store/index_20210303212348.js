import Vue from"vue";
    
export const store = Vue.observable({
  update: false
});
export const mutations = {
    setupdate(flag) {
      store.update = flag;
    }
};
