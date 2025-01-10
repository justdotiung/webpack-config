const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const isPolyfillNeeded = process.env.POLYFILL === "true";

module.exports = (env) => {
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

    mode: "production", // 트리 쉐이킹 활성화
    devtool: "source-map", // 소스맵 추가
  };
};
