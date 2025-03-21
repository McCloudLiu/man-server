import {
  Context,
  HTTPBody,
  HTTPController,
  HTTPMethod,
  HTTPMethodEnum,
  Inject,
} from '@eggjs/tegg';
import { EggAppConfig, EggContext, EggLogger } from 'egg';
import fs from 'fs';
import path from 'path';

@HTTPController({
  path: '/api/upload',
})
export default class UploadController {
  // 这是一个用来打印日志的工具
  @Inject() private readonly logger: EggLogger;
  // 获取应用配置
  @Inject() private readonly config: EggAppConfig;

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

    const filename = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}${path.extname(file.filepath)}`;

    const exactFilePath = path.resolve(this.config.uploadFileDir, filename);

    await fs.promises.copyFile(file.filepath, exactFilePath);

    // 删除临时文件
    await fs.promises.unlink(file.filepath);

    return {
      success: true,
      data: {
        // 从合理性上讲这里不应该把文件路径返给浏览器，而是应该在数据库绑定该文件路径与该用户的关联关系
        exactFilePath,
        body,
      },
    };
  }
}
