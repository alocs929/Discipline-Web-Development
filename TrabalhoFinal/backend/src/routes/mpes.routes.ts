import { Router } from 'express';
import { getCustomRepository, In } from 'typeorm';
import Ncm from '../models/Ncm';
import NcmsRepository from '../repositories/NcmsRepository';
import MpesRepository from '../repositories/MpesRepository';
import CreateNcmService from '../services/CreateNcmService';
import CreateTradingsNcmsService from '../services/CreateTradingsNcmsService';
import CreateMpeService from '../services/CreateMpeService';

const mpesRouter = Router();

mpesRouter.get('/', async (request, response) => {
  const mpesRepository = getCustomRepository(MpesRepository);
  const mpes = await mpesRepository.find();
  return response.json(mpes);
});

mpesRouter.post('/', async (request, response) => {
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

    const createMpeService = new CreateMpeService();
    const createNcmService = new CreateNcmService();
    const createTradingsNcmsService = new CreateTradingsNcmsService();

    products.map(async (items: number) => {
      await createNcmService.execute({ ncm: items });
    });

    const trading = await createMpeService.execute({
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

export default mpesRouter;
