const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const { getStyleLoaders } = require("./utils");
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
module.exports = {
  mode: "development",
  devtool: "cheap-module-inline-source-map",
  entry: {
    main: path.resolve(__dirname, "../src/index.jsx"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [path.resolve(__dirname, "../node_modules")],
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: {
                      chrome: "95",
                    },
                  },
                ],
                "@babel/preset-react",
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                [
                  "import",
                  {
                    libraryName: "antd",
                    style: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: {
                localIdentName: "[path][name]__[local]",
              },
            },
          },
        ],
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders(
          "development",
          {
            importLoaders: 2,
            sourceMap: true,
          },
          "less-loader",
          {
            modifyVars: {
              "@primary-color": "#1890FF",
            },
            javascriptEnabled: true,
          }
        ),
        sideEffects: true,
      },
      {
        test: lessModuleRegex,
        use: getStyleLoaders(
          "development",
          {
            importLoaders: 2,
            sourceMap: true,
            modules: {
              localIdentName: "[path][name]__[local]",
            },
          },
          "less-loader"
        ),
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new MonacoWebpackPlugin(),
    new HtmlWebpackPlugin({
      index: "index.html",
      template: path.resolve(__dirname, "../template.html"),
    }),
  ],
};
