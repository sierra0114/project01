import Vue from"vue";
    
export const store = Vue.observable({
  update: false
});
export const mutations = {
    update(flag) {
      store.update = flag;
    }
  };
