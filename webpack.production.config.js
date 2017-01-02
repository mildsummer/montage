var webpack = require('webpack');
var IconfontWebpackPlugin = require('iconfont-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/js/entry.js"
  },
  output: {
    path: './dist/js',
    publicPath: `/js/`,
    filename: "[name].js"
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "strip-loader?strip[]=console.log"
      },
      {
        test: /\.(sass|scss)$/,
        loaders: ["style", "css", "postcss", "sass"]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass', '.scss']
  },
  eslint: {
    configFile: './.eslintrc'
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new IconfontWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.DedupePlugin(), // 重複したファイルを除去
    new webpack.optimize.OccurenceOrderPlugin(), // コンパイルするファイルの順番を調整
    new webpack.optimize.UglifyJsPlugin({ // Uglify
      mangle: true, // ローカル変数名を短い名称に変更する
      sourceMap: false,
      compress: {
        unused: false,
        conditionals: false,
        dead_code: false,
        side_effects: false
      }
    }),
    new webpack.ProgressPlugin((percentage, msg) => {
      process.stdout.write('progress ' + Math.floor(percentage * 100) + '% ' + msg + '\r');
    })
  ]
};