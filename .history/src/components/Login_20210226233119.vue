<template>
  <el-dialog
    title="登录"
    :visible.sync="form.dialogFormVisible"
    :center="true"
    :width="width"
    :before-close="onClose"
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
      <p>还未注册，点击<b @click="toregister">注册</b></p>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="login">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script>
import router from "../router";
import { Message } from "element-ui";
import { Loading } from "element-ui";

export default {
  name: "Register",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名！"));
      } else if (this.user.name !== value) {
        console.log(this.user);
        console.log(value);
        callback(new Error("用户名不存在！"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else if (this.user.password !== value) {
        callback(new Error("密码错误！"));
      } else {
        callback();
      }
    };
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
            transform(value) {
              return value.trim();
            },
            validator: validateName,
            trigger: "blur",
          },
        ],
        password: [
          {
            transform(value) {
              return value.trim();
            },
            validator: validatePass,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    toregister() {
      router.push({
        name: "register",
      });
    },
    cancelForm() {
      this.$refs.form.resetFields();
      this.form.dialogFormVisible = false;
      router.push({ name: "calendar" });
    },
    login() {
      this.getUser();
    },
    getUser() {
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

        // 对，先在create的时候进数据库判断一下有无user存在，存在就直接跳用户页面，这里不用改！！
        // 保险一点的话先看看数据库里有无user数据存在，有则进入user页面，无则put新user信息

        readRequest = objStore.getAll(null);

        readRequest.onerror = () => {
          alert("读取user存储库数据失败！");
          Message.error("登录失败！");
        };
        readRequest.onsuccess = () => {
          // alert("user保存成功！");
          let user = readRequest.result;
          this.user = user[0].value; //保存user数据
          this.$refs["form"].validate((valid) => {
            if (valid) {
              //通过验证
              this.$refs.form.resetFields(); //清空表格
              this.form.dialogFormVisible = false; //关闭dialog

              let loadingInstance = Loading.service({ fullscreen: true }); //打开loading持续1秒
              setTimeout(() => {
                this.$nextTick(() => {
                  // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close();
                });
              }, 1000);

              Message.success("登录成功！欢迎-" + this.user.name); //发送成功通知
              router.push({ name: "user", userId: this.user.id }); //转到user页面
            } else {
              Message.warning("验证未通过！");
              return false;
            }
          });
        };
      };
    },
    onClose() {
      router.push({ name: "calendar" });
    },
  },
  beforeCreate() {
    // alert("注册创建");
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

      readRequest = objStore.getAll(null);

      readRequest.onerror = () => {
        alert("读取user存储库数据失败！");
      };
      readRequest.onsuccess = () => {
        let user = readRequest.result;
        if (user.length > 0) {

          this.uer = user[0].value;
          console.log(user[0].value);
          if (user[0].value.state === true) {
            alert("3");

            console.log("用户已登录");
            console.log(user);
            router.push({ name: "user", userId: user[0].id });
          } else {
            console.log("用户未登录");
            alert("4");
          }
        } else {
          console.log("用户未注册");
          alert("5");
        }
      };
    };
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