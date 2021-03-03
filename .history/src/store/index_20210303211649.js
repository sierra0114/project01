import Vue from"vue";
    
export const store = Vue.observable({
  updated() {
      
  },: 0
});
export const mutations = {
    setCount(count) {
      store.count = count;
    }
  };
