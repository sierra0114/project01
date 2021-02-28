<template>
  <div class="container">
    <div v-for="(item, index) in tags" :key="index">
      <el-card shadow="hover" style="text-align: left">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div>事项数（{{ tagCount }}）</div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tags",
  data() {
    return {
      tags: [1, 2, 3, 4, 5],
      tagCount: 0,
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  background-color: rgb(65, 54, 54);
  margin: 20px;
}
.el-card {
  width: 250px;
  margin: 20px;
}
</style>
