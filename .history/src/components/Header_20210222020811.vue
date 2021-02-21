<template >
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    id="Header"
  >
    <el-row class="head">
      <el-col :xs="2" :sm="2" :md="2" :lg="1">
        <!-- 最左边的图标=>返回主页面 -->
        <!-- ↓↓↓↓↓↓↓↓↓↓ -->
        <el-link :underline="false" v-on:click="toAppMain">
          <i class="el-icon-s-home"></i>
        </el-link>
        <!-- ↑↑↑↑↑↑↑↑↑↑ -->
        <!-- 最左边的图标 -->
      </el-col>

      <el-col :xs="20" :sm="16" :md="16" :lg="19">
        <el-row type="flex" justify="center">
          <el-col :span="10">
            <!-- 搜索输入栏 -->
            <!-- ↓↓↓↓↓↓↓↓↓↓ -->
            <el-autocomplete
              size="mini"
              prefix-icon="el-icon-search"
              clearable
              autocomplete="on"
              resize="none"
              form="search"
              placeholder="请输入内容"
              @select="handleSelect"
              v-model="input"
              :fetch-suggestions="querySearchAsync"
            >
              <!-- ↑↑↑↑↑↑↑↑↑↑ -->
              <!-- 搜索输入栏 -->
            </el-autocomplete>
          </el-col>
        </el-row>
      </el-col>

      <el-col :xs="2" :sm="5" :md="5" :lg="3">
        <el-row class="head-inner" type="flex" justify="space-between">
          <el-col :xs="0" :sm="2" :md="2" :lg="2" hidden-xs-only>
            <!-- 切换皮肤图标 -->
            <!-- ↓↓↓↓↓↓↓↓↓↓ -->
            <el-link v-if="isDay" href="">
              <i class="el-icon-moon"></i>
            </el-link>
            <el-link v-else href="">
              <i class="el-icon-sunny"></i>
            </el-link>
            <!-- ↑↑↑↑↑↑↑↑↑↑ -->
            <!-- 切换皮肤图标 -->
          </el-col>

          <el-col :xs="0" :sm="3" :md="3" :lg="3" hidden-xs-only>
            <!-- 通知图标+下拉菜单 -->
            <!-- ↓↓↓↓↓↓↓↓↓↓ -->
            <el-link>
              <el-dropdown
                size="medium"
                placement="bottom"
                @command="handleCommand"
              >
                <span class="el-dropdown-link">
                  <i class="el-icon-bell"></i>
                </span>
                <el-dropdown-menu>
                  <el-dropdown-item command="approaching"
                    >进行事项</el-dropdown-item
                  >
                  <el-dropdown-item command="expired"
                    >过期事项</el-dropdown-item
                  >
                  <el-dropdown-item command="system" divided
                    >系统消息</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </el-link>
            <!-- ↑↑↑↑↑↑↑↑↑↑ -->
            <!-- 通知图标+下拉菜单 -->
          </el-col>
          <el-col :xs="0" :sm="2" :md="2" :lg="2" hidden-xs-only>
            <!-- 用户登录/查看用户图标 -->
            <!-- ↓↓↓↓↓↓↓↓↓↓ -->
            <el-link @click="toUser">
              <i class="el-icon-user"></i>
            </el-link>
            <!-- ↑↑↑↑↑↑↑↑↑↑ -->
            <!-- 用户登录/查看用户图标 -->
          </el-col>
          <el-col :xs="10" :sm="2" :md="2" :lg="2">
            <!-- 设置图标=>设置页 -->
            <!-- ↓↓↓↓↓↓↓↓↓↓ -->
            <el-link @click="toSetting">
              <i class="el-icon-setting"></i>
            </el-link>
            <!-- ↑↑↑↑↑↑↑↑↑↑ -->
            <!-- 设置图标=>设置页 -->
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-menu>
</template>

<script>
import "element-ui/lib/theme-chalk/display.css";
import router from "../router";

