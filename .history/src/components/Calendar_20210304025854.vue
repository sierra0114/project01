<template>
  <div class="container"><el-calendar v-model="value"></el-calendar></div>
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

.el-calendar {
  margin: 0!important;
  padding: 0!important;
  width: 60vw
}
.el-calendar-table {
  height: 50vh !important;
}
.el-calendar-table {
  table-layout: fixed;
  width: 100% !important;
}
.el-calendar-table .current {
  max-width: 60px !important;
}
.el-calendar-table .el-calendar-day {
  box-sizing: border-box;
  padding: 8px;
  max-height: 60px !important;
}
.el-calendar__body {
  padding: 0 20px 35px !important;
}
</style>
