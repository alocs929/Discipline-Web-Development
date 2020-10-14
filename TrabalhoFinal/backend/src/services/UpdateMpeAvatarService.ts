/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';
import Mpe from '../models/Mpe';

interface IRequest {
  mpe_id: string;
  avatarfileName: string;
}
class UpdateMpeAvatarService {
  public async execute({ mpe_id, avatarfileName }: IRequest): Promise<Mpe> {
    const mpesRepository = getRepository(Mpe);

    const mpe = await mpesRepository.findOne(mpe_id);

    if (!mpe) {
      throw new AppError('Only authenticated Mpes can change avatar.', 401);
    }

    if (mpe.profile_url) {
      const mpeAvatarFilePath = path.join(
        uploadConfig.directory,
        mpe.profile_url,
      );

      const mpeAvatarFileExists = await fs.promises.stat(mpeAvatarFilePath);

      if (mpeAvatarFileExists) {
        await fs.promises.unlink(mpeAvatarFilePath);
      }
    }

    mpe.profile_url = avatarfileName;

    await mpesRepository.save(mpe);

    return mpe;
  }
}
export default UpdateMpeAvatarService;
