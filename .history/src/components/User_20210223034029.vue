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
              <el-avatar icon="el-icon-user-solid"
                ><?xml version="1.0" encoding="utf-8"?>
                <!-- Generator: Adobe Illustrator 23.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                <svg
                  version="1.1"
                  id="图层_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 300 300"
                  style="enable-background: new 0 0 300 300"
                  xml:space="preserve"
                >
                  <style type="text/css">
                    .st0 {
                      fill: #fbe3c0;
                    }
                    .st1 {
                      fill: #57b894;
                    }
                    .st2 {
                      fill: #2f2e41;
                    }
                    .st3 {
                      fill: #9362ac;
                    }
                    .st4 {
                      fill: #f86d70;
                    }
                    .st5 {
                      fill: #424242;
                    }
                    .st6 {
                      fill: #dcdddd;
                    }
                    .st7 {
                      fill: #606060;
                    }
                    .st8 {
                      fill: #f5a800;
                    }
                    .st9 {
                      fill: #545e60;
                    }
                    .st10 {
                      fill: #a6aab2;
                    }
                    .st11 {
                      fill: #1c0d3a;
                    }
                    .st12 {
                      fill: #fbbebe;
                    }
                    .st13 {
                      fill: #505ed0;
                    }
                    .st14 {
                      fill: #ffffff;
                    }
                    .st15 {
                      opacity: 0.1;
                      enable-background: new;
                    }
                    .st16 {
                      fill: #ffb338;
                    }
                    .st17 {
                      fill: #f0e4ed;
                    }
                    .st18 {
                      fill: none;
                      stroke: #2f2e41;
                      stroke-width: 3;
                      stroke-miterlimit: 10;
                    }
                    .st19 {
                      fill: #7c8189;
                    }
                    .st20 {
                      clip-path: url(#SVGID_2_);
                      fill: #505ed0;
                    }
                    .st21 {
                      fill: #f56a56;
                    }
                    .st22 {
                      fill: #fffaec;
                    }
                    .st23 {
                      fill: #605d55;
                    }
                    .st24 {
                      opacity: 0.8;
                      fill: #1c0d3a;
                    }
                    .st25 {
                      fill: #f7f8f8;
                    }
                    .st26 {
                      fill: #ad9a85;
                    }
                    .st27 {
                      fill: #7d6e5a;
                    }
                    .st28 {
                      clip-path: url(#SVGID_4_);
                    }
                    .st29 {
                      fill: #db2d43;
                      stroke: #f7f8f8;
                      stroke-width: 4;
                      stroke-miterlimit: 10;
                    }
                    .st30 {
                      fill: #87e5da;
                      stroke: #f7f8f8;
                      stroke-width: 4;
                      stroke-miterlimit: 10;
                    }
                    .st31 {
                      fill: #f7aa00;
                      stroke: #f7f8f8;
                      stroke-width: 4;
                      stroke-miterlimit: 10;
                    }
                    .st32 {
                      fill: none;
                      stroke: #f7f8f8;
                      stroke-width: 4;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      stroke-miterlimit: 10;
                    }
                    .st33 {
                      fill: #c7f2e3;
                      stroke: #f7f8f8;
                      stroke-width: 4;
                      stroke-miterlimit: 10;
                    }
                    .st34 {
                      clip-path: url(#SVGID_6_);
                    }
                    .st35 {
                      fill: #ffeaa5;
                    }
                    .st36 {
                      fill: #226b80;
                      stroke: #ffffff;
                      stroke-width: 5;
                      stroke-miterlimit: 10;
                    }
                    .st37 {
                      fill: #ffebd3;
                      stroke: #ffffff;
                      stroke-width: 5;
                      stroke-miterlimit: 10;
                    }
                    .st38 {
                      fill: #40a798;
                      stroke: #ffffff;
                      stroke-width: 5;
                      stroke-miterlimit: 10;
                    }
                    .st39 {
                      fill: #ffeaa5;
                      stroke: #ffffff;
                      stroke-width: 5;
                      stroke-miterlimit: 10;
                    }
                    .st40 {
                      clip-path: url(#SVGID_8_);
                    }
                    .st41 {
                      fill: #6cbbb3;
                    }
                    .st42 {
                      fill: #60512d;
                    }
                    .st43 {
                      fill: #efe784;
                    }
                    .st44 {
                      fill: #ae7c7c;
                    }
                    .st45 {
                      fill: #3e3838;
                    }
                    .st46 {
                      clip-path: url(#SVGID_10_);
                    }
                    .st47 {
                      fill: #6c5ce7;
                    }
                    .st48 {
                      fill: #fdcb6e;
                    }
                    .st49 {
                      fill: #47416d;
                    }
                    .st50 {
                      fill: #fff3b1;
                    }
                    .st51 {
                      fill: #7b88ff;
                    }
                  </style>
                  <rect
                    x="-6.3"
                    y="-6.3"
                    class="st6"
                    width="312.6"
                    height="312.6"
                  />
                  <path
                    class="st2"
                    d="M89.9,203.2c-11.1-30.2-12-67.7-12.5-89.7c-0.9-41.3,29.7-75.4,68.4-76.2c38.7-0.8,70.8,31.9,71.7,73.2
	c0.5,22.3,0.7,61.5-10.2,92.7H89.9z"
                  />
                  <path
                    class="st2"
                    d="M162.3,174c-14.3-10.3-17.6-30.3-7.3-44.6c0.6-0.9,1.3-1.7,2-2.5c-1.8,1.6-3.5,3.4-4.9,5.4
	c-10.3,14.3-7.1,34.3,7.3,44.6c13.5,9.7,31.9,7.4,42.6-4.8C191.1,181.7,174.6,182.8,162.3,174z"
                  />
                  <path
                    class="st12"
                    d="M43.5,300c3.6-9.3,14.6-63.6,33.6-65.7c0.1,0,0.3,0,0.4-0.1c2.7-0.7,34.2-8.1,39.8-24.5c1.1-3.1,2-5.9,2.8-8.5
	c0.6-2,1.1-3.9,1.6-5.7c0.9-3.6,1.6-7.3,1.8-11.1c0.2-4.3-0.2-8.7-1.3-12.8c-1.6-6.4,52.8-6.4,51.2,0c-1.1,4.2-1.5,8.5-1.3,12.8
	c0.3,3.8,0.9,7.5,1.8,11.1c0.5,1.8,1,3.7,1.6,5.7c0.8,2.6,1.7,5.4,2.8,8.5c5.7,16.4,37.2,23.8,39.8,24.5c0.1,0,0.3,0.1,0.4,0.1
	c19,2.1,30,56.3,33.6,65.7H43.5z"
                  />
                  <ellipse
                    transform="matrix(0.9929 -0.1188 0.1188 0.9929 -15.4207 18.5529)"
                    class="st15"
                    cx="147.9"
                    cy="138.6"
                    rx="48.9"
                    ry="52.4"
                  />
                  <ellipse
                    transform="matrix(0.9929 -0.1188 0.1188 0.9929 -14.7886 18.5152)"
                    class="st12"
                    cx="147.9"
                    cy="133.3"
                    rx="48.9"
                    ry="52.4"
                  />
                  <ellipse
                    transform="matrix(0.2842 -0.9588 0.9588 0.2842 42.8389 217.681)"
                    class="st2"
                    cx="167.2"
                    cy="80.2"
                    rx="29.2"
                    ry="44"
                  />
                  <ellipse
                    transform="matrix(0.7551 -0.6556 0.6556 0.7551 -30.3457 92.1644)"
                    class="st2"
                    cx="108.2"
                    cy="86.7"
                    rx="28.1"
                    ry="15.9"
                  />
                  <path
                    class="st1"
                    d="M234,236.5c-0.2,0-11-3.2-11.1-3.3c-1.4-0.4-10.9-2.5-20.6-6.7c-11,13.3-31.3,22.2-54.5,22.2
	s-43.5-8.9-54.5-22.2c-9.7,4.2-19.1,6.3-20.6,6.7c-0.2,0-10.9,3.3-11.1,3.3c-20.2,2.1-21.4,53.9-25.2,63.4h222.7
	C255.4,290.5,254.2,238.7,234,236.5z"
                  />
                  <g>
                    <circle class="st18" cx="121.2" cy="126.9" r="18.4" />
                    <circle class="st18" cx="172.9" cy="126.9" r="18.4" />
                    <line
                      class="st18"
                      x1="139.6"
                      y1="126.9"
                      x2="153.5"
                      y2="126.9"
                    />
                  </g>
                </svg>
              </el-avatar>
            </div>
            <div>
              <el-avatar icon="el-icon-user-solid"></el-avatar>
              <el-avatar icon="el-icon-user-solid"></el-avatar>
              <el-avatar icon="el-icon-user-solid"></el-avatar>
              <el-avatar icon="el-icon-user-solid"></el-avatar>
              <el-avatar icon="el-icon-user-solid"></el-avatar>
              <el-avatar icon="el-icon-user-solid"></el-avatar>
            </div>
          </el-form-item>

          <el-form-item label=" 昵   称："> <el-input></el-input></el-form-item>
          <el-form-item
            label=" 邮   箱："
            class="input"
            aria-placeholder="请输入邮箱"
          >
            <el-input
              type="email"
              v-model="ruleForm.email"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item label=" 性   别：">
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label=" 生   日：">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="button">
            <el-button>重置</el-button>

            <el-button type="primary">保存</el-button></el-form-item
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
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input> </el-form-item
          ><el-form-item class="button"
            ><el-button>重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
            ></el-form-item
          ></el-form
        >
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: center; margin: 100px 30px 80px 0">
      <el-button type=""> 退出登录</el-button>
    </div>
  </div>
</template>
<script>
import router from "../router";

export default {
  name: "User",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeNames: ["1"],
      imageUrl: "",
      value1: "",
      user: {},
      radio: "1",
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    submitForm(formName) {
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
  margin: 0 10px 0 0;
}
</style>
