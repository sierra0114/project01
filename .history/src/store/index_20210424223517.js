import Vue from "vue";

export const store = Vue.observable({
  updateFlag: false,//更新
  openFormFlag: false,//打开表单
  createFormFlag:false,//创建新表单
  formInfo: {}//表单信息-info对象
});
export const mutations = {
  setUpdateFlag(flag) {//设置更新状态
    store.updateFlag = flag;
    //   alert('flag:'+store.updateFlag)
  },
  setFormFlag(flag) {
    store.openFormFlag = flag;
  },
  setFormInfo(info) {
    store.formInfo = info;
  },
  setCreateFlag(flag){
    store.createFormFlag=flag;
  }
};


          // store的用法可以写一篇文章