<template>
  <el-dialog title="注册" :visible.sync="form.dialogFormVisible" :center="true">
    <div class="container">
    <el-form :model="form" :label-width="'100px'" :status-icon="true" label-position="right" size="medium ">
      <el-form-item label="用户名">
        <el-input v-model="form.input1" placeholder="请输入用户名" ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          placeholder="请输入密码"
          v-model="form.input2"
          show-password
        ></el-input>
      </el-form-item>
      <p>已有账号，点击<b @click="tologin">登录</b></p>
    </el-form>
        </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="form.dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="form.dialogFormVisible = false"
        >确 定</el-button
      >
    </div>

  </el-dialog>
</template>


<script>
import router from "../router";

export default {
  name: "Register",
  data() {
    return {
      form: {
        input1: "",
        input2: "",
        dialogTableVisible: true,
        dialogFormVisible: true,
      },
    };
  },
  methods: {
    tologin() {
      router.push({
        name: "login",
      });
    },
  },
  created() {
    alert("注册创建");
  },
  destroyed() {
    alert("注册销毁");
  },
};
</script>
<style scoped>
.el-dialog__body{
  display: flex;
  margin: 0;
  text-align: center;
}
.container{
  display: flex;
  padding: 0;
    margin: 0;

}
p,.el-form-item {
  text-align: center;
}

b {
  cursor: pointer;
}
</style>