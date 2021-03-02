import Vue from"vue";
    
exportconst store = Vue.observable({
  count: 0
});
exportconst mutations = {
    setCount(count) {
      store.count = count;
    }
  };
