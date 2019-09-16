var path = require("path");
var MiniExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: "./app/index.jsx",
  output: {
    path: path.resolve(__dirname, "./public"),
    publicPath: '/public/',
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.(scss|css)$/,
        use: [
        {
          loader: MiniExtractPlugin.loader,
          options: {
            sourceMap: true
          }
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniExtractPlugin({filename: "style.css"})
  ]
}