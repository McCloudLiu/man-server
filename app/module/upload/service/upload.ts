import { AccessLevel, SingletonProto } from '@eggjs/tegg';

@SingletonProto({
  accessLevel: AccessLevel.PRIVATE,
})
export default class UploadService {
  async uploadFile(file: File) {
    console.log(file.size);
  }
}
