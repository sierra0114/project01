<template>
  <el-dialog title="登录" :visible.sync="dialogFormVisible" center="true">
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
      </el-form-item><p>还未注册，点击<span @click="toregister">注册</span></p>
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
import router from '../router';
export default {
  name: "login",
  data() {
    return {
      input1: "",
      input2: "",dialogTableVisible: true,
        dialogFormVisible: true,formLabelWidth: '100px'
    };
  },
  methods: {
   toregister(){
   router.push({ name: 'register' })
   }
  },
  created() {
 
  },
};
</script>
<style scoped>
p {
  text-align: center;
}
</style>
