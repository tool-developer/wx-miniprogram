import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';


export default {
  input:'src/index.js',
  output:{
    file:'miniprogram_dist/index.js',
    format:'esm',
    //name:"async"
  },
  plugins:[
    resolve({
      browser: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'  // 排除node_modules 下的文件
    })
  ]
}