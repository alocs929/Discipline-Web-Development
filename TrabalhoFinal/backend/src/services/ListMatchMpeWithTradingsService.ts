import { getCustomRepository, In } from 'typeorm';
import Trading from '../models/Trading';
import MpesNcmsRepository from '../repositories/MpesNcmsRepository';
import TradingsNcmsRepository from '../repositories/TradingsNcmsRepository';
import TradingsRepository from '../repositories/TradingsRepository';

class ListMatchMpeWithTradingsService {
  public async execute(id: string): Promise<Trading[]> {
    const mpesNcmsRepository = getCustomRepository(MpesNcmsRepository);
    const tradingsRepository = getCustomRepository(TradingsRepository);
    const tradingsNcmsRepository = getCustomRepository(TradingsNcmsRepository);

    const idsNcms = await mpesNcmsRepository.findIdNcmsWithMpe(id);
    const idsTradings = await tradingsNcmsRepository.findIdTradingsWithNcms(
      idsNcms,
    );

    const tradings = await tradingsRepository.find({
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
      where: { id: In(idsTradings) },
    });

    return tradings;
  }
}

export default ListMatchMpeWithTradingsService;
