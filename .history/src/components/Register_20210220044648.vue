<template>
  <div>
    ok,register
    <el-input v-model="input1" placeholder="请输入内容"></el-input>
    <el-input
      placeholder="请输入密码"
      v-model="input2"
      show-password
    ></el-input>
    <div></div>
  </div>
</template>
<script>
import { Loading } from 'element-ui';

export default {
  name: "Register",
  data() {
    return {
      input1: "",
      input2: "",
    };
  },created(){
    const loading=Loading.service({
          lock: true,

          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 20000);
  }
};
</script>
<style scoped>
.form{
  z-index: 2001;
}
</style>
