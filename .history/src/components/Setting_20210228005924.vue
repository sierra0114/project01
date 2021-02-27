<template>
  <div class="container">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title"
          ><b> 弹窗提醒 <i class="el-icon-chat-line-square"></i></b
        ></template>
        <el-form label-width="160px">
          <el-form-item label="是否开启弹窗提醒：" style="text-align: left">
            <el-switch
              v-model="popup"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleSwitch"
            >
            </el-switch>
          </el-form-item>
        </el-form>
        <p>
          您可以在这里打开或者关闭事项的弹窗提醒，关闭后，您不会再收到来自网站的弹窗提醒
        </p>
      </el-collapse-item>
      <el-collapse-item name="2"
        ><template slot="title"
          ><b> 邮件提醒 <i class="el-icon-message"></i></b
        ></template>
        <el-form label-width="160px">
          <el-form-item label="接收提醒的邮箱：" prop="email">
            <el-input
              type="password"
              v-model="user.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="explain">
          请前往 {{ user.email }} 确认您的注册邮箱，确认后方能启动邮件提醒功能。
          <br />
          请在修改邮箱后，点“发送确认链接”，而后到新邮箱中作验证。否则，任务提醒仍将通过原邮箱发送。
        </div>
        <p>邮件未收到？</p>
        <p>1. 可能误归到垃圾箱了，或者您输错了邮箱。</p>
        <p>
          2. 请用 {{ user.email }} 发送标题为 “ 邮件未收到 ” 的邮件至
          contact@snoworange.com ，我们会手动发送您所需的邮件。
        </p>
        <el-button>发送确认连接</el-button>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import router from "../router";

export default {
  name: "Setting",
  data() {
    return {
      user: {},
      popup: true,
      activeNames: ["1"],
    };
  },
  methods() {
    handleSwitch()
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
        console.log("setting获取到user");
        console.log(user);
        if (user.length > 0) {
          this.user = user[0].value;
          if (!this.user.state) {
            router.push({ name: "login" });
          }
        }
      };
    };
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

p,
div.explain {
  text-align: left;
  margin-left: 25px;
}

div.explain {
  color: #909399;
}

p {
  color: #c0c4cc;
}

b {
  letter-spacing: 1px;
}

.el-form {
  width: 400px;
}

.el-button {
  margin: 20px;
}
</style>