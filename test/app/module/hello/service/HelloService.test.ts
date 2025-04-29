import HelloService from '@/module/hello/service/hello';
import { app } from '@eggjs/mock/bootstrap';
import { strict as assert } from 'node:assert';

describe('test/app/module/foo/service/HelloService.test.js', () => {
  it('should hello work', async () => {
    const helloService = await app.getEggObject(HelloService);
    const msg = await helloService.hello('123456');
    assert.match(msg, /^亲爱的 123456 你好！现在的时间是 \d+$/);
  });
});
