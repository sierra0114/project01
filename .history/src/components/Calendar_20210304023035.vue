<template>
  <div><el-calendar v-model="value"></el-calendar></div>
</template>
<script>
export default {
  name: "Calendar",
  data() {
    return { value: new Date() };
  },
};
</script>
<style >
.el-calendar-table {
  max-height: 50vh !important;
}
</style>
