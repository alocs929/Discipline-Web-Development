import { Router } from 'express';
import { getCustomRepository, In } from 'typeorm';
import multer from 'multer';
import Ncm from '../models/Ncm';
import NcmsRepository from '../repositories/NcmsRepository';
import MpesRepository from '../repositories/MpesRepository';
import CreateNcmService from '../services/CreateNcmService';
import CreateMpeService from '../services/CreateMpeService';
import CreateMpeNcmService from '../services/CreateMpeNcmService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateMpeAvatarService from '../services/UpdateMpeAvatarService';
import uploadConfig from '../config/upload';
import ListMatchMpeWithTradingsService from '../services/ListMatchMpeWithTradingsService';

const mpesRouter = Router();
const upload = multer(uploadConfig);

mpesRouter.get('/', ensureAuthenticated, async (request, response) => {
  const mpesRepository = getCustomRepository(MpesRepository);
  const mpes = await mpesRepository.find();

  const mpesWithoutPassword = mpes.map(mpe => {
    return {
      id: mpe.id,
      profile_url: mpe.profile_url,
      razao_social: mpe.razao_social,
      cnpj: mpe.cnpj,
      email: mpe.email,
      telephone: mpe.telephone,
      whatsapp: mpe.whatsapp,
      created_at: mpe.created_at,
      updated_at: mpe.updated_at,
    };
  });

  return response.json(mpesWithoutPassword);
});

mpesRouter.post('/', async (request, response) => {
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
  const createMpeNcmService = new CreateMpeNcmService();

  products.map(async (items: number) => {
    await createNcmService.execute({ ncm: items });
  });

  const mpe = await createMpeService.execute({
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
    await createMpeNcmService.execute({
      mpe_id: mpe.id,
      ncm_id: item.id,
    });
  });

  const mpeWithoutPassword = {
    id: mpe.id,
    profile_url: mpe.profile_url,
    razao_social: mpe.razao_social,
    cnpj: mpe.cnpj,
    email: mpe.email,
    telephone: mpe.telephone,
    whatsapp: mpe.whatsapp,
    created_at: mpe.created_at,
    updated_at: mpe.updated_at,
  };

  return response.json({ mpe: mpeWithoutPassword, ncms: arrayNcms });
});

mpesRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateMpeAvatar = new UpdateMpeAvatarService();

    const mpe = await updateMpeAvatar.execute({
      mpe_id: request.user.id,
      avatarfileName: request.file.filename,
    });

    const mpeWithoutPassword = {
      id: mpe.id,
      profile_url: mpe.profile_url,
      razao_social: mpe.razao_social,
      cnpj: mpe.cnpj,
      email: mpe.email,
      telephone: mpe.telephone,
      whatsapp: mpe.whatsapp,
      created_at: mpe.created_at,
      updated_at: mpe.updated_at,
    };

    return response.json(mpeWithoutPassword);
  },
);

mpesRouter.get(
  '/matchTradings',
  ensureAuthenticated,
  async (request, response) => {
    const listMatchTradingWithMpesService = new ListMatchMpeWithTradingsService();
    const result = await listMatchTradingWithMpesService.execute(
      request.user.id,
    );
    return response.json(result);
  },
);

export default mpesRouter;
