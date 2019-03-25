# inrice/wx-fe API文档
本文档仅针对于广州趣米网络科技有限公司的前端项目.所对接的接口规范及常用后端接口都仅适用于趣米的后端规范.其他来源项目请谨慎适用.
## Getting start
请在部署前确认部署的设备是否已全局安装了vue-cli的依赖包.并执行以下代码:
```bash
$ vue init inrice/wx-fe my-project
$ npm i
$ cp src/env.js.example src/env.js
$ npm run dev
```
## Configuration
本项目的配置项主要分为`环境配置(Environment configuration)`,`开发配置(Development configuration)`.
### Environment configuration
简称`env`,是动态配置项,**必须为gitignore状态**,主要在内部填写环境的信息,例如API域名,路径等.
```JavaScript
// src/env.js
export default {
  // 发送api请求的域名(必须是域名)
  host: 'http://xxx',
  // api的路径
  baseURL: '/foo/bar',
  // 需要放置在服务器的静态资源地址
  sourceURL: '',
  title: '',
  // 以下为可覆盖config文件内容,如果定义,在config中的相关设置会被覆盖
  // wechatConfigUrl: '',
  // wechatAuthUrl: '',
  // authUrl: '',
  // storageType: '',
  // tokenType: '',
  // token: '',
  // appid, 以后端要求为准
  appID: 1,
  // 以下可以是自定义的部分
  MTAConfig: {
    open: false,
    config: {
    }
  }
}
```
在vue实例中,可用`this.$env`来获取相关内容
### Development configuration
简称`config`,此部分主要为项目的一些静态配置,例如oAuth策略,微信配置开关,微信授权地址等.
主要分为两部分:`auth`,`weixin`.在vue实例中,可用`this.$config`获取相关配置
```JavaScript
 // src/config/auth.js
 export default {
  /*
  |--------------------------------------------------------------------------
  | 认证方式
  |--------------------------------------------------------------------------
  |跟后端的认证方式,session or jwt.
  |
  */
  authenticator: 'jwt',
  /*
    |--------------------------------------------------------------------------
    | 获取token或者session的url地址,可以是登录页.
    | 可以是完整的地址
    | 注意相对地址要以 / 开头
    |--------------------------------------------------------------------------
    |
    */
  authUrl: '/api/authorizations',
  /*
  |--------------------------------------------------------------------------
  | jwt配置 例: Authorization: `${tokenType} ${token}`
  |--------------------------------------------------------------------------
  |
  */
  jwtConfig: {
    /*
    |--------------------------------------------------------------------------
    | jwt信息的存放位置,可选localStorage 或者 sessionStorage
    |--------------------------------------------------------------------------
    |
    */
    storageType: 'localStorage',
    /*
    |--------------------------------------------------------------------------
    | token type在Storage中的字段名
    |--------------------------------------------------------------------------
    |
    */
    tokenType: 'inrice_token_type',
    /*
    |--------------------------------------------------------------------------
    | token 在Storage中的字段名
    |--------------------------------------------------------------------------
    |
    */
    token: 'inrice_access_token',
    /*
    |--------------------------------------------------------------------------
    | 不需要进行token校验的url
    |--------------------------------------------------------------------------
    |
    */
    authWhiteList: [
      // 'xxx'
    ]
  }
}
```
```JavaScript
// src/config/weixin.js
export default {
  /*
  |--------------------------------------------------------------------------
  | 是否需要接入微信SDK,接入后可配置分享等操作
  |--------------------------------------------------------------------------
  |
  */
  isWechat: true,
  wechatConfig: {
    /*
    |--------------------------------------------------------------------------
    | 获取微信配置的url
    |--------------------------------------------------------------------------
    |
    */
    wechatConfigUrl: '/wechat/jssdk'
  },
  /*
  |--------------------------------------------------------------------------
  | 是否需要接入微信授权
  |--------------------------------------------------------------------------
  |
  */
  isNeedWechatAuth: true,
  /*
  |--------------------------------------------------------------------------
  | 微信授权配置
  |--------------------------------------------------------------------------
  |
  */
  wechatAuthConfig: {
    /*
    |--------------------------------------------------------------------------
    | 微信授权地址,可以是相对地址也可以是绝对地址,相对地址以env.host为准
    |--------------------------------------------------------------------------
    |
    */
    wechatAuthUrl: '/wechat/authorize'
  }
}

```
## How to develop
### 人机交互式创建页面或者组件
本框架采用node.js的方法做了部分fs的操作.可通过命令行创建一个新的文件(页面或者组件),例如:
```bash
$ node create page foo/bar -n page-bar
```
将会执行创建指令,在`src/views/foo/bar` 目录下创建一个`index.vue`文件.`-n`为组件或者页面的`name`属性.`-f`为组件或者页面的指定文件名.
如执行:
```bash
$ node create component foo/bar -n com-bar
# 在src/components 目录下创建 foo/bar/index.vue 文件

$ node create page foo/bar -f edit -n bar-edit
# 在src/components 目录下创建 foo/bar/edit.vue 文件

$ node create component foo/bar --name=com-bar --filename=baz
# 在src/components 目录下创建 foo/bar/baz.vue 文件
```
## SDK
在项目底层封装了一部分操作作为本框架的SDK.
### $fetch
请求模块使用的是flyio,与小程序项目同步.支持`get`,`post`,`put`,`patch`,`delete`方法
```JavaScript
this.$fetch.get('url', {data})
this.$fetch.post('url', {data})
this.$fetch.put('url', {data})
this.$fetch.patch('url', {data})
this.$fetch.delete('url', {data})
```
### $checkIsWeixin() return <Boolean>
用于判断当前UA是否为微信浏览器
```javascript
this.$checkIsWeixin() // true
```

### $importWeixinSDK()
用于动态引入微信jssdk文件包
```JavaScript
await this.$importWeixinSDK()
```

### $wxConfig()
用于发送请求向后端获取微信签名配置
```JavaScript
await this.$wxConfig()
```

### $setShare(options)
用于配置微信分享部分内容
```JavaScript
this.$setShare({
    title: '',
    desc: '',
    link: '',
    imgUrl: ''
})
```

### $setWechatTitle(title)
用来防止iPhone下的微信浏览器document.title不生效.
```JavaScript
this.$setWechatTitle('title')
```
## How to debug
调试阶段可以调起`vConsole`进行调试,调用方法为:`http://localhost:8848/#/index?vConsole=true`