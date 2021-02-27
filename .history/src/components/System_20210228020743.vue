<template>
  <div>
    <div v-if="nothing" class="nothing">暂时没有已经过期的事项哦 : ></div>
    <el-timeline>
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
      nothing: false,
      systemList: [],
    };
  },
  methods: {},
};
</script>
<style scoped>
.nothing {
  position: absolute;
  top: 50%;
  left: 40%;
  width: 100%;
  color: rgb(134, 134, 134);
}
</style>
