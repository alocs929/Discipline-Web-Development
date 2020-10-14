import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Trading from '../models/Trading';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  trading: Trading;
  token: string;
}

class AuthenticateTradingService {
  public async exeute({ email, password }: IRequest): Promise<IResponse> {
    const tradingsRepository = getRepository(Trading);

    const trading = await tradingsRepository.findOne({ where: { email } });

    if (!trading) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, trading.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: trading.id,
      expiresIn,
    });
    return { trading, token };
  }
}

export default AuthenticateTradingService;
