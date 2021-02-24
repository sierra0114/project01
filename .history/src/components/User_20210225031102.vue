<template>
  <div class="container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title"
          ><b> 用户信息 <i class="header-icon el-icon-info"></i></b>
        </template>
        <el-form
          ref="form1"
          :model="form1"
          :rules="rules1"
          label-width="100px"
          size="small"
          class="form"
        >
          <el-form-item label=" 头   像：">
            <div>
              <el-avatar :icon="form1.image"></el-avatar>
            </div>
            <div>
              <el-avatar
                v-for="(item, index) in iconlist"
                :icon="iconlist[index]"
                :key="index"
                v-on:click.native="changeimgto(item, index)"
              ></el-avatar>
            </div>
          </el-form-item>

          <el-form-item label=" 昵   称：">
            <el-input v-model="form1.nickname"></el-input
          ></el-form-item>
          <el-form-item
            label=" 邮   箱："
            class="input"
            aria-placeholder="请输入邮箱"
            prop="email"
          >
            <el-autocomplete
              class="inline-input"
              v-model="form1.email"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label=" 性   别：">
            <el-radio v-model="form1.gender" label="1">男</el-radio>
            <el-radio v-model="form1.gender" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label=" 生   日：">
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              v-model="form1.birthday"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="button">
            <el-button @click="clear1">重置</el-button>

            <el-button type="primary" @click="saveUser1('form1')"
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
          <el-form-item label="注册时间：">{{ getTime }}</el-form-item>
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
          :model="form2"
          status-icon
          :rules="rules2"
          ref="form2"
          label-width="100px"
          size="small"
          class="form"
        >
          <el-form-item label="当前密码" prop="oldpass">
            <el-input
              type="password"
              v-model="form2.oldpass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass">
            <el-input
              type="password"
              v-model="form2.newpass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="form2.checkPass"
              autocomplete="off"
            ></el-input> </el-form-item
          ><el-form-item class="button"
            ><el-button @click="clear2">重置</el-button>
            <el-button type="primary" @click="saveUser2('form2')"
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
import { Message } from "element-ui";

export default {
  name: "User",
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else if (!value === this.user.password) {
        callback(new Error("密码错误！"));
      } else {
        this.$refs.form2.validateField("newpass");
        callback();
      }
    };
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value === this.form2.oldpass) {
        this.$refs.form2.validateField("checkPass");
        callback(new Error("新密码与旧密码相同！"));
      } else {
        this.$refs.form2.validateField("checkPass");
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.form2.newpass) {
        callback(new Error("两次输入新密码不一致!"));
      } else {
        console.log(this.form2.newpass);
        console.log(this.form2.checkPass);

        if (this.form2.newpass !== this.form2.checkPass) {
          callback(new Error("两次输入新密码不一致!"));
        }
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if (value === "") {
        console.log(value);
        callback();
      } else if (!reg.test(value)) {
        console.log(value);
        callback(new Error("邮箱格式错误！"));
      } else {
        callback();
      }
    };
    return {
      activeNames: ["1"], //打开的手风琴页面号码
      user: {}, //从数据库取得的user数据
      form1: {
        //表单输入的信息
        image: "el-icon-user-solid",
        nickname: "",
        email: "",
        gender: "",
        birthday: "",
      },
      rules1: {
        nickname: [{}],
        email: [{ validator: validateEmail, trigger: "change" }],
      },
      form2: {
        //参与密码检验的变量
        oldpass: "",
        newpass: "",
        checkPass: "",
      },
      rules2: {
        //密码检验规则
        oldpass: [{ validator: validateOldPass, trigger: "blur" }],
        newpass: [{ validator: validateNewPass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      iconlist: [
        //头像class数组
        "el-icon-basketball",
        "el-icon-cold-drink",
        "el-icon-grape",
        "el-icon-apple",
        "el-icon-lollipop",
        "el-icon-coffee",
      ],
      restaurants: [], //?
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    changeimgto(item, index) {
      //更改头像class
      console.log(index);
      this.form1.image = item;
    },
    clear1() {
      this.form1.image = "";
      this.form1.email = "";
      this.form1.nickname = "";
      this.form1.birthday = {};
      this.form1.gender = "";
    },
    clear2() {
      this.form2.newpass = "";
      this.form2.checkPass = "";
      this.form2.oldpass = "";
    },
    saveUser1(formName) {
      this.user.image = this.form1.image;
      this.user.email = this.form1.email;
      this.user.nickname = this.form1.nickname;
      this.user.birthday = this.form1.birthday;
      this.user.gender = this.form1.gender;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.putIndexedDB(this.user);
        } else {
          Message.warning("验证未通过！");
          return false;
        }
      });
    },
    saveUser2(formName) {
      this.user.password = this.form2.newpass;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.putIndexedDB(this.user);
        } else {
          Message.warning("验证未通过！");
          return false;
        }
      });
    },
    putIndexedDB(user) {
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

        readRequest = objStore.put({ id: user.id, value: user });

        readRequest.onerror = () => {
          Message.error("保存失败！");
          alert("读取user存储库数据失败！");
        };
        readRequest.onsuccess = () => {
          let result = readRequest.result;
          Message.success("保存成功！");
          console.log(result);
        };
      };
    },
    logout() {},
    getTime() {
      let time = this.user.time;
      // console.log(typeof time);
      // console.log(time);
      let str = "";
      let yyyy = time.getFullYear();
      let MM = time.getMonth();
      let dd = time.getDate();
      let hh = time.getHour();
      let mm = time.getMinutes();
      let ss = time.getSeconds();
      str=yyyy+' 年 '
    },
    querySearch(queryString, callback) {
      let restaurants = this.restaurants;
      let results = JSON.parse(JSON.stringify(restaurants)); //把数组的浅复制换成深复制
      for (let item in results) {
        results[item].value = queryString + "" + restaurants[item].value;
      }
      callback(results);
    },
    loadAll() {
      return [
        { value: "@qq.com" },
        { value: "@126.com" },
        { value: "@163.com" },
        { value: "@sohu.com" },
        { value: "@gmail.com" },
      ];
    },
    handleSelect() {},
  },
  created() {
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
        if (user.length > 0) {
          this.user = user[0].value;
          this.getTime();
          router.push({ name: "user", userId: user[0].id });
        } else {
          router.push({ name: "login" });
        }
      };
    };
  },
  mounted() {
    this.restaurants = this.loadAll();
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
