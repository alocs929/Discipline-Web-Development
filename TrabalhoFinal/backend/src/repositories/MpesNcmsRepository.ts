import { EntityRepository, In, Repository } from 'typeorm';
import MpeNcm from '../models/MpeNcm';

@EntityRepository(MpeNcm)
class MpesNcmsRepository extends Repository<MpeNcm> {
  public async findIdMpesWithNcms(ncms: string[]): Promise<string[]> {
    const idsMpes = await this.find({
      select: ['mpe_id'],
      where: { ncm_id: In(ncms) },
    });

    const arrayIdsMpes = idsMpes.map(i => i.mpe_id);

    return arrayIdsMpes;
  }

  public async findIdNcmsWithMpe(id: string): Promise<string[]> {
    const idsNcmsMpe = await this.find({
      select: ['ncm_id'],
      where: { mpe_id: id },
    });
    const arrayIds = idsNcmsMpe.map(i => i.ncm_id);

    return arrayIds;
  }
}
export default MpesNcmsRepository;
