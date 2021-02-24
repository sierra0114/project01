// --------------------------------        已完成         ------------------------------------
/// /////////////////////           数据库-开始           ///////////////////////////////
//
// 函数名                           功能
// dataBase()                       初始化，容器函数 
// openDatabase()                   打开数据库请求，在异步的事件处理函数中获取数据库对象 db ->validate
// validate(db)
// operation (db)
// newObjectStore (objStore, db)
//
// ++info对象：{color: ''
//              mainText: ''      --required
//              positionText: ''
//              remarkText: ''
//              remindValue: []
//              submissionText: ''
//              summaryText: ''
//              tags: []
//              time: []           }
export default dataBase
function dataBase () {
  let defaultObj = { color: '', // 放入初始化信息
    mainText: '欢迎使用日程表！下方的↓颜色按钮↓会更换事项的优先级颜色，蓝色为默认优先级。',
    remarkText: '这里可以输入对事项的备注',
    summaryText: '这里输入对事项的总结',
    positionText: '这里输入事项的相关地点',
    time: ['从何时开始', '何时结束'],
    tags: ['在这里输入标签', '按下enter键生成一个tag', '请勿输入重复tag'],
    remindValue: [] }
  let list = []
  let objStore// 对象仓库

  console.log('/////////////////////////////////////////////////////////////////////////////////////////////////')
  console.log('//////////////////////////////----正在初始化indexedDB数据库----///////////////////////////////////')
  console.log('/////////////////////////////////////////////////////////////////////////////////////////////////')

  openDatabase()

  function openDatabase () {
    if (!window.indexedDB) {
      alert('浏览器不支持indexedDB功能!请更换其他浏览器打开')
      // 把主界面换成提示页面
    } else {
      /// /////////////      说明      ///////////// ///
      // db           指代→一个名叫 ‘db’   的 数据库对象
      // objStore     指代→一个名叫 ‘info’ 的 对象仓库
      // request      指代→一个名叫 none   的 请求对象
      // transaction  指代→一个名叫 none   的 事务对象
      //

      let request // 请求

      request = window.indexedDB.open('db', 10) // 连接数据库
      console.log('---------------------------数据库连接中-----------------------------')
      request.onerror = (event) => { // 请求失败
        console.log('连接数据库请求 失败 ！因为：')
        console.log(event)
        // alert('打开失败！请刷新页面重试')
      }

      request.onsuccess = (event) => { // 请求成功
        let db = event.target.result
        // db=request.result  一样的效果
        console.log('连接数据库请求 成功 ！准备数据库校验')
        if (validate(db)) {
          operation(db)// 增
        } else {
          console.log('WARNING:没有检查到indexedDB对象，数据库操作终止！')
        }
      }

      request.onupgradeneeded = (event) => { // 发现更新
        let db // 数据库对象
        db = event.target.result
        db.onerror = function () {
          console.log('版本更新 失败！')
          // alert('打开失败！请刷新页面重试')
        }
        console.log('版本更新 成功！版本' + event.oldVersion + '=>版本' + event.newVersion)

        if (!db.objectStoreNames.contains('info')) { // 如果info存储库不存在
          console.log('没有在数据库中找到info存储库')
          newObjectStore(objStore, db)// 新建一个info存储库
        }
        if (!db.objectStoreNames.contains('user')) { // 如果user存储库不存在
          console.log('·没有在数据库中找到user存储库')
          objStore = db.createObjectStore('user', { keyPath: 'id' })// 对象仓库名字：‘user’，主键(key)
          console.log('·user创建存储库ing')
          objStore.createIndex('id', 'id', {unique: true})// 新建一个user索引
          // objStore.createIndex('name', 'name', {unique: true})// 新建一个user索引
        }
      }
    }
  }

  function validate (db) {
    // ---------------------------数据库校验-----------------------------
    if (db) { // 如果存在indexedDB对象
      console.log('---------------------------数据库校验中-----------------------------')
      console.log('存在db数据库')

      if (!db.objectStoreNames.contains('info')) { // 如果info存储库不存在
        console.log('没有在db数据库中找到info存储库')
      }
      console.log('db数据库中找到了info存储库！')
    } else {
      return false
    }
    return true
  }

  function operation (db) {
    let transaction// 事务
    let store// 事务指定的存储库
    let readRequest// 请求

    transaction = db.transaction('info', 'readwrite')// 开启读写事务
    transaction.oncomplete = () => { alert('读写事务开启成功！！') }
    transaction.onabort = () => { alert('读写事务开启失败！！') }
    store = transaction.objectStore('info') // 指定事务为‘info’对象仓库的事务
    readRequest = store.getAll(null)
    readRequest.onerror = () => {
      console.log('查询info是否为空的事务 失败！')
      // alert('打开失败！请刷新页面重试')
    }
    readRequest.onsuccess = () => {
      console.log('查询info是否为空的事务 成功！')
      if (readRequest.result.length === 0) { // 如果查询结果显示对象仓库 store 为空
        console.log('查询结果：info为空')
        store.put(defaultObj)
        console.log('已执行操作：放入初始化数据')
      }
      // store不为空则进行-------------数据操作-----------------------------------
      console.log('查询结果：info不为空')
      console.log('info存储库长度为：')
      console.log(readRequest.result.length)
      console.log('---------------------------数据操作中-----------------------------')

      list = readRequest.result
      console.log('查询所有info数据的事务 成功！')
      console.log('list的值为：')
      console.log(list)

      transaction.oncomplete = () => {
        console.log('读写事务结束！！！！')
        db.close()
        console.log('/////////////////////////////////////////////////////////////////////////////////////////////////')
        console.log('//////////////////////////////----indexedDB数据库初始化完成----///////////////////////////////////')
        console.log('/////////////////////////////////////////////////////////////////////////////////////////////////')
      }
    }
  }

  function newObjectStore (objStore, db) {
    console.log('---------------------------存储库创建中-----------------------------')

    objStore = db.createObjectStore('info', { keyPath: 'key', autoIncrement: true })// 对象仓库名字：‘info’，主键(key)
    console.log('创建存储库')
    objStore.createIndex('key', 'key', {unique: true})// 新建一个key索引
    objStore.createIndex('date', 'date', {unique: false})// 新建一个date索引
    objStore.createIndex('color', 'color', {unique: false})// 新建一个color索引
    objStore.createIndex('remindValue', 'remindValue', {unique: false})// 新建一个remindValue索引
    objStore.createIndex('mainText', 'mainText', {unique: false})// 新建一个mainText索引
    objStore.createIndex('remarkText', 'remarkText', {unique: false})// 新建一个remarkText索引
    objStore.createIndex('summaryText', 'summaryText', {unique: false})// 新建一个summaryText索引
    objStore.createIndex('positionText', 'positionText', {unique: false})// 新建一个positionText索引
    objStore.createIndex('tags', 'tags', {unique: false})// 新建一个tags索引
    objStore.createIndex('time', 'time', {unique: false})// 新建一个time索引

    console.log('info存储库创建成功！索引全部新建完成')

    objStore.put(defaultObj)

    console.log('已执行操作：存入初始化数据')
  }
}

// ------------------------        数据库-结束          ---------------------------
// --------------------------------------------------------------------------------
