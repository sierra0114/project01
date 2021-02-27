<template>
  <div>
    <div v-if="nothing" class="nothing">暂时没有系统通知哦 : ></div>
    <el-timeline v-else>
      <el-timeline-item
        v-for="(activity, index) in systemList"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  name: "System",
  data() {
    return {
      nothing: true,
      systemList: null,
    };
  },
  methods: {},
};
</script>
<style scoped>
* {
  text-align: left;
  display: flex;
  flex-flow: row nowrap;
}
.el-timeline {
  width: 100%;
  display: block;
  margin: 20px 0;
  max-height: 80vh;
  padding: 0 40px 20px 40px;
  overflow-y: auto;
  overflow-y: overlay;
  overflow-x: hidden;
}
.el-timeline-item__wrapper {
  padding-left: 40px;
}
.nothing {
  position: absolute;
  top: 50%;
  left: 40%;
  width: auto;
  color: rgb(134, 134, 134);
}
</style>
