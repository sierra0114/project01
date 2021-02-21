<template>
  <el-dialog
    title="注册"
    :visible.sync="form.dialogFormVisible"
    :center="true"
    :width="width"
  >
    <el-form
      :model="form"
      ref="form"
      :label-width="'80px'"
      :status-icon="true"
      label-position="right"
      size="medium "
      :rules="rules"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
        ></el-input>
      </el-form-item>
      <p>已有账号，点击<b @click="tologin">登录</b></p>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="registUser">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script>
import router from "../router";
import { Message } from "element-ui";

export default {
  name: "Register",
  data() {
    return {
      user: {},
      width: "40%",
      form: {
        name: "",
        password: "",
        dialogTableVisible: true,
        dialogFormVisible: true,
      },
      rules: {
        name: [
          {
            required: true,
            transform(value) {
              return value.trim();
            },
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            type: "string",
            required: true,
            pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
            message: "请重新输入用户名，可使用中文，数字，英文和下划线",
            transform(value) {
              return value.trim();
            },
            trigger: "blur",
          },
        ],
        password: [
          {
            type: "string",
            required: true,
            transform(value) {
              return value.trim();
            },
            message: "请输入密码",
          },
          {
            type: "string",
            required: true,
            pattern: /^[A-Za-z0-9]+$/,
            transform(value) {
              return value.trim();
            },
            message: "请输入密码",
          },
        ],
      },
    };
  },
  methods: {
    tologin() {
      router.push({
        name: "login",
      });
    },
    cancelForm() {
      this.$refs.form.resetFields();
      this.form.dialogFormVisible = false;
    },
    registUser() {
      this.getUser();
      this.saveUser();
      this.$refs.form.resetFields();
      this.form.dialogFormVisible = false;
    },
    getUser() {
      let user = {};
      let id = new Date();
      user.name = this.form.name;
      user.password = this.form.password;
      user.id = id.getTime();
      this.user = user;
    },
    saveUser() {
      let db; // 数据库对象
      let objStore; // 对象仓库
      let request; // 请求
      let transaction; // 连接事务
      let readRequest; // 读写事务

      request = window.indexedDB.open("db"); // 连接数据库
      request.onerror = () => {
        alert("链接数据库失败");
      };

      request.onsuccess = (event) => {
        db = event.target.result;
        transaction = db.transaction("user", "readwrite");
        objStore = transaction.objectStore("user");

对，先在create的时候进数据库判断一下有无user存在，存在就直接跳用户页面，这里
保险一点的话先看看数据库里有无user数据存在，有则进入user页面，无则put新user信息

        readRequest = objStore.put({ id: this.user.id, value: this.user });

        readRequest.onerror = () => {
          alert("读取user存储库数据失败！");
          Message.error("注册成功！欢迎-" + this.user.name);
        };
        readRequest.onsuccess = () => {
          // alert("user保存成功！");
          Message.success("注册成功！欢迎-" + this.user.name);
        };
      };
    },
  },
  created() {
    // alert("注册创建");
  },
  destroyed() {
    // alert("注册销毁");
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