import Vue from"vue";
    
export const store = Vue.observable({
  count: 0
});
exportconst mutations = {
    setCount(count) {
      store.count = count;
    }
  };
