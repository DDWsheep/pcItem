const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  //入口文件
  entry: ['./src/js/app.js', './src/index.html'],
  //输出
  output: {
    path: resolve(__dirname, '../build'),
    filename: './js/built.js'
  },
  //配置loader
  module: {
    rules: [
      {     //配置规则
        test: /\.less$/,   //规则处理的文件
        use: [{            //遇到要处理的文件，通过use中的loader处理指定文件（执行顺序从右往左）
          loader: "style-loader" // 会在html文件中，将js中css样式生成一个style标签插入页面中去
        }, {
          loader: "css-loader" // 将css变成js中一个模块（commonjs的模块化语法）
        }, {
          loader: "less-loader" // 将less编译成css
        }]
      },
     /* {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'less-loader']
        })
      },*/
    
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              publicPath: '../images',
              outputPath: './images'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/built.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
   /* new CleanWebpackPlugin('../build' ,{
      allowExternal: true
      })*/
  ],
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 3000,
    open: true,
    hot: true
  }
}