<template>
  <div class="container">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in list"
        :key="index"
        :icon="item.icon"
        :type="item.type"
        :color="item.color"
        :size="item.size"
        :timestamp="item.timestamp"
        :ref="index"
        @mouseover.native="show(index)"
        @mouseout.native="hide(index)"
        @click.native="handleClick(index)"
      >
        {{ item.content }}
      </el-timeline-item>
    </el-timeline>
    <div class="void"></div>
  </div>
</template>
<script>
import { mutations, store } from "../store";
export default {
  name: "sameTag",
  data() {
    return {
      list: [],
      rowList: [],
    };
  },
  methods: {
    getList() {
      //   console.log(this.$route.params);
      let list = this.$route.params.infoArr;
      this.rowList = list;
      //   console.log(this.list);
      this.listFilter(list);
    },
    listFilter(list) {
      let arr = [];

      for (let i in list) {
        let item = {};
        item.content = list[i].mainText;
        item.type = this.toColorClass(list[i].color);
        item.timestamp =
          this.getTime(list[i], 0) + " 到 " + this.getTime(list[i], 1);
        item.size = "large";
        arr.push(item);
      }

      this.list = arr;
    },
    toColorClass(color) {
      let Class = "";
      switch (color) {
        case "red":
          Class = "danger";
          break;
        case "blue":
          Class = "primary";
          break;
        case "green":
          Class = "success";
          break;
        case "yellow":
          Class = "warning";
          break;
        case "grey":
          Class = "info";
          break;
        case "":
          Class = "";
      }
      return Class;
    },
    getTime(item, num) {
      let timeObj = item.time[num];
      // eslint-disable-next-line valid-typeof
      if (typeof timeObj === null) {
        // time对象的类型为null（time对象为空
        return "时间对象不存在";
        // eslint-disable-next-line valid-typeof
      } else if (typeof timeObj === "string") {
        // time对象的类型为string（初始化数据的情况
        return timeObj;
      } else {
        let timetr = getTimeStr();
        return timetr;
      }
      function getTimeStr() {
        if (typeof timeObj === "object") {
          const day = timeObj.getDay();
          const date = timeObj.getDate();
          const month = timeObj.getMonth() + 1;
          const year = timeObj.getFullYear();
          const hour = timeObj.getHours();
          const min = timeObj.getMinutes();
          const sec = timeObj.getSeconds();
          const weekMap = [
            "",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
            "星期日",
            "",
          ];
          const timeStr =
            year +
            "/" +
            month +
            "/" +
            date +
            " " +
            hour +
            ":" +
            min +
            ":" +
            sec +
            " " +
            weekMap[day];
          return timeStr;
        }
      }
    },
    show(index) {
      let oldClass = this.$refs[index][0].$el.className;
      let newClass = oldClass + " show";
      this.oldClass = this.$refs[index][0].$el.className;
      this.$refs[index][0].$el.className = newClass;
      // console.log(this.$refs[index][0].$el.className);
    },
    hide(index) {
      this.$refs[index][0].$el.className = this.oldClass;
      // console.log(this.$refs[index][0].$el.className);
    },
    handleClick(index) {
      let info = this.rowList[index];
      store.openFormFlag = true;
      mutations.setFormInfo(info);
      alert('点击了')
    },
  },
  created() {
    this.getList();
  },
  updated() {
    this.getList();
  },
};
</script>

<style scoped>
* {
  text-align: left;
  display: flex;
  flex-flow: row nowrap;
}
.container {
  display: flex;
  flex-flow: row wrap;
  margin: 0 20px 20px 0px;
  overflow-y: auto;
  overflow-y: overlay;
  overflow-x: hidden;
  max-height: 85vh;
}
.void {
  height: 10vh;
}
.el-timeline {
  width: 100%;
  display: block;
  margin: 20px 0;
  max-height: 80vh;
  padding: 0 40px 20px 40px;
}
.el-timeline-item__wrapper {
  padding-left: 40px;
}
.el-timeline-item {
  overflow: initial;
}
.nothing {
  position: absolute;
  top: 50%;
  left: 40%;
  width: auto;
  color: rgb(134, 134, 134);
}
.show {
  cursor: pointer;
  background: rgb(245, 245, 245);
}
.hide {
  cursor: pointer;
}
</style>
