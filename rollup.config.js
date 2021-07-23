import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import multi from 'rollup-plugin-multi-input';


export default {
  input:['./src/**/*.js','!./src/*.test.js'],
  output:{
    // file:'miniprogram_dist/index.js',
    dir:'miniprogram_dist',
    format:'esm',
    assetFileNames:'[name].js'
  },
  plugins:[
    multi(),
    resolve({
      browser: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'  // 排除node_modules 下的文件
    })
  ]
}