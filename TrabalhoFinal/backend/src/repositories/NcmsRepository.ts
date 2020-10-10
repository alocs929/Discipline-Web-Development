import { EntityRepository, Repository } from 'typeorm';
import Ncm from '../models/Ncm';

@EntityRepository(Ncm)
class NcmsRepository extends Repository<Ncm> {
  // public async findAllWithArray(arrayNcms: number[]): Promise<Ncm[]> {
  //   const ncms = await this.find();
  //   // const ncms = arrayNcms.map(async ncm => {
  //   //   const checkNcmExist = await this.findOne({ where: { ncm } });
  //   //   if (checkNcmExist) {
  //   //     throw Error('This ncm already exists');
  //   //   }
  //   // });
  //   console.log(ncms);
  //   return ncms;
  // }
}
export default NcmsRepository;
