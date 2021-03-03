<template>
  <transition name="card">
    <el-card class="box-card" shadow="hover" :body-style="{ padding: '5px' }">
      <div class="clearfix">
        <div class="left">
          <el-button
            :type="info.reColor"
            size="mini"
            v-on:click="deleteInfo"
            circle
          ></el-button>
          <!-- 优先级：   红  >   黄    >蓝>    绿
           type= "danger">"warning">"">"success" -->

          <span
            class="info"
            :title="info.reMainText"
            v-on:click="openFormEmit"
            >{{ info.reMainText }}</span
          >
        </div>
        <el-tooltip
          v-if="info.tagFlag"
          effect="dark"
          :content="info.reTag"
          placement="right"
        >
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            v-on:click="openTags"
            >tag</el-button
          ></el-tooltip
        >
      </div>

      <p class="time" v-on:click="openFormEmit">
        {{ info.reTimeFrom }}<span> - 到 - </span>{{ info.reTimeTo }}
      </p>
    </el-card>
  </transition>
</template>
<script>
import router from "../router";
import {  mutations } from "../store";

export default {
  name: "SidbarCard",
  data() {
    return {};
  },
  props: {
    info: Object,
  },
  methods: {
    deleteInfo() {
      // alert(this.info.reKey)
      let db; // 数据库对象
      let objStore; // 对象仓库
      let request; // 请求
      let transaction; // 连接事务
      let readRequest; // 读写事务

      request = window.indexedDB.open("db"); // 连接数据库
      request.onerror = () => {
        // alert('打开数据库失败！')
      };

      request.onsuccess = (event) => {
        // alert('打开数据库成功！')
        db = event.target.result;
        transaction = db.transaction("info", "readwrite"); // 开启读写事务
        objStore = transaction.objectStore("info"); // 指定事务为‘info’对象仓库的事务
        readRequest = objStore.delete(this.info.reKey);

        // 点击颜色圆点要通过key检索到并且从数据库中删除这个事项，目前没有实现从数据库中删除的功能，key是原因

        readRequest.onerror = () => {
          // alert('删除失败！')
        };
        readRequest.onsuccess = () => {
          // eslint-disable-next-line no-unused-expressions
          // console.log(this.$parent)
          this.$parent.getList(); // 更新sidbar视图
          // alert('删除成功！')
          
        };
      };
    },
    openTags() {
      // 点击tag打开tag视图
      router.push({ name: "tags", key: this.info.reKey });
    },
    openFormEmit() {
      // 点击卡片打开form
      this.$emit("openForm-between", this.info.reKey);
    },
  },
  watch: {
    info: {
      handler(oldInfo, newInfo) {
        console.log("新的info值为：");
        console.log("卡片里的info更新了");
        console.log(newInfo);
      },
    },
  },
};
</script>
<style scoped>
* {
  font-weight: normal;
  /* font-size: 14px;   不知道为什么这条会覆盖下面的    font-size: 10px; */
}

.item {
  margin-bottom: 18px;
}

.clearfix {
  text-align: left;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
}
.left {
  text-align: left;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
}
.info {
  padding: 0 0 3px 5px;
  width: 180px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 超过几行文字会被省略
   */
  -webkit-line-clamp: 1;
  overflow: hidden;
  cursor: pointer;
}
/* ////////////////////////////////////   动画-start    //////////////////////////////////////////////// */
.card-enter-active {
  transition: all 0.3s ease;
}
.card-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.card-enter,.card-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
/* ////////////////////////////////////   动画-end    //////////////////////////////////////////////// */

.time {
  cursor: pointer;
}
p {
  margin: 2px;
  color: rgb(114, 114, 114);
  font-size: 10px;
}
.el-row {
  z-index: 0;
}
.box-card {
  padding: 0px;
  margin: 2px 2px 2px 3px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.479);
}
</style>
