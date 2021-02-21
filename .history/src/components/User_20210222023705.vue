<template>
  <div class="container">
    ok，这里是user
    编写user页面，有头像，用户名，注册时间（xxx使用app已经x天啦）。。。
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </el-collapse-item>
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </el-collapse-item>
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <div>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div>
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        </div>
        <div>
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import router from "../router";

export default {
  name: "User",
  data() {
    return { activeNames: ["1"] };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
  created() {
    // alert("注册创建");
    let db; // 数据库对象
    let objStore; // 对象仓库
    let request; // 请求
    let transaction; // 连接事务
    let readRequest; // 读写事务

    request = window.indexedDB.open("db"); // 连接数据库
    request.onerror = () => {
      alert("链接数据库失败");
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      transaction = db.transaction("user", "readwrite");
      objStore = transaction.objectStore("user");

      readRequest = objStore.getAll(null);

      readRequest.onerror = () => {
        alert("读取user存储库数据失败！");
      };
      readRequest.onsuccess = () => {
        let user = readRequest.result;
        console.log("用户已登录");
        console.log(user);
        if (user.length >= 0) {
          router.push({ name: "user", userId: user.id });
        } else {
          router.push({ name: "login" });
        }
      };
    };
  },
  destroyed() {
    // alert("注册销毁");
  },
};
</script>
<style scoped>
.container{
  
}
</style>