export default {
  name: "Header",
  data() {
    return {
      activeIndex: "1", // 导航栏属性
      input: "", // 搜索栏
      events: [], // 由list中所有事项的键值对组成（缩略版list）
      list: [], // 数据库中取出的所有事项
      user: {}, // 用户对象

      // flag
      registed: false, // 是否已经登录
    };
  },
  methods: {
    /// ///////////////////////////////////////////////////////////////
    /// /////////////  等待完善的代码//////////////////////////////////
    // warning：主题模式内容暂不存在
    // 主题为日间模式则isItDay值为true，夜间模式isItDay值为false
    isDay() {
      let day = "el-icon-moon";
      // let night = 'el-icon-sunny'
      let isItDay = day;
      return isItDay;
    },
    // ------------------------------------------------------------------------------------------------
    // --------------------------------------路由方法=》回到AppMain--------------------------------------
    // ------------------------------------------------------------------------------------------------
    toAppMain() {
      router.push({ name: "appMain" });
    },
    // 路由方法=》转到user
    toUser() {
      /// ///////////////////////////////////////////////////////////////
      /// /////////////  等待完善的代码//////////////////////////////////
      // warning：用户对象user未创建
      // 从数据库查询并导入一个用户对象，导出用户对象的用户名属性，用userId来接收，
      //     查询本地数据库indexeddb是否存在，存在则查询里面的用户信息
      //    if（存在数据库&&用户信息）查询返回用户id（唯一），并进入用户user页面
      //        else 进入登录页面

      if (this.registed) {
        router.push({ name: "user", userId: this.user.id });
      } else {
        alert(this.registed);
        alert("闪现");
        router.push({ name: "login" });
      }
    },
    toSetting() {
      router.push({ name: "setting" });
    },
    // ------------------------------------------------------------------------------------------------
    // --------------------------------------搜索栏的方法----------------------------------------------
    // ------------------------------------------------------------------------------------------------

    loadAll() {
      let events = [];
      // console.log(this.list)
      for (let i in this.list) {
        let item = this.list[i];
        let value = item.mainText;
        let key = item.key;
        let obj = { value, key };

        events.push(obj);
      }

      return events;
    },
    querySearchAsync(queryString, callBack) {
      var events = this.events;
      var results = queryString
        ? events.filter(this.createInputFilter(queryString))
        : events;

      // 不使用loading来延时显示
      // clearTimeout(this.timeout)
      // this.timeout = setTimeout(() => {
      //   callBack(results)
      // }, 1000 * Math.random())
      callBack(results);
    },
    createInputFilter(queryString) {
      return (input) => {
        return (
          input.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      // console.log(item)
      let selectedEvent;
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
        readRequest = objStore.get(item.key);

        readRequest.onerror = () => {
          // console.log('读写事务 失败！')
        };
        readRequest.onsuccess = () => {
          // console.log('读写事务 成功！已经获取到了list数据')
          selectedEvent = readRequest.result;
          console.log("从顶栏搜索获取到了事项，它的值为：");
          console.log(selectedEvent);
          this.$emit("to-appmain", selectedEvent);
        };
      };
    },
    /// ----------------------------------------------------------
    // 下拉菜单的方法
    handleCommand(command) {
      if (command === "approaching") {
        router.push({ name: "approaching" });
      } else if (command === "expired") {
        router.push({ name: "expired" });
      } else if (command === "system") {
        router.push({ name: "system" });
      }
    },

    getLogState() {
      console.log("顶栏创建了");
      let list1;
      let list2;
      let db; // 数据库对象
      let objStore1; // 对象仓库
      let objStore2; // 对象仓库
      let request; // 请求
      let transaction1; // 连接事务
      let transaction2; // 连接事务
      let readRequest1; // 读写事务
      let readRequest2; // 读写事务

      request = window.indexedDB.open("db"); // 连接数据库
      request.onerror = () => {
        alert("链接数据库失败");
      };

      request.onsuccess = (event) => {
        db = event.target.result;

        transaction1 = db.transaction("info", "readwrite"); // 获取全部info给搜索栏使用
        objStore1 = transaction1.objectStore("info"); // 指定事务为‘info’对象仓库的事务
        readRequest1 = objStore1.getAll(null);
        readRequest1.onerror = () => {};
        readRequest1.onsuccess = () => {
          list1 = readRequest1.result;
          this.list = list1;
          this.events = this.loadAll();
          // console.log(this.events)
        };

        transaction2 = db.transaction("user", "readwrite"); //获取用户信息判断路由转向
        objStore2 = transaction2.objectStore("user");
        readRequest2 = objStore2.getAll(null);
        readRequest2.onerror = () => {
          alert("读取user存储库数据失败！");
        };
        readRequest2.onsuccess = () => {
          // alert('读取user存储库成功！')
          list2 = readRequest2.result;
          if (list2.length === 0) {
            //用户注册过
            this.registed = false;
          } else if (list2[0].state === true) {
            //用户注册过且在登录状态
            this.registed = true;
            this.user = list2[0];
          } else if (list2[0].state === false) {
            //用户注册过但不在登录状态
            this.registed = false;
            alert(list2[0].state === true);
          }
        };
      };
    },
  },
  created() {
    this.getLogState();
  },
  updated() {
    this.getLogState();
  },
  mounted() {
    console.log("顶栏挂载了");
  },
  beforeDestroy() {},
  whatch: {
    events: {
      handler() {
        console.log("顶栏的events更新了");
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
* {
  list-style: none;
  white-space: nowrap;
  font-weight: normal;
  font-size: 16px;
}
ul:visited {
  display: none;
  list-style: none;
}
li,
ul {
  list-style: none;
}

#Header {
  width: 100wh;
}
.el-link,
i {
  font-size: 20px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-link:hover {
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-input {
  max-width: 300px;
}
</style>
