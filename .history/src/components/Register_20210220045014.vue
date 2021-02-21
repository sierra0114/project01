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
  },
  methods: {
      open() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    },created(){

  }
};
</script>
<style scoped>
.form{
}
</style>
