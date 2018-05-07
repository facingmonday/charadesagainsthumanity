var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var baseConfig = _.clone(require('./base'));
var WebpackStrip = require('strip-loader');

baseConfig.devServer = false;
baseConfig.devtool = false;
baseConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.UglifyJsPlugin({
    exclude: /\.html($|\?)/
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  }),
  new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)
];

baseConfig.module = {
  loaders : [
    {
      test: /\.js/
      ,exclude: /(node_modules|src\/lib)/
      ,loader: "babel-loader"
      ,query: {
      cacheDirectory: true,
      //plugins: ['transform-decorators-legacy' ],
      presets: ['es2015']
    }
    }
    ,{
      test: /\.js/
      ,loader: WebpackStrip.loader('console.log')
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
      test: /\.gif/
      ,loader: "url-loader"
    }
    ,{
      test: /\.hbs/
      ,loader: "handlebars-loader"
    }
    ,{
      test: /\.ejs/
      ,loader: "ejs-loader"
    },
    {
      test: /.*\.(png)$/i,
      loaders: [
        //'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'url-loader',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }
  ]
}
baseConfig.entry = path.join(__dirname, '../src/main.js');
baseConfig.output = {
  path: path.join(__dirname, '../../public/javascripts'),
  filename: 'app.js',
  publicPath: "/javascripts/",
}
module.exports = baseConfig;
