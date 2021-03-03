import Vue from"vue";
    
export const store = Vue.observable({
  update: 0
});
export const mutations = {
    setCount(count) {
      store.count = count;
    }
  };
