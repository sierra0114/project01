<template>
  <el-dialog title="登录" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="input1" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          placeholder="请输入密码"
          v-model="input2"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
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
      this.$prompt("请输入邮箱", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "登录成功！",
          });
        });
    },
  },
  created() {
    this.open();
  },
};
</script>
<style scoped>
.form {
}
</style>
