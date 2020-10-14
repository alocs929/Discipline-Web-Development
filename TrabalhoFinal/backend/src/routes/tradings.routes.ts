import { Router } from 'express';
import { getCustomRepository, In } from 'typeorm';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Ncm from '../models/Ncm';
import NcmsRepository from '../repositories/NcmsRepository';
import TradingsRepository from '../repositories/TradingsRepository';
import CreateNcmService from '../services/CreateNcmService';
import CreateTradingNcmService from '../services/CreateTradingNcmService';
import CreateTradingService from '../services/CreateTradingService';
import uploadConfig from '../config/upload';
import UpdateTradingAvatarService from '../services/UpdateTradingAvatarService';
import ListMatchTradingWithMpesService from '../services/ListMatchTradingWithMpesService';

const tradingsRouter = Router();
const upload = multer(uploadConfig);

tradingsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const tradingsRepository = getCustomRepository(TradingsRepository);
  const tradings = await tradingsRepository.find();

  const tradingsWithoutPassword = tradings.map(trading => {
    return {
      id: trading.id,
      profile_url: trading.profile_url,
      razao_social: trading.razao_social,
      cnpj: trading.cnpj,
      email: trading.email,
      telephone: trading.telephone,
      whatsapp: trading.whatsapp,
      created_at: trading.created_at,
      updated_at: trading.updated_at,
    };
  });

  return response.json(tradingsWithoutPassword);
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
    const createTradingNcmService = new CreateTradingNcmService();

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
      await createTradingNcmService.execute({
        trading_id: trading.id,
        ncm_id: item.id,
      });
    });

    const tradingWithoutPassword = {
      id: trading.id,
      profile_url: trading.profile_url,
      razao_social: trading.razao_social,
      cnpj: trading.cnpj,
      email: trading.email,
      telephone: trading.telephone,
      whatsapp: trading.whatsapp,
      created_at: trading.created_at,
      updated_at: trading.updated_at,
    };

    return response.json({
      trading: tradingWithoutPassword,
      ncms: arrayNcms,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

tradingsRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateTradingAvatar = new UpdateTradingAvatarService();

    const trading = await updateTradingAvatar.execute({
      trading_id: request.user.id,
      avatarfileName: request.file.filename,
    });

    const tradingWithoutPassword = {
      id: trading.id,
      profile_url: trading.profile_url,
      razao_social: trading.razao_social,
      cnpj: trading.cnpj,
      email: trading.email,
      telephone: trading.telephone,
      whatsapp: trading.whatsapp,
      created_at: trading.created_at,
      updated_at: trading.updated_at,
    };

    return response.json(tradingWithoutPassword);
  },
);

tradingsRouter.get(
  '/matchMpes',
  ensureAuthenticated,
  async (request, response) => {
    const listMatchTradingWithMpesService = new ListMatchTradingWithMpesService();
    const result = await listMatchTradingWithMpesService.execute(
      request.user.id,
    );
    return response.json(result);
  },
);

export default tradingsRouter;
