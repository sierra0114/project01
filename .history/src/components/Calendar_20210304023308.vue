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
  height: 50vh !important;
}
.el-calendar-table .el-calendar-day {
  box-sizing: border-box;
  padding: 8px;
  max-height: 50px;
}
</style>
