<template>
  <div class="form">
    <el-button
      type="text"
      icon="el-icon-plus"
      circle
      class="newButton"
      @click="drawer = true"
    ></el-button>

    <el-drawer
      @opened="handelOpen"
      :append-to-body="true"
      :modal-append-to-body="false"
      title="新建事项"
      ref="drawer"
      :visible.sync="drawer"
      :direction="direction"
      :with-header="false"
      :before-close="cancelForm"
      size="30%"
    >
      <div id="color" :class="color">
        <el-row class="drawer-header">
          <!-- 第一行：四个子选项和确认取消按钮 -->
          <el-col
            :span="9"
            style="display: flex; justify-content: space-around; flex-flow:row "
          >
            <el-tooltip effect="dark" content="备注" placement="bottom">
              <el-link
                class="el-icon-document"
                :underline="false"
                v-on:click="showRemark"
              ></el-link>
            </el-tooltip>
            <el-tooltip effect="dark" content="总结" placement="bottom">
              <el-link
                class="el-icon-chat-line-square"
                :underline="false"
                v-on:click="showSummary"
              ></el-link>
            </el-tooltip>
            <el-tooltip effect="dark" content="子任务" placement="bottom">
              <el-link
                class="el-icon-connection"
                :underline="false"
                v-on:click="showSubmission"
              ></el-link>
            </el-tooltip>
            <el-tooltip effect="dark" content="提醒" placement="bottom">
              <el-link
                class="el-icon-bell"
                :underline="false"
                v-on:click="showRemind"
              ></el-link>
            </el-tooltip>
          </el-col>

          <el-col
            v-if="firstTime"
            :span="9"
            :offset="5"
            style="white-space: nowrap"
          >
            <el-button @click="cancelForm()" size="mini">取 消</el-button>

            <el-button type="primary" @click="handleClose()" size="mini"
              >保 存</el-button
            >
          </el-col>
          <el-col v-else :span="9" :offset="5" style="white-space: nowrap">
            <el-button @click="Delete()" size="mini">删 除</el-button>
            <el-button type="primary" @click="handleClose()" size="mini"
              >保 存</el-button
            >
          </el-col>
        </el-row>

        <el-row>
          <!-- 第二行，自适应多行文本框，事项正文 -->
          <el-col
            ><el-input
              type="textarea"
              :autosize="{ minRows: 3 }"
              placeholder="请输入事项内容"
              v-model="form.textarea1"
              :autofocus="true"
              ref="mainText"
            >
            </el-input
          ></el-col>
        </el-row>

        <el-row v-if="show.remark">
          <el-col v-if="show.remark" :span="1"
            ><el-row class="icon"><i class="el-icon-document"></i></el-row
          ></el-col>
          <!-- 默认隐藏行，通过第一行子选项打开：备注 自适应文本框 -->
          <el-col :span="22" v-if="show.remark"
            ><el-input
              type="textarea"
              autosize
              placeholder="设置备注 "
              v-model="form.textarea2"
              style="margin: 0 0 0 10px"
            >
            </el-input
          ></el-col>
        </el-row>
        <el-row v-if="show.summary">
          <!-- 默认隐藏行，通过第一行子选项打开：总结 自适应文本框 -->
          <el-col v-if="show.summary" :span="1"
            ><el-row class="icon"
              ><i class="el-icon-chat-line-square"></i></el-row
          ></el-col>
          <el-col :span="22" v-if="show.summary"
            ><el-input
              type="textarea"
              autosize
              placeholder="设置总结"
              v-model="form.textarea3"
              style="margin: 0 0 0 10px"
            >
            </el-input
          ></el-col>
        </el-row>

        <el-row>
          <!-- 按钮组，优先级选项 -->
          <el-col :span="20" class="buttonGroup" style="white-space: nowrap">
            <el-button
              type="danger"
              icon="el-icon-close"
              round
              plain
              size="mini"
              v-on:click="color = 'red'"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-minus"
              round
              plain
              size="mini"
              v-on:click="color = 'yellow'"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-plus"
              round
              plain
              size="mini"
              v-on:click="color = 'blue'"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              round
              plain
              size="mini"
              v-on:click="color = 'green'"
            ></el-button>
            <el-button
              type="info"
              icon="el-icon-collection-tag"
              round
              plain
              size="mini"
              v-on:click="color = 'grey'"
            ></el-button>
            <el-button
              type=""
              icon="el-icon-chat-round"
              round
              plain
              size="mini"
              v-on:click="color = 'white'"
            ></el-button>
          </el-col>
        </el-row>

        <el-row>
          <!-- 日期时间起止选择器 -->
          <el-col :span="20">
            <el-date-picker
              v-model="form.timeValue"
              type="datetimerange"
              size="small"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </el-col>
        </el-row>

        <el-row v-if="show.remind">
          <el-col :span="1"
            ><el-row class="icon"><i class="el-icon-bell"></i></el-row
          ></el-col>
          <!-- 默认隐藏行，是否提醒，提醒时间 -->
          <el-col :span="22" v-if="show.remind">
            <el-cascader
              :options="remindOptions"
              v-model="remindValue"
              @change="handleRemindChange"
              style="margin: 0 0 0 10px"
              size="mini"
              clearable
            ></el-cascader>
          </el-col>
        </el-row>

        <el-row style="display: flex; justify-content: space-around">
          <!-- tag输入栏 -->
          <el-col :span="1"
            ><el-row class="icon"><i class="el-icon-collection-tag"></i></el-row
          ></el-col>
          <el-col :span="22" id="tag"
            ><el-tag
              :key="tag"
              v-for="tag in form.tag.dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleCloseTag(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="form.tag.inputVisible"
              v-model="form.tag.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ 新标签</el-button
            >
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>

        <el-row style="display: flex; justify-content: space-around">
          <!-- 设置地点，自适应文本框 -->
          <el-col :span="1"
            ><el-row class="icon"
              ><i class="el-icon-location-information"></i></el-row
          ></el-col>
          <el-col :span="22">
            <el-input
              type="textarea"
              autosize
              placeholder="设置地点 "
              v-model="form.textarea4"
              style="margin: 0 0 0 10px"
            >
            </el-input>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>

        <el-row v-if="show.submission">
          <el-col :span="1"
            ><el-row class="icon"><i class="el-icon-connection"></i></el-row
          ></el-col>
          <!-- 默认隐藏行，设置子任务 -->
          <el-col :span="22" v-if="show.submission"
            ><el-input
              type="textarea"
              autosize
              placeholder="设置子任务 "
              v-model="form.textarea5"
              style="margin: 0 0 0 10px"
            >
            </el-input
          ></el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { Message } from "element-ui";

