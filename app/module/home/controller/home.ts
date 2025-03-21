import { HTTPController, HTTPMethod, HTTPMethodEnum } from '@eggjs/tegg';

@HTTPController({
  path: '/',
})
export default class HomeController {
  @HTTPMethod({
    method: HTTPMethodEnum.GET,
    path: '/',
  })
  async home() {
    return 'Hello World!';
  }
}
