# @tool-developer/wx-storage
基于[数据缓存](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html)相关接口进行封装。

对外提供一致的api，并添加“存储过期”，原生的存储诸如localStorage之类的，是不支持存储过期的。

默认存储过期时间为3600000ms，即1小时，可通过设置第三个参数自定义存储过期时间(单位ms)，设置-1表示永久存储(直到用户或者系统清除缓存)。

除了同步返回之外，还提供Promise和callback两种返回。


## 用法
```
npm install --save @tool-developer/wx-storage
```
or
```
yarn add @tool-developer/wx-storage
```

```
import storage from '@tool-developer/wx-storage'

```

## 方法介绍
不管是async，还是session，对外都提供一致的api方法，具体如下：
| 方法	| 说明 | 
| :-- | :-- | 
| get(key[,cb])	| 获取指定key存储数据 | 
| set(key,value,expire[,cb])	| 根据key，存储value数据，并指定过期时间expire | 
| remove(key[,cb])	| 移除指定key | 
| clear([cb])	| 清除所有 | 


### 用法举例
使用的是小程序提供的Sync结尾的同步版本。

1. 默认导入的是localStorage方式存储
```
import storage from '@tool-developer/wx-storage';

// ...
```

2. 使用sessionStorage的方式导入
```
import storage from '@tool-developer/wx-storage/session';

// ...
```

3. 使用async的方式导入
```
import _storage from '@tool-developer/wx-storage';
//import _storage from '@tool-developer/wx-storage/session';
//
import _async from '@tool-developer/wx-storage/async';
//
// 这里得到的对象方法，为promise
// 如果需要调整为session，只需要将_storage替换为sessionStorage方式导入即可
const storage = _async(_storage);

// ...
```

4. 存储数据操作
存储的key为null或者undefined，不会进行存储，也不会脚本报错，且返回undefined。
```
// 
storage.set('key1','value1')

// 指定过期时间为12小时
storage.set('key2','value2',3600000 * 12)

// async方式
storage.set('key3','value3').then(()=>{
  // set返回值为undefined
  // 其他处理逻辑
})

// callback方式,指定过期时间12小时
storage.set('key4','value4',3600000 * 12,()=>{
  // set返回值为undefined
  // 其他处理逻辑
})
// callback方式,未指定过期时间
storage.set('key4','value4',()=>{
  // set返回值为undefined
  // 其他处理逻辑
})
```

5. 获取数据操作
获取不存在的key的数据，返回的是undefined。
```
//
const key1 = storage.get('key1')

// async方式
storage.get('key1').then((data)=>{
  //返回获取到的数据
})
// callback方式
storage.get('key1',(data)=>{
  // 回调返回获取到的数据
})
```

6. 清除数据操作
清除不能存在的key，返回结果为undefined。
```
//
storage.remove('key1')

// async方式
storage.remove('key1').then(()=>{
  //返回undefined
})
// callback方式
storage.remove('key1',()=>{
  // 回调返回undefined
})
```

7. 清空数据操作
```
//
storage.clear()

// async方式
storage.clear().then(()=>{
  //返回undefined
})
// callback方式
storage.clear(()=>{
  // 回调返回undefined
})
```
