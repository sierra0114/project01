<template>
  <div class="container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title"
          ><b> 用户信息 <i class="header-icon el-icon-info"></i></b>
        </template>
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          size="small"
          class="form"
        >
          <el-form-item label=" 头   像：">
            <div>
              <el-avatar :icon="user.image"></el-avatar>
            </div>
            <div>
              <el-avatar
                v-for="(item, index) in iconlist"
                :icon="iconlist[index]"
                :key="index"
                v-on:click="changeimgto("
              ></el-avatar>
            </div>
          </el-form-item>

          <el-form-item label=" 昵   称：">
            <el-input v-model="user.nickname"></el-input
          ></el-form-item>
          <el-form-item
            label=" 邮   箱："
            class="input"
            aria-placeholder="请输入邮箱"
          >
            <el-input
              type="email"
              v-model="user.email"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label=" 性   别：">
            <el-radio v-model="user.gender" label="1">男</el-radio>
            <el-radio v-model="user.gender" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label=" 生   日：">
            <el-date-picker
              v-model="user.birthday"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="button">
            <el-button @click="replace1">重置</el-button>

            <el-button type="primary" @click="saveUser1"
              >保存</el-button
            ></el-form-item
          >
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title"
          ><b> 账户信息 <i class="header-icon el-icon-info"></i></b> </template
        ><el-form label-width="100px" size="small" class="form">
          <el-form-item label="用户名：">{{ user.name }}</el-form-item>
          <el-form-item label="邮箱：">{{ user.email }}</el-form-item>
          <el-form-item label="注册时间：">{{ user.time }}</el-form-item>
          <el-form-item class="button">
            <el-button type="danger">删除本账号</el-button></el-form-item
          ></el-form
        >
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title"
          ><b> 修改密码 <i class="header-icon el-icon-warning"></i></b>
        </template>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          size="small"
          class="form"
        >
          <el-form-item label="当前密码" prop="oldpass">
            <el-input
              type="password"
              v-model="user.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="user.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="checkPass"
              autocomplete="off"
            ></el-input> </el-form-item
          ><el-form-item class="button"
            ><el-button @click="replace2">重置</el-button>
            <el-button type="primary" @click="saveUser2('ruleForm')"
              >保存</el-button
            ></el-form-item
          ></el-form
        >
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: center; margin: 100px 30px 80px 0">
      <el-button type="danger" @click="logout"> 退出登录</el-button>
    </div>
  </div>
</template>
<script>
import router from "../router";

export default {
  name: "User",
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else if (!value === this.user.password) {
        callback(new Error("密码错误！"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeNames: ["1"],
      user: {
        image: "el-icon-user-solid",
        nickname: "",
        gender: "1",
        birthday: {},
      },
      form: {},
      ruleForm: {
        oldpass: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        oldpass: [{ validator: validateOldPass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      iconlist: [
        "el-icon-basketball",
        "el-icon-cold-drink",
        "el-icon-grape",
        "el-icon-apple",
        "el-icon-lollipop",
        "el-icon-coffee",
      ],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    changeimgto(item, index) {
      alert(index);
      this.user.image = item;
    },
    replace1() {},
    replace2() {},
    saveUser1() {},
    saveUser2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  created() {
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
        console.log("用户已登录");
        console.log(user);
        if (user.length >= 0) {
          router.push({ name: "user", userId: user.id });
        } else {
          router.push({ name: "login" });
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
.container {
  text-align: left;
  padding: 0 50px;
  overflow-y: auto;
  overflow-y: overlay;
  overflow-x: hidden;
  max-height: 80vh;
}
.button {
  margin: 0 0 0 50px;
}
.form {
  width: 400px;
}
b {
  letter-spacing: 1px;
}

.el-avatar {
  border: 1px dashed #d9d9d9;
  background: rgb(255, 255, 255);
  margin: 0 10px 0 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-avatar:hover {
  border-color: #409eff;
}
</style>
