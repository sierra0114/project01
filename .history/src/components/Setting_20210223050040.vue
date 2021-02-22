<template>
  <div class="container">
    <el-collapse>
      <el-collapse-item name="1">
        <template slot="title"
          ><b> 弹窗提醒 <i class="el-icon-chat-line-square"></i></b
        ></template>
        <el-form label-width="150px">
          <el-form-item label="是否开启弹窗提醒：" style="text-align: left">
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch
          ></el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2"
        ><template slot="title"
          ><b> 邮件提醒 <i class="el-icon-message"></i></b></template
        ><el-form label-width="150px">
          <el-form-item label="接收提醒的邮箱：" prop="oldpass">
            <el-input
              type="password"
              v-model="user.email"
              autocomplete="off"
            ></el-input> </el-form-item
        ></el-form>
        <div class="explain">
          请前往 {{ email }} 确认您的注册邮箱，确认后方能启动邮件提醒功能。
          <br />
          请在修改邮箱后，点“发送确认链接”，而后到新邮箱中作验证。否则，任务提醒仍将通过原邮箱发送。
        </div>
        <p>邮件未收到？</p>
        <p>1. 可能误归到垃圾箱了，或者您输错了邮箱。</p>
        <p>
          2. 请用 {{ email }} 发送标题为“邮件未收到”的邮件至
          contact@snoworange.com ，我们会手动发送您所需的邮件。
        </p>
        <el-button>发送确认连接</el-button>
      </el-collapse-item></el-collapse
    >
  </div>
</template>
<script>
export default {
  name: "Setting",
  data() {
    return {
      user: {},
      value: true,
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
  margin-left: 20px;
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
