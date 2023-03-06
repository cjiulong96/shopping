const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // productionSourceMap: false,
  // publicPath: process.env.publicPath || "./",
  // outputDir: "dist",
  // assetsDir: "assets",
  devServer: {
    // port: 9999,
    // host: "0.0.0.0",
    // https: false,
    // open: true,
    hot: true,
    proxy: {
      "/api": {
        target: "http://47.115.51.185",
        changeOrigin: true, // 是否改变域名
        pathRewrite: {
          "^/api": "", // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@cmpt", resolve("src/components"))
      .set("@views", resolve("src/views"));
    config.plugin("html").tap((args) => {
      args[0].title = "掌上宝";
      return args;
    });
  },
};
