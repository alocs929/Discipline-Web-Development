import { Router } from 'express';
import AuthenticateMpeService from '../services/AuthenticateMpeService';

const sessionsMpeRouter = Router();

sessionsMpeRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateMpe = new AuthenticateMpeService();

  const { mpe, token } = await authenticateMpe.exeute({
    email,
    password,
  });

  return response.json({
    mpe: {
      id: mpe.id,
      profile_url: mpe.profile_url,
      razao_social: mpe.razao_social,
      cnpj: mpe.cnpj,
      email: mpe.email,
      telephone: mpe.telephone,
      whatsapp: mpe.whatsapp,
      created_at: mpe.created_at,
      updated_at: mpe.updated_at,
    },
    token,
  });
});

export default sessionsMpeRouter;
