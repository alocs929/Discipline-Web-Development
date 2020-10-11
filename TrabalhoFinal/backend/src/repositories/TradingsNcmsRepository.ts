import { EntityRepository, Repository } from 'typeorm';
import TradingNcm from '../models/TradingNcm';

@EntityRepository(TradingNcm)
class TradingsNcmsRepository extends Repository<TradingNcm> {}
export default TradingsNcmsRepository;
