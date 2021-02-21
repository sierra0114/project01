<template>
  <div class="container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="个人信息" name="1">
        <div>
          头像：<el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>

        <div>昵称:<el-input></el-input></div>
        <div>
          性别:<el-radio-group>
            <el-radio>男</el-radio><el-radio>女</el-radio></el-radio-group
          >
        </div>
        <div>
          生日:
          <el-date-picker v-model="value1" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
        <el-button>保存</el-button>
      </el-collapse-item>
      <el-collapse-item title="账户信息" name="2">
        <div>用户名:{{ user.name }}</div>
        <div>邮箱:{{ user.email }}</div>
        <div>注册时间:{{ user.time }}</div>
        <el-button>删除本账号</el-button>
      </el-collapse-item>
      <el-collapse-item title="修改密码" name="3">
        <div>当前密码</div>
        <div>新密码</div>
        <div>确认新密码</div>
      </el-collapse-item>
      <el-collapse-item title="邮件提醒" name="4">
        <div>接收提醒的邮箱</div>
        <div>发送确认连接</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import router from "../router";

export default {
  name: "User",
  data() {
    return { activeNames: ["1"], imageUrl: "", value1: "" };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  padding: 0 50px;
  overflow-y: auto;
  overflow-y: overlay;
  overflow-x: hidden;
  max-height: 80vh;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
