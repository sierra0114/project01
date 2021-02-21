<template>
  <div>
    ok，这里是setting 设置界面：是否开启弹窗提醒。。。 提醒授权 邮件验证？

    <el-collapse>
      <el-collapse-item title="邮件提醒" name="4"
        ><el-form>
          <el-form-item label="接收提醒的邮箱：" prop="oldpass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
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
};
</script>
<style scoped>
</style>
