<template>
  <div>
    <div v-for="(item, index) in tags" :key="index">
      <el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tags",
  data() {
    return {
      tags: [],
    };
  },
};
</script>
<style scoped>
</style>
