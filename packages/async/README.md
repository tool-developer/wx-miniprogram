# @tool-developer/wx-async
Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript.

To see [async](https://github.com/caolan/async).

You can use async in wx miniprogram using @tool-developer/wx-async, only support three methods: auto, parallel,series, not all.


## Usage
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


## API
only support those methods, not all.
#### auto(tasks, [concurrency], [callback])

#### parallel(tasks, [callback])

#### series(tasks, [callback])