<template>
  <div>
    <div v-if="nothing" class="nothing">暂时没有已经过期的事项哦 : ></div>
    ok,这里是system
  </div>
</template>
<script>
export default {
  name: "System",
  data() {
    return {
      nothing: true,
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
