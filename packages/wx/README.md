# @tool-developer/wx-app
在微信原生方法上进行扩展

## 用法
### 安装
```
npm install --save @tool-developer/wx-app
```
or
```
yarn add @tool-developer/wx-app
```

### 引入
app.js
```
import wxapp from '@tool-developer/wx-app'
//
const options = wxapp.extend(wxapp,{
  App:wxapp,// 方便子页面直接通过app.App获取扩展方法
})
//
App(options);
```
pages/main.js
```
const app = getApp();
const page = app.extend(app.App,{
  // ...
});
//
Page(page);
```

## 扩展说明
通过拷贝方式进行扩展，扩展后的属性和方法，可以直接通过this访问。
### version
扩展库版本

### events
自定义事件，配合bindEvent使用

首先，通过bindEvent在*.wxml文件中具体的事件关联，通过data-event,data-id,id进行事件区分。
main.wxml
```
<view bindtap="bindEvent" data-eventid="click">点击<view>
```
然后，在*.js中通过events关联真是的事件处理。
main.js
```
{
  events:{
    'tap #click':'toClick'
  },
  toClick(e){
    // 真是点击事件处理
  }
}
```

### data
微信数据扩展

### i18n
多国语提示文字扩展，内部通过i18nHandle转换处理
```
i18n:{
  'authorize.title':'授权提示',
  'authorize.content':'{authorize.appName}需要您授权{authorize.scopeName}，点击确定前去设置',
  'authorize.loading':'正在授权...',
  'authorize.cancel':'取消授权',
  'authorize.success':'已授权'
}
```

### TabBarList
当钱tabBar list配置pagePath数组，

this.go处理流程中会自动识别跳转path是否在该配置中，采取不一致的处理。
```
wxapp.TabBarList = [
  'pages/index/index',
  'pages/mine/index'
];
```
### PageNamePathKV
页面名字路径映射，方便直接通过name对应路径。
```
wxapp.PageNamePathKV = {
  'webview':'pages/webview/index'
}
```
配置之后，可以直接通过name调用。
```
this.go('webview')
```



### 页面跳转
#### pageTo(url,type,cb)
针对'navigateTo', 'switchTab', 'redirectTo', 'reLaunch'方法，提供一致的处理。

除了pageTo方法，switchTab提供同名switchTo，reLaunch提供同名reLaunchTo方法。

| type | 说明 | 
| :-- | :-- |
| navigate | 对应navigateTo | 
| switch | 对应switchTab | 
| redirect | 对应redirectTo | 
| reLaunch | 对应reLaunch | 

#### go(page,query,type,cb)
页面跳转流程处理

内部处理了path跳转的方式(type+tabBar list)

内部还处理了query参数传递过程中的编码，以及路径转换

内部还支持webview跳转处理，直接传递http打头的path，会进入webview，默认webview路径是:pages/webview/index，如果有调整，可在PageNamePathKV中配置。

具体可参考[TabBarList](#TabBarList)和[PageNamePathKV](#PageNamePathKV)。



#### back(delta)
返回，调用[wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html)。


### 多语言处理
#### i18nHandle(str,data)
支持动态数据替换处理，动态字段通过`{}`进行包裹。
```
i18n:{
  'authorize.title':'授权提示',
  'authorize.content':'{authorize.appName}需要您授权{authorize.scopeName}，点击确定前去设置',
}
```
```
  i18nHandle('authorize.content',{
    appName,
    scopeName
  })
```

### 数据处理相关
#### dataset(key,e)
通过dataset方便获取绑定的data-*数据。
```
  // tap event
  // e
  //
  const name = this.dataset('name',e);
```
#### $set(data,callback)
延时setData方法，内部默认有延时100，可以通过SET_DATA_FREQUENCY修改。

app.js/main.js
```
{
  SET_DATA_FREQUENCY:200
}
```

### 事件相关
#### bindEvent
默认将bindEvent绑定到*.xwml文件中的对象标签上，通过标签的data-eventid,data-id,id，以及事件type进行区分。

内部会进行真实事件调用处理，具体见[events](#events)。

#### bindEvents
内部还提供了一个bindEvents，如果配置有该方法，所有的事件调用，都会先调用该方法。

#### bindTelEvent
拨打电话处理，电话号码通过data-tel传入，不传入号码，或者通过data-not-allowed可控制是否允许拨打电话。

如果有配置，不允许拨打电话时，会调用bindTelNotAllow方法。

如果有配置，允许拨打电话，会调用bindTelEventCallback方法(拨打之前调用，不是拨打成功之后回调)。

### 微信设置相关
#### getWxSetting(callback)
内部调用wx.getSetting方法，通过callback(null,setting)返回
```
  this.getWxSetting((err,setting)=>{
    //
  })
```

#### authorize(options, callback)
微信setting授权调用处理,参考[wx.authorize](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope-列表)

内部首先会调用是否授权处理，然后发起授权流程

```
this.authorize({
  scope,
  scopeName,
  appName
})
```
scope参考[scope列表](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html#scope-列表)

可以使用其中的描述，作为scopeName，appName为当前应用名。

#### getWxUserInfoAuthorize(callback)
用户是否授权登录
```
this.getWxUserInfoAuthorize((err,isAuth)=>{
  // true,已授权
})
```

### 提示相关
#### hideLoading()
隐藏loading提示

#### showLoading(options,mask)
显示loading提示

#### showToast(options, icon, duration)
toast提示处理

可以通过i18n处理error提示图标
```
i18n:{
  'toast.icon.error':'./assets/images/error.png'
}
```


```
this.showToast('提示内容')
```

```
this.showToast('提示内容','success')
```

```
this.showToast({
  title:"提示内容"
})
```

```
this.showToast({
  title:"提示内容",
  icon:"success"
})
```
```
this.showToast({
  title:"提示内容",
  image:"./assets/images/success.png"
})
```

#### hideToast()

#### showModal(options, title)
modal弹框提示，内部做了约束处理，一次只能出现一个modal弹框。

```
this.showModal({
  content,
  title,
  complete,
  fail
})
```
使用参考：[wx.showModal](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showModal.html)


### 其他扩展
#### getWxCurrentOptions()
获取当前页面options

#### getWxCurrentPage()
获取当前页面路由地址

#### scrollToEl(el,duration)
滚动到元素位置

