const path = require('path')

// plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const webpack = require('webpack')

const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname,'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },{
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },{
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-vv.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]

}

if(isDev) {
  // 帮忙调试代码
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    // 设置0.0.0.0好处是:既可以通过本地访问,也可以通过ip访问
    host: '0.0.0.0',
    // 设置overlay是为了如果vue有错误可以显示在网页上
    overlay: {
      errors: true
    },

    // 热加载功能: 修改组件数据,不会刷新全部页面
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config
