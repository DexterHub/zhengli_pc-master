const path = require("path");
module.exports = {
  lintOnSave: false,
  productionSourceMap: true,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
        // path.resolve(__dirname, './src/assets/css/base.less')
      ]
    }
  }
  // rules: [
  //   {
  //     test: /\.less$/,
  //     loader: "style-loader!css-loader!less-loader"
  //   }
  // ]
};
