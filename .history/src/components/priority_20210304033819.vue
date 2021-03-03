<template>
  <div class="container">
    <div v-for="(item, index) in tags" :key="index">
      <el-card
        style="text-align: left"
        :ref="index"
        class="hide"
        @mouseover.native="show(index)"
        @mouseout.native="hide(index)"
        @click.native="handleClick(index)"
      >
        <div slot="header" class="clearfix">
          <span>{{ item.tagNamw }}</span>
        </div>
        <div class="count">事项数（{{ item.tagCount }}）</div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { store, mutations } from "../store";

export default {
  name: "Priority",
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>
