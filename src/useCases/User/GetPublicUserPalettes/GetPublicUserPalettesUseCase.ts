import IPaletteRepository from '@repositories/IPalettesRepository';
import { IGetPublicUserPalettesRequestDTO } from './GetPublicUserPalettesDTO';

export class GetPublicUserPalettesUseCase {
  constructor(private palettesRepository: IPaletteRepository) {}

  async execute(data: IGetPublicUserPalettesRequestDTO) {
    const palettes = await this.palettesRepository.getPublicUserPalettes(data.ownerId);
    return palettes;
  }
}
