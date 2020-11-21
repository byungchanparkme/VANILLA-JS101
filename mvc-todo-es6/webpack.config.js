const path = require("path")

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: "./js/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  devServer: {
    inline: true,
    hot: true,
    host: "localhost",
    port: 5500,
    open: true,
  },
}
