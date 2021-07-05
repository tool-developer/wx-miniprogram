# @tool-developer/wx-unit
微信小程序单元测试工具包。

## 用法
```
npm install --save-dev @tool-developer/wx-unit
```
or
```
yarn add -D @tool-developer/wx-unit
```

```
import unit from '@tool-developer/wx-unit'

```

## 操作步骤
1. 项目初始化，并配置test scripts
```
npm init
```
package.json
```
"scripts": {
  "test": "jest"
},
```

2. 安装jest，参考[jest](https://jestjs.io/).
```
npm install -g jest
```

3. 安装依赖和配置babel
```
npm install -D jest babel-jest babel-core @babel/preset-env @tool-developer/wx-unit
```
babel.config.js
```
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]]
};
```

4. 创建jest.config.js, 并配置
```
jest --init
```
jest.config.js
```
  "verbose":true,
  "testEnvironment": "node",
  //测试前先启动环境依赖文件
  "setupFiles":['./test.js'],
  //需要编译node_modules时配置
  "transformIgnorePatterns": [
  ],
  //单测覆盖
  "coverageDirectory": "coverage",
  //单测覆盖忽略文件
  "coveragePathIgnorePatterns": [
    "./test.js"
  ],
  //测试路径忽略文件
  "testPathIgnorePatterns": [
    "./test.js"
  ],
```

5. 在项目目录下创建test.js，这样:
```
import unit from '@tool-developer/wx-unit';

export default unit;
```

6. 编写单元测试文件，具体参考[jest document](https://jestjs.io/docs/en/getting-started)

7. 运行
```
npm run test
```



