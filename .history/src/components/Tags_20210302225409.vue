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
          <span>卡片名称</span>
          <el-button
            v-show="button"
            style="float: right; padding: 3px 0"
            type="text"
            >操作按钮</el-button
          >
        </div>
        <div>事项数（{{ tagCount }}）</div>
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
      allTags: [],

      tags: [1, 2, 3, 4, 5],
      tagCount: 0,
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
  },
  computed: {
    resolveListToTags: function () {
      if (this.getAllTags) {
        let tag = [];
        let allTags = this.allTags;
for(let i=0;i)






        return true;
      } else {
        return false;
      }
    },
    getAllTags: function () {
      let allTags = [];
      for (let index in this.infolist) {
        let arr = this.infolist[index].tags;
        allTags = [...allTags, ...arr];
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.allTags = allTags;
      if (this.allTags) {
        return true; //拿到了所有tag组成的数组
      } else {
        return false; //没有拿到所有tag组成的数组
      }
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
        this.resolveListToTags;
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
