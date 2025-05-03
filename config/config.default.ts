import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import path from 'path';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1742558751051_3939';

  // add your egg config in here
  config.middleware = [];

  // change multipart mode to file
  // @see https://github.com/eggjs/multipart/blob/master/src/config/config.default.ts#L104
  config.multipart = {
    mode: 'file',
    whitelist(filename) {
      if (
        [/\.txt$/, /\.jpe?g$/, /\.png$/, /\.gif$/, /\.webp$/].some((regex) =>
          regex.test(filename),
        )
      )
        return true;

      return false;
    },
  };

  // add your special config in here
  // Usage: `app.config.bizConfig.sourceUrl`
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.uploadFileDir = path.resolve(__dirname, '..', 'files');

  // config.mysql = {
  //   client: {
  //     // host 即 mysql 所在机器的域名或 ip 地址
  //     host: '127.0.0.1',
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: '',
  //     // 密码
  //     password: '',
  //     // 数据库名
  //     database: '',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    bizConfig,
  };
};
