import { EntityRepository, Repository } from 'typeorm';
import Ncm from '../models/Ncm';

@EntityRepository(Ncm)
class NcmsRepository extends Repository<Ncm> {}
export default NcmsRepository;
