/* eslint-disable no-unused-vars */
<template id='Sidbar'>
  <div class="Sidbar">
    <div class="container">
      <el-row>
        <el-col :span="24">
          <Form
          @bindFunc="getListFromForm"
          ref="drawer"
          ></Form>
          <div class="view-change">
            <el-dropdown size="medium" placement="bottom" @command="handleCommand">
              <span class="drop-down-link"
                >排列方式<i class="el-icon-arrow-down el-icon--right"></i
              ></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">时间顺序</el-dropdown-item>
                <el-dropdown-item command="b">时间逆序</el-dropdown-item>
                <!-- <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
              <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="empty"></div>
    <div  class="cards" v-if="!isReverse" >
      <SidbarCard
      v-for="(item) in this.resovedList"
      :key="item.reKey"
      :info="item"
      @openForm-between="passThisToForm"
      ></SidbarCard>
      <!-- info绑定的是子组件的props的属性 -->
    </div>
        <div  class="cards" v-else>
      <SidbarCard
      v-for="(item) in this.resovedListReverse"
      :key="item.reKey"
      :info="item"
      @openForm-between="passThisToForm"
      ></SidbarCard>
      <!-- info绑定的是子组件的props的属性 -->
    </div>

    <div class="empty"></div>
  </div>
</template>

<script>
import SidbarCard from './SidbarCard.vue'
import Form from './Form'

