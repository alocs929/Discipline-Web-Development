import { getCustomRepository } from 'typeorm';
import Ncm from '../models/Ncm';
import NcmsRepository from '../repositories/NcmsRepository';

interface RequestDTO {
  ncm: number;
  description: string;
}

class AddDescriptionNcmService {
  public async execute({ ncm, description }: RequestDTO): Promise<Ncm> {
    const ncmsRepository = getCustomRepository(NcmsRepository);

    const checkNcmExist = await ncmsRepository.findOne({ where: { ncm } });

    if (!checkNcmExist) {
      throw Error('Ncm not exists');
    }

    checkNcmExist.description = description;

    await ncmsRepository.save(checkNcmExist);

    return checkNcmExist;
  }
}

export default AddDescriptionNcmService;
