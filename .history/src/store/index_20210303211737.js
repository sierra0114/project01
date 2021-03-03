import Vue from"vue";
    
export const store = Vue.observable({
  update: false
});
export const mutations = {
    update(update) {
      store.update = update;
    }
  };
