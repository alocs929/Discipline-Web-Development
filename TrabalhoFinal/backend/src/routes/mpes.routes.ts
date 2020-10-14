import { Router } from 'express';
import { getCustomRepository, In } from 'typeorm';
import Ncm from '../models/Ncm';
import NcmsRepository from '../repositories/NcmsRepository';
import MpesRepository from '../repositories/MpesRepository';
import CreateNcmService from '../services/CreateNcmService';
import CreateMpeService from '../services/CreateMpeService';
import CreateMpeNcmService from '../services/CreateMpeNcmService';

const mpesRouter = Router();

mpesRouter.get('/', async (request, response) => {
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

export default mpesRouter;
