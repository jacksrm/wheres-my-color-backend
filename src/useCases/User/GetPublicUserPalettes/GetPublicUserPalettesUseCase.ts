import { IPalettesRepository } from '@repositories/IPalettesRepository';
import { IGetPublicUserPalettesRequestDTO } from './GetPublicUserPalettesDTO';

export class GetPublicUserPalettesUseCase {
  constructor(private palettesRepository: IPalettesRepository) {}

  async execute(data: IGetPublicUserPalettesRequestDTO) {
    const palettes = await this.palettesRepository.getPublicUserPalettes(data.ownerId);
    return palettes;
  }
}
