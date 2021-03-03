<template>
  <div class="container">
    <div v-for="(item, index) in tags" :key="index">
      <el-card
        style="text-align: left"
        ref="cover"
        class="hide"
        @mouseover.native="show(index)"
        @mouseout.native="hide(index)"
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
  name: "Tags",
  data() {
    return {
      infolist: [],

      tags: [],
      tag: { tagCount: 0, tagNamw: "" },
    };
  },
  methods: {
    show() {
      console.log(this.$refs.cover);
      this.$refs.cover.className = "show";
    },
    hide() {

      this.$refs.cover.className = "hide";      console.log(this.$refs.cover);
    },
    resolveListToTags() {
      //把indolist里面的信息转化到tags中
      let uniqTag = this.getUniqTags;
      let tagArr = [];

      for (let index in uniqTag) {
        let temp = this.querryTag(uniqTag[index]);
        let tag = {};
        tag.tagNamw = uniqTag[index];
        tag.tagCount = temp.length;
        tag.infoArr = temp;
        tagArr.push(tag);
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
    getUniqTags: function () {
      let uniqTag = [];
      let allTags = [];

      for (let index in this.infolist) {
        let arr = this.infolist[index].tags;
        allTags = [...allTags, ...arr];
      }

      for (let i = 0; i < allTags.length; i++) {
        for (let j = i + 1; j < allTags.length; j++) {
          if (allTags[i] === allTags[j]) {
            //如果存在相等的两个tag
            i++; //进入下一层i循环
            j = i;
          }
        }
        uniqTag.push(allTags[i]);
        console.log(uniqTag);
      }
      return uniqTag;
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
  margin: 20px;
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
  background-color: rgb(255, 255, 255);
}
.hide {
  background-color: rgb(29, 24, 24);

  cursor: pointer;
}
</style>
