import { getCustomRepository } from 'typeorm';
import Ncm from '../models/Ncm';
import NcmsRepository from '../repositories/NcmsRepository';

interface RequestDTO {
  ncm: number;
  description?: string;
}

class CreateNcmService {
  public async execute({ ncm, description }: RequestDTO): Promise<Ncm> {
    const ncmsRepository = getCustomRepository(NcmsRepository);

    const checkNcmExist = await ncmsRepository.findOne({ where: { ncm } });

    if (!checkNcmExist) {
      const newNcm = ncmsRepository.create({
        ncm,
        description,
      });
      await ncmsRepository.save(newNcm);

      return newNcm;
    }

    return checkNcmExist;
  }
}

export default CreateNcmService;
