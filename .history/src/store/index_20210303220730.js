import Vue from"vue";
    
export const store = Vue.observable({
  updateFlag: false
});
export const mutations = {
    setUpdateFlag(flag) {
        alert('调用setupstate')
      store.updateFlag = flag;
    }
};
