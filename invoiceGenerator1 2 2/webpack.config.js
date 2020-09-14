const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  //configuration used by webpack
  mode : 'development';
  entry : {
    app : './src/index.js'
  },
  module : {
    rules : [
      {test : /\.(js|jsx)$/, use : ['babel-loader']}
    ]
  },
  plugins : [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title : 'InvoiceGenerator',
        template : './src/template.ejs',
        filename : 'invoice.html',
        chunks : ['app'] 
    })
  ],
  output : {
    fileName : '[name].bundle.js',
    path : path.resolve(__dirname, 'dist'),
    publicPath : '/'
  },
  devtool : 'inline-source-map'
}
