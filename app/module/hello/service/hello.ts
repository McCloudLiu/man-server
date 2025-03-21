import { AccessLevel, SingletonProto } from '@eggjs/tegg';

@SingletonProto({
  /**
   * private 意味着该 service 只能在当前 module 下被注入，
   * 如果其他 module 需要使用该 service 需要把 level 修改为 public
   */
  accessLevel: AccessLevel.PRIVATE,
})
export default class HelloService {
  async hello(name: string) {
    return `亲爱的 ${name} 你好！现在的时间是 ${new Date().toLocaleString()}`;
  }
}
