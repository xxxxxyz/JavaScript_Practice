const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

const config = {
  // development mode
  // mode: "development",
  //entry
  entry: path.resolve(__dirname, "src/login/index.js"),
  //output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./login/index.js",
  },
  optimization: {
    runtimeChunk: "single",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: path.resolve(__dirname, "public/login.html"),
      filename: path.resolve(__dirname, "dist/login/index.html"),
      useCdn: process.env.NODE_ENV === "production", // under the production mode, reference CDN
    }),
    new MiniCssExtractPlugin({
      filename: "./login/index.css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: "asset",
        generator: {
          filename: "assets/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};

// under dev env >> source map
if (process.env.NODE_ENV === "development ") {
  config.devtool = "inline-source-map";
}

// under the production mode -- CDN
if (process.env.NODE_ENV === "production") {
  // external extension
  config.externals = {
    // key: import from string
    // value: save with the local var

    "bootstrap/dist/css/bootstrap.min.css": "bootstrap",
    axios: "axios",
  };
}

module.exports = config;
