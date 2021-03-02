<template>
  <div class="container">
    <div
      v-for="(item, index) in tags"
      :key="index"
      @mouseover="showButton(index)"
      @mouseout="hideButton(index)"
    >
      <el-card style="text-align: left">
        <div slot="header" class="clearfix">
          <span>{{ item }}</span>
          <el-button
            v-show="button"
            style="float: right; padding: 3px 0"
            type="text"
            >操作按钮</el-button
          >
        </div>
        <div>事项数（{{ tag.tagCount }}）</div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tags",
  data() {
    return {
      infolist: [],

      tags: [1, 2, 3, 4, 5],
      tag: { tagCount: 0, tagNamw: "" },

      button: false,
    };
  },
  methods: {
    showButton() {
      this.button = true;
    },
    hideButton() {
      this.button = false;
    },
    resolveListToTags() {
      //把indolist里面的信息转化到tags中
      let uniqTag = this.getUniqTags;
      this.tags = uniqTag;
      for (let index in uniqTag) {
        let arr = this.querryTag(uniqTag[index]);
        let tag = {};
        tag.tagNamw = uniqTag[index];
        tag.tagCount = arr.length;
        tag.infoArr=
      }
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
  },
  computed: {
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
  created() {
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
        this.infolist = readRequest.result;
        this.resolveListToTags();
      };
    };
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
</style>
