const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = (env) => {
  const mode = env.NODE_ENV;
  console.log("mode", mode);
  const isPolyfillNeeded = env.POLYFILL;
  const isProduction = mode === "production";
  console.log("isPolyfillNeeded", isPolyfillNeeded);
  return {
    entry: isPolyfillNeeded
      ? ["core-js/stable", "regenerator-runtime/runtime", "./src/index.js"]
      : "./src/index.js", // 조건적으로 폴리필 추가
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.js$/,
          loader: "esbuild-loader",
          options: {
            target: "chrome59", // 크롬 59에 맞춘 트랜스파일링
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 5, // ES5 수준으로 압축
          },
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css", // 최종 번들 CSS 파일 이름
      }),
    ],

    mode: mode, // 트리 쉐이킹 활성화
    devtool: "source-map", // 소스맵 추가
  };
};
