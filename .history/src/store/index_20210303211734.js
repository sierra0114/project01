import Vue from"vue";
    
export const store = Vue.observable({
  update: false
});
export const mutations = {
    Update(update) {
      store.update = update;
    }
  };
