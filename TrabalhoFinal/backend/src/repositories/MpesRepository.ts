import { EntityRepository, Repository } from 'typeorm';
import Mpe from '../models/Mpe';

@EntityRepository(Mpe)
class MpesRepository extends Repository<Mpe> {
  public async findByCnpj(cnpj: string): Promise<Mpe | null> {
    const findMpe = await this.findOne({ where: { cnpj } });

    return findMpe || null;
  }

  public async findByEmail(email: string): Promise<Mpe | null> {
    const findMpe = await this.findOne({ where: { email } });

    return findMpe || null;
  }
}
export default MpesRepository;
