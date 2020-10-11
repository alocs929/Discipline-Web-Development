import { getCustomRepository } from 'typeorm';
import Ncm from '../models/Ncm';
import Trading from '../models/Trading';
import NcmsRepository from '../repositories/NcmsRepository';
import TradingsNcmsRepository from '../repositories/TradingsNcmsRepository';
import TradingsRepository from '../repositories/TradingsRepository';

interface RequestDTO {
  trading_id: string;
  ncm_id: string;
}
interface ResponseDTO {
  id: string;
  trading: Trading;
  ncm: Ncm;
  created_at: Date;
  updated_at: Date;
}

class CreateTradingNcmService {
  public async execute({
    trading_id,
    ncm_id,
  }: RequestDTO): Promise<ResponseDTO> {
    const tradingsNcmsRepository = getCustomRepository(TradingsNcmsRepository);
    const tradingsRepository = getCustomRepository(TradingsRepository);
    const ncmsRepository = getCustomRepository(NcmsRepository);

    const checkNcmExist = await tradingsNcmsRepository.findOne({
      where: { trading_id, ncm_id },
    });

    if (!checkNcmExist) {
      const newTradinsNcms = tradingsNcmsRepository.create({
        trading_id,
        ncm_id,
      });
      await tradingsNcmsRepository.save(newTradinsNcms);

      const trading = await tradingsRepository.findOne({
        where: { id: newTradinsNcms.trading_id },
      });

      const ncm = await ncmsRepository.findOne({
        where: { id: newTradinsNcms.ncm_id },
      });

      return {
        id: newTradinsNcms.id,
        trading,
        ncm,
        created_at: newTradinsNcms.created_at,
        updated_at: newTradinsNcms.updated_at,
      } as ResponseDTO;
    }

    const trading = await tradingsRepository.findOne({
      where: { id: checkNcmExist.trading_id },
    });

    const ncm = await ncmsRepository.findOne({
      where: { id: checkNcmExist.ncm_id },
    });

    return {
      id: checkNcmExist.id,
      trading,
      ncm,
      created_at: checkNcmExist.created_at,
      updated_at: checkNcmExist.updated_at,
    } as ResponseDTO;
  }
}

export default CreateTradingNcmService;
