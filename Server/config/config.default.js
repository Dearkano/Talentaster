/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1614826311774_4764";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: { enable: false },
  };
  config.multipart = {
    mode: "file",
    // 表单 Field 文件名长度限制
    fieldNameSize: 1000,
    // 表单 Field 内容大小
    fieldSize: "10mb",
    // 表单 Field 最大个数
    fields: 10,

    // 单个文件大小
    fileSize: "10mb",
    // 允许上传的最大文件数
    files: 10,
  };

  return {
    ...config,
    ...userConfig,
  };
};
