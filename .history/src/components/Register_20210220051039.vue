<template>
  <el-dialog title="登录" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="input1" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input
          placeholder="请输入密码"
          v-model="input2"
          show-password
        ></el-input>
      </el-form-item>
    </el-form><p>已有账号，点击<span @click="tologin">登录</span></p>
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
      input2: "",dialogTableVisible: true,
        dialogFormVisible: true,formLabelWidth: '120px'
    };
  },
  methods: {
   tologin()
  },
  created() {
 
  },
};
</script>
<style scoped>
.form {
}
</style>
