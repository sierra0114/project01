<template>
  <div class="form">
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

export default {
  name: "Register",
  data() {
    return {
      input1: "",
      input2: "",
    };
  },created(){

  }
};
</script>
<style scoped>
.form{
}
</style>
