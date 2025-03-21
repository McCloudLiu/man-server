import { EggAppConfig, PowerPartial } from 'egg';
import { prod } from './whitelist';

export default () => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.security = {
    csrf: {
      ignore(ctx) {
        const {
          request: {
            header: { referer },
          },
        } = ctx;

        if (referer && prod.some((regex) => regex.test(referer))) return true;

        return false;
      },
    },
  };

  return config;
};
