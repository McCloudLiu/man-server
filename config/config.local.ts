import { EggAppConfig, EggContext, PowerPartial } from 'egg';
import { local } from './whitelist';
// import { local } from './whitelist';

export default () => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.cors = {
    credentials: true,
    // 返回允许跨域的来源域名
    origin: (ctx: EggContext) => {
      // 这里相当于把请求来自的 origin 返回了回去，等价于所有请求都能传入，但是存在安全风险，谨慎使用
      return ctx.get('origin');
    },
  };

  config.security = {
    csrf: {
      ignore(ctx) {
        const {
          request: {
            header: { referer },
          },
        } = ctx;

        if (referer && local.some((regex) => regex.test(referer))) return true;

        return false;
      },
    },
  };

  return config;
};
