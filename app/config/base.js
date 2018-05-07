var path = require('path');
var webpack = require('webpack');
var port = 9009;
var srcPath = path.join(__dirname, '/../src');
var publicPath = path.join(__dirname, '../../server/public/javascripts');

module.exports = {
  port: port,
  debug: true,
  devtool: "source-map",
  entry: [
    //'webpack-dev-server/client?http://localhost:' + port,
    //'webpack/hot/dev-server',
    path.join(__dirname, '../src/main.js')
  ],
  output: {
    path: path.join(__dirname, '../../charadesforhorriblepeople/www/js'),
    filename: 'app.js',
    publicPath: "/javascripts/",
    hot: true
  },
  devServer: false
  ,plugins: [
    new webpack.HotModuleReplacementPlugin()
    ,new webpack.NoErrorsPlugin()
    ,new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
  ,resolve: {
    root: __dirname + '/../src'
    ,modulesDirectories: ['node_modules', 'bower_components']
  }
  ,module: {
    loaders : [
      {
        test: /\.js$/
        ,exclude: /(node_modules|src\/lib)/
        ,loader: "babel-loader"
        ,query: {
        cacheDirectory: true,
        //plugins: ['transform-decorators-legacy' ],
        presets: ['es2015']
      }
      }
      ,{
        test: /\.html/
        ,loader: "html-loader"
      }
      ,{
        test: /\.less/
        ,loader: 'style-loader!css-loader!less-loader'
      }
      ,{
        test: /\.css$/
        ,loader: "style-loader!css-loader"
      }
      ,{
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/
        ,loader: 'url-loader'
      }
      ,{
        test: /\.png|\.gif/
        ,loader: "url-loader"
      }
      ,{
        test: /\.hbs/
        ,loader: "handlebars-loader"
      }
      ,{
        test: /\.ejs/
        ,loader: "ejs-loader"
      }
        ,{
            test: /\.json$/
            ,loader: "json-loader"
        }
    ]
  }
};
