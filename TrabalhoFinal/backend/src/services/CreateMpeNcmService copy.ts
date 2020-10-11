import { getCustomRepository } from 'typeorm';
import Ncm from '../models/Ncm';
import NcmsRepository from '../repositories/NcmsRepository';
import MpesRepository from '../repositories/MpesRepository';
import MpesNcmsRepository from '../repositories/MpesNcmsRepository';
import Mpe from '../models/Mpe';

interface RequestDTO {
  mpe_id: string;
  ncm_id: string;
}
interface ResponseDTO {
  id: string;
  mpe: Mpe;
  ncm: Ncm;
  created_at: Date;
  updated_at: Date;
}

class CreateMpesNcmsService {
  public async execute({ mpe_id, ncm_id }: RequestDTO): Promise<ResponseDTO> {
    const mpesNcmsRepository = getCustomRepository(MpesNcmsRepository);
    const mpesRepository = getCustomRepository(MpesRepository);
    const ncmsRepository = getCustomRepository(NcmsRepository);

    const checkNcmExist = await mpesNcmsRepository.findOne({
      where: { mpe_id, ncm_id },
    });

    if (!checkNcmExist) {
      const newMpesNcms = mpesNcmsRepository.create({
        mpe_id,
        ncm_id,
      });
      await mpesNcmsRepository.save(newMpesNcms);

      const mpe = await mpesRepository.findOne({
        where: { id: newMpesNcms.mpe_id },
      });

      const ncm = await ncmsRepository.findOne({
        where: { id: newMpesNcms.ncm_id },
      });

      return {
        id: newMpesNcms.id,
        mpe,
        ncm,
        created_at: newMpesNcms.created_at,
        updated_at: newMpesNcms.updated_at,
      } as ResponseDTO;
    }

    const mpe = await mpesRepository.findOne({
      where: { id: checkNcmExist.mpe_id },
    });

    const ncm = await ncmsRepository.findOne({
      where: { id: checkNcmExist.ncm_id },
    });

    return {
      id: checkNcmExist.id,
      mpe,
      ncm,
      created_at: checkNcmExist.created_at,
      updated_at: checkNcmExist.updated_at,
    } as ResponseDTO;
  }
}

export default CreateMpesNcmsService;
