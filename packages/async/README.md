# @tool-developer/wx-async
Async是一个实用模块，它为异步JavaScript提供了直接、强大的函数处理流程。

可以参考[async-es@2.6.3](https://github.com/caolan/async)。

由于小程序体积限制，该模块并未提供async的全部方法，只对我提供了一下三个：auto, parallel,series。

之所以使用async-es@2.6.3，是因为v3.*在iOS 9上会脚本报错(非微信环境出现过，所以降级使用2.6.3的版本)。

## 用法
```
npm install --save @tool-developer/wx-async
```
or
```
yarn add @tool-developer/wx-async
```

```
import async from '@tool-developer/wx-async'

var callOrder = [];

async.auto({
  task1: ['task2', function(results, callback){
    setTimeout(() => {
      callOrder.push('task1');
      callback();
    }, 25);
  }],
  task2(callback){
    setTimeout(() => {
      callOrder.push('task2');
      callback();
    }, 50);
  },
  task3: ['task2', function(results, callback){
    callOrder.push('task3');
    callback();
  }],
  task4: ['task1', 'task2', function(results, callback){
    callOrder.push('task4');
    callback();
  }],
  task5: ['task2', function(results, callback){
    setTimeout(() => {
      callOrder.push('task5');
      callback();
    }, 0);
  }],
  task6: ['task2', function(results, callback){
    callOrder.push('task6');
    callback();
  }]
},(err) => {
  console.log(callOrder);//['task2','task3','task6','task5','task1','task4']
})

```

## 接口
只提供了一下几个方法。

### auto(tasks, [concurrency], [callback])

### parallel(tasks, [callback])

### series(tasks, [callback])
