<template>
  <el-dialog
    title="注册"
    :visible.sync="form.dialogFormVisible"
    :center="true"
    :width="width"
  >
    <el-form
      :model="form"
      :label-width="'80px'"
      :status-icon="true"
      label-position="right"
      size="medium "
      :rules="rules"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.input1" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="form.input2"
          show-password
        ></el-input>
      </el-form-item>
      <p>已有账号，点击<b @click="tologin">登录</b></p>
    </el-form>
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
    var valiName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空!"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var valiPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空!"));
      } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
    };
    return {
      width: "40%",
      form: {
        input1: "",
        input2: "",
        dialogTableVisible: true,
        dialogFormVisible: true,
      },
      rules: {
        name: [{ validater: valiName, trigger: "blur" }],
        password: [{ validater: valiPass, trigger: "blur" }],
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
.el-dialog {
  max-width: 400px;
  margin: 0;
  text-align: center;
}

p {
  text-align: center;
}

b {
  cursor: pointer;
}
</style>