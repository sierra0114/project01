<template>
  <div class="container">
    <div v-for="(item, index) in tags" :key="index">
      <el-card>
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <div>{{tag}}</div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tags",
  data() {
    return {
      tags: [1, 2],
    };
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  background-color: rgb(65, 54, 54);
}
.el-card {
  width: 250px;
}
</style>
