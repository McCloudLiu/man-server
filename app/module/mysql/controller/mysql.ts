import {
  Context,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPQuery,
} from '@eggjs/tegg';
import { EggContext } from 'egg';

@HTTPController({
  path: '/api/mysql',
})
export default class MySQLController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/get-user',
  })
  async getUser(@Context() ctx: EggContext, @HTTPQuery() id: string) {
    // 一个示例代码，更多操作参见 https://www.eggjs.org/zh-CN/tutorials/mysql

    const result = await (ctx.app as any).mysql.get('table_name', {
      id,
    });

    return {
      result,
    };
  }
}
