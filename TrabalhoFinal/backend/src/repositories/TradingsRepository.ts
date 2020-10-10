import { EntityRepository, Repository } from 'typeorm';
import Trading from '../models/Trading';

@EntityRepository(Trading)
class TradingsRepository extends Repository<Trading> {
  public async findByCnpj(cnpj: string): Promise<Trading | null> {
    const findTrading = await this.findOne({ where: { cnpj } });

    return findTrading || null;
  }

  public async findByEmail(email: string): Promise<Trading | null> {
    const findTrading = await this.findOne({ where: { email } });

    return findTrading || null;
  }
}
export default TradingsRepository;
