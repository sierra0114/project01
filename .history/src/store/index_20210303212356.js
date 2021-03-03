import Vue from"vue";
    
export const store = Vue.observable({
  update: false
});
export const mutations = {
    setUpdate(flag) {
      store.update = flag;
    }
};
