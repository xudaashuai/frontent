const path = require('path');

module.exports = {
  configureWebpack: config => {
    config.module.rules // webpackChain 提供的添加 loader 方法
      .push({
        test: /\.md$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      });
  },
};
