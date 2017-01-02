var webpack = require('webpack');
var os = require('os');
var IconfontWebpackPlugin = require('iconfont-webpack-plugin');

function getLocalAddress() {
  var ifacesObj = {};
  ifacesObj.ipv4 = [];
  ifacesObj.ipv6 = [];
  var interfaces = os.networkInterfaces();

  for (var dev in interfaces) {
    interfaces[dev].forEach(function(details){
      if (!details.internal){
        switch(details.family){
          case "IPv4":
            ifacesObj.ipv4.push({name:dev, address:details.address});
            break;
          case "IPv6":
            ifacesObj.ipv6.push({name:dev, address:details.address});
            break;
        }
      }
    });
  }
  return ifacesObj;
}

module.exports = {
  entry: {
    app: "./src/js/entry.js"
  },
  output: {
    path: './dist/js',
    publicPath: '/js/',
    filename: "[name].js"
  },
  devServer: {
    host: getLocalAddress().ipv4[0].address
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
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
      'process.env.NODE_ENV': '"development"',
      'process.env.LOCAL_HOST': JSON.stringify(getLocalAddress().ipv4[0].address)
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};