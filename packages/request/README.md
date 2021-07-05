# @tool-developer/wx-request
请求作为前端和后端进行数据交互的通道，通常会将其进行统一封装处理，对请求参数，响应结果做一些约束和处理。
该请求处理流程是参考axios，可以先参考[axios的文档](https://www.npmjs.com/package/axios)。

在axios的基础上做了一定扩展，最主要是create方法，使其形成“请求链”，通过create得到的是下一级请求对象，下一级请求对象会受到上一级请求对象的拦截处理的影响，但是下一级请求的拦截处理不会影响上一级的结果，也就是做了层级隔离(实际使用，参考权限拦截)。

`建议`：不要直接在业务具体页面调用该方法，通过在utils/request.ts隔离一层，在此进行不同业务场景的处理。

## 用法
### 安装
```
npm install --save @tool-developer/wx-request
```
or
```
yarn add @tool-developer/wx-request
```

### 用法举例
```
import request from '@tool-developer/wx-request';
// 创建请求对象
const xhr = request.create({
  // ...
});

// 请求拦截
xhr.interceptors.request.use(config => {
  // ...
  // 请求参数拦截处理
  return config;
})

// 响应拦截
xhr.interceptors.response.use(res => {
  // ...
  // 响应数据处理
  return res;
})

// 发起请求,通过request方法
xhr.request({
  // ...,此处的options会改写request.create设置的配置options
})

// 发起请求，通过get方法
xhr.get({
  // ...
})

// 发起请求，通过post方法
xhr.post({
  // ...
})

```

## 参数说明
通过对请求参数进行处理，得到完整的请求url和body。
请求url组成格式为:

> [baseURL]/[prefix]/[action]?[data serialized]

模块内部已对可能出现的//进行了处理，也就是说，在配置baseURL,prefix,action相关参数时，不用担心是否需要/的问题。



| 参数	| 默认值	| 说明 | 
| :-- | :-- | :-- | 
| baseURL	| ''	| 请求base url | 
| action	| 	| 请求地址部分组成 |  
| prefix	| ''	| 请求地址统一前缀 |  
| data		| | 请求数据 | 
| body		| | 请求数据，body方式 | 
| headers	| | {Accept:'application/json'}	请求头设置 | 
| method	| | get	请求方式，支持get|post|put|path|delete等，不区分大小写 |
| adapter	| | defaultAdapter	请求底层适配器改写，参考[适配器改写](#适配器改写) |
| requestType	| json	| 请求数据类型，<br/> json会在headers添加:<br/>{'Content-Type': 'application/json;charset=UTF-8'}<br/>form会在headers添加:<br/>{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} <br/><br/>如果同时传递了body的情况，上述自动添加header将失效，需要外部自己处理headers。| 
| responseType	| json | 请求响应类型,常见值如:json\|text\|blob\| formData\|arrayBuffer。具体参考：[MDN Body方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Body) | 
| dataSerialized	| false	| 是否对参数序列化处理到url上,参考[参数序列化说明](#参数序列化说明) | 
| dataSerializer	| 	| 参数序列化处理方式，参考[参数序列化说明](#参数序列化说明) | 
| dataArrayFormat	| 1	| 数组类型数据格式处理方式，参考[数组参数说明](#数组参数说明) | 
| dataPlaceholderRemoved	| false	| 对于有动态占位url的，是否清除数据中对应字段 | 
| timeout	| 3000	| 超时，超时后会进入异常处理流程 | 
| dataRequestEncode	| rfc3986	| 请求数据编码，参考[编码规范处理](#编码规范处理) | 
| resolvedCatch	| false	| 是否进行异常捕获，默认false，不会进入正常流程；<br/>true会进入正常流程，需要在响应中处理异常情况。 | 
| auth		| | 请求头中添加服务器用户凭证<br/>可以设置auth:{username,password}，内部会添加到headers.Authorization，并且对数据进行bit数组转换处理 | 

### 编码规范处理

地址编码处理，默认遵循URL RFC3986编码规范，可通过options.dataRequestEncode配置进行调整。

| 类型	| 编码处理 | 
| :-- | :-- | 
| false	| 原样返回 | 
| 'encodeURIComponent'	| encodeURIComponent编码处理 | 
| function	| 自定义编码处理，经过该函数处理返回 
| 值为数组	| 原样返回 | 
| default	| 默认经过encodeURIComponent处理后，replace还原处理 | 

#### 举例说明：
1. 不进行任何编码处理
```
request({
  // ...,
  dataRequestEncode:false,// 不进行任何编码处理
})
```

2. 经过encodeURIComponent处理
```
request({
  // ...,
  dataRequestEncode:'encodeURIComponent'
})
```

3. 自定义处理
```
request({
  // ...,
  dataRequestEncode:(val)=>{
    // 自定义处理后返回
    
    return val;
  }
})
```

### 数组参数说明
数组数据序列化之后可能存在两种方式，需要根据后端接收情况，具体确定使用哪种方式。前端配置可通过options.dataArrayFormat参数进行控制。

比如存在这样的数据：
```
{
  data:{
    arr:[1,2,3]
  }
}
```

如上，其中的arr为数组，默认dataArrayFormat=1，得到：
```
arr=1&arr=2&arr=3
```

dataArrayFormat设置为2，得到：
```
arr[]=1&arr[]=2&arr[]=3
```

### 参数序列化说明
按照标准请求，delete、get、head、options方法才会被序列化处理，而且body会被设置为null。

但是考虑到实际使用过程中，有的后端接口要求post之类的请求，也是通过query string的方式获取数据，所以也需要将参数序列化到url上。

可以有两种方式实现，一种是添加options.serizlized为true(推荐)，另一种是通过body传递参数(注意，body可能会改变请求头)。

如果需要对url做自定义的序列化处理，可以使用options.dataSerializer，该方法接收请求参数，返回处理之后的结果。

#### 举例说明：
```
// post请求，后端由通过query string获取参数
xhr.post({
  // ...
  dataSerialized:true
})
```

自定义序列化处理：
```
// post请求，后端由通过query string获取参数
xhr.post({
  // ...
  dataSerializer:(params)=>{
    // 序列化处理
    return params;
  }
})
```

### 适配器改写
底层请求最终用fetch还是XMLHttpRequest(后续简称xhr)，或者依据此做一些自定义的处理，可以通过改写适配器的方式实现。
适配器获取处理之后的请求options，返回一个promise对象，响应数据包含{ok,data}等关键信息即可。

`注意`:返回的应该是一个Body响应对象，如果不是，而是对数据进行了处理，最好遵循数据说明，否则可能会进入异常。

简单举例如下：
```
export default config => {
  //
  return new Promise((resolve,reject)=>{
    // ...
    // 异常通过reject返回
    // ...
    
    // 正常返回
    return resolve({
      ok:true,
      data:{},
      // ...
    })
  });
}
```

其中ok为true，表示正常返回。如果为false，返回data会设置为null。具体响应数据参考响应响应数据说明。

返回数据中statusText如果为'No Content'，响应data也会被设置为null(兼容第三方文件上传，没有响应结果的情况)。

异常情况，返回data也会被设置为null。


## 对象说明
### Request
请求对象

该请求对象除了常见的一些方法之外，还关联了一个insterceptors对象，该对象上的request和response可以实现请求和响应拦截注册。

为了方便操作，直接在实例对象上绑定了Request,Cancel,CancelToken几个对象，所以通过import导入得到的实际是一个实例对象。

#### 实例方法说明
| 方法名	| 说明 | 
| :--  | :--  | 
| create	| 创建一个新的请求对象，形成请求链 | 
| request	| 请求入口方法 | 
| get	| 对应method为get | 
| post	| 对应method为post | 
| head	| 对应method为head | 
| options	| 对应method为options | 
| delete	| 对应method为delete | 
| path	| 对应method为path | 

相关method请求方法参数格式同request一致，也可以分别传入，如下：
```
[request method] = (action,data,options)=>{
  // ...
  //
  // 处理后的options
  return this.request(options);
}
```

#### 举例说明：
```
// 导出的为Request实例对象
import xhr from '@tool-developer/wx-request';

// 通过action,data,options方式
xhr.get('/user/12345',{},{
  // ...,options
})

// 通过options方式
xhr.get({
  action:'/user/12345',
  data:{},
  // ...,options
})
```

### Cancel
配合CancelToken使用，token.reason为Cancel对象实例，主要生成入下格式信息输出：

```
'Cancel: cancel message'
```

### CancelToken
通过cancel token方式，取消请求。因为异步处理的存在，实现原理是提前约定一个token(CancelToken实例对象)，然后内部将其实际取消操作同该token进行关联，通过抛出一个throw中止请求进行。

CancelToken.source方法，生成token,实际为CancelToken实例对象。

#### 举例说明：
```
import request from '@tool-developer/wx-request';

const CancelToken = request.CancelToken;
const source = CancelToken.source();

// 等价于create方法
const xhr = request.create({
  //...
});
xhr.get('/user/12345',{},{
  cancelToken:source.token
})
```

## 响应数据说明
响应数据分为三部分{req,data,res}，其中req为请求参数，data为服务响应完整数据，res为请求响应完整数据，其中data就是res.data。

```
{
  req,
  data:res.data,  
  res
}
```

`注意`:通常服务端返回的数据也有一定的格式包裹处理，比如：

```
{
  "code": "SUCCESS",     // 平台级调用结果码，只有code=SUCCESS时才表示成功
  "message": "ok",       // 平台级调用结果消息
  "subCode": null,       // 平台级子错误码，例如当 code = BIZ_ERROR 时各个业务方就可以自定义自己的业务错误码了
  "subMessage": null,    // 平台级子错误消息
  "data": object         // 业务返回数据对象，字符串、数字、对象等等
}
```
如上，实际data才是前端需要的数据。
前端可以在utils/request.ts中隔离一层，对数据进行处理后，直接返回处理之后的data，这样业务拿到的数据就是最终想要的，具体根据情况而定。

但是，如果按照上述结果处理之后，页面又需要完整数据的情况呢？可以在请求参数中添加自定义参数，比如returnResponseFull，然后再根据该参数判断，是否返回完整响应数据即可。
```
// ...
// 其中data为接口服务返回的完整数据
const {req,data,res} = response;
// 根据returnResponseFull请求参数判断是否返回完整数据
if(req.returnResponseFull){
  
  return data;
}
// 默认返回业务需要的data
return data.data;
```