export default {
  name: 'Sidbar',
  data () {
    return {
      list: [], // 从数据库取得的所有数据数组
      resovedList: [], // 解析list以得到的缩略版本，顺序数组，传递给子组件sidbarCard
      resovedListReverse: [], // 和resovedList一样，逆序数组，传递给子组件sidbarCard

      // flag
      isReverse: false// 数组是否逆序
    }
  },
  components: {
    SidbarCard,
    Form
  },
  methods: {
    getListFromForm (list) {
      // eslint-disable-next-line no-unused-vars
      this.list = list
    },
    getList () {
      let db // 数据库对象
      let objStore // 对象仓库
      let request // 请求
      let transaction // 连接事务
      let readRequest // 读写事务

      request = window.indexedDB.open('db') // 连接数据库
      // eslint-disable-next-line no-unused-vars
      request.onerror = (event) => {
        // 请求失败
        // console.log('连接数据库请求 失败 ！因为' + event)
      }

      request.onsuccess = (event) => {
        // 请求成功
        db = event.target.result
        // db=request.result  一样的效果
        // console.log('连接数据库请求 成功 ')
        transaction = db.transaction('info', 'readwrite') // 开启读写事务
        objStore = transaction.objectStore('info') // 指定事务为‘info’对象仓库的事务
        readRequest = objStore.getAll(null)

        readRequest.onerror = () => {
          // console.log('读写事务 失败！')
        }
        readRequest.onsuccess = () => {
          // console.log('读写事务 成功！已经获取到了list数据')
          this.list = readRequest.result
          console.log('侧边栏获取到了list，它的值为：')
          console.log(this.list)
        }
      }
    },
    toColorClass (item) {
      let Class = ''
      let color = item.color
      switch (color) {
        case 'red' :
          Class = 'danger'
          break
        case 'blue':
          Class = 'primary'
          break
        case 'green':
          Class = 'success'
          break
        case 'yellow':
          Class = 'warning'
          break
        case 'grey':
          Class = 'info'
          break
        case '':
          Class = ''
      }
      return Class
    },
    getTime (item, num) {
      let timeObj = item.time[num]
      // eslint-disable-next-line valid-typeof
      if (typeof (timeObj) === null) { // time对象的类型为null（time对象为空
        return '时间对象不存在'
      // eslint-disable-next-line valid-typeof
      } else if (typeof (timeObj) === 'string') { // time对象的类型为string（初始化数据的情况
        return timeObj
      } else {
        let timetr = getTimeStr()
        return timetr
      }
      function getTimeStr () {
        if (typeof (timeObj) === 'object') {
          const day = timeObj.getDay()
          const date = timeObj.getDate()
          const month = timeObj.getMonth() + 1
          const year = timeObj.getFullYear()
          const weekMap = [
            '',
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期日',
            ''
          ]
          const timeStr = year + '/' + month + '/' + date + ' ' + weekMap[day]
          return timeStr
        }
      }
    },
    getTag (item) {
      let tags = []
      let reTags = ''
      tags = item.tags
      for (let i in tags) {
        reTags += '#' + tags[i] + ' '
      }
      return reTags
    },
    getTagFlag (item) {
      let tags = []
      tags = item.tags

      if (tags.length === 0) { return false } else { return true }
    },
    getResovedList () {
      let resovedList = []
      for (let i in this.list) {
        let item = this.list[i]
        let reTime = item.time
        let reKey = item.key
        let reMainText = item.mainText
        let reColor = this.toColorClass(item)
        let reTimeFrom = this.getTime(item, 0)
        let reTimeTo = this.getTime(item, 1)
        let reTag = this.getTag(item)
        let tagFlag = this.getTagFlag(item)

        let resovedItem = {reTime, reMainText, reColor, reTimeFrom, reTimeTo, reTag, tagFlag, reKey}

        resovedList.push(resovedItem)
      }
      resovedList.sort((a, b) => { return a.reTime[0] - b.reTime[0] })
      console.log('22222222222222')
      console.log(resovedList)
      return resovedList
    },
    passThisToForm (keyOrInfo) {
      // 有两个调用来源：
      // 1从子组件sidbarCard的emit（参数为一个事项的key）
      // 2从父组件appmian的ref（参数为一个事项的全部信息）
      if (keyOrInfo.mainText) {
        let info = keyOrInfo
        this.$refs.drawer.open(info)// 调用form的openForm方法
      } else {
        let key = keyOrInfo
        for (let i in this.list) {
          if (this.list[i].key === key) {
            let info = this.list[i]
            this.$refs.drawer.open(info)// 调用form的openForm方法
            return
          }
        }
      }
    },
    // --------------------------------------------------------------------------------------------------
    // --------------------------------------     下拉菜单指令     --------------------------------------
    // --------------------------------------------------------------------------------------------------
    handleCommand (command) {
      if (command === 'a') {
        this.isReverse = false
        console.log(this.isReverse)
        this.$message('正序')
      } else if (command === 'b') {
        this.isReverse = true
        console.log(this.isReverse)
        this.$message('逆序')
      }
    }
  },
  // --------------------------------------     whath     --------------------------------------
  watch: {
    list: {
      handler (oldList, NewList) {
        console.log('侧边栏的list更新了')
        this.resovedList = this.getResovedList()
        this.resovedListReverse = [...this.resovedList].reverse()// 浅拷贝
        console.log('1111111111')
        console.log(this.resovedListReverse)
        console.log(this.resovedList)
      }
    },
    resovedList: {
      handler (oldList, NewList) {
        console.log('侧边栏的resovedList更新了')
      }
    }
  },
  // --------------------------------------     created     --------------------------------------

  created () {
    this.getList()
    console.log('侧边栏被创建了')
  },
  // --------------------------------------     beforeMount     --------------------------------------

  beforeMount () {
    this.resovedList = this.getResovedList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
* {
    translate: .5s;
  font-weight: normal;
  font-size: 14px;
}
.Sidbar {
  display: block;
  background-color: rgb(245, 245, 245);

  max-height: 90vh;
padding-right: 25px;
  overflow-y: auto;
  overflow-y: overlay;
  overflow-x: hidden;
}

.el-dropdown-link,
span {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-row {
  white-space: nowrap;
  width: fit-content;
  margin-top: 1px;

  position: fixed;
  width: 230px;
  background-color: rgb(245, 245, 245);
}
.el-col {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container {
  position: fixed;
  width: 240px;
  height: 42px;
  background-color: rgb(245, 245, 245);
}
.newButton {
  font-size: bolder;
  padding-left: 20px;
}
.view-change {
  padding-right: 15px;
}
.empty {
  background-color: rgb(245, 245, 245);
  height: 42px;
}
.el-divider {
  top: 40px;
  margin: 0;
}
</style>
/* eslint-disable no-unused-vars */