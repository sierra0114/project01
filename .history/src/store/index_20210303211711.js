import Vue from"vue";
    
export const store = Vue.observable({
  update: false
});
export const mutations = {
    setCount(update) {
      store.update = update;
    }
  };
