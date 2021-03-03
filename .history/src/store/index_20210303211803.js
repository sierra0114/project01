import Vue from"vue";
    
export const store = Vue.observable({
  update: false
});
export const mutations = {
    update(fla) {
      store.update = update;
    }
  };
