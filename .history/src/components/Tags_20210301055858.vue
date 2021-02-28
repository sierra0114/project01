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

      return true;
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
                        indexedDB应该根据索引的tag来查询
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
