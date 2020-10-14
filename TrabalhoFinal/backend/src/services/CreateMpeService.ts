import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Ncm from '../models/Ncm';
import Mpe from '../models/Mpe';
import MpesRepository from '../repositories/MpesRepository';
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

class CreateMpeService {
  public async execute({
    razao_social,
    whatsapp,
    telephone,
    password,
    email,
    cnpj,
  }: RequestDTO): Promise<Mpe> {
    const mpesRepository = getCustomRepository(MpesRepository);

    const checkCnpj = await mpesRepository.findByCnpj(cnpj);

    if (checkCnpj) {
      throw new AppError('This cnpj already exists');
    }

    const checkEmail = await mpesRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError('This email already exists');
    }

    const hashedPassword = await hash(password, 8);

    const mpe = await mpesRepository.save(
      mpesRepository.create({
        razao_social,
        cnpj,
        email,
        telephone,
        whatsapp,
        password: hashedPassword,
      }),
    );

    return mpe;
  }
}

export default CreateMpeService;
