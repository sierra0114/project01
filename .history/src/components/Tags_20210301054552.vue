<template>
  <div class="container">
    <div
      v-for="(item, index) in tags"
      :key="index"
      @mouseover="showButton(index)"
      @mouseout="hideButton(index)"
    >
      <el-card style="text-align: left">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button
            v-show="button"
            style="float: right; padding: 3px 0"
            type="text"
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
      button: false,
    };
  },
  methods: {
    showButton(index) {
      this.button = true;
    },
    hideButton(index) {
      this.button = false;
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  margin: 20px;
}
.el-card {
  width: 250px;
  margin: 20px;
}
</style>
