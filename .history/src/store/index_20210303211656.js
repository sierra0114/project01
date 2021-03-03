import Vue from"vue";
    
export const store = Vue.observable({
  update: false
});
export const mutations = {
    setCount(count) {
      store.count = count;
    }
  };
