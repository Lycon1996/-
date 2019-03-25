export default [
  {
    path: '/',
    redirect: '/list'
  },
  // {
  //   path: '/example', // 路径
  //   name: '标题', // 这个设置后,访问该页面document.title会自动更新为name.如果需要异步更新document.title,请将name字段设置为'',并在需要修改标题的时候调用$setWechatTitle方法.
  //   component: function (resolve) {
  //     require(['../views/example'], resolve) // 组件调用
  //   },
  //   meta: {
  //     keepAlive: false,  // 设置当前页面为keepAlive
  //     needPullDown: false, // 该项设置为true时,会开启BScroll的下拉监听功能.
  //     needPullUp: false // 该项设置为true时,会开启BScroll的上拉监听功能
  //   }
  // },
  {
    path: '/list',
    name: '列表',
    component: function (resolve) {
      require(['../views/list'], resolve)
    }
  },
  {
    path: '/detail',
    name: '详情',
    component: function (resolve) {
      require(['../views/detail'], resolve)
    }
  }
]
