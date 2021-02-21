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

export default {
  name: "Register",
  data() {
    return {
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
      let user = this.getUser();
      this.saveUser(user);
      this.$refs.form.resetFields();
      this.form.dialogFormVisible = false;
    },
    getUser() {
      let user = {};
      let id = new Date();
      user.name = this.form.name;
      user.password = this.form.password;
      user.id = id.getTime();
    },
    saveUser(user) {
      let selectedEvent;
      let db; // 数据库对象
      let objStore; // 对象仓库
      let request; // 请求
      let transaction; // 连接事务
      let readRequest; // 读写事务

      request = window.indexedDB.open("db"); // 连接数据库
      request.onerror = () => {
        // 请求失败
        // console.log('连接数据库请求 失败 ！因为' + event)
      };

      request.onsuccess = (event) => {
        // 请求成功
        db = event.target.result;
        // db=request.result  一样的效果
        // console.log('连接数据库请求 成功 ')
        transaction = db.transaction("info", "readwrite"); // 开启读写事务
        objStore = transaction.objectStore("info"); // 指定事务为‘info’对象仓库的事务
        readRequest = objStore.get(user.key);

        readRequest.onerror = () => {
          // console.log('读写事务 失败！')
        };
        readRequest.onsuccess = () => {
          // console.log('读写事务 成功！已经获取到了list数据')
          selectedEvent = readRequest.result;
          console.log("从顶栏搜索获取到了事项，它的值为：");
          console.log(selectedEvent);
          this.$emit("to-appmain", selectedEvent);
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