<template>
  <div>
    <div v-if="nothing" class="nothing">暂时没有已经过期的事项哦 : ></div>
    <el-timeline v-else>
      <el-timeline-item
        v-for="(activity, index) in List"
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
  name: "sameTag",
  data() {
    return {
      list: [],
      List: [],
      // flag
      nothing: false, // 没有过期事项
      //       把这个过期页面写了
      //       程序思路-在过期页面被加载的时候初始化所有过期数据
      //       {把所有getlist拿出的数据和今天的日期比对，今天的日期对象分别减事件的两个日期对象timefrom，timeto。
      //       过期和临近分别过滤出这两种符合条件的事件，把符合的数据拿出来渲染进时间轴}
      //       {用elementui时间轴组件写}
    };
  },
  methods: {
    getList() {
      let db; // 数据库对象
      let objStore; // 对象仓库
      let request; // 请求
      let transaction; // 连接事务
      let readRequest; // 读写事务

      request = window.indexedDB.open("db"); // 连接数据库
      request.onerror = () => {
        // 请求失败
        // console.log('连接数据库请求 失败 ！因为' + event)
      };

      request.onsuccess = (event) => {
        // 请求成功
        db = event.target.result;
        // db=request.result  一样的效果
        // console.log('连接数据库请求 成功 ')
        transaction = db.transaction("info", "readwrite"); // 开启读写事务
        objStore = transaction.objectStore("info"); // 指定事务为‘info’对象仓库的事务
        readRequest = objStore.getAll(null);

        readRequest.onerror = () => {
          // console.log('读写事务 失败！')
        };
        readRequest.onsuccess = () => {
          // console.log('读写事务 成功！已经获取到了list数据')
          this.list = readRequest.result;

          this.listFilter();
        };
      };
    },
    listFilter() {
      let expiredList = [];

      for (let i in this.list) {
        let timeTo = this.list[i].time[1];
        let now = new Date();
        if (timeTo - now <= 0) {
          let activity = {};
          activity.content = this.list[i].mainText;
          activity.type = this.toColorClass(this.list[i].color);
          activity.timestamp =
            this.getTime(this.list[i], 0) +
            "到" +
            this.getTime(this.list[i], 1);
          activity.size = "large";
          expiredList.push(activity);
        }
      }
      if (expiredList.length === 0) {
        this.nothing = true;
      } else {
        this.nothing = false;
      }
      this.expiredList = expiredList;
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
            "-" +
            month +
            "-" +
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
