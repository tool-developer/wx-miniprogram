# @tool-developer/wx-md5
该模块处理过程来自[JavaScript-MD5@2.18.0,to see](https://github.com/blueimp/JavaScript-MD5)。


通过该模块，可以在微信中使用md5编码，在一些请求数据编码过程中会用到。


## 用法
```
npm install --save @tool-developer/wx-md5
```
or
```
yarn add @tool-developer/wx-md5
```

```
import md5 from '@tool-developer/wx-md5'
//
const hash = md5("value");
console.log(hash);// 2063c1608d6e0baf80249c42e2be5804

```

## 接口

### md5(string, key, raw)