export default {
  name: "Form",
  data() {
    return {
      // 抽屉属性和变量
      drawer: false,
      direction: "ltr",
      color: "",

      // flag
      flag_1: false,
      firstTime: true,
      true: true,

      // key
      returnKey: 0,

      // 提醒 remindOptions所有选择  remindValue（array）选中的值
      remindOptions: [
        { value: "noRemind", label: "不提醒" },
        { value: "justInTime", label: "准时提醒" },
        {
          value: "theSameDay",
          label: "当天提醒",
          children: [
            { value: "10minBefore", label: "提前10分钟提醒" },
            { value: "30minBefore", label: "提前半小时提醒" },
            { value: "1hourBefore", label: "提前1小时提醒" },
            { value: "2hourBefore", label: "提前2小时提醒" },
            { value: "3hourBefore", label: "提前3小时提醒" },
          ],
        },
        {
          value: "someDayBefore",
          label: "提前几天提醒",
          children: [
            { value: "oneDayBefore", label: "提前一天提醒" },
            { value: "twoDayBefore", label: "提前两天提醒" },
            { value: "threeDayBefore", label: "提前三天提醒" },
            { value: "fiveWeekBefore", label: "提前五天提醒" },
            { value: "oneWeekBefore", label: "提前一周提醒" },
          ],
        },
        { value: "oneMonthBefor", label: "提前一个月提醒" },
      ],
      remindValue: [],

      // 表单变量
      form: {
        textarea1: "", // 主要内容
        textarea2: "", // 备注 remark
        textarea3: "", // 总结 summary
        textarea4: "", // 地点
        textarea5: "", // 子任务 submission

        timeValue: [], // 起止时间

        // tag属性和变量
        tag: { inputVisible: false, inputValue: "", dynamicTags: [] },
      },

      // 可选的表单内容，true显示，false隐藏
      show: {
        remark: false,
        summary: false,
        submission: false,
        remind: false,
      },

      // 包含一系列从数据库查询返回的info对象的数组
      list: [],
      // 全部表单数据存储在info对象中
      info: {},
      // 从其他组件返回到form里的info对象
      reInfo: {},
      // 数据库初始化信息
      defaultObj: {
        color: "", // 放入初始化信息
        mainText:
          "欢迎使用日程表！下方的↓颜色按钮↓会更换事项的优先级颜色，蓝色为默认优先级。",
        remarkText: "这里可以输入对事项的备注",
        summaryText: "这里输入对事项的总结",
        positionText: "这里输入事项的相关地点",
        time: ["从何时开始", "何时结束"],
        tags: ["在这里输入标签", "按下enter键生成一个tag", "请勿输入重复tag"],
        remindValue: [],
      },
    };
  },
  methods: {
    handelOpen() {
      this.$refs.mainText.focus();
    },
    /// /////////////////////           表单保存-开始           ///////////////////////////////
    // 当点击表单的 确认按钮 或者表单失去 焦点blur 后，弹出确认框=》保存并关闭抽屉/返回
    handleClose() {
      let flag = this.validate();
      if (flag) {
        this.save();
        this.clearForm();
        this.drawer = false;
      } else {
        Message.warning("请输入事项内容");
      }
    },
    validate() {
      var pattern = /^[\s]*$/; // 以空格开头和结尾，中间有零或多次空格
      if (pattern.test(this.form.textarea1)) {
        // 如果mainText输入框内容为空
        if (this.form.textarea1 === " ") {
          return false;
        }
        return false;
      } else {
        return true;
      }
    },

    // 点击表单的 取消按钮 和 遮罩 后，清空表单并退出抽屉
    cancelForm() {
      if (this.form.textarea1 === "") {
        this.drawer = false;
        this.clearForm();
        clearTimeout(this.timer);
      } else {
        this.$confirm("内容还未保存，确认关闭吗？") // ie存在问题：点击确认没有退出抽屉
          .then(() => {
            this.drawer = false;
            this.clearForm();
            clearTimeout(this.timer);
          })
          .catch((_) => {
            console.log(_);
          });
      }
    },
    Delete() {
      // 调用sidbarcard的删除方法
      // alert(this.info.reKey)
      this.firstTime = false;
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
        readRequest = objStore.delete(this.returnKey);

        readRequest.onerror = () => {
          // alert('删除失败！')
        };
        readRequest.onsuccess = () => {
          // eslint-disable-next-line no-unused-expressions
          let col = this.$parent;
          let row = col.$parent;
          row.$parent.getList(); // 更新sidbar视图
          // alert('删除成功！')
          Message.success("删除成功！");
          this.drawer = false;
          this.clearForm();
        };
      };
    },
    // 清空表单中的数据
    clearForm() {
      this.color = "";
      this.show.remark = false;
      this.show.summary = false;
      this.show.submission = false;
      this.show.remind = false;
      this.remindValue = [];
      this.form.textarea1 = "";
      this.form.textarea2 = "";
      this.form.textarea3 = "";
      this.form.textarea4 = "";
      this.form.textarea5 = "";
      this.form.timeValue = "";
      this.form.tag.dynamicTags = [];
      this.firstTime = true;
    },
    getinfo() {
      let info = {};
      let now = new Date();
      if (this.firstTime === true) {
        // 如果是新建事项
        info.key = now.getTime(); // 新加属性-唯一的key
      } else {
        info.key = this.returnKey;
      }
      info.date = now; // 表单提交的时间,一个时间对象
      info.color = this.color;
      info.remindValue = this.remindValue;
      info.mainText = this.form.textarea1;
      info.remarkText = this.form.textarea2;
      info.summaryText = this.form.textarea3;
      info.positionText = this.form.textarea4;
      info.submissionText = this.form.textarea5;
      let timeFrom = now;
      let timeTo = new Date();
      timeTo.setDate(timeTo.getDate() + 1);
      // console.log('33333333333')
      // console.log(timeTo)
      info.time =
        this.form.timeValue.length === 0
          ? [timeFrom, timeTo]
          : this.form.timeValue;
      // 事项的起止时间
      info.tags = this.form.tag.dynamicTags;
      console.log("getinfo()获取到的data中的info：");
      console.log(info);
      this.info = info;
    },
    // 保存数据info并将info传递给sidbar
    save() {
      let info;

      this.getinfo();
      info = this.info;

      if (info) {
        // console.log(info)
        this.openDatabase("add"); // 保存info进indexedDB数据库
      }
    },
    // ------------------------        表单保存-结束          ---------------------------
    // --------------------------------------------------------------------------------
    /// /////////////////////           数据库-开始           ///////////////////////////////
    openDatabase(instruct) {
      if (!window.indexedDB) {
        alert("浏览器不支持indexedDB!");
      } else {
        /// /////////////      说明      ///////////// ///
        // db           指代→一个名叫 ‘db’   的 数据库对象
        // objStore     指代→一个名叫 ‘info’ 的 对象仓库
        // request      指代→一个名叫 none   的 请求对象
        // transaction  指代→一个名叫 none   的 事务对象
        //
        let db; // 数据库对象
        let objStore; // 对象仓库
        let request; // 请求
        let transaction; // 事务

        request = window.indexedDB.open("db"); // 连接数据库
        console.log(
          "---------------------------1-数据库连接中-----------------------------"
        );
        request.onerror = (event) => {
          // 请求失败
          console.log("连接数据库请求 失败 ！因为");
          console.log(event);
        };

        request.onsuccess = (event) => {
          // 请求成功
          db = event.target.result;
          // db=request.result  一样的效果
          console.log("连接数据库请求 成功 ！准备数据库校验");
          if (this.Validate(db, objStore)) {
            this.operation(transaction, db, instruct); // 增
          } else {
            console.log("WARNING:没有检查到indexedDB对象，数据库操作终止！");
          }
        };

        // request.onupgradeneeded = (event) => { // 发现更新
        //   db = event.target.result
        //   db.onerror = function (event) {
        //     console.log('版本更新 失败！')
        //   }
        //   console.log('版本更新 成功！版本' + event.oldVersion + '=>版本' + event.newVersion)
        //   if (!db.objectStoreNames.contains('info')) { // 如果info存储库不存在
        //     console.log('没有在数据库中找到info存储库')
        //     this.newObjectStore(objStore, db)// 新建一个info存储库
        //   }
        // }
      }
    },
    Validate(db, objStore) {
      if (db) {
        // 如果存在indexedDB对象
        console.log(
          "---------------------------数据库校验中-----------------------------"
        );
        console.log("存在db数据库");

        if (!db.objectStoreNames.contains("info")) {
          // 如果info存储库不存在
          console.log("没有在db数据库中找到info存储库");
          this.newObjectStore(objStore, db); // 新建一个info存储库
        }
        console.log("db数据库中找到了info存储库！");
      } else {
        return false;
      }
      return true;
    },
    operation(transaction, db, instruct) {
      // ---------------------------数据库校验-----------------------------
      let info;
      let store;
      let readRequest;

      info = this.info;
      transaction = db.transaction("info", "readwrite"); // 开启读写事务
      store = transaction.objectStore("info"); // 指定事务为‘info’对象仓库的事务
      readRequest = store.getAll(null);

      readRequest.onerror = () => {
        console.log("查询info是否为空的事务 失败！");
      };
      readRequest.onsuccess = () => {
        console.log("查询info是否为空的事务 成功！");
        if (readRequest.result.length === 0) {
          // 如果查询结果显示对象仓库 store 为空
          console.log("查询结果：info为空");
          store.put(this.defaultObj);
          console.log("已执行操作：放入初始化数据");
        }
        // store不为空则进行-------------数据操作-----------------------------------
        console.log("查询结果：info不为空");
        console.log("info的值为：");
        console.log(info);
        console.log(
          "---------------------------3-数据操作中-----------------------------"
        );
        switch (instruct) {
          case "add":
            store.put(info);
            console.log("已放入新数据！准备再次连接数据库");
            this.updateSidbar(); // 将数据库数据传给sidbar，用来更新视图
            break;
          case "query":
            // eslint-disable-next-line no-case-declarations
            let request = store.getAll(null);
            request.onsuccess = () => {
              this.list = request.result;
              console.log("查询所有info数据的事务 成功！info组成的数组为list");
              console.log("list的值为：");
              console.log(this.list);
              this.flag_1 = true;
            };
            request.onerror = () => {
              console.log("查询所有info数据的事务 失败！");
            };
            break;
          default:
            console.log("出现了未知错误，可能是由于instruct的值被改写");
            break;
        }
      };
      transaction.oncomplete = () => {
        console.log("读写事务结束！！！！");
      };
    },
    updateSidbar() {
      let list;

      this.openDatabase("query");
      let a = setInterval(() => {
        if (this.flag_1 === true) {
          list = this.list;
          console.log("数据库查询完成！传递给sidbar的list值:");
          console.log(list);
          this.$emit("bindFunc", list); // 把list传递给父组件，用叫做bindFunc的子组件标签的属性来绑定父组件的处理函数
          clearInterval(a);
        } else {
          console.log("数据库查询还未完成，请稍后...");
        }
      }, 100);
    },
    newObjectStore(objStore, db) {
      console.log(
        "---------------------------存储库创建中-----------------------------"
      );

      objStore = db.createObjectStore("info", { keyPath: "key" }); // 对象仓库名字：‘info’，主键(key)
      objStore.createIndex("key", "key", { unique: true }); // 新建一个color索引
      objStore.createIndex("date", "date", { unique: false }); // 新建一个color索引
      objStore.createIndex("color", "color", { unique: false }); // 新建一个color索引
      objStore.createIndex("remindValue", "remindValue", { unique: false }); // 新建一个remindValue索引
      objStore.createIndex("mainText", "mainText", { unique: false }); // 新建一个mainText索引
      objStore.createIndex("remarkText", "remarkText", { unique: false }); // 新建一个remarkText索引
      objStore.createIndex("summaryText", "summaryText", { unique: false }); // 新建一个summaryText索引
      objStore.createIndex("positionText", "positionText", { unique: false }); // 新建一个positionText索引
      objStore.createIndex("tags", "tags", { unique: false }); // 新建一个tags索引
      objStore.createIndex("time", "time", { unique: false }); // 新建一个time索引

      console.log("info存储库创建成功！索引全部新建完成");

      objStore.put(this.defaultObj);

      console.log("已执行操作：存入初始化数据");
    },
    // ------------------------        数据库-结束          ---------------------------
    // --------------------------------------------------------------------------------

    /// /////////////////////           Tag-开始           ///////////////////////////////
    handleCloseTag(tag) {
      this.form.tag.dynamicTags.splice(
        this.form.tag.dynamicTags.indexOf(tag),
        1
      );
    },
    showInput() {
      this.form.tag.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.form.tag.inputValue;

      if (inputValue) {
        // 如果存在inputValue
        if (this.form.tag.dynamicTags.length === 0) {
          // 如果dynamicTags中不存在tag
          this.addTag(); // 就将inputValue放入dynamicTags
        } else {
          // 如果dynamicTags中存在tag
          for (let i in this.form.tag.dynamicTags) {
            // 遍历每一个dynamicTags的tag
            let a = inputValue;
            let b = this.form.tag.dynamicTags[i];
            console.log(a);
            console.log(b);
            if (a === b) {
              // 如果inputValue不与其中任何一个相等
              Message.warning("请不要输入相同的tag");
              return;
            }
          }
          this.addTag(); // 就将inputValue放入dynamicTags
        }
      }
    },
    addTag() {
      this.form.tag.dynamicTags.push(this.form.tag.inputValue);
      this.form.tag.inputVisible = false;
      this.form.tag.inputValue = "";
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // ------------------------         Tag-结束          ----------------------
    // --------------------------------------------------------------------------------
    /// /////////////////////           提醒-开始           ///////////////////////////////
    handleRemindChange() {
      // 处理 remind选择器 的 改变事件
      console.log(this.remindValue);
    },
    // ------------------------         提醒-结束          ----------------------
    // --------------------------------------------------------------------------------
    /// /////////////////////           改变颜色-开始           ///////////////////////////////
    showRemark() {
      this.show.remark === false
        ? (this.show.remark = true)
        : (this.show.remark = false);
    },
    showSummary() {
      this.show.summary === false
        ? (this.show.summary = true)
        : (this.show.summary = false);
    },
    showSubmission() {
      this.show.submission === false
        ? (this.show.submission = true)
        : (this.show.submission = false);
    },
    showRemind() {
      this.show.remind === false
        ? (this.show.remind = true)
        : (this.show.remind = false);
    },
    // --------------------------------------------------------------------------------
    /// /////////////////////           提醒-开始           ///////////////////////////////
    // ------------------------         改变颜色-结束          ----------------------
    open(info) {
      console.log(info);
      this.reInfo = info;
      this.firstTime = false;
      this.returnKey = info.key;
      this.color = info.color;
      this.form.textarea1 = info.mainText;
      this.form.textarea2 = info.remarkText;
      this.form.textarea3 = info.summaryText;
      this.form.textarea4 = info.positionText;
      this.form.textarea5 = info.submissionText;
      this.form.timeValue = info.time; // 事项的起止时间
      this.form.tag.dynamicTags = info.tags;
      this.drawer = true;
    },
  },
  computed: {},
};
</script>
<style scoped>
#color {
  height: 100%;
  width: 100%;
  padding: 1px 5px;
  transition: ease-in-out 0.3s;
}
.green {
  background-color: rgb(240, 249, 235);
}
.red {
  background-color: rgb(254, 240, 240);
}
.blue {
  background-color: rgb(236, 245, 255);
}
.yellow {
  background-color: rgb(253, 246, 236);
}
.grey {
  background-color: rgb(244, 244, 245);
}
.white {
  background-color: rgb(255, 255, 255);
}
i {
  font-size: 20px;
}
.el-link {
  font-size: 20px;
}
.el-row {
  margin: 10px;
}
#tag * {
  margin-bottom: 5px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin: 0 0 0 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.icon {
  margin: 5px 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
}
.el-tag {
  margin: 0 0 0 10px;
}
</style>
<style >
.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: auto !important;
}
.drawer-header{

}
</style>
