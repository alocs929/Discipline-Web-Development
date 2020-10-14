/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import Trading from '../models/Trading';
import AppError from '../errors/AppError';

interface IRequest {
  trading_id: string;
  avatarfileName: string;
}
class UpdateTradingAvatarService {
  public async execute({
    trading_id,
    avatarfileName,
  }: IRequest): Promise<Trading> {
    const tradingsRepository = getRepository(Trading);

    const trading = await tradingsRepository.findOne(trading_id);

    if (!trading) {
      throw new AppError('Only authenticated Tradings can change avatar.', 401);
    }

    if (trading.profile_url) {
      const tradingAvatarFilePath = path.join(
        uploadConfig.directory,
        trading.profile_url,
      );

      const tradingAvatarFileExists = await fs.promises.stat(
        tradingAvatarFilePath,
      );

      if (tradingAvatarFileExists) {
        await fs.promises.unlink(tradingAvatarFilePath);
      }
    }

    trading.profile_url = avatarfileName;

    await tradingsRepository.save(trading);

    return trading;
  }
}
export default UpdateTradingAvatarService;
