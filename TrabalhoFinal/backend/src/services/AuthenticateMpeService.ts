import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';
import Mpe from '../models/Mpe';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  mpe: Mpe;
  token: string;
}

class AuthenticateMpeService {
  public async exeute({ email, password }: IRequest): Promise<IResponse> {
    const mpesRepository = getRepository(Mpe);

    const mpe = await mpesRepository.findOne({ where: { email } });

    if (!mpe) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, mpe.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: mpe.id,
      expiresIn,
    });
    return { mpe, token };
  }
}

export default AuthenticateMpeService;
