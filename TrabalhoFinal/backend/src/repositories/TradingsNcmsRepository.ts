import { EntityRepository, In, Repository } from 'typeorm';
import TradingNcm from '../models/TradingNcm';

@EntityRepository(TradingNcm)
class TradingsNcmsRepository extends Repository<TradingNcm> {
  public async findIdTradingsWithNcms(ncms: string[]): Promise<string[]> {
    const idsTradings = await this.find({
      select: ['trading_id'],
      where: { ncm_id: In(ncms) },
    });
    const arrayIdsMpes = idsTradings.map(i => i.trading_id);
    return arrayIdsMpes;
  }

  public async findIdNcmsWithTrading(id: string): Promise<string[]> {
    const idsNcmsTrading = await this.find({
      select: ['ncm_id'],
      where: { trading_id: id },
    });
    const arrayIds = idsNcmsTrading.map(i => i.ncm_id);
    return arrayIds;
  }
}
export default TradingsNcmsRepository;
