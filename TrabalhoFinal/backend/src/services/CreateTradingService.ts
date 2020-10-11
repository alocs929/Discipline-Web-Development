import { getCustomRepository } from 'typeorm';
import Ncm from '../models/Ncm';
import Trading from '../models/Trading';
import TradingsRepository from '../repositories/TradingsRepository';

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
      throw Error('This cnpj already exists');
    }

    const checkEmail = await tradingsRepository.findByEmail(email);

    if (checkEmail) {
      throw Error('This email already exists');
    }

    const trading = await tradingsRepository.save(
      tradingsRepository.create({
        razao_social,
        cnpj,
        email,
        telephone,
        whatsapp,
        password,
      }),
    );
    return trading;
    // return tradingsRepository.create({
    //   razao_social,
    //   cnpj,
    //   email,
    //   telephone,
    //   whatsapp,
    //   password,
    // });
  }
}

export default CreateTradingService;
