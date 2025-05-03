import {
  Context,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  Inject,
} from '@eggjs/tegg';
import { EggContext, EggLogger } from 'egg';
import { server } from 'extensions/web-socket/app';
import fs from 'fs';

@HTTPController({
  path: '/api/upload',
})
export default class UploadController {
  // 这是一个用来打印日志的工具
  @Inject() private readonly logger: EggLogger;
  // 获取应用配置

  @HTTPMethod({
    method: HTTPMethodEnum.POST,
    path: '/form',
  })
  async uploadForm(
    @Context() ctx: EggContext,
    // 这里还可以传递其他数据，通过 body 获取
    @HTTPBody()
    body: {
      otherData: string;
    },
  ) {
    const file = ctx.request.files?.[0];

    if (!file) {
      this.logger.info('未上传文件');

      return {
        success: false,
        message: '未上传文件',
      };
    }

    const buffer = await fs.promises.readFile(file.filepath);

    server.clients.forEach((client) => {
      client.send(buffer);
    });

    await fs.promises.unlink(file.filepath);

    return {
      success: true,
      data: {
        // 从合理性上讲这里不应该把文件路径返给浏览器，而是应该在数据库绑定该文件路径与该用户的关联关系
        body,
      },
    };
  }
}
