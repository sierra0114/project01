<template>
  <div class="main">
    <el-row class="nav">
      <el-col :span="5">全部事项数：{{ eventsCountAll }}</el-col>

      <el-col :span="14">
        <router-link :to="{ name: 'calendar' }">
          <el-link>日历</el-link>
        </router-link>

        <el-divider direction="vertical"></el-divider>

        <router-link :to="{ name: 'priority' }">
          <el-link>优先级</el-link>
        </router-link>

        <el-divider direction="vertical"></el-divider>

        <router-link :to="{ name: 'tags' }">
          <el-link>标签组</el-link>
        </router-link>
      </el-col>
      <el-col :span="5">
        <el-link v-on:click="toToday">{{ today }}</el-link>
      </el-col>
    </el-row>
    <el-row class="view">
      <div v-show="condition" class="add" @click="openForm">
        <div class="add-svg">
          <svg
            t="1614887082898"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2058"
            width="128"
            height="128"
          >
            <path
              d="M880.15737 447.719128H575.934072V143.49583c0-35.915501-29.109546-65.025048-65.025048-65.025048s-65.025048 29.109546-65.025047 65.025048v304.223298H141.660679a65.025048 65.025048 0 0 0 0 130.050095h304.223298v304.223298c0 35.915501 29.109546 65.025048 65.025047 65.025048s65.025048-29.109546 65.025048-65.025048V577.769223h304.216073a65.025048 65.025048 0 0 0 65.025047-65.025047 65.010598 65.010598 0 0 0-65.017822-65.025048z"
              fill="#ffffff"
              p-id="2059"
            ></path>
          </svg>
        </div>
        <div class="text">新建一个事项</div>
      </div>
      <router-view></router-view>
    </el-row>
  </div>
</template>

<script>
import router from "../router";
import { store, mutations } from "../store";

export default {
  name: "Main",
  data() {
    return {
      today: "今天",

      // 事项计数
      eventsCountAll: 0,
      eventsCountOngoing: 0,
      eventsCountExpired: 0,

      thisMonth: 0,
      condition: true,
    };
  },
  components: {},
  methods: {
    openForm() {
      if (store.openFormFlag === false) {
        mutations.setFormFlag(true);
      } else {
        mutations.setFormFlag(false);
      }
    },
    toToday() {
      router.push({
        name: "calendar",
        time: this.today,
      });
    },
    updatingToday() {
      setInterval(() => {
        const time = new Date();
        this.today = time;
        const day = time.getDay();
        const date = time.getDate();
        const month = time.getMonth() + 1;
        const year = time.getFullYear();
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
        const timeStr = year + "年" + month + "月" + date + "日" + weekMap[day];
        this.today = timeStr;
      }, 1000);
    },
    getEventsCount() {
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
          let list = readRequest.result;
          this.eventsCountAll = list.length;
          // alert(list.length)
        };
      };
    },
  },
  watch: {
    $route(to) {
      console.log(to);
    },
  },
  created() {
    this.updatingToday();
    this.getEventsCount();
  },
  updated() {
    this.getEventsCount();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
* {
  translate: 0.5s;
  font-weight: normal;
  font-size: 16px;
}

.router-view {
  display: block;
  overflow-y: scroll;
  overflow-x: auto;
}

.nav {
  padding-bottom: 10px;
}

a {
  text-decoration: none;
}

a:link {
  color: black;
}

a:visited {
  color: black;
}

a:hover {
  color: black;
}

a:active {
  color: black;
}

.router-link-active {
  text-decoration: none;
}
.add {
  position: absolute;
  top: 80px;
  left: 40%;
  cursor: pointer;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background-color: rgb(240, 240, 240);
}
.add-svg {
  position: relative;
  top: 35px;
}
.text {
  top: -20%;
  left: 25%;
  position: absolute;
  font-size: 18px;
  color: #c0c4cc;
}
</style>
