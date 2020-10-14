import { Router } from 'express';

import AuthenticateTradingService from '../services/AuthenticateTradingService';

const sessionsTradingRouter = Router();

sessionsTradingRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateTrading = new AuthenticateTradingService();

  const { trading, token } = await authenticateTrading.exeute({
    email,
    password,
  });

  return response.json({
    trading: {
      id: trading.id,
      profile_url: trading.profile_url,
      razao_social: trading.razao_social,
      cnpj: trading.cnpj,
      email: trading.email,
      telephone: trading.telephone,
      whatsapp: trading.whatsapp,
      created_at: trading.created_at,
      updated_at: trading.updated_at,
    },
    token,
  });
});

export default sessionsTradingRouter;
