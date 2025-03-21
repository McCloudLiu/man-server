import {
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  HTTPQuery,
  Inject,
} from '@eggjs/tegg';
import HelloService from '../service/hello';

@HTTPController({
  path: '/api/hello',
})
export default class HelloController {
  @Inject() private readonly service: HelloService;

  // 本地启动后访问 http://127.0.0.1:7001/api/hello?name=Kobe 看看
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async hello(@HTTPQuery() name: string) {
    return await this.service.hello(name);
  }
}
