const {resolve} = require('path');
module.exports = {
  entry: './src/js/app.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: './js/built.js'
  },
  mode: 'development' //设置环境
}

//仅做代码压缩, 零配置