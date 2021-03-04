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
          <el-button :type="item.name" size="mini" circle></el-button>
        </div>
        <div class="count">事项数（{{ item.count }}）</div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { store, mutations } from "../store";
// 把盒子先标上颜色，悬浮时颜色加深
export default {
  name: "Priority",
  data() {
    return {
      infolist: [],

      tags: [
        { name: "danger", count: 0 },
        { name: "primary", count: 0 },
        { name: "success", count: 0 },
        { name: "warning", count: 0 },
        { name: "info", count: 0 },
        { name: "", count: 0 },
      ],

      oldClass: "",
    };
  },
  methods: {
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
      let tag = this.tags[index];
      let infoArr = tag.infoArr;
      // console.log(infoArr);
      this.$router.push({
        name: "sameTag",
        params: { infoArr },
      });
    },
    resolveListToTags() {
      //把indolist里面的信息转化到tags中
      let infolist = this.infolist;
      let tagArr = [];

      for (let index in infolist) {
        this.switchColor
      }
      this.tags = [...tagArr];
      this.$forceUpdate();
      // alert("更新视图");
    },
    querryTag(tag) {
      //根据tag查找对应的事项
      let temp = [];
      for (let i in this.infolist) {
        for (let j in this.infolist[i].tags) {
          if (this.infolist[i].tags[j] === tag) {
            temp.push(this.infolist[i]);
            break;
          }
        }
      }
      console.log(temp);
      return temp;
    },
    updateInfo() {
      let db; // 数据库对象
      let objStore; // 对象仓库
      let request; // 请求
      let transaction; // 连接事务
      let readRequest; // 读写事务

      request = window.indexedDB.open("db"); // 连接数据库
      request.onerror = () => {
        // 请求失败
        alert("连接数据库请求 失败 ！因为" + event);
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
          alert("读写事务 失败！");
        };
        readRequest.onsuccess = () => {
          // console.log('读写事务 成功！已经获取到了list数据')
          this.infolist = readRequest.result;
          this.resolveListToTags();
          // alert("更新数据");
          mutations.setUpdateFlag(false);
        };
      };
    },
  },
  computed: {
    updateFlag() {
      return store.updateFlag;
    },
  },
  watch: {
    updateFlag: function () {
      // alert("watch检测到upstateflag更新");
      if (store.updateFlag === true) {
        this.updateInfo();
      }
    },
  },
  created() {
    this.updateInfo();
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  margin: 0 20px 20px 20px;
  overflow-y: auto;
  overflow-y: overlay;
  overflow-x: hidden;
  max-height: 85vh;
}
.el-card {
  width: 250px;
  margin: 20px;
}
span {
  padding: 0 0 3px 5px;
  width: 180px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 超过几行文字会被省略
   */
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.count {
  text-align: right;
  font-size: 13px;
}
.show {
  cursor: pointer;
  background: rgb(245, 245, 245);
}
.hide {
  cursor: pointer;
}
</style>
