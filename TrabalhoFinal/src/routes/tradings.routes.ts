import { Router } from 'express';
import { v4 } from 'uuid';

const tradingsRouter = Router();

interface tradinsDTO {
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
  whatsapp: string;
  password: string;
}

const tradings: tradinsDTO[] = [];

tradingsRouter.post('/', (request, response) => {
  const {
    razaoSocial,
    cnpj,
    email,
    telefone,
    whatsapp,
    password,
  } = request.body;

  const trading = {
    id: v4(),
    razaoSocial,
    cnpj,
    email,
    telefone,
    whatsapp,
    password,
  };
  tradings.push(trading);

  return response.json(tradings);
});

export default tradingsRouter;
