import Vue from"vue";
    
export const store = Vue.observable({
  update: false
});
export const mutations = {
    setUp(update) {
      store.update = update;
    }
  };
