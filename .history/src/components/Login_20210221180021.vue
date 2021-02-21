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
      </el-form-item>
      <p>还未注册，点击<b @click="toregister">注册</b></p>
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
import router from "../router";
export default {
  name: "login",
  data() {
    return {
      input1: "",
      input2: "",
      dialogTableVisible: true,
      dialogFormVisible: true,
      formLabelWidth: "100px",
    };
  },
  
  methods: {
    toregister() {            
                                  现在要完善登录和注册页面，把form组织起来存一个user对象进indexedDB数据库，
                                  在登录的时候用正则确认用户名密码是否正确
                                  编写user页面，有头像，用户名，注册时间（xxx使用app已经x天啦）。。。
                                  设置界面：是否开启弹窗提醒。。。
                                  

      router.push({ name: "register" });
    },
  },
  created() {
    alert("创建了");
  },
  destroyed() {
    alert("销毁了");
  },
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
