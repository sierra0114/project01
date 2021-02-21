<template>
  <div clas>
    ok，这里是setting 设置界面：是否开启弹窗提醒。。。 提醒授权 邮件验证？

    <el-collapse>
      <el-collapse-item title="弹窗提醒" name="1">
        是否开启弹窗提醒：
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-collapse-item>
      <el-collapse-item title="邮件提醒" name="2"
        ><el-form>
          <el-form-item label="接收提醒的邮箱：" prop="oldpass">
            <el-input
              type="password"
              v-model="user.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-button>发送确认连接</el-button></el-form
        >
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
</style>
