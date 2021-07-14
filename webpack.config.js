const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main-[hash:8].js",
  },
  resolveLoader: {
    modules: ["node_modules", "./myLoader"],
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
        // use: [
        //   "jld-style-loader",
        //   "jld-css-loader",
        //   {
        //     loader: "sass-loader",
        //     options: {
        //       // `dart-sass` 是首选
        //       implementation: require("sass"),
        //     },
        //   },
        // ],
      },
      {
        test: /.js$/i,
        use: [
          "replace-loader.js",
          {
            loader: "replace-async-loader.js",
            options: {
              info: "Jld",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({ filename: "css/[name]-[chunkhash].css" }),
    new CleanWebpackPlugin(),
  ],

  // devtool: "source-map",
}
