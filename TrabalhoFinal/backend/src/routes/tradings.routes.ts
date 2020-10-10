import { Router } from 'express';
import { getCustomRepository, In } from 'typeorm';
import Ncm from '../models/Ncm';
import NcmsRepository from '../repositories/NcmsRepository';
import TradingsRepository from '../repositories/TradingsRepository';
import CreateNcmService from '../services/CreateNcmService';
import CreateTradingService from '../services/CreateTradingService';
import CreateTradingsNcmsService from '../services/CreateTradingsNcmsService';

const tradingsRouter = Router();

tradingsRouter.get('/', async (request, response) => {
  const tradingsRepository = getCustomRepository(TradingsRepository);
  const tradings = await tradingsRepository.find();
  return response.json(tradings);
});

tradingsRouter.post('/', async (request, response) => {
  try {
    const {
      razaoSocial,
      cnpj,
      email,
      telephone,
      whatsapp,
      password,
      products,
    } = request.body;

    const createTrading = new CreateTradingService();
    const createNcmService = new CreateNcmService();
    const createTradingsNcmsService = new CreateTradingsNcmsService();

    products.map(async (items: number) => {
      await createNcmService.execute({ ncm: items });
    });

    const trading = await createTrading.execute({
      cnpj,
      email,
      password,
      telephone,
      whatsapp,
      products,
      razao_social: razaoSocial,
    });

    const ncmsRepository = getCustomRepository(NcmsRepository);

    const arrayNcms = await ncmsRepository.find({
      where: { ncm: In(products) },
    });

    arrayNcms.map(async (item: Ncm) => {
      await createTradingsNcmsService.execute({
        trading_id: trading.id,
        ncm_id: item.id,
      });
    });

    return response.json({ trading, ncms: arrayNcms });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default tradingsRouter;
