import { getRepository } from 'typeorm';
import TradingsNcms from '../models/TradingsNcms';

interface RequestDTO {
  trading_id: string;
  ncm_id: string;
}

class CreateTradingsNcmsService {
  public async execute({
    trading_id,
    ncm_id,
  }: RequestDTO): Promise<TradingsNcms> {
    const tradingsNcmsRepository = getRepository(TradingsNcms);

    const checkNcmExist = await tradingsNcmsRepository.findOne({
      where: { trading_id, ncm_id },
    });

    if (!checkNcmExist) {
      const newTradinsNcms = tradingsNcmsRepository.create({
        trading_id,
        ncm_id,
      });
      await tradingsNcmsRepository.save(newTradinsNcms);

      return newTradinsNcms;
    }

    return checkNcmExist;
  }
}

export default CreateTradingsNcmsService;
