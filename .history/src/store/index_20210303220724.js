import Vue from"vue";
    
export const store = Vue.observable({
  updateFlag: false
});
export const mutations = {
    setUpdateFlag(flag) {
        alert('调用')
      store.updateFlag = flag;
    }
};
