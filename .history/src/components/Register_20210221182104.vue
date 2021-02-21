<template>
  <el-dialog title="注册" :visible.sync="dialogFormVisible" center="true">
    <el-form :model="form" :label-width="formLabelWidth">
      <el-form-item label="用户名">
        <el-input v-model="input1" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="input2" show-password></el-input>
      </el-form-item>
      <p>已有账号，点击<b @click="tologin">登录</b></p>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script>
  import router from "../router";

  export default {
    name: "Register",
    data() {
      return {
        input1: "",
        input2: "",
        dialogTableVisible: true,
        dialogFormVisible: true,
        formLabelWidth: "80px",
      };
    },
    methods: {
      tologin() {
        router.push({
          name: "login"
        });
      },
    },
    created() {},
  };
</script>
<style scoped>
  p {
    text-align: center;
  }

  b {
    cursor: pointer;
  }
</style>