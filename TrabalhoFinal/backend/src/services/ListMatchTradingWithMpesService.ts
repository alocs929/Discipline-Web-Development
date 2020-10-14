import { getCustomRepository, In } from 'typeorm';
import Mpe from '../models/Mpe';
import MpesNcmsRepository from '../repositories/MpesNcmsRepository';
import MpesRepository from '../repositories/MpesRepository';
import TradingsNcmsRepository from '../repositories/TradingsNcmsRepository';

class ListMatchTradingWithMpesService {
  public async execute(id: string): Promise<Mpe[]> {
    const tradingsNcmsRepository = getCustomRepository(TradingsNcmsRepository);
    const mpesNcmsRepository = getCustomRepository(MpesNcmsRepository);
    const mpesRepository = getCustomRepository(MpesRepository);
    const idsNcms = await tradingsNcmsRepository.findIdNcmsWithTrading(id);
    const idsMpes = await mpesNcmsRepository.findIdMpesWithNcms(idsNcms);
    const mpes = await mpesRepository.find({
      select: [
        'id',
        'profile_url',
        'razao_social',
        'cnpj',
        'email',
        'telephone',
        'whatsapp',
        'created_at',
        'updated_at',
      ],
      where: { id: In(idsMpes) },
    });
    return mpes;
  }
}

export default ListMatchTradingWithMpesService;
