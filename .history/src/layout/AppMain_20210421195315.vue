<template>
  <el-container>
    <el-header height="52px">
      <Header @to-appmain="refSidbar"></Header>
    </el-header>
    <el-container v-if="!noSidebar">
      <el-aside width="260px">
        <Sidbar ref="Sidbar"></Sidbar>
      </el-aside>
      <el-main>
        <router-view name="Main"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from "../components/Header";
import Sidbar from "../components/Sidbar";
// import Main from '../components/Main'
import dataBase from "../data/dataBase.js";
export default {
  name: "AppMain",
  components: {
    Header,
    Sidbar,
  },
  computed: {},
  data() {
    return {
      msg: "hello",
      noSidebar: false,
    };
  },
  methods: {
    refSidbar(info) {
      this.$refs.Sidbar.passThisToForm(info);
    },
  },
  created() {
    dataBase(); // 初始化数据库
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  text-align: center;
  line-height: 50px;+_
  height: 50px;
}
Header {
  line-height: 50px;
  height: 50px;
}

.el-aside {
  background-color: rgb(245, 245, 245);
  text-align: center;
}

.el-main {
  text-align: center;
  padding: 10px;
}

body > .el-container {
  margin-bottom: 0;
  width: 100vw;
  height: 100vh;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/* header {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 40px;
  background-color: rgb(255, 0, 0);
}
sidbar {
  display: flex;
  width: 200px;
  background-color: rgb(200, 255, 0);
}
main {
  position: relative;
  display: flex;

  top: 40px;
  left: 0;
  right: 0;
  background-color: rgb(0, 255, 13);
}
full-calendar {
flex-grow: 1;
  background-color: rgb(0, 255, 255);
} */
</style>
