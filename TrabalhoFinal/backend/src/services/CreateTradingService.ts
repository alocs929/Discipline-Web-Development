import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Ncm from '../models/Ncm';
import Trading from '../models/Trading';
import TradingsRepository from '../repositories/TradingsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  razao_social: string;
  cnpj: string;
  email: string;
  telephone: string;
  whatsapp: string;
  password: string;
  products: Ncm[];
}

class CreateTradingService {
  public async execute({
    razao_social,
    whatsapp,
    telephone,
    password,
    email,
    cnpj,
  }: RequestDTO): Promise<Trading> {
    const tradingsRepository = getCustomRepository(TradingsRepository);

    const checkCnpj = await tradingsRepository.findByCnpj(cnpj);

    if (checkCnpj) {
      throw new AppError('This cnpj already exists');
    }

    const checkEmail = await tradingsRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError('This email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const trading = await tradingsRepository.save(
      tradingsRepository.create({
        razao_social,
        cnpj,
        email,
        telephone,
        whatsapp,
        password: hashedPassword,
      }),
    );
    return trading;
  }
}

export default CreateTradingService;
