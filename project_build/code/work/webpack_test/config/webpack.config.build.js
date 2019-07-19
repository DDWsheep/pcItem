const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  //入口文件
  entry: './src/js/app.js',
  //输出文件
  output: {
    path: resolve(__dirname, '../build'),//配置文件路径, 目录
    filename: './js/built.js'//输出文件
  },
  //配置loader
  module: {
    rules: [
      /*{
      test: /\.less$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "less-loader" // compiles Less to CSS
      }]
    },*/
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'less-loader']
        })
      },
     /* {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: './build/images',
              outputPath: './images'
            }
          }
        ]
      },*/
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: '.  s',
              outputPath: './images'
            }
          }
        ]
      }
    
    ]
  },
  //配置插件
  plugins: [
    new ExtractTextPlugin('./css/built.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new CleanWebpackPlugin('../build' ,{
      allowExternal: true
      })
  ]
}