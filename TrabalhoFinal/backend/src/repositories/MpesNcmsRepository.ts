import { EntityRepository, Repository } from 'typeorm';
import MpeNcm from '../models/MpeNcm';

@EntityRepository(MpeNcm)
class MpesNcmsRepository extends Repository<MpeNcm> {}
export default MpesNcmsRepository;
